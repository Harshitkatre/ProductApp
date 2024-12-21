// screens/AddProductScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddProductForm from '../components/AddProductForm';

const AddProductScreen = ({ navigation }: any) => {
  const handleAddProduct = (name: string, price: string, image: string) => {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
    };

    // Retrieve existing products and add the new one
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));

    // Navigate back to HomeScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AddProductForm onAddProduct={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddProductScreen;
