import Realm from 'realm';

const TaskShema = {
    name: "German",
    properties:{
        _id:"int",
        word:"string"
    },
    primaryKey: "_id"
};

const realm = new Realm({
    schema:[TaskShema],
    schemaVersion:1
})



export default realm;