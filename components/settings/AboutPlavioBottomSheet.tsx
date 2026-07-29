import { colors } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AboutPlavioBottomSheet({ visible, onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false);
      });
    }
  }, [visible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0], // Slide up from bottom
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(1 - gestureState.dy / 800);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 1,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  if (!showModal) return null;

  return (
    <Modal visible={showModal} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.sheetContainer, { transform: [{ translateY }] }]}>
          <View style={styles.dragHandle} {...panResponder.panHandlers} />
          <View style={styles.header}>
            <Text style={styles.title}>About Plavio</Text>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.dateText}>Version: 1.0.0</Text>

            <Text style={styles.paragraph}>
              Plavio is an all-in-one personal productivity app designed to help you organize your daily life in one place. Whether you're managing tasks, tracking expenses, planning groceries, taking notes, or organizing your finances, Plavio keeps everything simple, organized, and accessible.
            </Text>
            <Text style={styles.paragraph}>
              Built with a privacy-first approach, Plavio stores your data locally on your device using SQLite. Your information stays under your control—no accounts, no cloud storage, and no unnecessary data collection.
            </Text>
            <Text style={styles.paragraph}>
              Our goal is to provide a fast, reliable, and easy-to-use productivity companion that helps you stay organized while respecting your privacy.
            </Text>

            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.listItem}>✅ Task Management</Text>
            <Text style={styles.listItem}>✅ Expense & Income Tracking</Text>
            <Text style={styles.listItem}>✅ Budget Management</Text>
            <Text style={styles.listItem}>✅ Grocery Lists</Text>
            <Text style={styles.listItem}>✅ Notes & Journal</Text>
            <Text style={styles.listItem}>✅ Custom Categories</Text>
            <Text style={styles.listItem}>✅ Currency & Region Settings</Text>
            <Text style={styles.listItem}>✅ Offline First</Text>
            <Text style={styles.listItem}>✅ Local SQLite Storage</Text>
            <Text style={styles.listItem}>✅ No Login Required</Text>
            <Text style={styles.listItem}>✅ Privacy Focused</Text>

            <Text style={styles.sectionTitle}>Developed By</Text>
            <Text style={styles.boldText}>Laimsoft</Text>

            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.paragraph}>Email: laimsoftofficial@gmail.com</Text>
            <Text style={styles.paragraph}>Phone: +92 336 9322038</Text>
            <Text style={styles.paragraph}>Website: https://laimsoft.site</Text>

            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.paragraph}>
              To build simple, reliable, and privacy-focused applications that help people stay productive every day while keeping their personal data secure and under their control.
            </Text>

            <Text style={styles.sectionTitle}>Thank You</Text>
            <Text style={styles.paragraph}>
              Thank you for choosing Plavio. Your support inspires us to continue improving the app with new features, performance enhancements, and an even better user experience.
            </Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.outlineVariant,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceVariant,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  dateText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.onSurface,
    marginBottom: 12,
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.onSurface,
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceVariant,
  },
  closeButton: {
    backgroundColor: colors.surfaceVariant,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
});
