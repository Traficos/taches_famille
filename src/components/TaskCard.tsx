import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TASK_ICONS } from '../constants/taskIcons';
import { KawaiBadge } from './KawaiBadge';
import { useTheme } from '../context/ThemeContext';

function formatDays(days: string | null): string {
  if (!days) return 'Certains jours';
  const labels: Record<number, string> = { 0: 'Dim', 1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam' };
  return days.split(',').map(Number).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b)).map(d => labels[d]).join(', ');
}

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

export default function TaskCard({
  name, icon, points, type, recurrence, recurrenceDays, completed, onComplete, onClaim, isClaimed,
}: TaskCardProps) {
  const theme = useTheme();
  const taskIcon = TASK_ICONS.find(t => t.key === icon);
  const emoji = taskIcon?.emoji || icon;
  const borderColor = completed ? '#ccc' : theme.primary;

  const recurrenceLabel = recurrence === 'daily'
    ? 'Tous les jours'
    : recurrence === 'custom'
      ? formatDays(recurrenceDays ?? null)
      : recurrence === 'weekly'
        ? 'Hebdomadaire'
        : 'Une fois';
  const typeLabel = type === 'assigned' || isClaimed ? 'Assignee' : 'Libre-service';

  return (
    <View style={[styles.card, { borderLeftColor: borderColor }, completed && styles.cardDone]}>
      <View style={styles.left}>
        <View style={styles.iconRow}>
          <KawaiBadge emoji={emoji} iconKey={icon} size={48} />
          <Text style={styles.taskName}>{name}</Text>
        </View>
        <Text style={styles.sub}>{typeLabel} • {recurrenceLabel}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.points, completed && styles.pointsDone]}>
          +{points} pts {completed ? '✓' : ''}
        </Text>
        {!completed && isClaimed && (
          <TouchableOpacity style={styles.buttonGreen} onPress={onComplete}>
            <Text style={styles.buttonText}>C'est fait !</Text>
          </TouchableOpacity>
        )}
        {!completed && !isClaimed && type === 'free' && (
          <TouchableOpacity style={styles.buttonBlue} onPress={onClaim}>
            <Text style={styles.buttonText}>Je prends !</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10,
    borderLeftWidth: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardDone: { opacity: 0.5, backgroundColor: '#e8f5e9' },
  left: { flex: 1 },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  taskName: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1, flexWrap: 'wrap' },
  sub: { fontSize: 12, color: '#888', marginTop: 2 },
  right: { alignItems: 'flex-end' },
  points: { color: '#f9a825', fontWeight: '700', marginBottom: 4 },
  pointsDone: { color: '#66bb6a' },
  buttonGreen: { backgroundColor: '#66bb6a', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  buttonBlue: { backgroundColor: '#42a5f5', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
