import axios from 'axios';

export const checkUserCredentials = async (login, password) => {
   try {
      const response = await axios.get('https://chatgpt-d60fb-default-rtdb.firebaseio.com/users.json');
      const users = response.data;

      const matchingUser = Object.keys(users).find((key) => {
         const user = users[key];
         return user !== null && user.login == login && user.pss == password;
      });

      return matchingUser

   } catch (error) {
      console.error('Error checking user credentials:', error);
      return false
   }
};

export const registerUser = async (login, password) => {
   try {
      const response = await axios.post('https://chatgpt-d60fb-default-rtdb.firebaseio.com/users.json', {
         login,
         pss: password
      });

      console.log('User registered successfully:', response.data);
      return response.data;

   } catch (error) {
      console.error('Error registering user:', error);
      throw error;
   }
};

