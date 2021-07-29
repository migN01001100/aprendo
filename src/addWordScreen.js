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

export const AddWordScreen = ({navigation}) => {
      
    return (
        
            <View style={styles.father}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                    <Appbar.Content title="Add a new word" />
                </Appbar.Header>
                <View style={styles.form}>
                    <ScrollView>
                        <TextInput label="Main" mode="outlined" />
                        <TextInput label="Secondary" mode="outlined" />
                        <TextInput label="Middle" mode="outlined" />
                        <TextInput label="Secondary" mode="outlined" />
                        <TextInput label="Top Left" mode="outlined" />
                        <TextInput label="Top Right" mode="outlined" />
                        <TextInput label="Bottom Left" mode="outlined" />
                        <TextInput label="Bottom Right" mode="outlined" />
                    </ScrollView>
                </View>
                <View style={styles.bottomFab}>
                    <FAB icon="check" onPress={()=> navigation.navigate('Home')}/>
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
