import React from 'react';
import { View, StyleSheet} from 'react-native';
import {FAB, Appbar} from  'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import store from './redux/store';
const Main = ({navigation}) => {
    console.log(store.getState())
    return(
        <View style={styles.father}>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
                    <Appbar.Content title="German" subtitle="Adverbs"/>
                </Appbar.Header>
            <View style={styles.bottomFab}>
                <FAB icon="plus" onPress={()=> navigation.navigate('Add')}/>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    father:{
        flex: 1
    },  
    bottomFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    } 
  });

export default Main;
