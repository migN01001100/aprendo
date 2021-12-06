import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper'
import React from 'react';
import {WordScreen} from './src/wordScreen';
import {FilterScreen} from './src/filterScreen';
import { StudyingScreen } from './src/studyingScreen';
import { LearntScreen } from './src/learntScreen';
import Main from './src/mainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { ItemsDrawer } from './src/drawerSection';
import { SelectLanguageScreen } from './src/languageScreen'
import merge from 'deepmerge';
import { SchemaProvider } from './src/providers/schemasProvider';

const Drawer = createDrawerNavigator();
const combinedDefaultTheme = merge(PaperDefaultTheme,NavigationDefaultTheme);
const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const App = () => {
  const [theme, setTheme] = React.useState(false)
  const [switchTheme, setSwitchTheme] = React.useState(combinedDefaultTheme);
  
  React.useLayoutEffect(()=>{
    if(theme){
      setSwitchTheme(combinedDarkTheme)
    }
    else{
      setSwitchTheme(combinedDefaultTheme)
    }
  })

  return (
      <PaperProvider theme={switchTheme}>
        <NavigationContainer theme={switchTheme}>
          <SchemaProvider>
            <Drawer.Navigator initialRouteName="Home" drawerContent={({navigation})=>
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
          </SchemaProvider>  
        </NavigationContainer>
      </PaperProvider>
  );
};



export default App;
