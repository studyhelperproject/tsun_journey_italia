import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { HeaderBar } from '../atomics/HeaderBar';
import { ActionButton } from '../atomics/ActionButton';
import { StageBackground } from '../modules/StageBackground';
import { Inventory } from '../modules/Inventory';
import { COLORS } from '../../constants/theme';

export const StageScreen: React.FC = () => {
  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleStartPress = () => {
    console.log('Start pressed');
  };

  // Mock items: empty for most, one for demonstration
  const items = [
    'https://raw.githubusercontent.com/lucide-react/lucide/main/icons/pizza.svg', // Placeholder URI
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderBar stageName="ステージ 1" onMenuPress={handleMenuPress} />

      <StageBackground>
        {/* Game content would go here */}
        <View style={styles.gameArea}>
           <ActionButton
            title="スタート"
            onPress={handleStartPress}
            style={styles.startButton}
           />
        </View>
      </StageBackground>

      <Inventory items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    width: '80%',
    maxWidth: 240,
  },
});
