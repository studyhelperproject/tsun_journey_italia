import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS, BORDERS } from '../../constants/theme';

interface ItemSlotProps {
  imageUrl?: string;
}

export const ItemSlot: React.FC<ItemSlotProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow} />
      <View style={[
        styles.slot,
        imageUrl ? styles.filledSlot : styles.emptySlot
      ]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: COLORS.inkBlack,
    borderRadius: 12,
  },
  slot: {
    width: 60,
    height: 60,
    ...BORDERS.lineArt,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  filledSlot: {
    backgroundColor: COLORS.pastelYellow,
  },
  emptySlot: {
    borderStyle: 'dashed',
    borderColor: '#CCC',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  placeholder: {
    // Empty slot content
  },
});
