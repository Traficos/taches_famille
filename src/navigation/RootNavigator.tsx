import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileSelectScreen from '../screens/ProfileSelectScreen';
import PinEntryScreen from '../screens/PinEntryScreen';
import ChildTabs from './ChildTabs';
import ParentTabs from './ParentTabs';
import AccountScreen from '../screens/parent/AccountScreen';

export type RootStackParamList = {
  ProfileSelect: undefined;
  PinEntry: { profileId: number };
  ChildHome: undefined;
  ParentHome: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileSelect" component={ProfileSelectScreen} />
      <Stack.Screen name="PinEntry" component={PinEntryScreen} />
      <Stack.Screen name="ChildHome" component={ChildTabs} />
      <Stack.Screen name="ParentHome" component={ParentTabs} />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: true, headerTitle: 'Mon compte' }}
      />
    </Stack.Navigator>
  );
}
