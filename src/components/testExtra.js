import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';


export default class TestExtra extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    componentWillMount() {
        this.setState({ value: this.props.item.value });
    }

    changeName() {
        if (this.state.value == "ON") {
            this.state.value = "OFF"
        }
        else {
            this.state.value = "ON"
        }
        this.forceUpdate()

    }

    render() {

        return (
            <View>
                <Text style={this.state.value == "ON" ? { color: 'green' } : { color: 'red' }} onPress={() => this.changeName()}>{this.state.value}</Text>
            </View>

        );

    }

}

