// components/ProductList.tsx
import React from 'react';
import { FlatList, Text, StyleSheet, TextInput, View } from 'react-native';
import ProductItem from './ProductItem';

interface Product {
  id: number;
  name: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onDeleteProduct: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, searchQuery, setSearchQuery, onDeleteProduct }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredProducts.length === 0 ? (
        <Text style={styles.noProductText}>No Product Found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} onDelete={() => onDeleteProduct(item.id)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  noProductText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});

export default ProductList;
