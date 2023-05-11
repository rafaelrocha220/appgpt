import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserMessage from '../components/UserMessage';
import Message from '../components/Message';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
   const navigation = useNavigation();
   const [message, setMessage] = useState([]);
   const [userMessage, setUserMessage] = useState('');
   const [isFlatListReady, setIsFlatListReady] = useState(false);
   const flatListRef = useRef(null);

   const handleSend = async () => {
      if (userMessage.trim() !== '') {
         setMessage((prevState) => [...prevState, { message: userMessage, isUser: true }]);
         setUserMessage('');
         try {
            const response = await fetch(`https://api.openai.com/v1/engines/text-davinci-003/completions`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer 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`,
               },
               body: JSON.stringify({
                  prompt: userMessage,
                  max_tokens: 500,
                  temperature: 0.8,
               }),
            });
            const data = await response.json();
            const botresponse = 'choices' in data ? data.choices[0].text.trim() : 'O token do chatgpt não está funcionando corretamente: \n\n' + JSON.stringify(data);
            setMessage((prevState) => [...prevState, { message: botresponse, isUser: false }]);
         } catch (error) {
            setMessage((prevState) => [...prevState, { message: 'Erro de conexão', isUser: false }]);
            console.error(error);
         }
      }
   };

   const handleContentSizeChange = () => {
      if (isFlatListReady) {
         flatListRef.current.scrollToEnd();
      }
   };

   const handleGoBack = () => {
      navigation.goBack();
   };

   return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={0}>
         <View style={styles.header}>
            <Ionicons onPress={handleGoBack} name="chevron-back" size={30} color="white" />
            <Text style={styles.headerText}>ChatGPT API</Text>
            <Ionicons name="ellipsis-vertical" size={30} color="white" />
         </View>
         {message.length > 0 ? (
            <FlatList
               data={message}
               renderItem={({ item, index }) => item.isUser ? (
                  <UserMessage message={item.message} />
               ) : (
                  <Message message={item.message} />
               )}
               keyExtractor={(item, index) => index.toString()}
               ref={flatListRef}
               onContentSizeChange={handleContentSizeChange} // atribuir função à propriedade
               onLayout={() => {
                  setIsFlatListReady(true);
                  flatListRef.current.scrollToEnd();
               }}
            />
         ) :
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>Nenhuma mensagem encontrada</Text>
            </View>
         }
         <View style={styles.inputContainer}>
            <TextInput
               placeholder="Digite sua mensagem"
               style={styles.input}
               value={userMessage}
               onChangeText={setUserMessage}
            />
            <TouchableOpacity onPress={handleSend}>
               <Ionicons name="send" size={24} color="#A020F0" />
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: 20,
      backgroundColor: '#523874',
   },
   headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
   },
   messages: {
      flex: 1,
      padding: 20,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
   },
   input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      marginRight: 10,
      fontSize: 18,
   },
   sendButton: {
      backgroundColor: '#523874',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   emptyText: {
      fontSize: 18,
      color: '#555',
   },
});

export default ChatScreen;
