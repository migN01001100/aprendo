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
        _id:"int",
        word:"string"
    },
    primaryKey: "_id"
};


const realm = new Realm({
    schema:[TaskShema],
    schemaVersion:3
})

export default realm;