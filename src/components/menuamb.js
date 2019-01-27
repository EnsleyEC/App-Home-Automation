import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Test from './test'
import DeviceList from '../components/deviceList'


export default class MenuAmb extends Component {


  state = {
    activeSections: []
  };

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        {section.content}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const SECTIONS = [
      {
        title: 'Novos dispositivos',
        content: <DeviceList
          _metaData={this.props.metaData}
        // __startMulticast={this.props._startMulticast()}
          __changeName={this.props._changeName.bind(this)}
        // dataArrayAmb={this.state.amb}
        />,
      },
      {
        title: 'Ambiente-1',
        content: <Test />,
      }
    ];
    _metaData = this.props.metaData;
    console.log("_metaData", _metaData)
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        // renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        icon="add"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
});