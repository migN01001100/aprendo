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

const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  const [theme, setTheme] = React.useState(false)
  const [paperTheme, setPaperTheme] = React.useState(PaperDefaultTheme);
  const [navigationTheme, setNavigationTheme] = React.useState(NavigationDefaultTheme)
  
  React.useEffect(()=>{
    if(theme){
      setPaperTheme(PaperDarkTheme)
      setNavigationTheme(NavigationDarkTheme)
    }
    else{
      setPaperTheme(PaperDefaultTheme)
      setNavigationTheme(NavigationDefaultTheme)
    }
  })

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
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
