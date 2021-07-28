import React from 'react';
import { View, StyleSheet} from 'react-native';
import {FAB} from  'react-native-paper'

const Main = ({navigation}) => {

    return(
        <View style={styles.bottomFab}>
            <FAB icon="plus" onPress={()=> navigation.navigate('Add')}/>
        </View>
    )   
}

const styles = StyleSheet.create({
    bottomFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    } 
  });

export default Main;
