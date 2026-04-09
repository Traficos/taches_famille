import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AnimalScreen from '../screens/child/AnimalScreen';
import TasksScreen from '../screens/child/TasksScreen';
import ShopScreen from '../screens/child/ShopScreen';
import VouchersScreen from '../screens/child/VouchersScreen';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';

const Tab = createBottomTabNavigator();

export default function ChildTabs() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { setCurrentProfile } = useProfile();

  const handleLogout = () => {
    setCurrentProfile(null);
    navigation.navigate('ProfileSelect');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>← Profils</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Animal"
        component={AnimalScreen}
        options={{ tabBarLabel: 'Mon animal', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🐾</Text> }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ tabBarLabel: 'Taches', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text> }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{ tabBarLabel: 'Boutique', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🛍️</Text> }}
      />
      <Tab.Screen
        name="Vouchers"
        component={VouchersScreen}
        options={{ tabBarLabel: 'Mes bons', tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🎟️</Text> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: { marginRight: 16, paddingVertical: 6, paddingHorizontal: 12 },
  logoutText: { fontSize: 15, color: '#666', fontWeight: '500' },
});
