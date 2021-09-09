import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';
import { realm, realmAllObjects } from './database/realm';
import { config } from './mainScreen';

const db = realmAllObjects(config.db)

let allCategories = new Set()
const _getCategories = () => {
    db.map(item=>{
        let array = item.category
        array.map(item=>{
            if(item !== "studying" && item !== "learnt"){
                allCategories.add(item)
            }
        })
    })
}
_getCategories()
let category = Array.from(allCategories)


export const FilterScreen = ({navigation}) => {
    const [checked, setChecked] = React.useState(config.filter)
    const [loadCategories, setLoadCategories] = React.useState(category)

    realm.addListener('change',()=>{
        _getCategories()
         category = Array.from(allCategories)
         setLoadCategories(category)
    })
    const _filterChange = value => {
        realm.write(()=>{
            const settings = realm.objects("Config")[0]
            settings.filter = value
        })
    }
        
    


    return(
        <View style={styles.mainContainer}>
            <Appbar.Header>
                <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                <Appbar.Content title="Filter words" />
            </Appbar.Header>
            <View style={styles.listContainer}>
                <RadioButton.Group 
                    onValueChange={value=>{
                        setChecked(value)
                        _filterChange(value)
                    }}
                    value={checked}>
                    {loadCategories.map(item=>(
                        <FilterBuild
                            key={Math.random().toString().substr(2,4)}
                            name={item}
                        />
                    ))}
                </RadioButton.Group>
            </View>
        </View>
    )

}

const FilterBuild = props => {
    return(
        <RadioButton.Item
            label={props.name.replace(/^\w/, c => c.toUpperCase())}
            value={props.name}
        />
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    listContainer:{
        margin:5
        
    }
})