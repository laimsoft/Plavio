import { MaterialIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                  {active ? (
                    <MaskedView
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                      maskElement={
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialIcons name={item.icon} size={24} color="#000" />
                          <Text style={[styles.navLabel, { color: '#000', fontWeight: '700' }]}>
                            {item.label}
                          </Text>
                        </View>
                      }
                    >
                      <LinearGradient
                        colors={['#10B981', '#06B6D4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={{ opacity: 0, alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialIcons name={item.icon} size={24} color="#000" />
                          <Text style={[styles.navLabel, { color: '#000', fontWeight: '700' }]}>
                            {item.label}
                          </Text>
                        </View>
                      </LinearGradient>
                    </MaskedView>
                  ) : (
                    <>
                      <MaterialIcons
                        name={item.icon}
                        size={24}
                        color="#9CA3AF"
                      />
                      <Text style={[styles.navLabel, { color: "#9CA3AF", fontWeight: '500' }]}>
                        {item.label}
                      </Text>
                    </>
                  )}
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
