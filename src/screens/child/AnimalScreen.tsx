import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getProfileById } from '../../api/profiles';
import { getAccessoriesOwned } from '../../api/rewards';
import AnimalDisplay from '../../components/AnimalDisplay';
import PointsBadge from '../../components/PointsBadge';
import { AnimalType, AnimalStage } from '../../constants/animals';

export default function AnimalScreen() {
  const { currentProfile, setCurrentProfile } = useProfile();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [accessories, setAccessories] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!currentProfile) return;
      (async () => {
        const fresh = await getProfileById(currentProfile.id);
        setCurrentProfile(fresh);
        const owned = await getAccessoriesOwned(currentProfile.id);
        setAccessories(owned);
      })();
    }, [currentProfile?.id])
  );

  if (!currentProfile) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          setCurrentProfile(null);
          navigation.navigate('ProfileSelect');
        }}>
          <Text style={styles.back}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{currentProfile.name}</Text>
        <PointsBadge points={currentProfile.current_points} />
      </View>
      <AnimalDisplay
        animalType={currentProfile.animal_type as AnimalType}
        animalStage={currentProfile.animal_stage as AnimalStage}
        animalName={currentProfile.animal_name ?? ''}
        totalPoints={currentProfile.total_points}
        equippedAccessories={accessories}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#bbdefb', padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  back: { fontSize: 16, color: '#1565c0', fontWeight: '600' },
  name: { fontSize: 18, fontWeight: '700', color: '#1565c0' },
});
