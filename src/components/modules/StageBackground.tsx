import React from 'react';
import { View, StyleSheet, ImageBackground, ViewStyle } from 'react-native';
import { COLORS, BORDERS, SPACING } from '../../constants/theme';

interface StageBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: any;
  style?: ViewStyle;
}

export const StageBackground: React.FC<StageBackgroundProps> = ({ children, backgroundImage, style }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.shadow} />
      <View style={styles.mainArea}>
        {backgroundImage ? (
          <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={[styles.innerContainer, style]}>
              {children}
            </View>
          </ImageBackground>
        ) : (
          <View style={[styles.background, { backgroundColor: 'white' }]}>
             <View style={[styles.innerContainer, style]}>
              {children}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 6,
    left: 4,
    right: -4,
    bottom: -6,
    backgroundColor: COLORS.inkBlack,
    borderRadius: 24,
  },
  mainArea: {
    flex: 1,
    ...BORDERS.lineArt,
    borderRadius: 24,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  background: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: SPACING.md,
  },
});
