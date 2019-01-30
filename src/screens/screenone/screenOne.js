import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import dgram from 'dgram';
import axios from 'axios';
import { Text as TextBase,Icon, Container } from 'native-base'
import {
  toByteArray,
  multicastIP,
  multicastPort
} from '../../lib/utilities';

// database
import EnvironmentDAO from '../../models/database/environment'
import DeviceItems from '../../components/devices';
var obj;
export default class ScreenOne extends Component {

  constructor(props) {

    super(props);

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

  verify() {
    this.startMulticast()
    this.forceUpdate()
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
          backgroundColor: '#C71585', flexDirection: 'row', alignItems: 'center', height: 30
        }}>
          <Icon style={{ marginLeft: 15 }} name="menu" onPress={() => this.props.navigation.openDrawer()} />
          <Icon style={{ marginLeft: 290 }} name="refresh" onPress={() => this.verify()} />

        </Container>

        <View style={{ flex: 6 }}>

          <Text>Dispositivos</Text>


          {this.state.deviceDataList.map(
            function (item) {
              return (
                <DeviceItems key={item.id} item={item}/>
              )
            })}


        </View>
        <View style={styles.img}>
          <Image style={{ width: 110, height: 40 }}
            source={require('../../img/lumenx2.png')} />
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
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: "100",
    fontWeight: 'bold',
  },
  img: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff'
  },
  titleApp: {
    color: 'white',
    fontSize: 30,
    marginLeft: 75

  },
  headerApp: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuDrawer: {
    marginLeft: 10
  }
})