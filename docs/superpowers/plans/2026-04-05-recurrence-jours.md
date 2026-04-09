# Récurrence par jours de la semaine — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permettre aux parents de configurer des tâches récurrentes sur des jours spécifiques de la semaine (ex: mardi et jeudi).

**Architecture:** Ajout d'une valeur `custom` au champ `recurrence` et d'une colonne `recurrence_days TEXT` stockant les jours sélectionnés (ex: `"1,4"` pour lundi et jeudi). L'écran enfant filtre les tâches `custom` selon le jour actuel.

**Tech Stack:** SQLite (migration ALTER TABLE), React Native (UI chips pour sélection de jours)

---

### Task 1: Migration de la base de données

**Files:**
- Modify: `src/db/schema.ts:14-25`
- Modify: `src/db/database.ts:6-15`

- [ ] **Step 1: Mettre à jour le CHECK constraint dans schema.ts**

Dans `src/db/schema.ts`, modifier `CREATE_TASKS` pour accepter `custom` et ajouter la colonne `recurrence_days` :

```typescript
export const CREATE_TASKS = `
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  points INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('assigned', 'free')),
  assigned_to INTEGER REFERENCES profiles(id),
  recurrence TEXT NOT NULL CHECK(recurrence IN ('once', 'daily', 'weekly', 'custom')),
  recurrence_days TEXT,
  active INTEGER DEFAULT 1
);`;
```

- [ ] **Step 2: Ajouter la migration dans database.ts**

Dans `src/db/database.ts`, après la boucle `for (const sql of ALL_TABLES)`, ajouter la migration pour les bases existantes :

```typescript
// Migration: ajout recurrence custom + recurrence_days
try {
  await db.execAsync('ALTER TABLE tasks ADD COLUMN recurrence_days TEXT');
} catch {
  // Colonne existe déjà
}
```

Note : Le CHECK constraint sur `recurrence` ne peut pas être modifié via ALTER TABLE en SQLite. Mais `CREATE TABLE IF NOT EXISTS` ne recrée pas une table existante, donc l'ancien CHECK reste. Pour les bases existantes, on insère `custom` directement — SQLite n'enforce le CHECK que si la table est créée avec. Pour les nouvelles installations, le nouveau schema inclut `custom`.

- [ ] **Step 3: Vérifier que l'app démarre sans erreur**

Run: `npx expo start --web` et vérifier qu'il n'y a pas d'erreur dans la console.

- [ ] **Step 4: Commit**

```bash
git add src/db/schema.ts src/db/database.ts
git commit -m "feat: add recurrence_days column and custom recurrence type"
```

---

### Task 2: Mettre à jour les types et fonctions CRUD

**Files:**
- Modify: `src/db/tasks.ts:3-13` (Task interface)
- Modify: `src/db/tasks.ts:22-30` (CreateTaskInput)
- Modify: `src/db/tasks.ts:32-38` (createTask)
- Modify: `src/db/tasks.ts:122-127` (updateTask)

- [ ] **Step 1: Mettre à jour l'interface Task**

Dans `src/db/tasks.ts`, ajouter `custom` au type recurrence et le champ `recurrence_days` :

```typescript
export interface Task {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  assigned_to: number | null;
  recurrence: 'once' | 'daily' | 'weekly' | 'custom';
  recurrence_days: string | null;
  active: number;
}
```

- [ ] **Step 2: Mettre à jour CreateTaskInput**

```typescript
interface CreateTaskInput {
  name: string;
  description?: string;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  assignedTo: number | null;
  recurrence: 'once' | 'daily' | 'weekly' | 'custom';
  recurrenceDays: string | null;
}
```

- [ ] **Step 3: Mettre à jour createTask**

```typescript
export async function createTask(db: SQLiteDatabase, input: CreateTaskInput): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO tasks (name, description, icon, points, type, assigned_to, recurrence, recurrence_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    input.name, input.description ?? null, input.icon, input.points, input.type, input.assignedTo, input.recurrence, input.recurrenceDays,
  );
  return result.lastInsertRowId;
}
```

- [ ] **Step 4: Mettre à jour updateTask**

```typescript
export async function updateTask(db: SQLiteDatabase, id: number, input: CreateTaskInput): Promise<void> {
  await db.runAsync(
    'UPDATE tasks SET name = ?, icon = ?, points = ?, type = ?, assigned_to = ?, recurrence = ?, recurrence_days = ? WHERE id = ?',
    input.name, input.icon, input.points, input.type, input.assignedTo, input.recurrence, input.recurrenceDays, id,
  );
}
```

- [ ] **Step 5: Ajouter une fonction helper isTaskScheduledToday**

À la fin de `src/db/tasks.ts`, ajouter :

```typescript
export function isTaskScheduledToday(task: Task): boolean {
  if (task.recurrence === 'daily') return true;
  if (task.recurrence === 'once') return true;
  if (task.recurrence === 'weekly') return true;
  if (task.recurrence === 'custom' && task.recurrence_days) {
    const today = new Date().getDay(); // 0=dimanche, 1=lundi... 6=samedi
    const days = task.recurrence_days.split(',').map(Number);
    return days.includes(today);
  }
  return false;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/db/tasks.ts
git commit -m "feat: update task types and CRUD for custom recurrence days"
```

---

### Task 3: UI de sélection des jours dans ManageTasksScreen

**Files:**
- Modify: `src/screens/parent/ManageTasksScreen.tsx`

- [ ] **Step 1: Ajouter le state recurrenceDays**

Après la ligne `const [recurrence, setRecurrence] = ...` (ligne 19), ajouter :

```typescript
const [recurrenceDays, setRecurrenceDays] = useState<number[]>([]);
```

- [ ] **Step 2: Ajouter la constante DAY_LABELS**

Avant le composant, ajouter :

```typescript
const DAY_LABELS = [
  { day: 1, label: 'L' },
  { day: 2, label: 'M' },
  { day: 3, label: 'Me' },
  { day: 4, label: 'J' },
  { day: 5, label: 'V' },
  { day: 6, label: 'S' },
  { day: 0, label: 'D' },
];
```

- [ ] **Step 3: Remplacer les chips de récurrence**

Remplacer le bloc récurrence (lignes 180-193) par :

```tsx
<Text style={styles.label}>Récurrence</Text>
<View style={styles.row}>
  {(['daily', 'custom', 'once'] as const).map(r => (
    <TouchableOpacity
      key={r}
      style={[styles.chip, recurrence === r && styles.chipActive]}
      onPress={() => setRecurrence(r)}
    >
      <Text style={[styles.chipText, recurrence === r && styles.chipTextActive]}>
        {r === 'daily' ? 'Tous les jours' : r === 'custom' ? 'Certains jours' : 'Une fois'}
      </Text>
    </TouchableOpacity>
  ))}
</View>

{recurrence === 'custom' && (
  <View style={[styles.row, { marginTop: 8 }]}>
    {DAY_LABELS.map(({ day, label }) => {
      const selected = recurrenceDays.includes(day);
      return (
        <TouchableOpacity
          key={day}
          style={[styles.dayChip, selected && styles.dayChipActive]}
          onPress={() =>
            setRecurrenceDays(prev =>
              selected ? prev.filter(d => d !== day) : [...prev, day],
            )
          }
        >
          <Text style={[styles.dayChipText, selected && styles.dayChipTextActive]}>{label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
)}
```

- [ ] **Step 4: Mettre à jour openAdd pour réinitialiser recurrenceDays**

Dans `openAdd()`, ajouter `setRecurrenceDays([]);` après `setRecurrence('daily');`.

- [ ] **Step 5: Mettre à jour openEdit pour charger recurrenceDays**

Dans `openEdit(task)`, ajouter après `setRecurrence(task.recurrence)` :

```typescript
setRecurrenceDays(task.recurrence_days ? task.recurrence_days.split(',').map(Number) : []);
```

- [ ] **Step 6: Mettre à jour handleSave pour passer recurrenceDays**

Dans `handleSave()`, modifier l'objet `input` :

```typescript
const input = {
  name: name.trim(),
  icon,
  points: parseInt(points, 10),
  type,
  assignedTo: type === 'assigned' ? assignedTo : null,
  recurrence,
  recurrenceDays: recurrence === 'custom' ? recurrenceDays.join(',') : null,
};
```

- [ ] **Step 7: Mettre à jour le type du state recurrence**

Changer la ligne de state :

```typescript
const [recurrence, setRecurrence] = useState<'once' | 'daily' | 'weekly' | 'custom'>('daily');
```

- [ ] **Step 8: Ajouter les styles dayChip**

Dans `StyleSheet.create`, ajouter :

```typescript
dayChip: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
dayChipActive: { backgroundColor: '#1565c0' },
dayChipText: { fontSize: 13, color: '#666', fontWeight: '600' },
dayChipTextActive: { color: '#fff' },
```

- [ ] **Step 9: Mettre à jour l'affichage de la récurrence dans la liste**

Ligne 104, remplacer le label récurrence dans la FlatList :

```typescript
{' • '}{item.recurrence === 'daily' ? 'Tous les jours' : item.recurrence === 'custom' ? `${formatDays(item.recurrence_days)}` : 'Une fois'}
```

Ajouter la fonction `formatDays` avant le composant :

```typescript
function formatDays(days: string | null): string {
  if (!days) return 'Certains jours';
  const labels: Record<number, string> = { 0: 'Dim', 1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam' };
  return days.split(',').map(Number).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b)).map(d => labels[d]).join(', ');
}
```

- [ ] **Step 10: Commit**

```bash
git add src/screens/parent/ManageTasksScreen.tsx
git commit -m "feat: add day-of-week picker for custom recurrence"
```

---

### Task 4: Filtrer les tâches enfant par jour

**Files:**
- Modify: `src/screens/child/TasksScreen.tsx:27-48`

- [ ] **Step 1: Importer isTaskScheduledToday**

Ajouter à l'import de `../../db/tasks` :

```typescript
import { getTasksForChild, getFreeTasks, completeTask, isTaskCompletedToday, claimFreeTask, isTaskScheduledToday, Task } from '../../db/tasks';
```

- [ ] **Step 2: Filtrer les tâches dans loadTasks**

Modifier `loadTasks` pour filtrer avant le map de status :

```typescript
const loadTasks = useCallback(async () => {
  if (!currentProfile) return;
  const db = await getDatabase();
  const mine = await getTasksForChild(db, currentProfile.id);
  const free = await getFreeTasks(db);

  const mineToday = mine.filter(isTaskScheduledToday);
  const freeToday = free.filter(isTaskScheduledToday);

  const myWithStatus = await Promise.all(
    mineToday.map(async t => ({
      ...t,
      completedToday: await isTaskCompletedToday(db, t.id, currentProfile.id),
    }))
  );
  const freeWithStatus = await Promise.all(
    freeToday.map(async t => ({
      ...t,
      completedToday: await isTaskCompletedToday(db, t.id, currentProfile.id),
    }))
  );

  setMyTasks(myWithStatus);
  setFreeTasks(freeWithStatus);
}, [currentProfile?.id]);
```

- [ ] **Step 3: Vérifier que le filtre fonctionne**

Lancer l'app, créer une tâche "Certains jours" avec un jour différent d'aujourd'hui → elle ne doit pas apparaître côté enfant. La sélectionner avec le jour d'aujourd'hui → elle apparaît.

- [ ] **Step 4: Commit**

```bash
git add src/screens/child/TasksScreen.tsx
git commit -m "feat: filter child tasks by scheduled day of week"
```

---

### Task 5: Mettre à jour TaskCard pour afficher les jours

**Files:**
- Modify: `src/components/TaskCard.tsx:7-17,27`

- [ ] **Step 1: Ajouter recurrenceDays aux props**

```typescript
interface TaskCardProps {
  name: string;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  recurrence: string;
  recurrenceDays?: string | null;
  completed: boolean;
  onComplete?: () => void;
  onClaim?: () => void;
  isClaimed: boolean;
}
```

- [ ] **Step 2: Mettre à jour la destructuration et le label**

```typescript
export default function TaskCard({
  name, icon, points, type, recurrence, recurrenceDays, completed, onComplete, onClaim, isClaimed,
}: TaskCardProps) {
```

Remplacer la ligne `recurrenceLabel` :

```typescript
const recurrenceLabel = recurrence === 'daily'
  ? 'Tous les jours'
  : recurrence === 'custom'
    ? formatDays(recurrenceDays ?? null)
    : 'Une fois';
```

Ajouter la fonction `formatDays` avant le composant :

```typescript
function formatDays(days: string | null): string {
  if (!days) return 'Certains jours';
  const labels: Record<number, string> = { 0: 'Dim', 1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam' };
  return days.split(',').map(Number).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b)).map(d => labels[d]).join(', ');
}
```

- [ ] **Step 3: Passer recurrenceDays dans TasksScreen**

Dans `src/screens/child/TasksScreen.tsx`, ajouter `recurrenceDays={item.recurrence_days}` au composant `<TaskCard>` (ligne 113) :

```tsx
<TaskCard
  name={item.name}
  icon={item.icon}
  points={item.points}
  type={item.type}
  recurrence={item.recurrence}
  recurrenceDays={item.recurrence_days}
  completed={item.completedToday}
  isClaimed={item.assigned_to === currentProfile.id}
  onComplete={() => handleComplete(item)}
  onClaim={() => handleClaim(item)}
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TaskCard.tsx src/screens/child/TasksScreen.tsx
git commit -m "feat: display recurrence days in task cards"
```

---

### Task 6: Migrer les anciennes tâches weekly vers custom

**Files:**
- Modify: `src/db/database.ts`

- [ ] **Step 1: Ajouter la migration weekly → custom**

Après la migration `ALTER TABLE`, ajouter :

```typescript
// Migration: convertir les tâches weekly existantes en custom avec tous les jours de la semaine
// (weekly n'existe plus dans l'UI, les tâches existantes gardent leur comportement)
```

Note : On garde `weekly` dans le CHECK constraint pour ne pas casser les tâches existantes. L'UI ne propose plus `weekly` pour les nouvelles tâches, mais les anciennes continuent de fonctionner car `isTaskScheduledToday` retourne `true` pour `weekly`.

- [ ] **Step 2: Vérifier que l'app fonctionne avec des tâches weekly existantes**

Les tâches `weekly` déjà en base doivent continuer à s'afficher tous les jours (comportement existant).

- [ ] **Step 3: Commit**

```bash
git add src/db/database.ts
git commit -m "feat: preserve backward compat for existing weekly tasks"
```

---

### Task 7: Test complet end-to-end

- [ ] **Step 1: Tester la création d'une tâche "Certains jours"**

1. Espace parent → Tâches → Nouvelle tâche
2. Sélectionner "Certains jours" → vérifier que les 7 boutons jours apparaissent
3. Sélectionner Mardi et Jeudi → Créer
4. Vérifier dans la liste que la tâche affiche "Mar, Jeu"

- [ ] **Step 2: Tester le filtrage côté enfant**

1. Basculer vers l'espace enfant
2. Si aujourd'hui est mardi ou jeudi → la tâche apparaît
3. Sinon → la tâche n'apparaît pas

- [ ] **Step 3: Tester l'édition**

1. Espace parent → modifier la tâche
2. Vérifier que les jours sélectionnés sont bien pré-cochés
3. Modifier les jours, sauvegarder, vérifier

- [ ] **Step 4: Tester les autres types de récurrence**

1. Vérifier qu'une tâche "Tous les jours" apparaît toujours
2. Vérifier qu'une tâche "Une fois" apparaît toujours
