import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const biomas = [
  { id: 1, name: '', position: { top: 0.20, left: 0.4 }},
  { id: 2, name: '', position: { top: 0.52, left: 0.48 }},
  { id: 3, name: '', position: { top: 0.35, left: 0.58 },},
  { id: 4, name: '', position: { top: 0.62, left: 0.55 },},
];

const personagem = require('../assets/personagem.png');

export default function MapaBiomas() {
  const navigation = useNavigation();
  const [faseAtual, setFaseAtual] = useState(1);
  const [jogoConcluido, setJogoConcluido] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (jogoConcluido) {
      if (faseAtual < biomas.length) {
        Alert.alert('Parabéns!', `Você completou a fase ${faseAtual}! Avançando para a próxima.`);
        setFaseAtual(faseAtual + 1);
      } else {
        Alert.alert('Parabéns!', 'Você completou todas as fases!');
        setFaseAtual(1);
      }
      setJogoConcluido(false);
    }
  }, [jogoConcluido]);

  const iniciarJogo = () => {
    navigation.navigate('GameScreen', {
      fase: faseAtual,
      onGameComplete: () => setJogoConcluido(true),
    });
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={styles.title}>Mapa dos Biomas - Fase {faseAtual}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={styles.mapWrapper}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setMapDimensions({ width, height });
          }}
        >
          <Image
            source={require('../assets/mapaBioma1.jpg')}
            style={styles.mapImage}
            resizeMode="contain"
          />

          {mapDimensions.width > 0 && biomas.map((bioma) => (
            <View
              key={bioma.id}
              style={[
                styles.marker,
                {
                  top: mapDimensions.height * bioma.position.top,
                  left: mapDimensions.width * bioma.position.left,
                },
                faseAtual === bioma.id && styles.markerAtiva,
              ]}
            >
              {bioma.image && <Image source={bioma.image} style={styles.biomaImage} />}
              <Text style={styles.biomaLabel}>{bioma.name}</Text>
            </View>
          ))}

          {mapDimensions.width > 0 && (
            <Image
              source={personagem}
              style={[
                styles.personagem,
                {
                  top: mapDimensions.height * biomas[faseAtual - 1].position.top - 30,
                  left: mapDimensions.width * biomas[faseAtual - 1].position.left - 20,
                },
              ]}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={iniciarJogo}>
          <Text style={styles.buttonText}>
            {faseAtual === 1 ? 'Iniciar Jogo' : `Jogar Fase ${faseAtual}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e8f5e9', 
    paddingTop: 10 
  },
  scrollContent: { 
    alignItems: 'center', 
    paddingBottom: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2e7d32', 
    marginBottom: 12, 
    textAlign: 'center' 
  },
  mapWrapper: { 
    width: screenWidth * 0.8,  // 80% da largura
    height: screenWidth * 0.5 * 0.6,  // proporção ajustada
    position: 'relative',
    marginBottom: 20,
  },
  mapImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 15,
  },
  marker: { 
    position: 'absolute', 
    alignItems: 'center', 
    width: 60, 
    padding: 4 
  },
  markerAtiva: { 
    borderColor: '#2e7d32', 
    borderWidth: 3, 
    borderRadius: 10, 
    backgroundColor: '#a5d6a7' 
  },
  biomaImage: { 
    width: 30, 
    height: 30, 
    borderRadius: 10 
  },
  biomaLabel: { 
    color: '#1b5e20', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 4, 
    fontSize: 12 
  },
  personagem: { 
    position: 'absolute', 
    width: 40, 
    height: 30,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    minWidth: 220,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18, 
    textAlign: 'center' 
  },
});
