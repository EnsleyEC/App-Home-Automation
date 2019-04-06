import React, { Component } from 'react';

import { View, Text, Image, Alert, ScrollView, Dimensions, StyleSheet, TextInput, Picker, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container } from 'native-base'

import { Right, Left, Content, ListItem, Separator } from 'native-base';
let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

export default class HeaderExtra extends Component {

    constructor(props) {
        super(props)
    }

    
    controlBack(screenOne) {
        
        this.props.nav.goBack()
        screenOne.verify(false)
        
    }

    render() {
        return (
            <View style={{ width: screenWidth }}>
                <Container style={{
                    backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: screenHeight / 8
                }}>
                    <Left >
                        <Icon size={22} style={{ marginLeft: 15, color: 'white' }} name={'arrow-left'}
                            onPress={() => { this.controlBack(this.props.nav.state.params.screenOne)}} />
                    </Left>
              {/*       <Image style={{ width: 80, height: 30 }}
                        source={require('../img/logo.png')} /> */}

                    <Right>
                        <Icon size={22} style={{ marginRight: 15, color: 'white' }} name="refresh" onPress={() => this.props.nav.state.params.obj.verify()} />
                    </Right>
                </Container>
            </View>
        );

    }

}

