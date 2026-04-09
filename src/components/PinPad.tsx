import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PinPadProps {
  onSubmit: (pin: string) => void;
  error?: string;
}

export default function PinPad({ onSubmit, error }: PinPadProps) {
  const [pin, setPin] = useState('');

  function handlePress(digit: string) {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    if (newPin.length === 4) {
      onSubmit(newPin);
      setPin('');
    }
  }

  function handleDelete() {
    setPin(prev => prev.slice(0, -1));
  }

  const dots = Array.from({ length: 4 }, (_, i) => (
    <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
  ));

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>{dots}</View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.grid}>
        {digits.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.key, !d && styles.keyEmpty]}
            onPress={() => {
              if (d === '⌫') handleDelete();
              else if (d) handlePress(d);
            }}
            disabled={!d}
          >
            <Text style={styles.keyText}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  dotsRow: { flexDirection: 'row', marginBottom: 20 },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1565C0',
    marginHorizontal: 10,
  },
  dotFilled: { backgroundColor: '#1565C0' },
  error: { color: '#d32f2f', marginBottom: 10, fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 240, justifyContent: 'center' },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  keyEmpty: { backgroundColor: 'transparent' },
  keyText: { fontSize: 28, fontWeight: '600', color: '#1565C0' },
});
