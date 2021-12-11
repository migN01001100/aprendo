import React from 'react';
import { AuthProvider } from './src/providers/authProvider';
import { UserAuthentification } from './src/authentification/userAuth';

const App = () => {

  return (
        <AuthProvider>
          <UserAuthentification/>
        </AuthProvider>
      
  );
};



export default App;
