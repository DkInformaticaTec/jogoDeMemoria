import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useNavigation, useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const biomas = [
  { id: 1, name: 'Mata Atlântica', image: require('../assets/mata-atlantica.png') },
  { id: 2, name: 'Cerrado', image: require('../assets/guarana.png') },
  { id: 3, name: 'Caatinga', image: require('../assets/caatinga.jpg') },
  { id: 4, name: 'Amazônia', image: require('../assets/boto.png') },
];

const cardBackImage = require('../assets/folha.jpeg');

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[currentIndex]] = [array[currentIndex], array[currentIndex]];
  }
  return array;
}

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fase, onGameComplete } = route.params;

  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [faseFinalizada, setFaseFinalizada] = useState(false);

  useEffect(() => {
    const biomaAtual = biomas.find((b) => b.id === fase);
    if (biomaAtual) {
      const duplicatedCards = Array(6).fill(biomaAtual); // 6 pares = 12 cartas
      const shuffledCards = shuffle(
        duplicatedCards.map((card, index) => ({ ...card, key: index }))
      );
      setCards(shuffledCards);
      setStartTime(Date.now());
      setMatched([]);
      setSelected([]);
      setElapsedTime(0);
      setGameOver(false);
      setFaseFinalizada(false);
    }
  }, [fase]);

  useEffect(() => {
    let timer;
    if (startTime && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, gameOver]);

  useEffect(() => {
    if (matched.length === 6 && !faseFinalizada) {
      setFaseFinalizada(true);
      setGameOver(true);
      setTimeout(() => {
        Alert.alert('Parabéns!', `Você completou a fase em ${elapsedTime} segundos!`);
      }, 500);
    }
  }, [matched, gameOver, elapsedTime, faseFinalizada]);

  const handleCardPress = (index) => {
    if (
      selected.length === 2 ||
      selected.includes(index) ||
      matched.includes(cards[index].key) ||
      gameOver
    ) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first].key === cards[second].key) return;

      if (cards[first].id === cards[second].id) {
        setMatched((prevMatched) => [...prevMatched, cards[first].key, cards[second].key]);
        setTimeout(() => setSelected([]), 800);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const cardWidth = 120;
  const cardHeight = 240;
  const spacing = 10;

  const biomaName = biomas.find((b) => b.id === fase)?.name || 'Fase';

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>Jogo da Memória - {biomaName}</Text>
        <Text style={styles.timer}>Tempo: {elapsedTime}s</Text>
        <ScrollView contentContainerStyle={styles.board}>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              isFlipped={selected.includes(index) || matched.includes(card.key)}
              onPress={() => handleCardPress(index)}
              backImage={cardBackImage}
              style={{
                width: cardWidth,
                height: cardHeight,
                margin: spacing / 2,
              }}
            />
          ))}
        </ScrollView>
        {faseFinalizada && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (onGameComplete) onGameComplete();
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Avançar para o Mapa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e7d32',
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
