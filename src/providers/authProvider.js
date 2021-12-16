import React from "react";
import Realm from "realm";
import { realmApp } from '../database/realm';

const AuthContext = React.createContext(null)


const AuthProvider = ({children})=>{
    const currentUser = realmApp().currentUser
    const [user, setUser] = React.useState(currentUser)
    const [preset] = React.useState({})
    
    const signIn = async(email, pass)=>{
        try{
            const app = realmApp()
    
            const credentials = Realm.Credentials.emailPassword(email, pass)
            const newUser = await app.logIn(credentials)
            setUser(newUser)
        }catch(e){
            throw `Something went wrong with the login step. Error > ${e}`
        }
    }
    const signUp = async (email, pass) => {
        const app = realmApp()
        await app.emailPasswordAuth.registerUser({email, pass});
    }
    
    const signOut = () => {
        if (user == null) {
          console.warn("Not logged in, can't log out!");
          return;
        }
        user.logOut();
        setUser(null);
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                preset,
                signIn,
                signOut,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>{
    const credentials = React.useContext(AuthContext)
    if(credentials == null){
        console.log("Auth used out of context")
    }
    return credentials
}

export {AuthProvider, useAuth}