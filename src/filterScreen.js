import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RadioButton, Appbar } from 'react-native-paper';
import { useSchemas } from './providers/schemasProvider';


export const FilterScreen = ({navigation}) => {
    const { schemaConfig, filterChange, categories} = useSchemas()
    const [checked, setChecked] = React.useState(schemaConfig.filter)
    const [loadCategories, setLoadCategories] = React.useState(categories)

    console.log(categories)
    React.useEffect(()=>{
            console.log("mounted filters")
        return ()=>{
            setLoadCategories(categories)
            console.log("unmounted filters")
        }
    },[loadCategories])

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
                        filterChange(value)
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