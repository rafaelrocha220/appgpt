import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkUserCredentials } from '../services/database';

export default function LoginScreen() {
   const navigation = useNavigation();
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      const checkLogin = await checkUserCredentials(name, password)
      if (checkLogin) {
         navigation.navigate('Chat')
      } else {
         alert('Opss! Login incorreto.')
      }
   }

   const handleRegister = () => {
      navigation.navigate('Register')
   }

   return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={0}>
         <View style={styles.header}>
            <Text style={styles.headerText}>ChatGPT API</Text>
            <Text style={styles.subText}>Mobile version.</Text>
         </View>
         <View style={styles.form} >
            <TextInput style={styles.inputUserName} placeholder='Login'
               autoCompleteType='username' autoCapitalize='none'
               placeholderTextColor='#000' autoCorrect={false}
               onChangeText={(event) => setName(event)}
            />
            <TextInput style={styles.inputForm} placeholder='Senha'
               autoCompleteType='password' autoCapitalize='none'
               placeholderTextColor='#000' secureTextEntry={true} autoCorrect={false}
               onChangeText={(event) => setPassword(event)}
            />
            <TouchableOpacity style={styles.buttonForm}
               onPress={handleLogin} >
               <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFormRegister}
               onPress={handleRegister} >
               <Text style={styles.textButtonRegister}>Ainda não tem conta?</Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   );
}

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#523874',
   },
   header: {
      flexDirection: 'col',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 25,
   },
   headerText: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
   },
   subText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },
   form: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputUserName: {
      backgroundColor: '#f2f2f2',
      width: 280,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
   },
   inputForm: {
      backgroundColor: '#f2f2f2',
      marginTop: 13,
      width: 280,
      borderRadius: 5,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
   },
   buttonForm: {
      backgroundColor: '#A020F0',
      width: 280,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 13,
      alignItems: 'center',
      justifyContent: 'center',
   },
   textButton: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
   },
   textButtonRegister: {
      textDecorationLine: 'underline',
      marginTop: 25,
      fontSize: 16,
      color: 'white'
   }
})