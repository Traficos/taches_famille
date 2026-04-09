import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { verifyPin, getProfileById } from '../api/profiles';
import { useProfile } from '../context/ProfileContext';
import PinPad from '../components/PinPad';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PinEntry'>;
type Route = RouteProp<RootStackParamList, 'PinEntry'>;

export default function PinEntryScreen() {
  const [error, setError] = useState<string | undefined>();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { setCurrentProfile } = useProfile();
  const { profileId } = route.params;

  async function handleSubmit(pin: string) {
    const ok = await verifyPin(profileId, pin);
    if (ok) {
      const profile = await getProfileById(profileId);
      setCurrentProfile(profile);
      navigation.navigate('ParentHome');
    } else {
      setError('Code PIN incorrect');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Espace Parent</Text>
      <Text style={styles.subtitle}>Entrez le code PIN</Text>
      <PinPad onSubmit={handleSubmit} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd', paddingTop: 80, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#1565C0', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
});
