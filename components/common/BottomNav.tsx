import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

type NavItem = {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

const navItems: NavItem[] = [
  { key: 'home', icon: 'home', label: 'Home' },
  { key: 'tasks', icon: 'checklist', label: 'Tasks' },
  { key: 'expenses', icon: 'payments', label: 'Expenses' },
  { key: 'settings', icon: 'settings', label: 'Settings' },
  { key: 'more', icon: 'more-horiz', label: 'More' },
];

type BottomNavProps = {
  insetsBottom: number;
};

export default function BottomNav({ insetsBottom }: BottomNavProps) {
  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insetsBottom, 12) }]}>
      {navItems.map((item) => {
        const active = item.key === 'home';
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.navItem, active && styles.navItemActive]}
            activeOpacity={0.7}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navItemActive: {
    backgroundColor: colors.secondaryContainer,
  },
  navLabel: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
