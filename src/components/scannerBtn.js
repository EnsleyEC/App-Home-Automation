import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import dgram from 'dgram';
import axios from 'axios';
import {
    updateItem,
    size,
    removeItem,
    hasItem,
    toByteArray,
    multicastIP,
    multicastPort
} from '../lib/utilities';

export default class ScannerBtn extends Component {
    static navigationOptions = { title: 'Home', header: null };
    constructor() {
        super();
        this.availableDevices = {};
        this.chatter = [];
        this.multicastClient = null;
        this.deviceConnections = {};
        this.deviceAckTimes = {};
        this.pingTimer = null;
        this.arrayip = [];
        this.amountIp = null;
        this.state = { deviceDataList: [] };
    }

    getData() {
        this.state.deviceDataList = [];
        console.log('teste2');
        for (var i = 0; i < this.amountIp; i++) {
            console.log(i)
            axios.get(`http://${this.arrayip[i]}/deviceData`)
                .then(response => { this.state.deviceDataList.push(response.data) })
                .catch(() => { console.log('Error'); })
        }
        console.log(this.state.deviceDataList); //Send to screenOne
        return this.state.deviceDataList;
    }
    sendMessage(msg) {
        console.log(msg);
        this.multicastClient.send(msg, 0, msg.length, multicastPort, multicastIP, function (err) {
            if (err) throw err;
            console.log('Multicast sent: ', msg);
        });
    }
    scan() {
        const buf = toByteArray('D');
        console.log('SCAN FOR DISCOVERY');
        this.sendMessage(buf);
    }

    startMulticast() {
        if (this.multicastClient) {
            console.log('Multicast already started...');
            this.scan();
            this.arrayip = [];
            return this.multicastClient;
        }
        this.multicastClient = dgram.createSocket('udp4');
        this.multicastClient.bind(multicastPort);

        this.multicastClient.on('message', (data, info) => {
            // console.log(data);
            const dataString = String.fromCharCode.apply(null, data);
            // console.log(dataString);
            this.amountIp = this.arrayip.push(dataString);
            console.log(this.amountIp, this.arrayip);
            this.getData();
        });
    }

    render() {
        // this.state.deviceDataList = JSON.stringify(this.state.deviceDataList);
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => this.startMulticast()}>
                    <Text style={styles.txtScan}>Scan</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'whitesmoke',
    },
    btn: {
        height: 40,
        // width: 350,
        marginTop: 0,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5585ff',
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
    },
    txtScan: {
        fontSize: 25,
        color: '#000',
        fontWeight: "100",
    }
})