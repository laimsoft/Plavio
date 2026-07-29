import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

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
    <SafeAreaView style={styles.navSafeArea} pointerEvents="box-none">
      <View style={[styles.navWrapper, { paddingBottom: Math.max(insetsBottom, 24) }]} pointerEvents="box-none">
        <View style={styles.nav}>
          <View style={styles.navBottomRow}>
            {navItems.map((item) => {
              const active = pathname === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={styles.navButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!active) {
                      router.push(item.key as any);
                    }
                  }}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={active ? "#60A5FA" : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.navLabel,
                      {
                        color: active ? "#60A5FA" : "#9CA3AF",
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  navWrapper: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    borderRadius: 40,
    width: '100%',
  },
  navBottomRow: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});
