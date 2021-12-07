import React from 'react';
import { View, StyleSheet, TextInput, Animated} from 'react-native';
import {FAB, Appbar, IconButton, Caption} from  'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import { useSchemas } from './providers/schemasProvider';




const Main = ({navigation}) => {
  const {schemas, schemaConfig, modifyCategory} = useSchemas() 
  const [stateFab, setStateFab] = React.useState(false)
  const [ref, setRef] = React.useState()
  const [pointerA, setPointerA] = React.useState() //helps to calculate index of item
  const [pointerB, setPointerB] = React.useState() //helps to calculate index of item
  
  const realmRef = React.useRef(null)
 
  const onStateChange = ()=>{
    if(stateFab){
      setStateFab(false)
    }else{
      setStateFab(true)
    }
  }

  const _calculateRef = (tag) =>{
    if(pointerA<pointerB){
      modifyCategory(tag, pointerB, schemas)
    }else if(pointerA === undefined){  // when is not defined yet 
       modifyCategory(tag, 0, schemas)
    }else{
      modifyCategory(tag, pointerB, schemas)   
    }
  }

    return(
        <View style={styles.mainContainer}>
          <Appbar.Header>
              <Appbar.Action icon="menu" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
              <Appbar.Content title={`${schemaConfig.db}`} subtitle={`${schemaConfig.filter}`} />
          </Appbar.Header>{schemas.length === 0?
          <IsEmpty/>:
            <Carousel
              ref={ref=>setRef(ref)}
              layout={'tinder'}
              layoutCardOffset={15}
              data={schemas?schemas:[]}
              renderItem={DataCards}
              sliderWidth={400}
              itemWidth={600}
              onBeforeSnapToItem={()=>setPointerA(ref.currentIndex)}
              onSnapToItem={()=>setPointerB(ref.currentIndex)}
              activeAnimationType='decay'
              />}
              <FAB.Group
                open={stateFab}
                icon={stateFab ? 'feather' : 'notebook-outline'}
                actions={[
                  { icon: 'plus', onPress: () => {navigation.navigate('Word')} },
                  {
                    icon: 'brain',
                    label: 'Studying',
                    onPress: () => _calculateRef('studying'),
                  },
                  {
                    icon: 'bookshelf',
                    label: 'Learnt',
                    onPress: () => _calculateRef('learnt'),
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (stateFab) {
                  }
                }}
              />
          <FAB
            style={styles.restartFAB}
            small
            icon='restart'
            onPress={()=>{
              try{
                ref.snapToItem(0)
              }catch(e){
                //console.log(`reference is empty ${e}`)
              }
            }}
          />
        </View>
       
    )   
}

const IsEmpty = ()=>{

  return(
    <View style={styles.isEmptyContainer}>
      <IconButton icon="robot" size={100} />
      <Caption style={styles.isEmptyText}>No Elements to show</Caption>
    </View>
  )
}

//All components attached to theme changin in this section must be out of react paper to avoid buging
//due to paper's incompatibility them with native animation Driver setted true.

const DataCards = ({item}) => (
  <Cards
    _id={item._id}
    word={item.word}
    color={item.color}
    primary={item.primary}
    secondary={item.secondary}
    topLeft={item.topLeft}
    bottomLeft={item.bottomLeft}
    topRight={item.topRight}
    mSecondary={item.mSecondary}
    middle={item.middle}
    bottomRight={item.bottomRight}
    color={item.color}
  />
)

const Cards = props =>{
  const { changeWord, deleteWord} = useSchemas()
  const [active, setActive] = React.useState(false)

  const [word, setWord] = React.useState(props.word)
  const [primary, setPrimary] = React.useState(props.primary)
  const [secondary, setSecondary] = React.useState(props.secondary)
  const [topLeft, setTopLeft] = React.useState(props.topLeft)
  const [bottomLeft, setBottomLeft] = React.useState(props.bottomLeft)
  const [topRight, setTopRight] = React.useState(props.topRight)
  const [mSecondary, setMsecondary] = React.useState(props.mSecondary)
  const [middle, setMiddle] = React.useState(props.middle)
  const [bottomRight, setBottomRight] = React.useState(props.bottomRight)
  let color = props.color

  const [openColor, setOpenColor] = React.useState(false)

  const _changeState = ()=>{
    if(!active){
      setActive(true)
    }else{
      setActive(false)
    }
  }
  const _openColorSelector = ()=>{
      if(openColor){
        return
      }else{
        setOpenColor(true)
      }
  }
 ///ColorSelector
 const colors ={
  blue:'#0066ff',
  red:'#ff0000',
  green:'#33cc33',
  gray:'#e6e6e6'
}
// BlueStart
const animBlueY = React.useRef(new Animated.Value(70)).current
const animBlueX = React.useRef(new Animated.Value(100)).current
const animBlue = React.useRef(new Animated.Value(0)).current
// RedStart
const animRedY = React.useRef(new Animated.Value(70)).current
const animRedX = React.useRef(new Animated.Value(100)).current
const animRed = React.useRef(new Animated.Value(0)).current
// GreenStart
const animGreenY = React.useRef(new Animated.Value(70)).current
const animGreenX = React.useRef(new Animated.Value(100)).current
const animGreen = React.useRef(new Animated.Value(0)).current
// GrayStart
const animGrayY = React.useRef(new Animated.Value(70)).current
const animGrayX = React.useRef(new Animated.Value(100)).current
const animGray = React.useRef(new Animated.Value(0)).current

const startColor = () =>{
  Animated.stagger(500,[
    Animated.timing(animBlueX,{ // Blue
      toValue:55,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlueY,{
      toValue:55,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlue,{
      toValue:1,
      duration:700,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRedX,{ // Red
      toValue:80,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRedY,{
      toValue:30,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRed,{
      toValue:1,
      duration:700,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreenX,{ //Green
      toValue:120,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreenY,{
      toValue:30,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreen,{
      toValue:1,
      duration:700,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGrayX,{ //Gray
      toValue:145,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGrayY,{
      toValue:55,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGray,{
      toValue:1,
      duration:700,
      useNativeDriver:false
    }).start()
  ])
}
const returnColorBlue = () =>{
  Animated.sequence([
    Animated.timing(animBlueY,{ //Blue
      toValue:69.8,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlueX,{
      toValue:100,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlue,{
      toValue:1,
      duration:500,
      useNativeDriver:false
    }).start(()=>color = colors.blue),
    Animated.timing(animRed,{  //Red
      toValue:0,
      delay:600,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreen,{ //Green
      toValue:0,
      delay:1200,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGray,{ //Gray
      toValue:0,
      delay:1800,
      duration:500,
      useNativeDriver:false
    }).start()
  ])
}
const returnColorRed = () =>{
  Animated.sequence([
    Animated.timing(animRedY,{ //Red
      toValue:69.8,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRedX,{
      toValue:100,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRed,{
      toValue:1,
      duration:500,
      useNativeDriver:false
    }).start(()=>color = colors.red),
    Animated.timing(animBlue,{  //Blue
      toValue:0,
      delay:600,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreen,{ //Green
      toValue:0,
      delay:1200,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGray,{ //Gray
      toValue:0,
      delay:1800,
      duration:500,
      useNativeDriver:false
    }).start()
  ])
}
const returnColorGreen = () =>{
  Animated.sequence([
    Animated.timing(animGreenY,{ //Green
      toValue:69.8,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreenX,{
      toValue:100,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGreen,{
      toValue:1,
      duration:500,
      useNativeDriver:false
    }).start(()=>color = colors.green),
    Animated.timing(animGray,{  //Gray
      toValue:0,
      delay:600,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRed,{ //Red
      toValue:0,
      delay:1200,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlue,{ //Blue
      toValue:0,
      delay:1800,
      duration:500,
      useNativeDriver:false
    }).start()
  ])
}
const returnColorGray = () =>{
  Animated.sequence([
    Animated.timing(animGrayY,{ //Gray
      toValue:69.8,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGrayX,{
      toValue:100,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animGray,{
      toValue:1,
      duration:500,
      useNativeDriver:false
    }).start(()=>color = colors.gray),
    Animated.timing(animGreen,{ //Green
      toValue:0,
      delay:600,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animRed,{ //Red
      toValue:0,
      delay:1200,
      duration:500,
      useNativeDriver:false
    }).start(),
    Animated.timing(animBlue,{ //Blue
      toValue:0,
      delay:1800,
      duration:500,
      useNativeDriver:false
    }).start()
  ])
}
  return(
    <View style={styles.container} key={props._id}>
      <View style={styles.card}>
          <TextInput editable={active} style={styles.word}
            onChangeText={text=>setWord(text)}>{props.word}</TextInput>
            {openColor?
              <View style={styles.colorContainer}>
                {startColor()}
                <Animated.View style={[styles.chooseBlueColor,{opacity:animBlue, top:animBlueY, left:animBlueX}]}>
                  <IconButton icon="circle" color={colors.blue} onPress={()=>{returnColorBlue()}} />
                </Animated.View>      
                <Animated.View style={[styles.chooseRedColor,{opacity:animRed, top:animRedY, left:animRedX}]}>
                  <IconButton icon="circle" color={colors.red} onPress={()=>{returnColorRed()}} />
                </Animated.View>      
                <Animated.View style={[styles.chooseGreenColor,{opacity:animGreen, top:animGreenY, left:animGreenX}]}>
                  <IconButton icon="circle" color={colors.green} onPress={()=>{returnColorGreen()}} />
                </Animated.View>      
                <Animated.View style={[styles.chooseGrayColor,{opacity:animGray, top:animGrayY, left:animGrayX}]}>
                  <IconButton icon="circle" color={colors.gray} onPress={()=>{returnColorGray()}} />
                </Animated.View>
              </View>
            :<View/>}
          <IconButton style={styles.gender} icon="circle" color={props.color?props.color:'#e6e6e6'} 
          onPress={active?_openColorSelector:false} />
          <TextInput editable={active} style={styles.primary}
            onChangeText={text=>setPrimary(text)}>{props.primary}</TextInput>
          <TextInput editable={active} style={styles.secondary}
            onChangeText={text=>setSecondary(text)}>{props.secondary}</TextInput>
          <TextInput editable={active} style={styles.topLeft}
            onChangeText={text=>setTopLeft(text)}>{props.topLeft}</TextInput>
          <TextInput editable={active} style={styles.bottomLeft}
            onChangeText={text=>setBottomLeft(text)}>{props.bottomLeft}</TextInput>
          <TextInput editable={active} style={styles.topRight}
            onChangeText={text=>setTopRight(text)}>{props.topRight}</TextInput>
          <TextInput editable={active} style={styles.plural}
            onChangeText={text=>setMsecondary(text)}>{props.mSecondary}</TextInput>
          <TextInput editable={active} style={styles.middle}
            onChangeText={text=>setMiddle(text)}>{props.middle}</TextInput>
          <TextInput editable={active} style={styles.bottomRight}
            onChangeText={text=>setBottomRight(text)}>{props.bottomRight}</TextInput>
          <Appbar.Action style={styles.modify} color='#00dac4' icon={active?"content-save-outline":"square-edit-outline"} 
          onPress={()=>{
            setOpenColor(false)
            changeWord(props._id)(active)(word)(primary)(secondary)(topLeft)(bottomLeft)(topRight)(mSecondary)(middle)(bottomRight)(color)
            _changeState()
          }} />
          {active?<Appbar.Action style={styles.delete} color='#00dac4' icon="delete" 
          onPress={()=>{
            deleteWord(props._id)
            _changeState()
            }} />:<View/>}
      </View>
    </View>
  )
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
        backgroundColor:'#fffff5',
        marginLeft:'4%'
      },
      word:{
        position:'absolute',
        paddingTop:'30%',
        paddingLeft:10,
        fontSize:25,
        fontWeight:'bold',
        color:'#000000'
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
        top:75,
        color:'#000000'
      },
      secondary:{
        position:'absolute',
        fontSize:20,
        left:30,
        bottom:75,
        color:'#000000'
      },
      topLeft:{
        position:'absolute',
        fontSize:20,
        top:10,
        left: 10,
        color:'#000000'
      },
      bottomLeft:{
        position:'absolute',
        fontSize:20,
        bottom:10,
        left:10,
        color:'#000000'
      },
      topRight:{
        position:'absolute',
        fontSize:20,
        top:10,
        left: 200,
        color:'#000000'
      },
      plural:{
        position:'absolute',
        fontSize:20,
        bottom:165,
        paddingLeft:210,
        fontSize:15,
        color:'#000000'
      },
      middle:{
        position:'absolute',
        fontSize:20,
        top:105,
        fontSize:20,
        left:200,
        color:'#000000'
        
      },
      bottomRight:{
        position:'absolute',
        fontSize:20,
        bottom:10,
        left:200,
        color:'#000000'
      },
      modify:{
        position:'absolute',
        bottom:1,
        right:1
      },
      delete:{
        position:'absolute',
        bottom:0,
        left:0
      },
      colorContainer:{
        flex: 1
      },
      chooseBlueColor:{
        position:'absolute',
        zIndex:1
      },
      chooseRedColor:{
        position:'absolute',
        zIndex:1
      },
      chooseGreenColor:{
        position:'absolute',
        zIndex:1
      },
      chooseGrayColor:{
        position:'absolute',
        zIndex:1
      },
      restartFAB:{
        position:'absolute',
        margin:16,
        left:20,
        top: 90
      },
      isEmptyContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      isEmptyText:{
        fontSize:20
      },
  });

export default Main;
