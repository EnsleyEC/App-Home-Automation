import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class ChangeState extends Component {
    constructor() {
        super();
    };

    render() {
        return(
            <Text
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => this.props._onStateChange(this.props._an)}>
                <Text style={{ fontSize: 20 }}>
                    {this.props._an.value}
                </Text>
            </Text>
        )

    }
}
// color: this.props.textColorState

// <ChangeState _onStateChange={this.onStateChange.bind(this)}
// textColorState={this.state.textColor}
// _an={an}/>