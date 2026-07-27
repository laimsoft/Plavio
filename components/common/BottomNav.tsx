import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '../../constants/colors';

type NavItem = {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

const navItems: NavItem[] = [
  { key: '/', icon: 'home', label: 'Home' },
  { key: '/tasks', icon: 'checklist', label: 'Tasks' },
  { key: '/accounts', icon: 'account-balance-wallet', label: 'Accounts' },
  { key: '/groceries', icon: 'shopping-cart', label: 'Groceries' },
  { key: '/bills', icon: 'receipt', label: 'Bills' },
];

type BottomNavProps = {
  insetsBottom: number;
};

export default function BottomNav({ insetsBottom }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insetsBottom, 12) }]}>
      {navItems.map((item) => {
        const active = pathname === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.navItem, active && styles.navItemActive]}
            activeOpacity={0.7}
            onPress={() => router.push(item.key as any)}
          >
            <MaterialIcons
              name={item.icon}
              size={22}
              color={active ? colors.onSecondaryContainer : colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.navLabel,
                {
                  color: active ? colors.onSecondaryContainer : colors.onSurfaceVariant,
                  fontWeight: active ? '700' : '500',
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navItemActive: {
    backgroundColor: colors.secondaryContainer,
  },
  navLabel: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 4,
  },
});
