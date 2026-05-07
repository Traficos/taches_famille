import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getAllProfiles, createParentProfile, Profile } from '../api/profiles';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import { StaggerItem } from '../components/StaggerList';
import PinPad from '../components/PinPad';
import { COLORS } from '../constants/colors';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qui joue aujourd'hui ? 🎮</Text>
      <FlatList
        data={profiles}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        keyExtractor={p => String(p.id)}
        renderItem={({ item, index }) => (
          <StaggerItem index={index}>
            <ProfileCard
              name={item.name}
              type={item.type as 'child' | 'parent'}
              animalType={item.animal_type ?? undefined}
              animalStage={item.animal_stage ?? undefined}
              points={item.type === 'child' ? item.current_points : undefined}
              onPress={() => handleSelect(item)}
            />
          </StaggerItem>
        )}
      />

      {showSetup && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Bienvenue ! 🎉</Text>
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
  container: { flex: 1, backgroundColor: COLORS.cream, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 30 },
  grid: { paddingHorizontal: 20 },
  row: { gap: 12, justifyContent: 'center', marginBottom: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 24, padding: 30, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 24, fontWeight: '800', color: COLORS.turquoise, marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 20, textAlign: 'center' },
});
