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
import { AddWordScreen } from './src/addWordScreen';
import Main from './src/mainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { ItemsDrawer } from './src/drawerSection';
import merge from 'deepmerge';

const Drawer = createDrawerNavigator();
const combinedDefaultTheme = merge(PaperDefaultTheme,NavigationDefaultTheme);
const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const App = ({navigation}) => {
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
            <Drawer.Navigator drawerContent={()=>
            <ItemsDrawer 
            themeIco={theme?"weather-sunny":"weather-night"}
            action={()=>{theme?setTheme(false):setTheme(true)}}/>
            }>
              <Drawer.Screen name="Home" component={Main} />
              <Drawer.Screen name="Add" component={AddWordScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
};



export default App;
