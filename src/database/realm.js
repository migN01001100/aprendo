import Realm from 'realm';

export const Config = {
    name: "Config",
    properties:{
        _id:{type: "int", default:0},
        db:{type: "string", default:"German"},
        filter:{type: "string", default: "verb"}
    },
    primaryKey: "_id"
};

export const _getRealmApp = ()=>{
    let app
    const appID = 'lernkarten-bvadp'
    const appConfig = {
        id: appID,
        timeOut: 10000
    }
    app = new Realm.App(appConfig)
    return app
}

export const user = _getRealmApp().currentUser

const _authenticateUser = async()=>{
    let user
    try{
        const app = _getRealmApp()

        const credentials = Realm.Credentials.emailPassword("mga8919@gmail.com","123456")
        user = await app.logIn(credentials)
        return user
    }catch(e){
        throw `Something went wrong with the login step. Error > ${e}`
    }
}