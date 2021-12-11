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
import { useSchemas } from './providers/schemasProvider';
import { useAuth } from './providers/authProvider';


export const ItemsDrawer = props => {
    const {wordsSaved, wordsLearnt} = useSchemas()
    const {user, signOut} = useAuth()
    

    return(
        <PaperDrawer.Section style={styles.drawer}>
            <Appbar.Action icon={props.themeIco} onPress={props.action} style={styles.themeIco} color="#a7a7a7" />
            <Avatar.Text style={styles.avatar} size={50} label="CU"/>
            <Title style={styles.name}>Custom User</Title>
            <Caption style={styles.name}>@CustomUser</Caption>
            <Text style={styles.titleName}>Words:</Text>
            <PaperDrawer.Section>
            <Drawer.Section style={styles.row}>
                <Drawer.Section style={styles.section}>
                    <Paragraph style={styles.paragraph}>{wordsLearnt}%</Paragraph>
                    <Caption style={styles.caption}>Learnt</Caption>
                </Drawer.Section>
                <Drawer.Section style={styles.section}>
                    <Paragraph style={styles.paragraph}>{wordsSaved}</Paragraph>
                    <Caption style={styles.caption}>Saved</Caption>
                </Drawer.Section>
            </Drawer.Section>
            </PaperDrawer.Section>
            <PaperDrawer.Section style={styles.drawerSection}>
                <PaperDrawer.Item icon="earth" label="Language" onPress={()=>{props.navigation.navigate('Language')}}/>
                <PaperDrawer.Item icon="filter" label="Filter" onPress={()=>props.navigation.navigate('Filter')}/>
                <PaperDrawer.Item icon="brain" label="Studying" onPress={()=>props.navigation.navigate('Studying')}/>
                <PaperDrawer.Item icon="bookshelf" label="Learnt" onPress={()=>props.navigation.navigate('Learnt')}/>
                <PaperDrawer.Item icon="information-outline" label="About" onPress={()=>{}}/>
            </PaperDrawer.Section>
                    <PaperDrawer.Item style={styles.bottomSection} icon="location-exit" label="Sign Out" onPress={()=>signOut()}/>
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
        marginLeft:20,
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