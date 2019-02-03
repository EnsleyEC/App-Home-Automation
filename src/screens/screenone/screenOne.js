import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import dgram from 'dgram';
import axios from 'axios';
import { Text as TextBase, Icon, Container } from 'native-base'
import {
  toByteArray,
  multicastIP,
  multicastPort
} from '../../lib/utilities';

// database
import EnvironmentDAO from '../../models/database/environment'
import DeviceDAO from '../../models/database/device'
import DeviceItems from '../../components/devices';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ScreenOne extends Component {

  static environments = [];

  constructor(props) {

    super(props);

    // verificando a criação do banco e tabelas
    this.table_envi = new EnvironmentDAO()
    this.table_envi.create_table()


    var table_dev = new DeviceDAO()
    table_dev.create_table()
    // table_dev.register_device('Cel da Rafa', '111.111.111.111', 'OFF', this.props)
    // table_dev.viewAllDevices()

    this.multicastClient = null;
    this.arrayip = [];
    this.amountIp = null;
    this.amountObj = null;
    this.state = {
      deviceDataList: [],
      arrayip: [],
      amb: [],
      spinner: true
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

  initTest() {
    const ob = { "id": 1, "ipdevice": "111.111.111.111", "name": "Teste", "value": "OFF", "environment": "Sala" }
    const ob2 = { "id": 2, "ipdevice": "222.222.222.222", "name": "Teste 2", "value": "ON", "environment": "Cozinha" }

    const ob3 = { "id": 3, "ipdevice": "333.333.333.333", "name": "Teste 3", "value": "ON", "environment": "Garagem" }

    const ob4 = { "id": 4, "ipdevice": "111.111.111.111", "name": "Teste 4", "value": "OFF", "environment": "Sala" }
    const ob5 = { "id": 5, "ipdevice": "222.222.222.222", "name": "Teste 5", "value": "ON", "environment": "Quarto" }

    const ob6 = { "id": 6, "ipdevice": "333.333.333.333", "name": "Teste 6", "value": "ON", "environment": "Banheiro" }

    this.listaDeTeste = []
    this.listaDeTeste.push(ob)
    this.listaDeTeste.push(ob2)

    this.listaDeTeste.push(ob3)
    this.listaDeTeste.push(ob4)
    this.listaDeTeste.push(ob5)
    this.listaDeTeste.push(ob6)

  }

  componentWillMount() {
    this.startMulticast()
    this.table_envi.viewAllEnvironment(this)
    this.initTest()

    setTimeout(() => {

      this.setState({

        spinner: false

      });

    }, 6000);
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
    try {

      this.multicastClient.send(msg, 0, msg.length, multicastPort, multicastIP, function (err) {
        if (err) {

          Alert.alert(
            'Informação',
            'Problema de conexão',
            [
              {
                text: 'Ok',
                onPress: () => console.log('Erro da internet'),
              },
            ],
            { cancelable: false }
          );
        }
        console.log('Multicast sent: ', msg);
      });

    } catch (error) {
      console.log('Erro = ' + error)
    }
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
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  //  const newListSort = newList.sort(this.dynamicSort("name"));

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
        {this.state.spinner == false ? (

          <View style={{ flex: 1 }} >
            <Container style={{
              backgroundColor: '#C71585', flexDirection: 'row', alignItems: 'center', height: 30
            }}>

              <Icon style={{ marginLeft: 15 }} name="menu" onPress={() => this.props.navigation.openDrawer()} />

              <Icon style={{ marginLeft: 290 }} name="refresh" onPress={() => this.verify()} />

            </Container>

            <View style={{ flex: 6 }}>

              <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#00008B' }}>Dispositivos</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#00008B' }}>Nome</Text>
                </View>
                <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={{ fontWeight: 'bold', color: '#00008B' }} >Ambiente</Text>
                </View>
                <View style={{ width: 120, height: 70, backgroundColor: '#ffffff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#00008B' }}>Click</Text>

                </View>
              </View>
              <View style={{ backgroundColor: '#C71585', height: 6 }} />
              <ScrollView>
                {
                  this.listaDeTeste.map(

                    function (item) {

                      return (

                        <DeviceItems key={item.id} item={item} />

                      )

                    }
                  )
                }

              </ScrollView>

            </View>


            <View style={styles.img}>
              <Image style={{ width: 110, height: 40 }}
                source={require('../../img/lumenx2.png')} />
            </View>
          </View>

        ) : (
            <Spinner

              visible={this.state.spinner}

              textContent={'Loading...'}

              textStyle={{ color: '#FFF' }}

            />
          )}
      </View>


    );

  }

}

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