import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Message = ({ message }) => {

   return (
      <View style={styles.container}>
         <MaterialCommunityIcons name="robot" size={35} color="#523874" />
         <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
         </View>
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
   },
   messageContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      maxWidth: '80%',
      marginLeft: 10,
   },
   message: {
      fontSize: 16,
      color: '#333',
   },
   typingContainer: {
      backgroundColor: '#e0e0e0',
      maxWidth: '50%',
      alignItems: 'flex-start',
      justifyContent: 'center',
   },
   typingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   typingDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#333',
      marginHorizontal: 2,
      marginVertical: 5,
      opacity: 0.4,
   },
});

export default Message;
