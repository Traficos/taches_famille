import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.parentBg },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
});
