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
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
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
import Icon from 'react-native-vector-icons/FontAwesome';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'lumenx.db' });

export default class ScreenOne extends Component {

  static environment = ''

  constructor(props) {

    super(props);

    // verificando a criação do banco e tabelas
    this.table_envi = new EnvironmentDAO()
    this.table_envi.create_table()

    this.table_dev = new DeviceDAO()
    this.table_dev.create_table()


    this.multicastClient = null;
    this.arrayip = [];
    this.amountIp = null;
    this.amountObj = null;
    this.state = {
      deviceDataList: [],
      arrayip: [],
      amb: [],
      spinner: true,
      amb_name: '',
      devices: []
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
    this.state.devices = this.searchAllDevices()

    this.initTest()


    setTimeout(() => {

      this.setState({
        amb_name: 'Todos',
        spinner: false

      });

      this.state.amb.push({ id: 0, name: '*Sem ambiente*' })

      this.state.amb.sort(this.dynamicSort("name"))

      this.startMulticast()

      this.forceUpdate()


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
    this.searchAllDevices()
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

  removeDuplicatesTwo(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  DevicesFoundMessage() {
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

  searchAllDevices() {

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM device', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }

        this.state.devices = temp;

      });
    })

  }

  validate(devices) {

    var resp = -1;

    // verificando se alguem dos dados da lista estão no banco
    for (i = 0; i < devices.length; i++) {

      for (j = 0; j < this.state.devices.length; j++) {

        if (devices[i].name == this.state.devices[j].mac) {
          resp = 0;
          break;
        }

      }
      if (resp == -1) {
        this.table_dev.register_device(devices[i].name, devices[i].name, devices[i].ipdevice, devices[i].value, '*Sem ambiente*', this.props)
      }
    }

  }

  changeIps() {

    for (i = 0; i < this.state.deviceDataList.length; i++) {
      for (j = 0; j < this.state.devices.length; j++) {
        if (this.state.deviceDataList[i].name == this.state.devices[j].mac) {
          this.state.devices[j].ip = this.state.deviceDataList[i].ipdevice;

          break;
        }
      }
    }

  }

  render() {
    const { navigation } = this.props;
    const y = navigation.getParam('nameAmb');
    console.log("Y", y)
    if (y != undefined) {
      this.state.amb.push(y);
      this.state.amb = this.removeDuplicates(this.state.amb);
    }

    const newList = this.removeDuplicatesTwo(this.state.deviceDataList, "name")
    this.state.deviceDataList = newList;

    // verifica quem está novo na rede e salva no banco sem ambiente
    this.validate(this.state.deviceDataList)

    this.changeIps()

    return (


      <View style={styles.mainContainer}>
        {this.state.spinner == false ? (

          <View style={{ flex: 1 }} >
            <Container style={{
              backgroundColor: '#002540', flexDirection: 'row', alignItems: 'center', height: 30
            }}>


              <IconTwo style={{ marginLeft: 15, color: 'white' }} name="menu" onPress={() => this.props.navigation.openDrawer()} />
              <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
                source={require('../../img/logo.png')} />

              <IconTwo style={{ marginLeft: 5, color: 'white' }} name="refresh" onPress={() => this.verify()} />

            </Container>

            <View style={{ alignItems: 'center' }}>
              {/* <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#00008B', marginVertical: 10 }}>Selecione o ambiente: </Text> */}
              <Picker
                mode="dropdown"
                style={{ marginTop: 15, color: '#00008B', backgroundColor: '#DCDCDC', width: 170 }}
                selectedValue={this.state.amb_name}
                onValueChange={(itemValue, itemIndex) => { this.updatePicker(itemValue) }}
              >
                <Picker.item key='id' label='Todos' value='Todos' />
                {this.state.amb.map((item) => {
                  return (
                    <Picker.Item key={item.id} label={item.name} value={item.name} />
                  )
                })

                }
              </Picker>
            </View>

            <View style={{ flex: 6 }}>

              <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#001B2E' }}>Ambientes</Text>
              </View>

              <View style={{ backgroundColor: '#001B2E', height: 6 }} />
















              <ScrollView>

                {this.state.amb.map((amb) => {
                  return (

                    <View>
                      {this.state.amb_name == 'Todos' ? (
                        <Collapse key={amb.name}>
                          <CollapseHeader>
                            <Separator bordered>
                              <Text style={{ color: 'black' }}>{amb.name}</Text>
                            </Separator>
                          </CollapseHeader>
                          <CollapseBody>
                            {this.state.devices.map(function (item) {
                              return (
                                <View>
                                  {amb.name == item.amb ? (


                                    <ListItem >
                                      <View style={{ flexDirection: 'row' }}>
                                        <Icon style={{ marginLeft: 10 }}
                                          name="pencil" size={20} color="#001321">
                                        </Icon>
                                        <Text style={{ marginHorizontal: 30 }}>{item.ip}
                                        </Text>
                                        <TextExtra item={item} />

                                      </View>

                                    </ListItem>
                                  ) : null}
                                </View>
                              )
                            })
                            }

                          </CollapseBody>

                        </Collapse>
                      ) : (
                          <View>
                            {this.state.amb_name == amb.name && (
                              <Collapse key={amb.name}>
                                <CollapseHeader>
                                  <Separator bordered>
                                    <Text style={{ color: 'black' }}>{amb.name}</Text>
                                  </Separator>
                                </CollapseHeader>
                                <CollapseBody>
                                  {this.state.devices.map(function (item) {
                                    return (
                                      <View>
                                        {amb.name == item.amb ? (


                                          <ListItem >
                                            <View style={{ flexDirection: 'row' }}>
                                              <Icon style={{ marginLeft: 10 }}
                                                name="pencil" size={20} color="#001321">
                                              </Icon>
                                              <Text style={{ marginHorizontal: 30 }}>{item.ip}
                                              </Text>
                                              <TextExtra item={item} />

                                            </View>

                                          </ListItem>
                                        ) : null}
                                      </View>
                                    )
                                  })
                                  }

                                </CollapseBody>

                              </Collapse>
                            )}
                          </View>)}

                    </View>
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