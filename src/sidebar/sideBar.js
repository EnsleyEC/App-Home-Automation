import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SideBar extends Component {
  constructor() {
    super();

    
  }
  static navigationOptions = { title: 'Home', header: null };

    render() {
      
        return (
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <View style={styles.header}>
                    <Image style={{ width: 150, height: 60 }}
                        source={require('../img/logo-tok.png')} />
                </View>
                <View style={styles.btn}>
                    <View style={styles.innerIcon}>
                        <Icon name="refresh" size={30} color="#5585ff" />
                    </View>
                    <View style={styles.innerTxt}>
                        <TouchableHighlight
                            onPress={() => this.props._closeDrawer()}>
                            <Text style={styles.txt}>Escanear Dispositivos</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.btn}>
                    <View style={styles.innerIcon}>
                        <Icon name="rocket" size={30} color="#5585ff" />
                    </View>
                    <View style={styles.innerTxt}>
                        <TouchableHighlight>
                            <Text style={styles.txt}>Novo Ambiente</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={[styles.btn, { backgroundColor: '#fff' }]} />
                <View style={[styles.btn, { backgroundColor: '#fff' }]} />
                <View style={[styles.btn, { backgroundColor: '#fff' }]} />
                <View style={[styles.btn, { backgroundColor: '#fff' }]} />
                <View style={[styles.btn, { backgroundColor: '#fff' }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: '#5585ff',
    },
    btn: {
        flex: 1,
        marginTop: 2,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        width: 300,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    innerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerTxt: {
        flex: 3,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    txtHeader: {
        fontSize: 30,
        color: '#fff',
        fontWeight: "500",
    },
    txt: {
        fontSize: 18,
        fontWeight: "100",
    }
})