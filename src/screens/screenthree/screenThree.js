import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import EnvironmentDAO from '../../models/database/environment'
var database = new EnvironmentDAO()

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Criar Ambiente', header: null };

    constructor(props) {
        super(props);
        this.state = { newname: '', amb: ["Default"] };
    }

    _saveEnvironment(nameAmb) {
        // PRECISA GRAVAR NO SQLITE
        database.register_environment(nameAmb, '111.111.111-11', this.props)

    }

    render() {
        const { navigation } = this.props;
        const ip = navigation.getParam('ip', '');
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.containerBody}>
                    <Text style={styles.txtTittle}>Criar Ambiente</Text>
                    <TextInput
                        placeholder="Digite o nome do ambiente.."
                        style={styles.txtInput}
                        maxLength={20}
                        onChangeText={(typedText) => this.setState({ nameAmb: typedText })}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._saveEnvironment(this.state.nameAmb)}>
                            <Text style={styles.txtBtn}>Criar</Text>

                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.txtBtn}>Voltar</Text>
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
