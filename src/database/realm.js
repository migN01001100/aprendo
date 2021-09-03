import Realm from 'realm';

const TaskShema = {
    name: "German",
    properties:{
        _id:"int",
        word:"string",
        category:"string[]",
        color:"string",
        translation:"string",
        primary:"string",
        secondary:"string",
        middle:"string",
        mSecondary:"string",
        topLeft:"string",
        topRight:"string",
        bottomLeft:"string",
        bottomRight:"string"
    },
    primaryKey: "_id"
};

const Config = {
    name: "Config",
    properties:{
        _id:{type: "int", default:0},
        db:{type: "string", default:"German"},
        filter:{type: "string", default: "verb"}
    },
    primaryKey: "_id"
};


export const realm = new Realm({
    schema:[TaskShema, Config],
    schemaVersion:5
})

export const initConfig = ()=> {realm.write(() => {
        realm.create("Config",{})
  })
}

export const realmOpen = (collections) => Realm.open({schema:collections});
export const realmClose = () => realm.close();