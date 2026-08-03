import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function GreetingBanner() {
  return (
    <LinearGradient
      colors={['#ffffff', '#f0f9ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.headline}>Stay consistent,</Text>
        <Text style={[styles.headline, styles.headlineTeal]}>achieve more.</Text>
        
        <View style={styles.pillContainer}>
          <Text style={styles.pillText}>You're doing great today! ✨</Text>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <MaterialIcons name="auto-awesome" size={72} color="#14b8a6" style={{ opacity: 0.2 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    backgroundColor: '#ffffff', // Fallback
  },
  textContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 28,
  },
  headlineTeal: {
    color: '#14b8a6',
    marginBottom: 16,
  },
  pillContainer: {
    backgroundColor: '#ccfbf1',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  pillText: {
    color: '#14b8a6',
    fontSize: 12,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
});
