import React from 'react';
import { View, StyleSheet, AppState, Text } from 'react-native';
import {FAB, Appbar, IconButton} from  'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import realm from './database/realm';

const config ={
  state:false, //update db once at the beginnig
  db:"German", //Set Initial db name
  filter: "verbs" //Set filter
}

const state = realm.objects(config.db).length // check db for data to update once at the beginnig
let id = 0

const Main = ({navigation}) => {
  const [list, setList] = React.useState()
  
  const _handleState = ()=>{
    if (AppState.currentState.match(/inactive|background/)){
      console.log("inactive")
    }else{
      if(!config.state && state > 0){
        setList(Array.from(realm.objects(config.db)))
        config.state = true
        console.log("no empty")
      }
      console.log("active")
    }
  }

  React.useEffect(()=>{
    AppState.addEventListener("change", _handleState)
  })
    realm.addListener("change",()=>{
      setList(Array.from(realm.objects(config.db)))
      console.log(list)
    })  
    return(
        <View style={styles.mainContainer}>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
                    <Appbar.Content title={config.db} subtitle={config.filter}/>
                </Appbar.Header>
                <FlashCards list={list} />
            <View style={styles.bottomFab}>
                <FAB icon="plus" onPress={()=> navigation.navigate('Word')}/>
            </View>
        </View>
    )   
}

const FlashCards = props =>(
        <Carousel 
        layout={'tinder'} 
        layoutCardOffset={15}
        data={props.list?props.list:[]}
        renderItem={dataCards}
        sliderWidth={400}
        itemWidth={600}
        />
)
//All components attached to theme changin in this section must be out of react paper to avoid buging
//due to paper's incompatibility them with native animation Driver setted true.
const dataCards = ({item}) =>{

  return(
        <View style={styles.container} key={item._id}>
            <View style={styles.card}>
                <Text style={styles.word}>{item.word}</Text>
                <IconButton style={styles.gender} icon="circle" color={item.color?item.color:'#e6e6e6'} />
                <Text style={styles.primary}>{item.primary}</Text>
                <Text style={styles.secondary}>{item.secondary}</Text>
                <Text style={styles.topLeft}>{item.topLeft}</Text>
                <Text style={styles.bottomLeft}>{item.bottomLeft}</Text>
                <Text style={styles.topRight}>{item.topRight}</Text>
                <Text style={styles.plural}>{item.mSecondary}</Text>
                <Text style={styles.middle}>{item.middle}</Text>
                <Text style={styles.bottomRight}>{item.bottomRight}</Text>
                <IconButton style={styles.modify} color='#00dac4' icon="square-edit-outline" onPress={()=>modifyWord(item._id)} />
                <IconButton style={styles.delete} color='#00dac4' icon="close-outline" onPress={()=>deleteWord(item._id)} />
            </View>
        </View>
  )
}

const modifyWord = item => {
  console.log(item)
}

const deleteWord = item => {
    const _item = realm.objectForPrimaryKey(config.db, item)
    console.log(_item)
    realm.write(()=>{
      realm.delete(_item)
    })
  
}
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
        borderRadius:10,
        borderTopEndRadius:100,
        marginLeft:22,
        backgroundColor:'#fffff5'
      },
      word:{
        position:'absolute',
        paddingTop:'30%',
        paddingLeft:10,
        fontSize:25,
        fontWeight:'bold'
      },
      gender:{
        position:'absolute',
        left:100,
        top: 70
      },
      primary:{
        position:'absolute',
        fontSize:20,
        left:50,
        top:90
      },
      secondary:{
        position:'absolute',
        fontSize:20,
        left:30,
        bottom:90
      },
      topLeft:{
        position:'absolute',
        fontSize:20,
        top:10,
        left: 10
      },
      bottomLeft:{
        position:'absolute',
        fontSize:20,
        bottom:10,
        left:10
      },
      topRight:{
        position:'absolute',
        fontSize:20,
        top:10,
        left: 200
      },
      plural:{
        position:'absolute',
        fontSize:20,
        bottom:165,
        paddingLeft:210,
        fontSize:15
      },
      middle:{
        position:'absolute',
        fontSize:20,
        top:105,
        fontSize:20,
        left:200
        
      },
      bottomRight:{
        position:'absolute',
        fontSize:20,
        bottom:10,
        left:200
      },
      modify:{
        position:'absolute',
        bottom:1,
        right:1
      },
      delete:{
        position:'absolute',
        bottom:1,
        left:1
      }
  });

export default Main;
