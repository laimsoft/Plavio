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

export default function PrivacyPolicyBottomSheet({ visible, onClose }: Props) {
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
            <Text style={styles.title}>Privacy Policy</Text>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >


            <Text style={styles.paragraph}>
              Welcome to Plavio, developed by Laimsoft.
            </Text>
            <Text style={styles.paragraph}>
              Plavio is a privacy-first productivity application designed to help you organize your daily life while keeping your information completely under your control. Unlike many productivity apps, Plavio does not require an account, does not use cloud storage, and does not collect your personal data.
            </Text>
            <Text style={styles.paragraph}>
              This Privacy Policy explains how Plavio handles your information when you use the application.
            </Text>

            <Text style={styles.sectionTitle}>1. Our Privacy Commitment</Text>
            <Text style={styles.paragraph}>Your privacy is important to us.</Text>
            <Text style={styles.paragraph}>Plavio is designed around a simple principle:</Text>
            <Text style={styles.boldText}>Your data stays on your device.</Text>
            <Text style={styles.paragraph}>We do not operate servers that store your personal information, and we cannot access the content you create inside the app.</Text>

            <Text style={styles.sectionTitle}>2. Information Stored on Your Device</Text>
            <Text style={styles.paragraph}>Plavio stores your data locally using a SQLite database on your device.</Text>
            <Text style={styles.paragraph}>Depending on the features you use, this may include:</Text>
            <Text style={styles.listItem}>• Tasks</Text>
            <Text style={styles.listItem}>• Grocery Lists & Items</Text>
            <Text style={styles.listItem}>• Accounts, Expenses, Income, Budgets</Text>
            <Text style={styles.listItem}>• Categories, Notes, Journal Entries</Text>
            <Text style={styles.listItem}>• Habits, Goals</Text>
            <Text style={styles.listItem}>• Calendar Events & Reminders</Text>
            <Text style={styles.listItem}>• Application Settings (Currency, Region, Language, Theme, Date/Time Formats)</Text>
            <Text style={styles.paragraph}>This information remains on your device and is never transmitted to us.</Text>

            <Text style={styles.sectionTitle}>3. Information We Do Not Collect</Text>
            <Text style={styles.paragraph}>Plavio does not collect, store, or process any of the following:</Text>
            <Text style={styles.listItem}>• Name, Email address, Phone number</Text>
            <Text style={styles.listItem}>• Passwords, User accounts</Text>
            <Text style={styles.listItem}>• Payment or Bank account information</Text>
            <Text style={styles.listItem}>• Government-issued identification</Text>
            <Text style={styles.listItem}>• GPS location, Contacts</Text>
            <Text style={styles.listItem}>• Calendar data outside the app</Text>
            <Text style={styles.listItem}>• IP address for analytics</Text>
            <Text style={styles.listItem}>• Advertising identifiers</Text>
            <Text style={styles.listItem}>• User-generated content</Text>
            <Text style={styles.paragraph}>Since Plavio operates entirely offline, we have no technical ability to access your information.</Text>

            <Text style={styles.sectionTitle}>4. Notifications</Text>
            <Text style={styles.paragraph}>If you choose to use reminders, Plavio may request permission to send local notifications.</Text>
            <Text style={styles.paragraph}>Notifications are used only to remind you about Tasks, Habits, Groceries, Events, Bills, and other reminders you create.</Text>
            <Text style={styles.paragraph}>These notifications are scheduled and delivered by your device's operating system. No notification data is sent to Laimsoft.</Text>

            <Text style={styles.sectionTitle}>5. Data Security</Text>
            <Text style={styles.paragraph}>Your information is stored within your device's secure application storage.</Text>
            <Text style={styles.paragraph}>Plavio uses your operating system's built-in security features to protect your local database. Because your data never leaves your device, there is no central server containing your personal information.</Text>

            <Text style={styles.sectionTitle}>6. Data Retention</Text>
            <Text style={styles.paragraph}>Your information remains stored on your device until you delete it. You may delete any data within the app at any time.</Text>
            <Text style={styles.paragraph}>If you uninstall Plavio, all locally stored application data will be permanently removed from your device.</Text>

            <Text style={styles.sectionTitle}>7. Data Sharing</Text>
            <Text style={styles.paragraph}>Plavio does not:</Text>
            <Text style={styles.listItem}>• Sell or Rent your personal information</Text>
            <Text style={styles.listItem}>• Share your information with advertisers or third parties</Text>
            <Text style={styles.listItem}>• Upload your information to cloud servers</Text>
            <Text style={styles.paragraph}>Your information remains entirely under your control.</Text>

            <Text style={styles.sectionTitle}>8. Analytics and Tracking</Text>
            <Text style={styles.paragraph}>Plavio does not use Analytics services, Advertising SDKs, Tracking technologies, User profiling, or Cross-app tracking. We do not monitor how you use the app.</Text>

            <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
            <Text style={styles.paragraph}>Plavio is intended for general audiences and is not specifically directed toward children under the age of 13. Because Plavio does not collect personal information, it does not knowingly collect information from children.</Text>

            <Text style={styles.sectionTitle}>10. International Users</Text>
            <Text style={styles.paragraph}>Since Plavio stores all information locally on your device and does not transmit personal data to our servers, your information is generally not transferred internationally by us.</Text>

            <Text style={styles.sectionTitle}>11. Changes to This Privacy Policy</Text>
            <Text style={styles.paragraph}>We may update this Privacy Policy from time to time to reflect new features or legal requirements. When changes are made, the Last Updated date at the top of this policy will be revised.</Text>

            <Text style={styles.sectionTitle}>12. Contact Us</Text>
            <Text style={styles.paragraph}>If you have any questions regarding this Privacy Policy or Plavio, please contact us:</Text>
            <Text style={styles.boldText}>Laimsoft</Text>
            <Text style={styles.paragraph}>Email: laimsoftofficial@gmail.com</Text>
            <Text style={styles.paragraph}>Phone: +92 336 9322038</Text>
            <Text style={styles.paragraph}>Website: https://laimsoft.site</Text>
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
    marginBottom: 4,
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
    paddingLeft: 8,
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
