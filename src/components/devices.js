import React, { Component } from 'react';
import { Switch } from 'react-native-switch'
import { Text, Button, View } from 'react-native'
import axios from 'axios';


export default class DeviceItems extends Component {

    constructor(props) {
        super(props)
        console.log('valores')
        console.log(this.props.item.ipdevice)
        console.log(this.props.item.value)

    }

    render() {
        return (
            <View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.props.item.ipdevice}</Text>
                        <View style={{ backgroundColor: '#00008B', height: 6 }} />
                      
                    </View>
                    <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Ambiente</Text>
                        <View style={{ backgroundColor: '#00008B', height: 6 }} />
                    </View>
                    <View style={{ width: 120, height: 70, flexDirection: 'column' }}>

                        <Button style={{ width: 10, height: 15 }}
                            onPress={() => this.onStateChange(this.props.item.ipdevice, 'ON')}
                            title="ON"
                            color="#C71585"
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
            </View>
        )
    }

    /*
    
    <Switch
                   value={this.props.item.value == 'ON' ? true : false}
                   onValueChange={(val) => this.onStateChange(this.props.item.ipdevice, val)}
                   disabled={false}
                   activeText={'On'}
                   inActiveText={'Off'}
                   backgroundActive={'#C71585'}
                   backgroundInactive={'gray'}
                   circleActiveColor={'#FFFFFF'}
                   circleInActiveColor={'#FFFFFF'} />
 
    */

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
                //this.forceUpdate()

            }) /// TESTAR
            .catch(() => { console.log('Error'); })
    }
}
