import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { Play } from 'lucide-react-native';
import { COLORS, BORDERS } from '../../constants/theme';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.shadow} />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Text style={styles.text}>{title}</Text>
        <Play color="white" fill="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 64,
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    top: 6,
    left: 4,
    right: -4,
    bottom: -6,
    backgroundColor: COLORS.inkBlack,
    borderRadius: 16,
  },
  button: {
    backgroundColor: COLORS.primaryOrange,
    ...BORDERS.lineArt,
    borderRadius: 16,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    marginRight: 8,
  },
});
