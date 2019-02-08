import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Picker
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
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import TextExtra from '../../components/testExtra'

export default class ScreenOne extends Component {

  static environment = ''

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
      spinner: true,
      amb_name: ''
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

    this.listaDeTeste = []
    this.listaDeTeste.push(ob)
    this.listaDeTeste.push(ob2)



  }

  componentWillMount() {
    this.startMulticast()
    this.table_envi.viewAllEnvironment(this)
    this.initTest()

    setTimeout(() => {

      this.setState({
        amb_name: 'Todos',
        spinner: false

      });

    }, 4000);
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

  updatePicker(op) {
    ScreenOne.environment = op;
    this.setState({ amb_name: op })
  }

  noDevicesFoundMessage() {
    Alert.alert(
      'Informação',
      'Nenhum dispositivo encontrado!',
      [
        {
          text: 'Ok',
          onPress: () => console.log(
            'Nenhum device encontrado!'),
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigation } = this.props;
    const y = navigation.getParam('nameAmb');
    console.log("Y", y)
    if (y != undefined) {
      this.state.amb.push(y);
      this.state.amb = this.removeDuplicates(this.state.amb);
    }

    // Ordenar a lista por ambiente
    this.listaDeTeste.sort(this.dynamicSort("environment"))
    this.newArray = this.listaDeTeste;

    // Verificando se é necessário fazer filtro
    if (this.state.amb_name != 'Todos')
      this.newArray = this.listaDeTeste.filter(device => device.environment == this.state.amb_name)

    // Se a lista de devices estiver vazia, nenhum dispostivo foi encontrado!
    if (this.newArray.length == 0 && this.state.spinner == false)
      this.noDevicesFoundMessage()



    return (


      <View style={styles.mainContainer}>
        {this.state.spinner == false ? (

          <View style={{ flex: 1 }} >
            <Container style={{
              backgroundColor: '#191970', flexDirection: 'row', alignItems: 'center', height: 30
            }}>
              {/*   <Icon style={{width:10, height:10}}
                  source={require('../../img/logo-tok.png')} />
          */}

              <Icon style={{ marginLeft: 15, color: 'white' }} name="menu" onPress={() => this.props.navigation.openDrawer()} />

              <Icon style={{ marginLeft: 290, color: 'white' }} name="refresh" onPress={() => this.verify()} />

            </Container>

            <View style={{ alignItems: 'center' }}>
              {/* <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#00008B', marginVertical: 10 }}>Selecione o ambiente: </Text> */}
              {/*          <Picker
                mode="dropdown"
                style={{ marginTop: 15, color: '#00008B', backgroundColor: '#DCDCDC', width: 170 }}
                selectedValue={this.state.amb_name}
                onValueChange={(itemValue, itemIndex) => { this.updatePicker(itemValue) }}
              >
                <Picker.item label='Todos' value='Todos' />
                {this.state.amb.map((item) => {
                  return (
                    <Picker.Item label={item.name} value={item.name} />
                  )
                })

                }
              </Picker> */}
            </View>

            <View style={{ flex: 6 }}>

              <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#00008B' }}>Ambientes</Text>
              </View>

              <View style={{ backgroundColor: '#C71585', height: 6 }} />
              <ScrollView>

                {this.state.amb.map((amb) => {
                  return (
                    <Collapse>
                      <CollapseHeader>
                        <Separator bordered>
                          <Text>{amb.name}</Text>
                        </Separator>
                      </CollapseHeader>
                      <CollapseBody>
                        {
                          this.listaDeTeste.map(function (item) {
                            return (
                              <ListItem >
                                <View style={{ flexDirection: 'column' }}>
                                  <Text>{item.ipdevice}</Text>

                                  <TextExtra item={item} />

                                </View>

                              </ListItem>
                            )
                          })
                        }

                      </CollapseBody>

                    </Collapse>
                  )
                })}
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
    backgroundColor: '#A9A9A9',
  },
  second: {
    flex: 1,
    backgroundColor: '#A9A9A9',
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