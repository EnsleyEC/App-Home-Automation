import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Welcome', header: null };

    constructor(props) {
        super(props);
        this.state = { newname: '', amb: ["Default"] };
    }

    _onPress(nameAmb) {
            // PRECISA GRAVAR NO SQLITE
        // const x = this.state.amb.push(nameAmb);
        this.props.navigation.navigate('ScreenOne', {nameAmb});
    }

    _back = () => {
        this.props.navigation.navigate('ScreenOne');
    };

    render() {
        const { navigation } = this.props;
        const ip = navigation.getParam('ip', '');

        return (
            <View style={styles.container}>

                <View style={styles.containerBody}>
                    <Text style={styles.txtTittle}>Adicionar Ambiente</Text>
                    <TextInput
                        placeholder="Digite o nome do ambiente.."
                        style={styles.txtInput}
                        maxLength={20}
                        onChangeText={(typedText) => this.setState({ nameAmb: typedText })}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._onPress(this.state.nameAmb)}>
                            <Text style={styles.txtBtn}>Alterar</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._back()}
                        >
                            <Text style={styles.txtBtn}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerBody: {
        flex: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    txtTittle: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtInput: {
        margin: 40,
        padding: 10,
        fontSize: 18,
        width: 300
    },
    txtBtn: {
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
