
import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native'

export default class Environment extends Component {

    constructor(props) {
        super(props)

        this.state = { envi_name: '' }
    }

    render() {

        return (
            <Picker
                style={{ color: '#00008B', backgroundColor: '#DCDCDC', width: 150, marginTop: 15 }}
                selectedValue={this.state.envi_name}
                onValueChange={op => { this.setState({ envi_name: op }) }}
            >
                <Picker.Item style={{ color: '#C71585' }} label='Ambiente 1' value='amb1' />
                <Picker.Item label='Ambiente 2' value='amb2' />
            </Picker>
        );
    }
}

