import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavBar from '../components/NavBar';

export default function CerradoScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={[styles.container, { backgroundColor: '#fff3e0' }]}> 
        <Image source={require('../assets/cerrado.png')} style={styles.image} />
        <Text style={styles.title}>Bioma Cerrado</Text>
        <Text style={styles.description}>
          O Cerrado é a savana brasileira, conhecido pelas árvores tortas e solos ácidos. 
          Possui uma rica biodiversidade e é um dos biomas mais antigos do planeta.
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
    color: '#e65100',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#bf360c',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
});
