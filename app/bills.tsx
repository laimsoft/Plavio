import { StyleSheet, Text, View } from 'react-native';

export default function BillsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bills</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
