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
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Animal', label: 'Animal', emoji: '🐾', component: AnimalScreen },
  { name: 'Tasks', label: 'Taches', emoji: '📋', component: TasksScreen },
  { name: 'Shop', label: 'Boutique', emoji: '🛍️', component: ShopScreen },
  { name: 'Vouchers', label: 'Bons', emoji: '🎟️', component: VouchersScreen },
];

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
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
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
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                emoji={tab.emoji}
                label={tab.label}
                focused={focused}
                activeColor={theme.tabBarActive}
                activeShadow={theme.shadowPrimary}
              />
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
});
