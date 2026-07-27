import { StyleSheet, Text, View } from 'react-native';

export default function GroceriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Groceries</Text>
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
