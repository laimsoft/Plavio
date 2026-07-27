import BottomNav from '@/components/common/BottomNav';
import FAB from '@/components/dashboard/FAB';
import FocusSection from '@/components/dashboard/FocusSection';
import Header from '@/components/dashboard/Header';
import SearchBar from '@/components/dashboard/SearchBar';
import SummaryGrid from '@/components/dashboard/SummaryGrid';
import { colors } from '@/constants/colors';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <Header insetsTop={insets.top} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar />
        <SummaryGrid />
        <FocusSection />

        {/* Spacer for FAB / bottom nav */}
        <View style={{ height: 96 }} />
      </ScrollView>

      <FAB insetsBottom={insets.bottom} />
      <BottomNav insetsBottom={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 24,
  },
});