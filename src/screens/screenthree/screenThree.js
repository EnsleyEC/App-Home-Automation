import React, { Component } from 'react';
import { Alert,StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Criar Ambiente', header: null };

    constructor(props) {
        super(props);
        this.state = { newname: '', amb: ["Default"] };
    }
    _backScreen()
    {
        Alert.alert(
            'Informação',
            'Ambiente criado com sucesso!',
            [
              {
                text: 'Ok',
                onPress: () => this.props.navigation.goBack(),
              },
            ],
            { cancelable: false }
        );
    }
    
    _onPress(nameAmb) {
        // PRECISA GRAVAR NO SQLITE
        // Mostrando a mensagem
      
        // const x = this.state.amb.push(nameAmb);
        this._backScreen()
        //this.props.navigation.navigate('ScreenOne', { nameAmb });
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
                            onPress={() => this._onPress(this.state.nameAmb)}>
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
