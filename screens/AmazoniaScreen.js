import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Navbar from '../components/NavBar';

export default function AmazoniaScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#e8f5e9' }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bioma Amazônia</Text>
        <Image source={require('../assets/rio amazonas.png')} style={styles.image} />
        <Text style={styles.description}>
          A Amazônia é a maior floresta tropical do mundo, localizada principalmente no Brasil.
          Possui uma das maiores biodiversidades do planeta, com milhões de espécies de plantas,
          animais e insetos. É essencial para o equilíbrio climático global.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#2e7d32',
    textAlign: 'justify',
  },
});
