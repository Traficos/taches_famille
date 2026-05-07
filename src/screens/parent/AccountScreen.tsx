import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { getMe, changePassword, AccountInfo } from '../../api/account';
import GameButton from '../../components/GameButton';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AccountScreen() {
  const { logout } = useAuth();
  const [info, setInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSubmitting, setPwSubmitting] = useState(false);

  useEffect(() => {
    getMe()
      .then(setInfo)
      .catch((err) => Alert.alert('Erreur', err.message ?? 'Chargement impossible'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleChangePassword = async () => {
    setPwError(null);
    if (!currentPassword || !newPassword) {
      setPwError('Remplis les deux champs');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('Le nouveau mot de passe doit faire au moins 6 caracteres');
      return;
    }
    setPwSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      Alert.alert('Mot de passe modifie');
    } catch (err: any) {
      setPwError(err.message ?? 'Erreur lors du changement');
    } finally {
      setPwSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.turquoise} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mon compte</Text>
        <View style={styles.row}>
          <Text style={styles.label}>📧 Email</Text>
          <Text style={styles.value}>{info?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>📅 Membre depuis</Text>
          <Text style={styles.value}>
            {info?.createdAt ? formatDate(info.createdAt) : '—'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe actuel"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          editable={!pwSubmitting}
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe (6+ caracteres)"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          editable={!pwSubmitting}
        />
        {pwError && <Text style={styles.error}>{pwError}</Text>}
        <GameButton
          label={pwSubmitting ? 'Mise a jour...' : 'Mettre a jour'}
          onPress={handleChangePassword}
          disabled={pwSubmitting}
        />
      </View>

      <View style={styles.section}>
        <GameButton label="Se deconnecter" onPress={handleLogout} variant="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.parentBg },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.parentBg },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { fontSize: 14, color: COLORS.textSecondary },
  value: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '500' },
  section: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginBottom: 10,
  },
});
