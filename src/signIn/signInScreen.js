import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Title, Avatar, Button, HelperText } from "react-native-paper";
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from "../providers/authProvider";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

export const LogIn = ()=>{
    
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 

const SignIn = ({navigation})=> {
    const [visible, setVisible] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [focus, setFocus] = React.useState(false)
    const {signIn, signUp} = useAuth()

    const _showPass = ()=>{
        if(visible){
            setVisible(false)
        }else{
            setVisible(true)
        }
    }
    const _includesEmail = ()=>{
       if(email.includes('@') && email.includes('.com')){
           return false
       }else{
           return true
       }
    }
    const _checkForCredentials = ()=>{
        if(email === '' || pass === '' || _includesEmail()){
            return true
        }else{
            return false
        }
    }

    return(
        <View style={styles.mainContainer}>
            <Avatar.Icon style={styles.icon} size={60} icon="cat" />
            <Title style={styles.title}>Welcome to Simply!</Title>
            <View style={styles.inputContent}>
                <TextInput
                    label='Email'
                    mode='flat'
                    value={email}
                    onChangeText={text=>setEmail(text)}
                    onFocus={()=>setFocus(true)}
                />
                {focus?<HelperText type='error' visible={_includesEmail()}>Please enter a valid email using @ and .com</HelperText>:<View/>}
                <TextInput
                    label='Password'
                    value={pass}
                    secureTextEntry={!visible}
                    mode='flat'
                    right={<TextInput.Icon 
                        name={visible?"eye-outline":"eye-off-outline"} 
                        onPress={()=>{_showPass()}} />}
                        onChangeText={text=>setPass(text)}
                />
            </View>
            <Button 
                disabled={_checkForCredentials()} 
                mode='contained' style={styles.login} 
                onPress={()=>{signIn(email,pass)}}
            >Sign in</Button>
            <Button uppercase={false} style={styles.signIn} onPress={()=>{navigation.navigate('SignUp')}} >Sign up</Button>
        </View>
    )
}

const SignUp = ({navigation})=>{
    const {signUp} = useAuth()
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [repeatPass, setRepeatPass] = React.useState('')
    const [visible, setVisible] = React.useState(false)

    const _showPass = ()=>{
        if(visible){
            setVisible(false)
        }else{
            setVisible(true)
        }
    }

    return(
        <View style={styles.mainContainer}>
            <Title style={styles.title}>Sign Up</Title>
            <View style={styles.inputContent}>
                <TextInput
                    label='Email'
                    mode='flat'
                    value={email}
                    onChangeText={text=>setEmail(text)}
                />
                <TextInput
                    label='Password'
                    value={pass}
                    secureTextEntry={!visible}
                    mode='flat'
                    right={<TextInput.Icon 
                        name={visible?"eye-outline":"eye-off-outline"} 
                        onPress={()=>{_showPass()}} />}
                        onChangeText={text=>setPass(text)}
                />
                <TextInput
                    label='Repeat password'
                    value={repeatPass}
                    secureTextEntry={true}
                    mode='flat'
                    onChangeText={text=>setRepeatPass(text)}
                />
            </View>
            <Button 
                disabled={false} 
                mode='contained' 
                onPress={()=>{signUp(email,repeatPass)}} 
                style={styles.createAccount}
            >Create account</Button>
            <Button uppercase={false} style={styles.signIn} onPress={()=>{navigation.goBack()}} >Sign in</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center'
    },
    inputContent:{
        margin:30
    },
    icon:{
        alignSelf:'center'
    },  
    title:{
        textAlign:'center',
        fontSize:30,
        marginTop:30
    },
    login:{
        marginLeft:140,
        marginRight:140
    },
    createAccount:{
        marginLeft:90,
        marginRight:90
    },
    signIn:{
        marginLeft:140,
        marginRight:140,
        marginTop:30
    }
})