import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import HamburgerMenu from './HamburgerMenu';

type HeaderProps = {
  insetsTop: number;
};

export default function Header({ insetsTop }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const willOpen = !isMenuOpen;
    setIsMenuOpen(willOpen);

    Animated.spring(animation, {
      toValue: willOpen ? 1 : 0,
      friction: 9,
      tension: 40,
      useNativeDriver: false, // Animating layout properties
    }).start();
  };

  const headerMaxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 800], // 60 when closed, 800 when open
  });
  const headerPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 16],
  });
  const headerRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 28],
  });
  const headerColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#F3F4F6'],
  });
  const contentOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });
  const contentTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={[StyleSheet.absoluteFill, { zIndex: 55, elevation: 55 }]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.headerSafeArea,
          { paddingTop: insetsTop || 0 },
          isMenuOpen && { zIndex: 60, elevation: 60 }
        ]}
        pointerEvents="box-none"
      >
        <SafeAreaView pointerEvents="box-none">
          <View style={styles.headerWrapper} pointerEvents="box-none">
            <Animated.View style={[
              styles.header,
              {
                maxHeight: headerMaxHeight,
                padding: headerPadding,
                borderRadius: headerRadius,
                backgroundColor: headerColor,
              }
            ]}>
              <View style={styles.headerTopRow}>
                <View style={styles.logoRow}>
                  <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
                </View>
                <TouchableOpacity
                  style={styles.menuButton}
                  activeOpacity={0.7}
                  onPress={toggleMenu}
                >
                  {isMenuOpen ? (
                    <MaterialIcons name="close" size={22} color="#1F2937" />
                  ) : (
                    <>
                      <View style={styles.menuLine} />
                      <View style={styles.menuLine} />
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <Animated.View style={[
                styles.menuContainer,
                { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] }
              ]} pointerEvents={isMenuOpen ? "auto" : "none"}>
                <HamburgerMenu onClose={toggleMenu} />
              </Animated.View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 103,
    height: 32,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#fff',
  },
  menuLine: {
    width: 24,
    height: 2,
    backgroundColor: '#1F2937',
  },
  menuContainer: {
    marginTop: 16,
  },
});
