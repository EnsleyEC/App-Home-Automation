import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity,View} from 'react-native';
import axios from 'axios'

export default class SimpleToggleButton extends Component {

    state ={
        toggle:false,
        value:""
    }
    

    _onPress(){
        const newState = !this.state.toggle;
        this.setState({toggle:newState});
        this.props.onStateChange && this.props.onStateChange(newState);
    }

    render() {
        const {toggle} = this.state;
        const textValue = toggle?"ON":"OFF";
        const textColor = toggle?"#007003":"#b71616";
                
        return (
            <Text
                style={{
                    // height: 60,
                    // width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => this._onPress()}>
                <Text style={{ fontSize: 20, color: textColor }}>{textValue}</Text>
            </Text>

        )
    }
}
