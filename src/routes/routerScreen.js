import React, { Component } from 'react';

import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import ScreenOne from "../screens/screenone/screenOne";
import ScreenTwo from "../screens/screentwo/screenTwo";
import ScreenThree from "../screens/screenthree/screenThree";
import ScreenFour from '../screens/screenfour/screenFour'

import {
    SafeAreaView,
    Text,
    View,
    ScrollView
} from "react-native"

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text>Olá</Text> */}
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>

)


const App = createDrawerNavigator({
    FirstScreen: ScreenOne,
    ThirdScreen: ScreenThree,
    FourthScreen: ScreenFour
},
    {
        contentComponent: CustomDrawerComponent
    }
)

export default App;

