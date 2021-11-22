import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Title, Avatar, Button, HelperText } from "react-native-paper";

export const SignInScreen = ()=> {
    const [visible, setVisible] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [focus, setFocus] = React.useState(false)

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
    const _saveCredentials = ()=>{
        console.log(email + ">>>" + pass)
        // setEmail('')
        // setPass('')
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
                onPress={()=>{_saveCredentials(email,pass)}}
            >Login</Button>
            <Button uppercase={false} style={styles.signIn} onPress={()=>{_saveCredentials()}} >Sign-In</Button>
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
    signIn:{
        marginLeft:140,
        marginRight:140,
        marginTop:30
    }
})