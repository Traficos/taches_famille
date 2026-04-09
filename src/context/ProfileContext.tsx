import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile } from '../api/profiles';

interface ProfileContextType {
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile | null) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  currentProfile: null,
  setCurrentProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
