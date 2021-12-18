import React from "react";
import Realm from "realm";
import { realmApp } from '../database/realm';
import * as schema from '../database/shemas';

const AuthContext = React.createContext(null)


const AuthProvider = ({children})=>{
    const currentUser = realmApp().currentUser
    const [user, setUser] = React.useState(currentUser)
    const [preset] = React.useState({})
    
    React.useEffect(()=>{
        if(!user){
            return
        }
        const ConfigExist = {schema:[schema.Config], path:`${user.id}.realm`}
        const GermanExist = {schema:[schema.German], path:`${user.id}.realm`}
        const SpanishExist = {schema:[schema.Spanish], path:`${user.id}.realm`}
        const RussianExist = {schema:[schema.Russian], path:`${user.id}.realm`}
        const UkrainianExist = {schema:[schema.Ukrainian], path:`${user.id}.realm`}
        const EnglishExist = {schema:[schema.English], path:`${user.id}.realm`}
        const FrenchExist = {schema:[schema.French], path:`${user.id}.realm`}
        const PolishExist = {schema:[schema.Polish], path:`${user.id}.realm`}
        const TurkishExist = {schema:[schema.Turkish], path:`${user.id}.realm`}

        console.log(`ConfigExist: ${Realm.exists(ConfigExist)}`)
        console.log(`GermanExist: ${Realm.exists(GermanExist)}`)
        console.log(`SpanishExist: ${Realm.exists(SpanishExist)}`)
        console.log(`RussianExist: ${Realm.exists(RussianExist)}`)
        console.log(`UkrainianExist: ${Realm.exists(UkrainianExist)}`)
        console.log(`EnglishExist: ${Realm.exists(EnglishExist)}`)
        console.log(`FrenchExist: ${Realm.exists(FrenchExist)}`)
        console.log(`PolishExist: ${Realm.exists(PolishExist)}`)
        console.log(`TurkishExist: ${Realm.exists(TurkishExist)}`)
        return ()=>{
            
        }
    },[])

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