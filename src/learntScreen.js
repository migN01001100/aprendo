import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import { realm, realmAllObjects } from './database/realm';
import { config } from './mainScreen';
import { _deleteFilter, _filterObjects } from './studyingScreen';

const db = realmAllObjects(config.db)
const objName = "learnt"

export const LearntScreen = ({navigation})=>{
    const [list, setList] = React.useState(_filterObjects(objName))

    realm.addListener('change',()=>{
        setList(_filterObjects(objName))
    })
    
    return(
        <View style={styles.mainContainer}>
            <Appbar.Header>
                <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                <Appbar.Content title="Learnt words" />
            </Appbar.Header>
            <ScrollView>
                {list.map(dico=>(
                    <WordsList
                        key={dico.word + "_" + Math.random().toString().substr(2,6)}
                        word={dico.word}
                        translation={dico.translation}
                        id={dico._id}
                    />
                ))}
            </ScrollView>
        </View>
    )
}



const WordsList = props =>{

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
