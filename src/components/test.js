import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity

} from 'react-native';
import ChangeState from './buttonChange';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Test extends Component {
    
    constructor() {
        super();
    };

    render() {
        return (
            <View>
            <TouchableOpacity>
            <Text style={styles.txtScan}>Device 1</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.txtScan}>Device 2</Text>
            </TouchableOpacity>
            </View>
            
        )

    }
}


const styles = StyleSheet.create({

    txtScan: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center'
        // fontWeight: "100",
    },
})
// color: this.props.textColorState

// <ChangeState _onStateChange={this.onStateChange.bind(this)}
// textColorState={this.state.textColor}
// _an={an}/>