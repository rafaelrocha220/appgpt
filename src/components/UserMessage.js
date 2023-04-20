import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserMessage = ({ message }) => {
   return (
      <View style={styles.container}>
         <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
         </View>
         <Ionicons name="person" size={30} color="#523874" style={styles.icon} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'flex-end', // adicionado
   },
   messageContainer: {
      backgroundColor: '#A020F0',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      maxWidth: '80%',
      marginRight: 10, // modificado para marginRight
      alignItems: 'center',
   },
   message: {
      color: 'white',
      fontSize: 16,
   },
});

export default UserMessage;
