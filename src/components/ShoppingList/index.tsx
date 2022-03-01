import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import firestore from '@react-native-firebase/firestore'

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // useEffect(() => {
  //   firestore()
  //   .collection('products')
  //   .get()
  //   .then(response => {
  //     const data = response.docs.map(doc => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       }
  //     }) as ProductProps[]

  //     setProducts(data)
  //   })
  //   .catch(err => console.log(err))
  // }, [])


  useEffect(() => { //real time
    const subscribe = firestore()
    .collection('products')
    // .where('quantity', '==', '1')
    // .limit(3)
    // .orderBy('description', 'asc')
    // .orderBy('quantity').startAt(2).endAt(5) or startAfter endBefore
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[]

      setProducts(data)
    })
    return () => subscribe()
  }, [])

  // useEffect(() => { // unico doc
  //   firestore().collection('products').doc('id').get().then(response => console.log(response.data()))
  // }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
