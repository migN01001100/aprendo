import React from 'react';
import {
    View, 
    StyleSheet, 
    ScrollView
} from 'react-native';
import {
    FAB,
    TextInput,
    Appbar
} from 'react-native-paper';
import store from './redux/store';
import * as actions from './redux/actions';

export const AddWordScreen = ({navigation}) => {
    const [main, setMain] = React.useState('')
    const [primary, setPrimary] = React.useState('')
    const [secondary, setSecondary] = React.useState('')
    const [middle, setMiddle] = React.useState('')
    const [msecondary, setMsecondary] = React.useState('')
    const [topLeft, setTopLeft] = React.useState('')
    const [topRight, setTopRight] = React.useState('')
    const [bottomLeft, setBottomLeft] = React.useState('')
    const [bottomRight, setBottomRight] = React.useState('')

    return (
        
            <View style={styles.father}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                    <Appbar.Content title="Add a new word" />
                </Appbar.Header>
                <View style={styles.form}>
                    <ScrollView>
                        <TextInput label="Main" mode="outlined" value={main}
                            onChangeText={word => {setMain(word)}}
                        />
                        <TextInput label="Primary" mode="outlined" value={primary}
                            onChangeText={word => {setPrimary(word)}}
                        />
                        <TextInput label="Secondary" mode="outlined" value={secondary}
                            onChangeText={word => {setSecondary(word)}}
                        />
                        <TextInput label="Middle" mode="outlined" value={middle}
                            onChangeText={word => {setMiddle(word)}}
                        />
                        <TextInput label="Secondary" mode="outlined" value={msecondary}
                            onChangeText={word => {setMsecondary(word)}}
                        />
                        <TextInput label="Top Left" mode="outlined" value={topLeft}
                            onChangeText={word => {setTopLeft(word)}}
                        />
                        <TextInput label="Top Right" mode="outlined" value={topRight}
                            onChangeText={word => {setTopRight(word)}}
                        />
                        <TextInput label="Bottom Left" mode="outlined" value={bottomLeft}
                            onChangeText={word => {setBottomLeft(word)}}
                        />
                        <TextInput label="Bottom Right" mode="outlined" value={bottomRight}
                            onChangeText={word => {setBottomRight(word)}}
                        />
                    </ScrollView>
                </View>
                <View style={styles.bottomFab}>
                    <FAB icon="check" onPress={
                        ()=> {
                            navigation.navigate('Home')
                            store.dispatch(actions.addWord(main)(primary)(secondary)(middle)(msecondary)(topLeft)(topRight)(bottomLeft)(bottomRight))
                            setMain("")
                            setPrimary("")
                            setSecondary("")
                            setMiddle("")
                            setMsecondary("")
                            setTopLeft("")
                            setTopRight("")
                            setBottomLeft("")
                            setBottomRight("")
                        }}/>
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    father:{
        flex: 1
    },
    form:{
        position: 'relative',
        margin:40
    },  
    bottomFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
  });
