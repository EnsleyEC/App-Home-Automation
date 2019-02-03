import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import EnvironmentDAO from '../../models/database/environment'
import { Text as TextBase, Icon, Container } from 'native-base'
import Environment from '../../components/environment'
import ScreenOne from '../screenone/screenOne'

var database = new EnvironmentDAO()

export default class ScreenThree extends Component {
    static navigationOptions = { title: 'Ambiente', header: null };

    constructor(props) {
        super(props);
        this.state = { newname: '', amb: ["Default"] };
        alert(ScreenOne.environments)
    }

    _saveEnvironment(nameAmb) {
        // PRECISA GRAVAR NO SQLITE
        database.register_environment(nameAmb, '111.111.111-11', this.props)

    }

    componentWillMount()
    {
    }

    render() {

        return (
            <View style={styles.container}>
                <Container style={{
                    backgroundColor: '#C71585', flexDirection: 'row', alignItems: 'center', height: 30
                    
                }}>
                   {/* // <TextBase style={{marginLeft:115, color:'white',fontWeight:'bold',fontSize:40}}>Lumenx</TextBase> */}
                </Container>
                
                <View style = {{alignItems : 'center', marginTop: 15 }}>
                    <Text style = {{color:'black', fontWeight:'bold', fontSize:20}}>Ambientes já cadastrados:</Text>
                    {
                        <Environment/>
                    }
           
                </View>

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
        justifyContent: 'center'
    },
    txtTittle: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight:'bold', 
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
        fontWeight:'bold', 
        color: 'black'
    },
    btn: {
        margin: 20,
        backgroundColor: '#DCDCDC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight:'bold', 
        color: 'black'
    }
});
