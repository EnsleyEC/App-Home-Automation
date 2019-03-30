import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';
import axios from 'axios';
import { Switch } from 'react-native-switch';


export default class SwitchExtra extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ip: '',
            value: ''
        }
    }

    componentWillMount() {
        this.setState({ value: this.props.item.value == "ON" ? true : false, ip: this.props.item.ip });
    }

    mudarEstado() {
        var value;

        if (this.state.value == true) {
            this.state.value = false
            value = 'OFF';

        }
        else {
            this.state.value = true
            value = 'ON';
        }

        axios.get(`http://${this.state.ip}/deviceValue?value=${value}`)
            .then(() => {
                console.log('Chegou a resposta.')
            })
            .catch(() => { console.log('Error'); })


        this.forceUpdate()

    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text>..............</Text>  */}
                <Switch
                    size={15}
                    value={this.state.value}
                    activeText={'ON'}
                    inActiveText={'OFF'}
                    backgroundActive={'#203864'}
                    backgroundInactive={'#bdbebd'}
                    circleActiveColor={'white'}
                    circleInActiveColor={'white'}
                    onValueChange={(val) => this.mudarEstado(val)}
                />
            </View>

        );

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

    }

}

