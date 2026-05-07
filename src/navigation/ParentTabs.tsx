import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ManageTasksScreen from '../screens/parent/ManageTasksScreen';
import ManageRewardsScreen from '../screens/parent/ManageRewardsScreen';
import ManageChildrenScreen from '../screens/parent/ManageChildrenScreen';
import HistoryScreen from '../screens/parent/HistoryScreen';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'ManageTasks', label: 'Taches', emoji: '📋', component: ManageTasksScreen },
  { name: 'ManageRewards', label: 'Recompenses', emoji: '🎁', component: ManageRewardsScreen },
  { name: 'ManageChildren', label: 'Enfants', emoji: '👧', component: ManageChildrenScreen },
  { name: 'History', label: 'Historique', emoji: '📊', component: HistoryScreen },
];

export default function ParentTabs() {
  const navigation = useNavigation<any>();
  const { setCurrentProfile } = useProfile();

  const handleLogout = () => {
    setCurrentProfile(null);
    navigation.navigate('ProfileSelect');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
          borderTopWidth: 0,
        },
        headerShown: true,
        headerTitle: 'Espace parent',
        headerTitleStyle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
        headerStyle: { backgroundColor: COLORS.parentBg },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>← Profils</Text>
          </TouchableOpacity>
        ),
      }}
    >
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.pill, focused && styles.pillActive]}>
                <Text style={styles.emoji}>{tab.emoji}</Text>
                {focused && <Text style={styles.pillLabel}>{tab.label}</Text>}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: { marginRight: 16, paddingVertical: 6, paddingHorizontal: 12 },
  logoutText: { fontSize: 15, color: '#666', fontWeight: '500' },
  pill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16 },
  pillActive: { backgroundColor: '#4ECDC420' },
  emoji: { fontSize: 20 },
  pillLabel: { fontSize: 11, fontWeight: '700', color: COLORS.turquoise, marginLeft: 6 },
});
