import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangeState from './buttonChange'

export default class DeviceList extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      value: "",
      // textValue:"OFF",
      // textColor: "#b71616",
    }
    this.onStateChange = this.onStateChange.bind(this);
  }

  onStateChange(an) {
    const newState = !this.state.toggle;
    const value = newState ? 'ON' : 'OFF';
    this.setState({ toggle: newState });
    this.state.textColor = newState ? "#007003" : "#b71616";
    // this.state.textValue = newState ? "ON" : "OFF";

    axios.get(`http://${an.ipdevice}/deviceValue?value=${value}`)
      .then(() => {
        console.log('Chegou a resposta.') 
        an.value = value;
        this.forceUpdate();
       
        
      }) /// TESTAR
      .catch(() => { console.log('Error'); })
  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
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

  render() {
    const { toggle } = this.state;
    const list = this.props._metaData || [];
    // console.log("_----metaData", list)
    const newList = this.removeDuplicates(list, "ipdevice");
    const newListSort = newList.sort(this.dynamicSort("name"));
    return newListSort.map(an => (
      <View style={{ flex: 6 }} key={an.ipdevice} >
        <ScrollView>
          <View style={styles.deviceBox}>
            <View style={styles.btnDevice}>
              <Icon style={styles.btnIcon}
                onPress={() => this.props.__changeName(an.ipdevice)} //an.ipDevice
                name="pencil" size={20} color="#5585ff">
              </Icon>

              <Text style={styles.btnTxt}>
                <Text style={styles.txt}>{an.name}</Text>
              </Text>

            </View>

            <View style={styles.tabbutton}>
              <ChangeState _onStateChange={this.onStateChange.bind(this)}
                textColorState={this.state.textColor}
                _an={an} />
            </View>
          </View>
        </ScrollView>
      </View>
    )

    )
  }
}

const styles = StyleSheet.create({
  deviceBox: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#fff', //whitesmoke
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#ccc",
  },
  btnDevice: {
    // margin: 20,
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    marginLeft: 10,
    flex: 1,
    // backgroundColor: '#ccc',
    paddingLeft: 15,

  },
  btnTxt: {
    // margin: 20,
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'whitesmoke',
  },
  txtScan: {
    fontSize: 25,
    color: '#000',
    fontWeight: "100",
  },
  txt: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

})


// <Text
// style={{
//     justifyContent: 'center',
//     alignItems: 'center',
// }}
// onPress={() => this.onStateChange(an)}>
// {console.log("an", an.ipdevice)}
// <Text style={{ fontSize: 20, color: this.state.textColor }}>
//     {an.value}</Text>
// </Text>