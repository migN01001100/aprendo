import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RadioButton, Appbar } from 'react-native-paper'
import { useSchemas } from './providers/schemasProvider'

export const SelectLanguageScreen = ({navigation}) =>{
    const {DBNames, schemaConfig, languageChange} = useSchemas()
    const [checked, setChecked] = React.useState(schemaConfig.db)

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
                        languageChange(value)
                    }}
                    value={checked}
                >
                    {DBNames.map(item=>(
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