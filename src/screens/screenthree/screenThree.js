import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import EnvironmentDAO from '../../models/database/environment'
import { Text as TextBase, Icon, Container } from 'native-base'
import Environment from '../../components/environment'
var database = new EnvironmentDAO()

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Ambiente', header: null };

    constructor(props) {
        super(props);
        this.state = { nameAmb: '' };
    }

    _saveEnvironment(nameAmb) {
        database.register_environment(nameAmb, this.props)
    }

    _deleteEnvironment(nameAmb) {

        database.delete_environment(nameAmb, this.props)
        // remover o ambiente de todos os dispositivos também
    }

    _updateEnvironment(nameAmb) {
        database.update_environment(nameAmb, this.props)
        // atualizar o ambiente de todos os dispositivos também
    }

    _validateText() {
        if (this.state.nameAmb.length == 0) {
            Alert.alert(
                'Informação',
                'Campo do nome vazio!',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Campo do nome do ambiente vazio!'),
                    }
                ],
                { cancelable: false },
            );

            return false
        }
        return true
    }

    _confirmDeleteMessage(nameAmb) {

        if (this._validateText()) {
            Alert.alert(
                'Informação',
                'Deseja mesmo deletar o ambiente?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Operação cancelada!'),
                        style: 'cancel',
                    },
                    { text: 'Sim', onPress: () => this._deleteEnvironment(nameAmb) },
                ],
                { cancelable: false },
            );


        }



    }

    _confirmCreateMessage(nameAmb) {

        if (this._validateText()) {
            Alert.alert(
                'Informação',
                'Deseja mesmo criar o ambiente?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Operação cancelada!'),
                        style: 'cancel',
                    },
                    { text: 'Sim', onPress: () => this._saveEnvironment(nameAmb) },
                ],
                { cancelable: false },
            );
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Container style={{
                    backgroundColor: '#00008B', flexDirection: 'row', alignItems: 'center', height: 30

                }}>
                    {/* // <TextBase style={{marginLeft:115, color:'white',fontWeight:'bold',fontSize:40}}>Lumenx</TextBase> */}
                </Container>

                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Ambientes já cadastrados:</Text>
                    {
                        <Environment />
                    }

                </View>

                <View style={styles.containerBody}>
                    <Text style={styles.txtTittle}>Gerenciando ambientes</Text>
                    <TextInput
                        placeholder="Digite o nome do ambiente.."
                        style={styles.txtInput}
                        maxLength={20}
                        onChangeText={(typedText) => this.setState({ nameAmb: typedText })}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._confirmCreateMessage(this.state.nameAmb)}>
                            <Text style={styles.txtBtn}>Criar</Text>

                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={() => this._confirmDeleteMessage(this.state.nameAmb)}>
                            <Text style={styles.txtBtn}>Deletar</Text>

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
        justifyContent: 'center'
    },
    txtTittle: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    txtInput: {
        margin: 40,
        padding: 10,
        fontSize: 18,
        width: 300
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
        margin: 10,
        backgroundColor: '#DCDCDC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'black'
    }
});
