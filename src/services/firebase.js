import database from '@react-native-firebase/database';

const url = (path) => {
   return "https://chatgpt-d60fb-default-rtdb.firebaseio.com/" + path
}

// Método para buscar dados no Firebase Realtime Database
export const getDataFromFirebase = async (path) => {
   try {
      const snapshot = await database().ref(url(path)).once('value');
      return snapshot.val();
   } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      throw error;
   }
};

// Método para enviar dados para o Firebase Realtime Database
export const sendDataToFirebase = async (path, data) => {
   try {
      await database().ref(url(path)).set(data);
      console.log('Data sent to Firebase successfully');
   } catch (error) {
      console.error('Error sending data to Firebase:', error);
      throw error;
   }
};