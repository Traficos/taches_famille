import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TASK_ICONS } from '../constants/taskIcons';
import { KawaiBadge } from './KawaiBadge';
import GameCard from './GameCard';
import GameButton from './GameButton';
import { COLORS } from '../constants/colors';

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
  const taskIcon = TASK_ICONS.find(t => t.key === icon);
  const emoji = taskIcon?.emoji || icon;

  return (
    <GameCard style={completed ? styles.cardDone : undefined}>
      <View style={styles.row}>
        <KawaiBadge emoji={emoji} iconKey={icon} size={44} />
        <View style={styles.info}>
          <Text style={[styles.taskName, completed && styles.taskNameDone]}>{name}</Text>
          <Text style={styles.points}>+{points} pts ⭐</Text>
        </View>
        <View style={styles.action}>
          {completed ? (
            <Text style={styles.doneCheck}>✅</Text>
          ) : isClaimed ? (
            <GameButton label="C'est fait !" variant="primary" size="small" onPress={onComplete} />
          ) : type === 'free' ? (
            <GameButton label="Je prends !" variant="reward" size="small" onPress={onClaim} />
          ) : null}
        </View>
      </View>
    </GameCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  info: { flex: 1 },
  taskName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  taskNameDone: { textDecorationLine: 'line-through', color: COLORS.textMuted },
  points: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  action: { alignItems: 'flex-end' },
  doneCheck: { fontSize: 24 },
  cardDone: { opacity: 0.5 },
});
