import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, Dimensions, StyleSheet, TextInput, Picker, TouchableHighlight } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Right, Left, Content, ListItem, Separator } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import EditableText from '../../components/editableAmb'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderExtra from '../../components/header'
var db;
var navi;

let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

export default class ScreenHome extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: <HeaderExtra nav={navigation} />
    });
    constructor(props) {
        super(props);

        this.state = {
            amb: [],
            ambName: ''
        }
        navi = this;
        // abrindo o bd
        db = openDatabase({ name: 'lumenx.db' });
        // buscando os ambientes
        this.viewAllEnvironment(false)

    }

    componentDidMount() {
        this.props.navigation.setParams({ obj: this });
    }


    viewAllEnvironment = (chamadoPeloRefresh) => {
        var temp = []

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM environment order by name', [], (tx, results) => {

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));

                }

                this.state.amb = temp;
                this.forceUpdate()
                if (chamadoPeloRefresh == true) {
                    Alert.alert(
                        'Informação',
                        'Tela atualizada!',
                        [
                            {
                                text: 'Ok',
                                onPress: () => console.log('Nothing'),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            });

        })

    }

    register_environment = (envi_name) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO environment (name) VALUES (?)',
                [envi_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente salvo com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Ambiente salvo com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao salvar o ambiente!');
                    }
                }
            );
        });

    }


    delete_environment = (envi_name) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE from environment where name = ?',
                [envi_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente deletado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Ambiente deletado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao deletar o ambiente!');
                    }
                }
            );
        });

    }

    update_environment = (envi_new_name, envi_old_name, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE environment set name = ? where name = ?',
                [envi_new_name, envi_old_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Nome do ambiente atualizado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => nav.navigation.goback(),
                                },
                            ],
                            { cancelable: false }
                        );
                        Alert.alert(
                            'Informação',
                            'Deseja excluir o dispositivo?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Errou'),
                                    style: 'cancel',
                                },
                                { text: 'Sim', onPress: () => deletarDispositivoDoBanco(macDevice) },
                            ],
                            { cancelable: false },
                        );
                    } else {
                        alert('Erro ao atualizar o ambiente!');
                    }
                }
            );
        });

    }

    controlDelete(envi_name) {
        Alert.alert(
            'Informação',
            'Deseja excluir o ambiente?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('..'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.delete_environment(envi_name) },
            ],
            { cancelable: false },
        );
    }

    controlUpdate(envi_new_name, envi_old_name, nav) {
        Alert.alert(
            'Informação',
            'Deseja atualizar o nome do ambiente?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('..'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.controlUpdate(envi_new_name, envi_old_name, nav) },
            ],
            { cancelable: false },
        );
    }
    controlRegister(envi_name) {

        Alert.alert(
            'Informação',
            'Deseja criar o ambiente?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('..'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.register_environment(envi_name) },
            ],
            { cancelable: false },
        );

    }


    verify() {

        this.viewAllEnvironment(true)

    }

    render() {

        return (

            <View style={{ flex: 1 }}>

                <KeyboardAwareScrollView

                    style={{ backgroundColor: 'white' }}

                    resetScrollToCoords={{ x: 0, y: 0 }}


                    scrollEnabled={false}

                >

                    <View style={{ flex: 5, backgroundColor: 'white' }}>

                        <View style={{ flex: 3, flexDirection: 'row' }}>

                            <View style={{ alignItems: 'center', marginLeft: 90, backgroundColor: 'white' }}>

                                <Icon style={{ color: '#203864' }} size={100} name="home" />

                                <Text style={{ marginTop: 5, fontSize: 21, color: '#203864', fontWeight: 'bold' }}>Nome do ambiente</Text>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput style={{ color: 'black' }}
                                        placeholder="Digite o nome..."
                                        style={{ backgroundColor: 'white', fontSize: 18, color: '#203864' }}
                                        maxLength={20}
                                        width={150}
                                        onChangeText={(typedText) => this.setState({ ambName: typedText })}
                                    />
                                    <TouchableHighlight
                                        style={{ backgroundColor: 'white' }}
                                        onPress={() => this.controlRegister(this.state.ambName)}>
                                        <Icon size={27} name="check-square" />
                                        {/*  <Text style={{ fontWeight: 'bold', color: '#203864' }}>Ok</Text> */}
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 2, backgroundColor: 'white' }}>

                            <ScrollView >


                                <Collapse>

                                    <CollapseHeader>

                                        <Separator style={{ width: screenWidth, alignItems: 'center', color: '#203864' }} bordered >

                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#203864' }}>Ambientes</Text>

                                        </Separator>

                                    </CollapseHeader>
                                    <CollapseBody>
                                        {this.state.amb.map((amb) => {
                                            return (
                                                <View style={{ marginLeft: 15 }}>
                                                    <ListItem style={{ marginLeft: 10 }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Icon
                                                                name="trash" size={27} color="#203864" onPress={() => this.controlDelete(amb.name)}>
                                                            </Icon>
                                                            <EditableText style={{ marginHorizontal: 30, color: '#203864' }} amb={amb} />

                                                        </View>
                                                    </ListItem>
                                                </View>)
                                        })}
                                    </CollapseBody>

                                </Collapse>

                            </ScrollView>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>


        )
    }
}

const styles = StyleSheet.create({


});
