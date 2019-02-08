import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Container } from 'native-base'

export default class ScreenFour extends Component {
    static navigationOptions = { title: 'Sobre a empresa', header: null };

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <View style={styles.container}>
                <Container style={{
                    backgroundColor: '#00008B', flexDirection: 'row', alignItems: 'center', height: 30

                }}>
                    {/* // <TextBase style={{marginLeft:115, color:'white',fontWeight:'bold',fontSize:40}}>Lumenx</TextBase> */}
                </Container>


                <View style={{ flex: 6 }}>
                    <Text>Informação..</Text>
                </View>

                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.txtBtn}>Voltar</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    txtBtn: {
        fontSize: 22,
        backgroundColor: '#DCDCDC',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    btn: {
        margin: 20,
        backgroundColor: '#DCDCDC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'black'
    }

});
