import Realm from 'realm';

export const realmApp = ()=>{
    let app
    const appID = 'lernkarten-bvadp'
    const appConfig = {
        id: appID,
        timeOut: 10000
    }
    app = new Realm.App(appConfig)
    return app
}




export const user = realmApp().currentUser