import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Card({ card, isFlipped, onPress, backImage }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={isFlipped ? card.image : backImage} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 360,
    margin: '2%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#2e7d32',
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
