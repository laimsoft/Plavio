import FocusSection from '@/components/dashboard/FocusSection';
import SummaryGrid from '@/components/dashboard/SummaryGrid';
import GreetingBanner from '@/components/dashboard/GreetingBanner';
import TodaysOverview from '@/components/dashboard/TodaysOverview';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <GreetingBanner />
        <SummaryGrid />
        <TodaysOverview />
        <FocusSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
});