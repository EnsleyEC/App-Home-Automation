import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import dgram from 'dgram';
import axios from 'axios';
import { Header, Left, Right, Icon, Container } from 'native-base'
import {
  toByteArray,
  multicastIP,
  multicastPort
} from '../../lib/utilities';

import MenuAmb from '../../components/menuamb'

// database
import EnvironmentDAO from '../../models/database/environment'

export default class ScreenOne extends Component {
  constructor() {
    super();

    // verificando a criação do banco
    var database = new EnvironmentDAO()
    database.create_database()

    this.multicastClient = null;
    this.arrayip = [];
    this.amountIp = null;
    this.amountObj = null;
    this.state = {
      deviceDataList: [],
      arrayip: [],
      amb: ["Default"]
    };

    this.changeName = this.changeName.bind(this);
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  static navigationOptions = { title: 'Home', header: null };

  componentWillMount() {
    this.startMulticast()
  }


  componentWillReceiveProps() {
    this.startMulticast()
  }

  changeName = (ip) => {
    this.props.navigation.navigate('ScreenThree', { ip });
  }

  addVar = () => {
    this.props.navigation.navigate('ScreenThree');
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

  getData() {
    for (var i = 0; i < this.amountIp; i++) {
      axios.get(`http://${this.state.arrayip[i]}/deviceData`)
        .then(response => {
          this.state.deviceDataList.push(response.data);
          this.setState({ deviceDataList: this.state.deviceDataList });
          console.log('deviceDataList: ', this.state.deviceDataList.length, this.state.deviceDataList);
        })
        .catch(() => { console.log('Error'); })
    }
    return this.state.deviceDataList
  }

  startMulticast() {
    this.setState({ deviceDataList: [] });
    if (this.multicastClient) {
      console.log('Multicast already started...');
      this.scan();
      this.setState({ arrayip: [] })
      return this.multicastClient;
    }
    this.multicastClient = dgram.createSocket('udp4');
    this.multicastClient.bind(multicastPort);

    this.multicastClient.on('message', (data, info) => {
      const dataString = String.fromCharCode.apply(null, data);
      this.amountIp = this.state.arrayip.push(dataString);
      console.log(this.amountIp, this.state.arrayip);
      this.getData();
    });
  }

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }

  render() {
    const { navigation } = this.props;
    const y = navigation.getParam('nameAmb');
    console.log("Y", y)
    if (y != undefined) {
      this.state.amb.push(y);
      this.state.amb = this.removeDuplicates(this.state.amb);
    }
    return (
      <View style={styles.mainContainer}>
        <Container style={{
          backgroundColor: 'blue', flexDirection: 'row', alignItems: 'center'
        }}>
          <Icon style={{ marginLeft: 10 }} name="menu" onPress={() => this.props.navigation.openDrawer()} />
        </Container>
        <View style={styles.img}>
          <Image style={{ width: 85, height: 30 }}
            source={require('../../img/lumenx2.png')} />
        </View>
        <TouchableOpacity style={styles.btn}
          onPress={() => this.startMulticast()}>
          <Text style={styles.txtScan}>Escanear Dispositivos</Text>
        </TouchableOpacity>

        <View style={{ flex: 6 }}>
          <MenuAmb metaData={this.state.deviceDataList}
            // _startMulticast={this.startMulticast.bind(this)} //TIRAR ESSA LINHA
            _changeName={this.changeName.bind(this)}
            dataArrayAmb={this.state.amb} />
        </View>
      </View>


    );

  }
}

const style1 = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5585ff',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  txt: {
    fontSize: 25,
    color: '#fff',
    paddingTop: 10,
    fontWeight: "100",
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  second: {
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
    // backgroundColor: '#5585ff',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
  },
  txtScan: {
    fontSize: 18,
    color: '#5585ff',
    fontWeight: "100",
  },
  img: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff'
  }
})