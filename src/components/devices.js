import React, { Component } from 'react';
import { Switch } from 'react-native-switch'
import { Text, Button, View } from 'react-native'
import axios from 'axios';


export default class DeviceItems extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.item.name}</Text>
                        <View style={{ backgroundColor: '#00008B', height: 6 }} />
                      
                    </View>
                    <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.item.environment}</Text>
                        <View style={{ backgroundColor: '#00008B', height: 6 }} />
                    </View>
                    <View style={{ width: 120, height: 70, flexDirection: 'column' }}>

                        <Button style={{ width: 10, height: 15 }}
                            onPress={() => this.onStateChange(this.props.item.ipdevice, 'ON')}
                            title="ON"
                            color={this.props.item.value == "ON" ? "#C71585" : "gray"}
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button style={{ width: 10, height: 25 }}
                            onPress={() => this.onStateChange(this.props.item.ipdevice, 'OFF')}
                            title="OFF"
                            color="#00008B"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        
                      
                    </View>


                </View>
                <View style={{ backgroundColor: '#C71585', height: 6 }} />
            </View>
        )
    }

    onStateChange(ip, newValue) {

        var value;

        if (newValue === "ON") {
            console.log('ONLINE')
            value = 'ON'
        }
        else {
            console.log('OFE')
            value = 'OFF'
        }

        console.log('Valores')
        console.log(ip)
        console.log(newValue)

        axios.get(`http://${ip}/deviceValue?value=${value}`)
            .then(() => {
                console.log('Chegou a resposta.')

            }) 
            .catch(() => { console.log('Error'); })
    }
}
