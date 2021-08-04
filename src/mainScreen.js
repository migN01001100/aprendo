import React from 'react';
import { View, StyleSheet} from 'react-native';
import {FAB, Appbar, Text} from  'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import store from './redux/store';

const Main = ({navigation}) => {
    return(
        <View style={styles.mainContainer}>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
                    <Appbar.Content title="German" subtitle="Adverbs"/>
                </Appbar.Header>
                <FlashCards/>
            <View style={styles.bottomFab}>
                <FAB icon="plus" onPress={()=> navigation.navigate('Add')}/>
            </View>
        </View>
    )   
}

const FlashCards = () =>{
    const [list, setList] = React.useState([])
    store.subscribe(()=>{
        setList(store.getState())
        console.log(store.getState())
    })
    return(
        <Carousel 
        layout={'tinder'} 
        layoutCardOffset={15}
        data={list?list:[]}
        renderItem={dataCards}
        sliderWidth={400}
        itemWidth={600}
        />
    )
}

const dataCards = ({item, index}) =>(
    <View style={styles.container} key={index}>
        <View style={styles.card}>
          <Text style={styles.word}>{item.main}</Text>
          <Text style={styles.primary}>{item.mainPrimary}</Text>
          <Text style={styles.secondary}>{item.mainSecondary}</Text>
          <Text style={styles.topLeft}>{item.topLeft}</Text>
          <Text style={styles.bottomLeft}>{item.bottomLeft}</Text>
          <Text style={styles.topRight}>{item.topRight}</Text>
          <Text style={styles.plural}>{item.middleSecondary}</Text>
          <Text style={styles.middle}>{item.middle}</Text>
          <Text style={styles.bottomRight}>{item.bottomRight}</Text>
        </View>
      </View>
)

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },  
    bottomFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    container:{
        paddingTop:'30%'
      },
      card:{
        position:'relative',
        width:350,
        height:250,
        backgroundColor:'floralwhite',
        borderRadius:10,
        borderTopEndRadius:100,
        marginLeft:22
      },
      word:{
        position:'relative',
        paddingTop:'30%',
        paddingLeft:10,
        fontSize:30,
        color:"black"
      },
      primary:{
        position:'relative',
        fontSize:20,
        left:50,
        bottom:60
      },
      secondary:{
        position:'relative',
        fontSize:20,
        left:50,
        bottom:30
      },
      topLeft:{
        position:'relative',
        fontSize:20,
        bottom:190,
        left: 10
      },
      bottomLeft:{
        position:'relative',
        fontSize:20,
        bottom:10,
        left:10
      },
      topRight:{
        position:'relative',
        fontSize:20,
        bottom:240,
        left: 210
      },
      plural:{
        position:'relative',
        fontSize:20,
        bottom:165,
        paddingLeft:230,
        fontSize:25
      },
      middle:{
        position:'relative',
        fontSize:20,
        bottom:195,
        paddingLeft:230,
        fontSize:20
      },
      bottomRight:{
        position:'relative',
        fontSize:20,
        bottom:120,
        left:210
      },
  });

export default Main;
