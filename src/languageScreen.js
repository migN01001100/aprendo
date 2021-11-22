import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RadioButton, Appbar } from 'react-native-paper'
import { realm } from './database/realm'
import { config } from './mainScreen'

export const SelectLanguageScreen = ({navigation}) =>{
    const schemas = realm.schema
    const langSchemas = schemas.map(item=>item.name)
    const filetedLangSchemas = langSchemas.filter(item=>item != "Config")
    const [checked, setChecked] = React.useState(config.db)

    return(
        <View style={styles.mainContainer}>
            <Appbar.Header>
                <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                <Appbar.Content title="Select the language"/>
            </Appbar.Header>
            <View>
                <RadioButton.Group
                    onValueChange={value=>{
                        setChecked(value)
                        _languageChange(value)
                    }}
                    value={checked}
                >
                    {filetedLangSchemas.map(item=>(
                        <LanguageButtom
                        label={item}
                        key={item}
                        />
                    ))}
                </RadioButton.Group>
            </View>
        </View>
    )
}

const _languageChange = language => {
    realm.write(()=>{
        const settings = realm.objects("Config")[0]
        settings.db = language
    })
}

const LanguageButtom = props => (
    <RadioButton.Item 
        label={props.label}
        value={props.label}
    />
)

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})