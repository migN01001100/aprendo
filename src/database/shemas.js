export const German = {
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

export const Spanish = {
    name: "Spanish",
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

export const Russian = {
    name: "Russian",
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

export const Ukrainian = {
    name: "Ukrainian",
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

export const English = {
    name: "English",
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

export const French = {
    name: "French",
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

export const Config = {
    name: "Config",
    properties:{
        _id:{type: "int", default:0},
        db:{type: "string", default:"German"},
        filter:{type: "string", default: "verb"}
    },
    primaryKey: "_id"
};

export const Shema = {
    name: 'Task',
    properties: {
      _id: 'int',
      _partition: 'string',
    },
    primaryKey: '_id',
  };

export const UserData ={
    name:'User',
    properties:{
        email:{type: "string", default:"none"},
        pass: {type: "string", default:"none"},
        status: {type: "bool", default:false}
    }
}