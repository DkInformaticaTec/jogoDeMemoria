import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavBar from '../components/NavBar';

export default function MataAtlanticaScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={[styles.container, { backgroundColor: '#e0f2f1' }]}> 
        <Image source={require('../assets/mata-atlantica.png')} style={styles.image} />
        <Text style={styles.title}>Bioma Mata Atlântica</Text>
        <Text style={styles.description}>
          A Mata Atlântica é um bioma costeiro com alta biodiversidade. 
          Foi intensamente devastada com a urbanização, restando hoje apenas fragmentos preservados.
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
    color: '#00695c',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#004d40',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
});
