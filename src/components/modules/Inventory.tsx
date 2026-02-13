import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ItemSlot } from '../atomics/ItemSlot';
import { COLORS, BORDERS, SPACING } from '../../constants/theme';

interface InventoryProps {
  items: (string | undefined)[];
}

export const Inventory: React.FC<InventoryProps> = ({ items }) => {
  // Ensure we always show 5 slots
  const displayItems = [...items, ...Array(Math.max(0, 5 - items.length)).fill(undefined)].slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.shadow} />
      <View style={styles.card}>
        <View style={styles.slotRow}>
          {displayItems.map((item, index) => (
            <ItemSlot key={index} imageUrl={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  shadow: {
    position: 'absolute',
    top: 6,
    left: 4,
    right: -4,
    bottom: -6,
    backgroundColor: COLORS.inkBlack,
    borderRadius: 20,
  },
  card: {
    backgroundColor: 'white',
    ...BORDERS.lineArt,
    borderRadius: 20,
    padding: SPACING.md,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
