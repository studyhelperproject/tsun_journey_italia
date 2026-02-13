import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Menu } from 'lucide-react-native';
import { COLORS, BORDERS } from '../../constants/theme';

interface HeaderBarProps {
  stageName: string;
  onMenuPress: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ stageName, onMenuPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.stagePill}>
          <View style={styles.indicator} />
          <Text style={styles.stageText}>{stageName}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} activeOpacity={0.7}>
          <Menu color={COLORS.inkBlack} size={28} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.inkBlack,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  stagePill: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    ...BORDERS.lineArt,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.pastelGreen,
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
    marginRight: 8,
  },
  stageText: {
    fontWeight: '900',
    fontSize: 18,
    color: COLORS.inkBlack,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    ...BORDERS.lineArt,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
