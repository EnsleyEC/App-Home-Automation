import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import { Right, Left } from 'native-base';

export default class ScreenLampada extends Component {

    constructor(props) {
        super(props);



    }

   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Container style={{
                        backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
                    }}>

                        <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
                            source={require('../../img/logo.png')} />

                    </Container>
                </View>

                <View style={{ flex: 6, backgroundColor: 'white' }}>
                    <Text>oiiiiiiiiiiiii</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({


});

