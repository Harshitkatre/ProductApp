// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ProductList from '../components/ProductList';

const HomeScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (name: string, price: string, image: string) => {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the stored token
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
       
      <Button title="Logout" onPress={handleLogout}  />
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      
      <ProductList
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onDeleteProduct={handleDeleteProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btn : {
    padding:10,
  },
});

export default HomeScreen;
