import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getAllProfiles, createParentProfile, Profile } from '../api/profiles';
import { useProfile } from '../context/ProfileContext';
import { ANIMALS, AnimalType, AnimalStage } from '../constants/animals';
import PinPad from '../components/PinPad';
import { AnimalSVG } from '../components/AnimalSVG';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ProfileSelect'>;

export default function ProfileSelectScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showSetup, setShowSetup] = useState(false);
  const navigation = useNavigation<Nav>();
  const { setCurrentProfile } = useProfile();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const all = await getAllProfiles();
        setProfiles(all);
        if (all.length === 0) setShowSetup(true);
      })();
    }, [])
  );

  function handleSelect(profile: Profile) {
    if (profile.type === 'parent') {
      navigation.navigate('PinEntry', { profileId: profile.id });
    } else {
      setCurrentProfile(profile);
      navigation.navigate('ChildHome');
    }
  }

  function getEmoji(profile: Profile): string {
    if (profile.type === 'parent') return '🔒';
    const animal = ANIMALS[profile.animal_type as AnimalType];
    if (!animal) return '🐾';
    return animal.emojis[(profile.animal_stage as AnimalStage) ?? 'egg'];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Tache Famille</Text>
      <Text style={styles.subtitle}>Qui es-tu ?</Text>
      <FlatList
        data={profiles}
        numColumns={3}
        contentContainerStyle={styles.grid}
        keyExtractor={p => String(p.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
            {item.type === 'child' && item.animal_type ? (
              <AnimalSVG
                animalType={item.animal_type as AnimalType}
                stage={(item.animal_stage || 'egg') as AnimalStage}
                size={48}
              />
            ) : (
              <Text style={styles.lockIcon}>🔒</Text>
            )}
            <Text style={styles.name}>{item.name}</Text>
            {item.type === 'parent' && <Text style={styles.hint}>Code PIN</Text>}
          </TouchableOpacity>
        )}
      />

      {showSetup && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Bienvenue !</Text>
              <Text style={styles.modalSubtitle}>Creez un code PIN parent pour commencer</Text>
              <PinPad onSubmit={async (pin) => {
                await createParentProfile('Parent', pin);
                setShowSetup(false);
                const all = await getAllProfiles();
                setProfiles(all);
              }} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9', paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '700', color: '#2e7d32', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 30 },
  grid: { paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 10,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  lockIcon: { fontSize: 48, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  hint: { fontSize: 11, color: '#999', marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 24, padding: 30, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 24, fontWeight: '700', color: '#2e7d32', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
});
