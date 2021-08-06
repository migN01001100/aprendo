import React from 'react';
import { View, StyleSheet, AppState} from 'react-native';
import {FAB, Appbar, Text, Title, Caption, Card} from  'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import realm from './database/realm';

const config ={
  state:false, //update db once at the beginnig
  db:"German", //Set Initial db name
  filter: "verbs" //Set filter
}

const state = realm.objects(config.db).length // check db for data to update once at the beginnig

const Main = ({navigation}) => {
  const [list, setList] = React.useState()

  const _handleState = ()=>{
    if (AppState.currentState.match(/inactive|background/)){
      console.log("inactive")
    }else{
      if(!config.state && state > 0){
        setList(realm.objects(config.db))
        config.state = true
        console.log("no empty")
      }
      console.log("active")
    }
  }

  React.useEffect(()=>{
    AppState.addEventListener("change", _handleState)
  },)
    realm.addListener("change",()=>{
      setList(realm.objects(config.db))
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
                <FAB icon="plus" onPress={()=> navigation.navigate('Add')}/>
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

const dataCards = ({item}) =>(
        <View style={styles.container} key={item._id}>
            <Card style={styles.card} onLongPress={()=>{console.log("long press")}}>
                <Title style={styles.word}>{item.word}</Title>
                <Caption style={styles.primary}>{item.primary}</Caption>
                <Caption style={styles.secondary}>{item.secondary}</Caption>
                <Text style={styles.topLeft}>{item.topLeft}</Text>
                <Text style={styles.bottomLeft}>{item.bottomLeft}</Text>
                <Text style={styles.topRight}>{item.topRight}</Text>
                <Caption style={styles.plural}>{item.mSecondary}</Caption>
                <Text style={styles.middle}>{item.middle}</Text>
                <Text style={styles.bottomRight}>{item.bottomRight}</Text>
            </Card>
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
        borderRadius:10,
        borderTopEndRadius:100,
        marginLeft:22
      },
      word:{
        position:'relative',
        paddingTop:'30%',
        paddingLeft:10,
        fontSize:25
      },
      primary:{
        position:'relative',
        fontSize:20,
        left:50,
        bottom:50
      },
      secondary:{
        position:'relative',
        fontSize:20,
        left:40,
        bottom:30
      },
      topLeft:{
        position:'relative',
        fontSize:20,
        bottom:185,
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
        bottom:230,
        left: 210
      },
      plural:{
        position:'relative',
        fontSize:20,
        bottom:165,
        paddingLeft:210,
        fontSize:15
      },
      middle:{
        position:'relative',
        fontSize:20,
        bottom:198,
        paddingLeft:210,
        fontSize:20
      },
      bottomRight:{
        position:'relative',
        fontSize:20,
        bottom:120,
        left:210
      }
  });

export default Main;
