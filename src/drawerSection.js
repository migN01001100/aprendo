import React from 'react';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer as PaperDrawer,
    Text,
    Appbar,
    Drawer
} from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const ItemsDrawer = (props) => {
    
    return(
        <PaperDrawer.Section style={styles.drawer}>
            <Appbar.Action icon={props.themeIco} onPress={props.action} style={styles.themeIco} color="#a7a7a7" />
            <Avatar.Text style={styles.avatar} size={50} label="MZ"/>
            <Title style={styles.name}>Mike Zozulia</Title>
            <Caption style={styles.name}>@Gojira_team</Caption>
            <Text style={styles.titleName}>Words:</Text>
            <PaperDrawer.Section>
            <Drawer.Section style={styles.row}>
                <Drawer.Section style={styles.section}>
                    <Paragraph style={styles.paragraph}>234</Paragraph>
                    <Caption style={styles.caption}>Learned</Caption>
                </Drawer.Section>
                <Drawer.Section style={styles.section}>
                    <Paragraph style={styles.paragraph}>1000</Paragraph>
                    <Caption style={styles.caption}>Saved</Caption>
                </Drawer.Section>
            </Drawer.Section>
            </PaperDrawer.Section>
            <PaperDrawer.Section style={styles.drawerSection}>
                <PaperDrawer.Item icon="account-settings" label="User" onPress={()=>{}}/>
                <PaperDrawer.Item icon="tune" label="Settings" onPress={()=>{}}/>
                <PaperDrawer.Item icon="star" label="Favorites" onPress={()=>{}}/>
                <PaperDrawer.Item icon="share" label="Share" onPress={()=>{}} />
            </PaperDrawer.Section>
            <Text style={styles.titleName}>About</Text>
                <PaperDrawer.Section style={styles.section}>
                    <Caption style={styles.caption}>Version:</Caption>
                    <Caption style={styles.caption}>0.0.1</Caption>
                </PaperDrawer.Section>
                <PaperDrawer.Section style={styles.section}>
                    <Caption style={styles.caption}>Contact:</Caption>
                    <Caption style={styles.caption}>gojira_team@gmail.com</Caption>
                </PaperDrawer.Section>
            <PaperDrawer.Section style={styles.bottomSection}>
                <PaperDrawer.Item icon="logout-variant" label="Logout" onPress={()=>{}} />
            </PaperDrawer.Section>
        </PaperDrawer.Section>        
    )};
const styles = StyleSheet.create({
    drawer:{ 
        flex: 1,
    },
    title:{
        flex:1
    },
    avatar:{
        position:'relative',
        marginBottom:15,
        marginLeft:20,
        marginTop:60
    },
    name:{
        position:'relative',
        marginLeft:20,
        fontWeight:'bold'
    },
    titleName:{
        position:'relative',
        marginLeft:20,
        fontWeight:'bold',
        marginTop:20
    },
    row:{
        marginLeft:10,
        marginBottom:30,
        flexDirection:'row',
        alignItems:'center'
    },
    section:{
        marginLeft:10,
        flexDirection:'row',
        alignItems:'center'
    },
    caption:{
        fontSize:14,
        marginRight:5
    },
    paragraph:{
        fontSize:14,
        marginRight:5,
        fontWeight:'bold'
    },
    drawerSection:{
        
    },
    bottomSection:{
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    themeIco:{
        position:'absolute',
        right: 0,
        transform:[{scale: 1.2}]
    } 
});