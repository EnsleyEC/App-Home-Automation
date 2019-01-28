import React, { Component } from "react";
import { Container, Content, Accordion } from "native-base";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangeState from './buttonChange'
import DeviceList from './deviceList'
import Test from './test'

export default class List extends Component {

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
            .then() /// TESTAR
            .catch(() => { console.log('Error'); })
            this.props._startMulticast()
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
        const dataArray = [
            { title: "Novos Dispositivos", content: <Test /> },
            { title: "Ambiente-1", content: "Lorem ipsum dolor sit amet" }
        ];
        const list = this.props.metaData || [];
        const newList = this.removeDuplicates(list, "ipdevice");
        const newListSort = newList.sort(this.dynamicSort("name"));

        return (
            <Container>
                <Content padder>
                    <Accordion
                        dataArray={dataArray}
                        icon="add"
                        expandedIcon="remove"
                        iconStyle={{ color: "green" }}
                        expandedIconStyle={{ color: "red" }}
                    />
                </Content>
            </Container>
        );
    }
}