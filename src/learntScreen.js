import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import { useSchemas } from './providers/schemasProvider';

const objName = "learnt"

export const LearntScreen = ({navigation})=>{
    const { learnt } = useSchemas()
    const [list, setList] = React.useState(learnt)

    React.useEffect(()=>{
        
        return ()=>{
            setList(learnt)
        }
    },[learnt])

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
    const {deleteFromFilter, schemaConfig} = useSchemas()
    return(
        <Card style={styles.listContainer}>
            <Card.Title
             title={props.word}
             subtitle={props.translation}
             right={()=><Appbar.Action color="#00dac4" icon="delete-outline" onPress={()=>{deleteFromFilter(props.id,schemaConfig.db,objName)}} />}
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
