import Realm from 'realm';
import * as frame from './shemas'

export const Config = {
    name: "Config",
    properties:{
        _id:{type: "int", default:0},
        db:{type: "string", default:"German"},
        filter:{type: "string", default: "verb"}
    },
    primaryKey: "_id"
};


export const realm = new Realm({
    schema:[frame.German, frame.Spanish , frame.Russian, frame.Ukrainian, frame.English, frame.French, Config],
    schemaVersion:11
})

export const initConfig = ()=> {realm.write(() => {
        realm.create("Config",{})
  })
}

export const realmOpen = (collections) => Realm.open({schema:collections, schemaVersion:5});
export const realmClose = () => realm.close();
//return objects 
export const realmAllObjects = db => realm.objects(db) 
//search index 
export const realmForIndex = (dbName, id)=> realm.objects(dbName).findIndex(index=>index._id == id)
//select object
export const realmSelect = (dbName,item) => realm.objects(dbName)[item]
