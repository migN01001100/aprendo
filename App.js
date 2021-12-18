import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/providers/authProvider';
import { UserAuthentification } from './src/authentification/userAuth';

const App = () => {

  return (
        <AuthProvider>
          <StatusBar
            hidden={true}
          />
          <UserAuthentification/>
        </AuthProvider>
      
  );
};



export default App;
