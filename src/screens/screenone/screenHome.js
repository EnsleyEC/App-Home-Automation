import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Picker, TouchableHighlight } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Right, Left, ListItem, Separator } from 'native-base';

export default class ScreenHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amb: ''
        }

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Container style={{
                        backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
                    }}>

                        <Image style={{ width: 80, height: 30, marginHorizontal: 100 }}
                            source={require('../../img/logo.png')} />

                    </Container>
                </View>

                <View style={{ flex: 6, backgroundColor: 'white' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Icon style={{ color: '#203864' }} size={100} name="home" />
                        <View style={{ width: 250, marginLeft: 15, alignItems: 'center', backgroundColor: 'white' }}>
                            <Text style={{ marginTop: 20 }}>Nome do ambiente</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Digite o nome..."
                                    style={{ backgroundColor: 'white' }}
                                    maxLength={20}
                                    width={150}
                                    onChangeText={(typedText) => console.log('oiii')}
                                />
                                <TouchableHighlight
                                    style={{ backgroundColor: 'white' }}
                                    onPress={() => console.log('oi')}>
                                    <Text>Ok</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center", width:200, height:200 }}>
                        <Collapse>
                            <CollapseHeader>
                                <Separator bordered >
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text>oiii</Text>

                                    </View>
                                </Separator>
                            </CollapseHeader>
                            <CollapseBody>

                                <ListItem >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon style={{ marginLeft: 10 }}
                                            name="trash" size={30} color="#001321" onPress={() => console.log('oiiiiiiii')}>
                                        </Icon>

                                        {/* <EditableText style={{ marginHorizontal: 30 }} item={item} />
                                          <TextExtra style={{ marginHorizontal: 20 }} item={item} />
                                          */}
                                    </View>

                                </ListItem>


                                )
                              })
                              }

                            </CollapseBody>

                        </Collapse>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({


});
