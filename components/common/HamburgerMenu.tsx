import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onClose: () => void;
};

export default function HamburgerMenu({ onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    if (pathname !== route) {
      router.push(route as any);
    }
    onClose();
  };

  const menuItems = [
    { label: 'Home', route: '/' },
    { label: 'Tasks', route: '/tasks' },
    { label: 'Accounts', route: '/accounts' },
    { label: 'Groceries', route: '/groceries' },
    { label: 'Bills', route: '/bills' },
    { label: 'Settings', route: '/settings' },
  ];

  return (
    <View style={styles.innerCard}>
      {menuItems.map((item) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, isActive && styles.menuItemActive]}
            onPress={() => handleNavigate(item.route)}
          >
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.menuItem} onPress={() => { alert('Thank you for your rating!'); onClose(); }}>
        <Text style={styles.menuItemText}>Rate Us</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  innerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 2,
  },
  menuItemActive: {
    backgroundColor: '#F3F4F6',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  generateButton: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  langButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'uppercase',
  },
});
