import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavBar from '../components/NavBar';

export default function CaatingaScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={[styles.container, { backgroundColor: '#fbe9e7' }]}> 
        <Image source={require('../assets/caatinga.jpg')} style={styles.image} />
        <Text style={styles.title}>Bioma Caatinga</Text>
        <Text style={styles.description}>
          A Caatinga é um bioma exclusivamente brasileiro, presente no semiárido nordestino. 
          Sua vegetação é adaptada à seca, com plantas espinhosas e caducifólias.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#d84315',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6d4c41',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
});
