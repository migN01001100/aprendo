import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';
import { realm } from './database/realm';
import { config } from './mainScreen';

const db = realm.objects(config.db)

let allCategories = new Set()
const _getCategories = () => {
    db.map(item=>{
        let array = item.category
        array.map(item=>allCategories.add(item))
    })
}
_getCategories()
let category = Array.from(allCategories)

realm.addListener('change',()=>{
    console.log(config.filter)
})

export const FilterScreen = ({navigation}) => {
    const [checked, setChecked] = React.useState(config.filter)

    async function _filterChange(value) {
        try{
            return await realm.write(()=>{
                const settings = realm.objects("Config")[0]
                settings.filter = value
            })
        }catch(e){
            console.log(e)
        }
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
                    {category.map(item=>(
                        <FilterBuild
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
            label={props.name}
            value={props.name}
            onPress={()=>setChecked(props.name)}
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