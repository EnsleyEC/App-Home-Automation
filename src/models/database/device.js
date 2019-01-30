import React, { Component } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { Alert } from 'react-native'
var db = openDatabase({ name: 'lumenx.db' });

export default class DeviceDAO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device_id: '',
            device_name: '',
            device_ip: '',
            device_state: '',
            device_enviroment: ''
        };
    }

    create_table = () => {

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='device'",
                [],
                function (tx, res) {

                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS device', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS device(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), ip VARCHAR(20), state VARCHAR(5), environment varchar(30))',
                            []
                        );

                    }
                    else {
                        console.log('Tabela existente da posicao 0: ' + res.rows.item(0).name)
                    }
                }
            );
        });
    }

    register_device = (dev_name, dev_ip, dev_state, dev_environment, nav) => {

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO device(name, ip, state, environment) VALUES (?,?,?,?)',
                [dev_name,dev_ip,dev_state,dev_environment],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Informação',
                            'Device salvo com sucesso!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                        nav.navigation.goBack(),
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

    viewAllDevices = () => {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM device', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    // mostrando os ambientes na tela
                    alert(results.rows.item(i).name)
                }
            });
        })

    }

   
}