import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
  } from '@react-navigation/native';
  import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
  } from 'react-native-paper'
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import merge from 'deepmerge';
import { ItemsDrawer } from '../drawerSection';
import { SelectLanguageScreen } from '../languageScreen';
import { WordScreen } from '../wordScreen';
import { FilterScreen } from '../filterScreen';
import { StudyingScreen } from '../studyingScreen';
import { LearntScreen } from '../learntScreen';
import Main from '../mainScreen';

const Drawer = createDrawerNavigator()
const combinedDefaultTheme = merge(PaperDefaultTheme,NavigationDefaultTheme);
const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const NavigationScreen = () =>{
    const [theme, setTheme] = React.useState(false)
    const [switchTheme, setSwitchTheme] = React.useState(combinedDefaultTheme)
    
    React.useLayoutEffect(()=>{
      if(theme){
        setSwitchTheme(combinedDarkTheme)
      }
      else{
        setSwitchTheme(combinedDefaultTheme)
      }
    },[theme])

    return (
        <PaperProvider theme={switchTheme}>
          <NavigationContainer theme={switchTheme}>
              <Drawer.Navigator 
                initialRouteName="Home" 
                drawerContent={({navigation})=>
                    <ItemsDrawer 
                    themeIco={theme?"weather-sunny":"weather-night"}
                    action={()=>{theme?setTheme(false):setTheme(true)}}
                    navigation={navigation}/>
                    }>
                    <Drawer.Screen name="Home" component={Main} />
                    <Drawer.Screen name="Word" component={WordScreen} />
                    <Drawer.Screen name="Filter" component={FilterScreen} />
                    <Drawer.Screen name="Language" component={SelectLanguageScreen} />
                    <Drawer.Screen name="Studying" component={StudyingScreen} />
                    <Drawer.Screen name="Learnt" component={LearntScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}