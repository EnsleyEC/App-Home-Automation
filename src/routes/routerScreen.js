import React, { Component } from 'react';

import { createDrawerNavigator,    DrawerItems } from 'react-navigation';
import ScreenOne from "../screens/screenone/screenOne";
import ScreenTwo from "../screens/screentwo/screenTwo";
import ScreenThree from "../screens/screenthree/screenThree";
import { SafeAreaView,
         View,
         ScrollView
          } from "react-native"


const CustomDrawerComponent = (props) => (
    <SafeAreaView style = {{ flex:1 }}>
    <View style = {{height:150, backgroundColor: 'white',alignItems:'center',justifyContent:'center'}}>
    </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>

    </SafeAreaView>

)

const App = createDrawerNavigator({
    Home: ScreenOne,
    SecondScreen: ScreenTwo,
    ThirdScreen: ScreenThree},
    {
    contentComponent: CustomDrawerComponent 
    }
)

export default App;

