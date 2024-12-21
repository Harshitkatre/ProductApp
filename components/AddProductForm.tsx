// components/AddProductForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

interface AddProductFormProps {
  onAddProduct: (name: string, price: string, image: string) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = () => {
    if (!name || !price) {
      setErrorMessage('Name and price are required');
      return;
    }

    // Generate a unique ID for each product
    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
    };

    onAddProduct(newProduct.name, newProduct.price, newProduct.image);
    setName('');
    setPrice('');
    setImage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddProductForm;
