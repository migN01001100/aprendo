import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import { realm, realmAllObjects, realmForIndex, realmSelect } from './database/realm';
import { config } from './mainScreen';

const db = realmAllObjects(config.db)
const objName = "studying"

export const StudyingScreen = ({navigation})=>{
    const [list, setList] = React.useState(_filterObjects(objName)) 

    realm.addListener('change',()=>{
        setList(_filterObjects(objName))
    })
    return(
        <View style={styles.mainContainer}>
            <Appbar.Header>
                <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                <Appbar.Content title="Studying words" />
            </Appbar.Header>
            <ScrollView>
                {list.map(dico=>(
                    <WordsList
                        key={dico.word + "_" + Math.random().toString().substr(2,4)}
                        word={dico.word}
                        translation={dico.translation}
                        id={dico._id}
                    />
            ))}
            </ScrollView>
        </View>
    )
}
const WordsList = props=>{


    return(
        <Card style={styles.listContainer}>
            <Card.Title
             title={props.word}
             subtitle={props.translation}
             right={()=><Appbar.Action color="#00dac4" icon="delete-outline" onPress={()=>{_deleteFilter(props.id,config.db,objName)}} />}
            />
        </Card>
    )
}

export const _deleteFilter = (id, db, filter)=> {
    const _index = realmForIndex(db,id)
    const _selectObj = realmSelect(db,_index)
    const categories = _selectObj.category
    const _filterCat = categories.filter(x => x !== filter)
    
    realm.write(()=>{
        _selectObj.category = [..._filterCat]
    })
}


export const _filterObjects = filter => {
    const selectedObjects = []
    db.map(item=>{
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



const styles = StyleSheet.create({
 mainContainer:{
     flex: 1
 },
 listContainer:{
     margin: 5,
     borderBottomEndRadius: 50,
     borderRadius:5
 }
});

