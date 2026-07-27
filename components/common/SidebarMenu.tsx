import { MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

type SidebarMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SidebarMenu({ visible, onClose }: SidebarMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 0.8,
          stiffness: 100,
          overshootClamping: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: SIDEBAR_WIDTH,
          useNativeDriver: true,
          damping: 25,
          mass: 0.8,
          stiffness: 120,
          overshootClamping: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  const menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Tasks', icon: 'checklist', route: '/tasks' },
    { label: 'Accounts', icon: 'account-balance-wallet', route: '/accounts' },
    { label: 'Groceries', icon: 'shopping-cart', route: '/groceries' },
    { label: 'Bills', icon: 'receipt', route: '/bills' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Rate us', icon: 'star-outline', action: () => alert('Thank you for your rating!') },
  ];

  const handleNavigate = (item: any) => {
    onClose();
    setTimeout(() => {
      if (item.action) {
        item.action();
      } else if (item.route) {
        if (pathname !== item.route) {
          router.push(item.route);
        }
      }
    }, 300); // Wait for close animation to finish
  };

  return (
    <Modal visible={showModal} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.sidebar,
            { paddingTop: insets.top, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.logoText}>Plavio</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={24} color={colors.onSurface} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.route;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => handleNavigate(item)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color={isActive ? colors.onPrimary : colors.onSurfaceVariant}
                  />
                  <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.surfaceContainerLowest,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceVariant,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  closeBtn: {
    padding: 4,
  },
  menuItems: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 16,
  },
  menuItemActive: {
    backgroundColor: colors.primaryContainer,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  menuItemTextActive: {
    color: colors.onPrimary,
    fontWeight: '600',
  },
});
