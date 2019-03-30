import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, Dimensions, StyleSheet, TextInput, Picker, TouchableHighlight } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Right, Left, Content, ListItem, Separator } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import EditableText from '../../components/editableDev'
import HeaderExtra from '../../components/header'
var db;

let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

export default class ScreenLampada extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: <HeaderExtra nav={navigation} />
    });
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            amb: [],
            deviceName: ''
        }
        // abrindo o bd
        db = openDatabase({ name: 'lumenx.db' });
        // buscando os ambientes
        this.viewAllDevices(false)
        this.viewAllEnvironment()
    }

    componentDidMount() {
        this.props.navigation.setParams({ obj: this });
    }

    viewAllDevices = (chamadoPeloRefresh) => {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM device', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {

                    temp.push(results.rows.item(i));

                }

                this.state.devices = temp;

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


    viewAllEnvironment = () => {

        var temp = []

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM environment order by name', [], (tx, results) => {

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));

                }

                this.state.amb = temp;
                this.forceUpdate()

            });

        })

    }

    updateAmbDevice = (newAmbDevice, device_mac, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE device set amb = ? where mac = ?',
                [newAmbDevice, device_mac],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Ambiente do dispositivo atualizado com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log('Ambiente do device atualizado com sucesso!'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Erro ao atualizar o ambiente do dispositivo!');
                    }
                }
            );
        });

    }

    mudarAmbiente(amb, device) {
        Alert.alert(
            'Informação',
            'Deseja mesmo trocar de ambiente?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Errou'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.trocarAmbiente(amb, device) },
            ],
            { cancelable: false },
        );
    }

    trocarAmbiente(amb, device) {
        this.updateAmbDevice(amb.name, device.mac)
    }

    verify() {

        this.viewAllDevices(true)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>


                <View style={{ flex: 6, backgroundColor: 'white', alignItems: 'center' }}>

                    <Left style={{ marginLeft: 10 }}>
                        <Icon style={{ color: '#203864' }} size={100} name="lightbulb-o" />
                    </Left>
                    <View style={{ flex: 3, flexDirection: 'row' }}>



                        <Text style={{ fontSize: 25, marginLeft: 120, fontWeight: 'bold', color: '#203864', marginTop: 80 }}>Interruptor</Text>

                        <Right />

                    </View>

                    <View style={{ flex: 6, backgroundColor: 'white' }}>

                        <ScrollView >

                            {this.state.devices.map((device) => {
                                return (


                                    <View>
                                        <Collapse>

                                            <CollapseHeader>

                                                <Separator style={{ width: screenWidth, alignItems: 'center', fontWeight: 'bold', color: '#203864' }} bordered >

                                                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontWeight: 'bold', color: '#203864' }}>{device.name}</Text>

                                                </Separator>

                                            </CollapseHeader>
                                            <CollapseBody>
                                                {this.state.amb.map((amb) => {

                                                    return (
                                                        <View style={{}}>
                                                            {amb.name != device.amb ? (
                                                                <View style={{ justifyContent: 'center' }}>

                                                                    <ListItem >

                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Left>
                                                                                <TouchableHighlight
                                                                                    onPress={() => this.mudarAmbiente(amb, device)}>
                                                                                    <Icon size={27} name="check-square" />

                                                                                </TouchableHighlight>
                                                                                <Text style={{ marginLeft: 20, fontSize:18 }}>{amb.name}
                                                                                </Text>

                                                                            </Left>


                                                                        </View>

                                                                    </ListItem>


                                                                </View>
                                                            ) : null}
                                                        </View>
                                                    )
                                                })}
                                            </CollapseBody>

                                        </Collapse>
                                    </View>
                                )
                            })
                            }

                        </ScrollView>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({


});
