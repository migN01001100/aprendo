import React from 'react';
import Realm from 'realm';
import * as schema from '../database/shemas';
import { useAuth } from './authProvider';

const SchemaContext = React.createContext(null)

const SchemaProvider = ({children}) =>{
    const {user} = useAuth()
    const [wordsSaved, setWordsSaved] = React.useState(0)
    const [wordsLearnt, setWordsLearnt] = React.useState(0)
    const [studying, setStudying] = React.useState([])
    const [learnt, setLearnt] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [DBNames, setDBNames] = React.useState([])
    const [schemas, setSchemas] = React.useState([])
    const [schemaConfig, setSchemaConfig] = React.useState({})
    const [isNotStudyNorLearnt, setIsNotStudyNorLearnt] = React.useState([])
 
    const realmRef = React.useRef(null)

    React.useEffect(()=>{
        const openRealmBehaviourConfig = {
            type: "openImmediately"
        }
        const config = {
            schema:[schema.German, schema.Spanish , schema.Russian, schema.Ukrainian, schema.English, schema.French, schema.Config],
            sync:{
                user,
                partitionValue: user.id,
                newRealmFileBehavior: openRealmBehaviourConfig,
                existingRealmFileBehavior: openRealmBehaviourConfig
            }
        }
        
        Realm.open(config).then(realm=>{
            realmRef.current = realm
            const tempNonSyncShemaConfig = {_id: 0, db: "English", filter: "verb"}
            const syncShemaConfig = realm.objects("Config")[0]
            const syncConfig = syncShemaConfig || tempNonSyncShemaConfig

            const DBschemas = realm.schema
            const langSchemas = DBschemas.map(item=>item.name)
            const filteredLangSchemas = langSchemas.filter(item=>item != "Config")
            
            setDBNames(filteredLangSchemas)
            const syncSchemas = realm.objects(syncConfig.db)
        
            setSchemaConfig(syncConfig)
            setSchemas(isFilter(removeLearntWords(syncSchemas),syncConfig.filter))
            setStudying(filterObjects("studying",removeLearntWords(syncSchemas)))
            setLearnt(filterObjects("learnt",syncSchemas))
            setCategories(getCategories(syncSchemas))
            setWordsSaved(syncSchemas.length)
            setWordsLearnt((filterObjects("learnt",syncSchemas).length*100/syncSchemas.length).toFixed(2))
            setIsNotStudyNorLearnt(getAutoComplete(syncSchemas))

            
            realm.addListener("change",()=>{
                const syncConfig = realm.objects("Config")[0]
                const syncSchemas = realm.objects(syncConfig.db)
                setSchemaConfig(syncConfig)
                setSchemas(isFilter(removeLearntWords(syncSchemas),syncConfig.filter))
                setStudying(filterObjects("studying",removeLearntWords(syncSchemas)))
                setLearnt(filterObjects("learnt",syncSchemas))
                setCategories(getCategories(syncSchemas))
                setWordsSaved(syncSchemas.length)
                setWordsLearnt((filterObjects("learnt",syncSchemas).length*100/syncSchemas.length).toFixed(2))
                setIsNotStudyNorLearnt(getAutoComplete(syncSchemas))
                console.log("something changed")
            })
        })
        return ()=>{
            const realm = realmRef.current
            if(realm){
                realm.removeAllListeners()
                realm.close()
                realmRef.current = null
            }
        }
    },[user])

    const setObjects = new Set()
    const getAutoComplete = (schemas) =>{
        schemas.map(item=>{
            let eachObject = item.category
            eachObject.map(each=>{
                if(each !== "studying" && each !== "learnt"){
                    setObjects.add(each) 
                }
            })
        })
        return Array.from(setObjects)
    }
    //Remove lernt words
    const removeLearntWords = (schemas)=> {
        const tempList =[]
        schemas.map(hasit=>{
        let bool = false
        let array = hasit.category
        array.map(each=>{
            if(each === 'learnt'){
                bool = true
            }
        })
        if(!bool){
            tempList.push(hasit)
        }
        })
        return [...tempList]
    }
    const isFilter = (schemas, filter) =>{
        const tempList =[]
        schemas.map(hasit=>{
        let bool = false
        let array = hasit.category
        array.map(each=>{
            if(each === filter){
                bool = true
            }
        })
        if(bool){
            tempList.push(hasit)
        }
        })
        return [...tempList]
    }
    //filter Section________________________________start
    const getCategories = (schemas) => {

        let allCategories = new Set()
        schemas.map(item=>{
            let array = item.category
            array.map(item=>{
                if(item !== "studying" && item !== "learnt"){
                    allCategories.add(item)
                }
            })
        })
        return Array.from(allCategories)
    }
    const filterChange = value => {
        const realm = realmRef.current
        realm.write(()=>{
            const settings = realm.objects("Config")[0]
            settings.filter = value
        })
    }
    //filter Section________________________________end
    //Lernt and Studying section_________________________start
    const deleteFromFilter = (id, db, filter)=> {
        const realm = realmRef.current
        const _index = realmForIndex(db,id)
        const _selectObj = realmSelect(db,_index)
        const categories = _selectObj.category
        const _filterCat = categories.filter(x => x !== filter)
        
        realm.write(()=>{
            _selectObj.category = [..._filterCat]
        })
    }
    
    const filterObjects = (filter, schemas) => {
        const selectedObjects = []
        schemas.map(item=>{
            let bool = false
            let array
            array = item.category
            array.map(search=>{
                if(search === filter){
                    bool = true
                }
            })
            if(bool){
                selectedObjects.push(item)
            }
        })
        return selectedObjects
    }
    //Lernt and Studying section_________________________end
    const addWord = word => category => color => translation => primary => secondary => middle => mSecondary => topLeft => topRight => bottomLeft => bottomRight => {
        let random = Math.random().toString(9).substr(2,5);
        const realm = realmRef.current
        const config = realm.objects("Config")[0]
        realm.write(()=>{
            realm.create(config.db,{
                _id: parseInt(random),
                word,
                category,
                color,
                translation,
                primary,
                secondary,
                middle,
                mSecondary,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight
            });
        })
    }

    const changeWord = id => active => word => primary => secondary => topLeft => bottomLeft => topRight => mSecondary => middle => bottomRight => color =>{
        const realm = realmRef.current 
        if(!active){
          return 
        }else{
          const _item = realmForIndex(schemaConfig.db,id) //search index of object to modify
          
          realm.write(()=>{
            const itemIndex = realm.objects(schemaConfig.db)[_item] // select object via index
            
            itemIndex.word = word
            itemIndex.primary = primary
            itemIndex.color= color
            itemIndex.secondary = secondary
            itemIndex.topLeft = topLeft
            itemIndex.bottomLeft = bottomLeft
            itemIndex.topRight = topRight
            itemIndex.mSecondary = mSecondary
            itemIndex.middle = middle
            itemIndex.bottomRight = bottomRight
          })
        }
      }

    const deleteWord = id => {
        const realm = realmRef.current
        const _item = realm.objectForPrimaryKey(schemaConfig.db, id)
      
        realm.write(()=>{
          realm.delete(_item)
        })
      }
    
    const languageChange = language => {
        const realm = realmRef.current
        realm.write(()=>{
            const settings = realm.objects("Config")[0]
            settings.db = language
        })
    }

    const modifyCategory = (tag, pointer, currentWords)=>{
        const realm = realmRef.current
        const wordPosition = currentWords[pointer]
        const equivalentIndex = realmForIndex(schemaConfig.db, wordPosition._id)
        const itemObject = realmSelect(schemaConfig.db,equivalentIndex)
        const itemCategorie = itemObject.category
        let bool = false
        itemCategorie.map(item=>{
          if(item === tag){
             bool = true
          }
        })
        if(!bool){
          realm.write(()=>{
            itemObject.category = [...itemCategorie,tag]
          }) 
        }
      }

    //S&D tools____________________________________________________________________
    const realmForIndex = (dbName, id)=>{ // get index of data using DBNAME and ID
        const realm = realmRef.current
        const list = realm.objects(dbName)
        let array = []
            list.map(dni=>{
            array.push(dni._id)
        })
        return array.indexOf(id)
    }
    const realmSelect = (dbName,index)=>{
        const realm = realmRef.current
        return realm.objects(dbName)[index]
    }

    return (
        <SchemaContext.Provider 
        value={{
            schemas,
            schemaConfig,
            DBNames,
            studying,
            learnt,
            categories,
            wordsSaved,
            wordsLearnt,
            isNotStudyNorLearnt,
            languageChange,
            changeWord,
            deleteWord,
            modifyCategory,
            deleteFromFilter,
            filterChange,
            addWord
        }}>
            {children}
        </SchemaContext.Provider>
    )
}

const useSchemas = ()=>{
    const schema = React.useContext(SchemaContext)
    if(schema == null){
        throw new Error ("UseSchemas() called outside of SchemasProvider")
    }
    return schema
}

export {SchemaProvider, useSchemas}