// screens/HomeScreen.js
import React, { useMemo, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
// Ícone (pode ser expo/vector-icons ou imagem sua)
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [showPanel, setShowPanel] = useState(false);

  const biomas = [
    {
      key: 'Amazonia',
      title: '🌳 Amazônia',
      description: 'A maior floresta tropical do mundo, cheia de plantas e animais incríveis!',
      image: require('../assets/rio amazonas.png'),
      route: 'Amazonia',
    },
    {
      key: 'Cerrado',
      title: '🌾 Cerrado',
      description: 'Com árvores retorcidas e um clima seco, é um dos biomas mais antigos do planeta.',
      image: require('../assets/cerrado.png'),
      route: 'Cerrado',
    },
    {
      key: 'Caatinga',
      title: '🌵 Caatinga',
      description: 'Bioma que só tem no Brasil, com plantas adaptadas à seca do nordeste.',
      image: require('../assets/caatinga.jpg'),
      route: 'Caatinga',
    },
    {
      key: 'MataAtlantica',
      title: '🌴 Mata Atlântica',
      description: 'Bioma costeiro rico em espécies, mas que precisa de nossa proteção.',
      image: require('../assets/mata-atlantica.png'),
      route: 'MataAtlantica',
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        content: {
          padding: 20,
          paddingLeft: 100,
          backgroundColor: theme.colors.background,
        },
        heading: {
          fontSize: theme.scale(26),
          fontFamily: theme.fontFamily,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
          color: theme.colors.text,
        },
        biomaCard: {
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          padding: 15,
          marginBottom: 8,
          alignItems: 'center',
          borderWidth: 4,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.1,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 3 },
          elevation: 5,
        },
        image: {
          width: 110,
          height: 110,
          borderRadius: 14,
          marginRight: 16,
        },
        textContainer: {
          flex: 1,
        },
        title: {
          fontSize: theme.scale(22),
          fontFamily: theme.fontFamily,
          fontWeight: '700',
          marginBottom: 6,
        },
        description: {
          fontSize: theme.scale(15),
          fontFamily: theme.fontFamily,
          color: theme.colors.muted,
          lineHeight: theme.scale(22),
        },
        section: {
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          padding: 20,
          marginTop: 30,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        },
        sectionTitle: {
          fontSize: theme.scale(20),
          fontFamily: theme.fontFamily,
          fontWeight: '700',
          marginBottom: 20,
          color: theme.colors.text,
        },
        sectionText: {
          fontSize: theme.scale(16),
          fontFamily: theme.fontFamily,
          color: theme.colors.bodyText,
          lineHeight: theme.scale(24),
        },
        footer: {
          marginTop: 40,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: theme.colors.divider,
        },
        footerText: {
          fontSize: theme.scale(14),
          fontFamily: theme.fontFamily,
          color: theme.colors.muted,
          textAlign: 'center',
        },
        fab: {
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          🌱 Vamos aprender sobre os Biomas Brasileiros!
        </Text>

        {biomas.map((bioma) => {
          const color = theme.getBiomaColor(bioma.key);
          return (
            <TouchableOpacity
              key={bioma.key}
              style={[styles.biomaCard, { borderColor: color }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(bioma.route)}
              accessibilityRole="button"
              accessibilityHint={`Abrir informações do bioma ${bioma.title.replace(
                /^[^\s]+\s/,
                ''
              )}`}
            >
              <Image
                source={bioma.image}
                style={styles.image}
                accessibilityIgnoresInvertColors
                accessibilityLabel={`Imagem representando o bioma ${bioma.title}`}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color }]}>{bioma.title}</Text>
                <Text style={styles.description}>{bioma.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Por que é importante cuidar dos biomas?
          </Text>
          <Text style={styles.sectionText}>
            Os biomas são casas para muitos animais e plantas. Se cuidarmos
            deles, teremos um planeta saudável para nós e para as próximas
            gerações!
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Projeto Memória Ambiental - Educando com diversão
          </Text>
        </View>
      </ScrollView>

      {/* FAB de acessibilidade */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowPanel(true)}
        accessibilityRole="button"
        accessibilityLabel="Abrir configurações de acessibilidade"
      >
        <Image
          source={require('../assets/acessibilidade.jpg')}
          style={{width:28,height:28}}
          resizeMode='contain'
        />
      </TouchableOpacity>

      <AccessibilityPanel
        visible={showPanel}
        onClose={() => setShowPanel(false)}
      />
    </View>
  );
}
