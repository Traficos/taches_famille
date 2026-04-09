import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ManageTasksScreen from '../screens/parent/ManageTasksScreen';
import ManageRewardsScreen from '../screens/parent/ManageRewardsScreen';
import ManageChildrenScreen from '../screens/parent/ManageChildrenScreen';
import HistoryScreen from '../screens/parent/HistoryScreen';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';

const Tab = createBottomTabNavigator();

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
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: true,
        headerTitle: 'Espace parent',
        headerStyle: { backgroundColor: '#F5F5F5' },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>← Profils</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="ManageTasks"
        component={ManageTasksScreen}
        options={{ tabBarLabel: 'Taches', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text> }}
      />
      <Tab.Screen
        name="ManageRewards"
        component={ManageRewardsScreen}
        options={{ tabBarLabel: 'Recompenses', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🎁</Text> }}
      />
      <Tab.Screen
        name="ManageChildren"
        component={ManageChildrenScreen}
        options={{ tabBarLabel: 'Enfants', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👧</Text> }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: 'Historique', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: { marginRight: 16, paddingVertical: 6, paddingHorizontal: 12 },
  logoutText: { fontSize: 15, color: '#666', fontWeight: '500' },
});
