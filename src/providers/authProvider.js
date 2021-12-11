import React from "react";
import Realm from "realm";
import { realmApp } from '../database/realm';

const AuthContext = React.createContext(null)


const AuthProvider = ({children})=>{
    const currentUser = realmApp().currentUser
    const [user, setUser] = React.useState(currentUser)
    const [preset, setPreset] = React.useState({})
    const realmRef = React.useRef(null)

    React.useEffect(()=>{
        if(!user){
            return;
        }
            const config = {
                sync:{
                    user,
                    partitionValue:user.id
                }
            }
            Realm.open(config).then(realm=>{
                realmRef.current = realm
                const syncSchemaConfig = realm.objects("Config")[0]
                setPreset({_id: 0, db: "English", filter: "verb"})
                if(syncSchemaConfig.db){ //initConfigDB
                    console.log("DB is already created: " + syncSchemaConfig.db)
                    // setSyncSettings(settings)
                    // console.log(`schema is: ${settings.db}`)
                }else{
                    console.log("DB must be created")
                    // realm.write(()=>{
                    //     realm.create("Config",{})
                    //     new Realm(config)
                    //     setSyncSettings(realm.objects("Config")[0])
                    // })
                }
            })
        
        return ()=>{
            const realm = realmRef.current
            realm.close()
            realmRef.current = null
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