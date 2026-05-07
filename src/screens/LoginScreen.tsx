import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GameButton from '../components/GameButton';
import { COLORS } from '../constants/colors';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplissez tous les champs');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit faire au moins 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      Alert.alert('Erreur', err.message ?? 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🏠</Text>
        <Text style={styles.headerTitle}>Tache Famille</Text>
        <Text style={styles.headerSubtitle}>L'aventure des taches commence ici !</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formWrapper}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{isRegister ? 'Creer un compte' : 'Connexion'}</Text>

          <TextInput
            style={styles.input}
            placeholder="📧  Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="🔒  Mot de passe"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.coral} style={{ marginTop: 12 }} />
          ) : (
            <GameButton
              label={isRegister ? "Creer mon compte 🚀" : "C'est parti ! 🚀"}
              variant="primary"
              onPress={handleSubmit}
              style={{ marginTop: 12 }}
            />
          )}

          <Text
            style={styles.link}
            onPress={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Deja un compte ? Se connecter' : 'Pas de compte ? Creer un compte'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: COLORS.turquoise },
  header: {
    paddingTop: 80,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: COLORS.turquoise,
  },
  headerEmoji: { fontSize: 48, marginBottom: 8 },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  formWrapper: { flex: 1, backgroundColor: COLORS.cream, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -10 },
  formCard: { padding: 24, paddingTop: 32, alignItems: 'center' },
  formTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    color: COLORS.textPrimary,
  },
  link: { marginTop: 16, color: COLORS.turquoise, fontSize: 14, fontWeight: '600' },
});
