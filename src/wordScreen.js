import React from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { FAB, TextInput, Appbar, Chip, Snackbar, IconButton, Caption, HelperText } from 'react-native-paper';
import {realm, realmAllObjects} from './database/realm';
import { config } from './mainScreen';

const colors ={
    blue:'#0066ff',
    red:'#ff0000',
    green:'#33cc33',
    gray:'#e6e6e6'
}
let color = '' //save color for DB
let flag = false
let copyCat = []
export const WordScreen = ({navigation}) => {
    const [main, setMain] = React.useState('')
    const [category, setCategory] = React.useState('')
    
    const [translation, setTranslation] = React.useState('')
    const [primary, setPrimary] = React.useState('')
    const [secondary, setSecondary] = React.useState('')
    const [middle, setMiddle] = React.useState('')
    const [mSecondary, setMsecondary] = React.useState('')
    const [topLeft, setTopLeft] = React.useState('')
    const [topRight, setTopRight] = React.useState('')
    const [bottomLeft, setBottomLeft] = React.useState('')
    const [bottomRight, setBottomRight] = React.useState('')
    const [chip, setChip] = React.useState([])
    const [warn, setWarn] = React.useState(false)
    
    

    const animBlue = React.useRef(new Animated.Value(0)).current;
    const animRed = React.useRef(new Animated.Value(0)).current;
    const animGreen = React.useRef(new Animated.Value(0)).current;
    const animGray = React.useRef(new Animated.Value(0)).current;
    const selectBlue = () => {
        Animated.timing(animBlue,{
            toValue:1,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animRed,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGreen,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGray,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
    }
    const selectRed = () => {
        Animated.timing(animRed,{
            toValue:1,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animBlue,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGreen,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGray,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
    }
    const selectGreen = () => {
        Animated.timing(animGreen,{
            toValue:1,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animRed,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animBlue,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGray,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
    }
    const selectGray = () => {
        Animated.timing(animGray,{
            toValue:1,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animRed,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animBlue,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(animGreen,{
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
    }

    const handleErrorMain = (text) =>{
        const dbObject = realmAllObjects(config.db)
        let word = []
        dbObject.map(item=>word.push(item.word))
        return word.includes(text)
    }

    const setObjects = new Set()
    const _getAutoComplete = () =>{
        const dbObjects = realmAllObjects(config.db)
        dbObjects.map(item=>{
            let eachObject = item.category
            eachObject.map(each=>{
                if(each !== "studying" && each !== "learnt"){
                    setObjects.add(each)  
                }
            })
        })
        return Array.from(setObjects)
    }
    const [query, setQuery] = React.useState(_getAutoComplete())
    
    const _match = (word, list)=> {
        let regex = new RegExp("\\b"+word+"\\w*","gi")
        return list.toString().match(regex)
    }
    const setLast = query.length
    const _removeOrAddFilter = (word, name) =>{
            switch (name){
                case 'query':
                    if(!flag){
                        setChip([...chip, word])
                        setQuery(query.filter(x => x !== word))
                        setCategory('')
                    }else{
                        setChip([...chip, word])
                        setQuery(copyCat)
                        setCategory('')
                        copyCat = []
                        flag = false
                    }
                    break;
                case 'chip':
                    setQuery([...query, word])
                    setChip(chip.filter(x => x !== word))
                    break;
                case 'empty':
                    if(chip.length === 0){
                        setQuery(_getAutoComplete())
                    }else{
                        let copyCat = chip.toString() 
                        setQuery(_getAutoComplete().filter(x => !copyCat.includes(x)))
                    }
                    flag = false
                    break;
                case 'checkList':
                    setQuery(()=>_match(word,query))
                    copyCat = _getAutoComplete().filter(x => x !== query.toString())
                    if(setLast >= 2){
                        flag = true
                    }
                    break;
                default:
                    return
            }   
    }
    return (
        
            <View style={styles.father}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={()=>navigation.goBack()}/>
                    <Appbar.Content title="Add a new word" />
                </Appbar.Header>
                <Notification
                    state={warn}
                    dismiss={()=>setWarn(false)}
                    message={handleErrorMain(main)?"You cannot add a word that already exist.":"There is no word to add."}
                />
                <View style={styles.form}>
                    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                        <TextInput label="Word" mode="outlined" value={main}
                            onChangeText={word => {setMain(word)}}
                        />
                        {handleErrorMain(main)?<HelperText type='error' visible={true}>Error: This word already exist.</HelperText>:<View/>}
                        <ScrollView horizontal={true} style={styles.chipTop} showsHorizontalScrollIndicator={false} >
                            {query.map(item=>
                                <Chip
                                    key={item + "_" + Math.random().toString().substr(2,9)}
                                    onPress={()=>{
                                        _removeOrAddFilter(item, 'query')
                                    }}
                                >{item}</Chip>
                                )}
                        </ScrollView>
                        <TextInput label="Category" mode="outlined" value={category}
                            onChangeText={word => {
                                setCategory(word)
                                    if(null !== _match(word,query) && word !== ''){
                                        _removeOrAddFilter(word, 'checkList')
                                    }else if (word == ''){
                                        _removeOrAddFilter(word,'empty')                                    
                                    }
                            }}
                            onSubmitEditing={()=>{
                                if(category !== ""){
                                    setChip([...chip,category])
                                    setCategory('')
                                }
                            }
                            }
                        />
                        <ScrollView horizontal={true} style={styles.chipBottom} showsHorizontalScrollIndicator={false} >
                            {chip.map(item=>
                            <Chip
                                selected={true}
                                key={item + "_" + Math.random().toString().substr(2,2)}
                                onClose={()=>{
                                    _removeOrAddFilter(item, 'chip')
                                }}
                            >{item}</Chip>
                            )}
                        </ScrollView>
                        <Caption>Pick a gender</Caption>
                            <ScrollView horizontal={true}>
                                    <Animated.View style={[styles.animatedBlue, {opacity:animBlue}]} ></Animated.View>
                                <IconButton icon="circle" color={colors.blue} onPress={()=>{color=colors.blue;selectBlue()}} />
                                    <Animated.View style={[styles.animatedRed, {opacity:animRed}]} ></Animated.View>
                                <IconButton icon="circle" color={colors.red} onPress={()=>{color=colors.red;selectRed()}} />
                                    <Animated.View style={[styles.animatedGreen, {opacity:animGreen}]} ></Animated.View>
                                <IconButton icon="circle" color={colors.green} onPress={()=>{color=colors.green;selectGreen()}} />
                                    <Animated.View style={[styles.animatedGray, {opacity:animGray}]} ></Animated.View>
                                <IconButton icon="circle" color={colors.gray} onPress={()=>{color=colors.gray;selectGray()}} />
                            </ScrollView>
                        <TextInput label="Translation" mode="outlined" value={translation}
                            onChangeText={word => {setTranslation(word)}}
                        />
                        <TextInput label="Word top" mode="outlined" value={primary}
                            onChangeText={word => {setPrimary(word)}}
                        />
                        <TextInput label="Word bottom" mode="outlined" value={secondary}
                            onChangeText={word => {setSecondary(word)}}
                        />
                        <TextInput label="Middle" mode="outlined" value={middle}
                            onChangeText={word => {setMiddle(word)}}
                        />
                        <TextInput label="Middle Top" mode="outlined" value={mSecondary}
                            onChangeText={word => {setMsecondary(word)}}
                        />
                        <TextInput label="Left top corner" mode="outlined" value={topLeft}
                            onChangeText={word => {setTopLeft(word)}}
                        />
                        <TextInput label="Right top corner" mode="outlined" value={topRight}
                            onChangeText={word => {setTopRight(word)}}
                        />
                        <TextInput label="Bottom left corner" mode="outlined" value={bottomLeft}
                            onChangeText={word => {setBottomLeft(word)}}
                        />
                        <TextInput label="Bottom right corner" mode="outlined" value={bottomRight}
                            onChangeText={word => {setBottomRight(word)}}
                        />
                    </ScrollView>
                </View>
                <View style={styles.bottomFab}>
                    <FAB icon="check" onPress={
                        ()=> {
                            if (main == "" || handleErrorMain(main)){
                                setWarn(true)
                            }else{
                            addNewWord(main)(chip.length == 0?["all"]:chip)(color)(translation)(primary)(secondary)(middle)(mSecondary)(topLeft)(topRight)(bottomLeft)(bottomRight)
                            navigation.navigate('Home')
                            setQuery(_getAutoComplete())
                            setMain("")
                            setChip([])
                            color = ''
                            setTranslation("")
                            setPrimary("")
                            setSecondary("")
                            setMiddle("")
                            setMsecondary("")
                            setTopLeft("")
                            setTopRight("")
                            setBottomLeft("")
                            setBottomRight("")
                            Animated.timing(animBlue,{}).reset()
                            Animated.timing(animGreen,{}).reset()
                            Animated.timing(animRed,{}).reset()
                            Animated.timing(animGray,{}).reset()
                            }
                        }}/>
                </View>
            </View>
        
    )
}
const addNewWord = word => category => color => translation => primary => secondary => middle => mSecondary => topLeft => topRight => bottomLeft => bottomRight => {
    let random = Math.random().toString(9).substr(2,5);
    realm.write(()=>{
        realm.create(config.db,{
            _id: parseInt(random),
            word,
            category,
            color,
            translation,
            primary,
            secondary,
            middle,
            mSecondary,
            topLeft,
            topRight,
            bottomLeft,
            bottomRight
        });
    })
}

const Notification = props =>{
    return(
        <Snackbar
            visible={props.state}
            onDismiss={props.dismiss}
        >
            {props.message}
        </Snackbar>
    )
}

const styles = StyleSheet.create({
    main:{
        marginBottom:100
    },
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
        top: 0
    },
    color:{
        color:'#ff0000'
    },
    animatedBlue:{
        position:'absolute',
        top:9.3,
        left:9.3,
        borderColor:'#0047b3',
        borderRadius:50,
        borderStyle:'solid',
        borderWidth:10,
        width:30,
        height:30
    },
    animatedRed:{
        position:'absolute',
        top:9.3,
        left:57.5,
        borderColor:'#b30000',
        borderRadius:50,
        borderStyle:'solid',
        borderWidth:10,
        width:30,
        height:30
    },
    animatedGreen:{
        position:'absolute',
        top:9.3,
        right:56.7,
        borderColor:'#00802b',
        borderRadius:50,
        borderStyle:'solid',
        borderWidth:10,
        width:30,
        height:30
    },
    animatedGray:{
        position:'absolute',
        top:9.3,
        right:8.7,
        borderColor:'#808080',
        borderRadius:50,
        borderStyle:'solid',
        borderWidth:10,
        width:30,
        height:30
    },
    chipTop:{
        marginTop:5
    },
    chipBottom:{
        marginTop:5
    }

  });
