import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import { Right, Left } from 'native-base';
import HeaderExtra from '../../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';

let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

export default class ScreenHelp extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: <View style={{ width: screenWidth }}>
            <Container style={{
                backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: screenHeight / 8
            }}>
                <Left >
                    <Icon size={22} style={{ marginLeft: 15, color: 'white' }} name={'arrow-left'}
                        onPress={() => { navigation.goBack() }} />
                </Left>
                <Image style={{ width: 80, height: 30 }}
                    source={require('../../img/logo.png')} />

                <Right />
            </Container>
        </View>
    });
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 6, backgroundColor: 'white' }}>
                    <ScrollView style={{ marginLeft: 15, marginRight: 5 }}>
                        <View style={{ alignItems: 'center' }}>

                            <Image style={{ width: 110, marginTop: 15, height: 40 }}
                                source={require('../../img/lumenx2.png')} />

                        </View>
                        <Text style={[styles.texto, { marginTop: 30 }]}>      A Lumenx Indústria e Comércio de Produtos Eletrônicos LTDA é uma empresa focada no desenvolvimento de soluções tecnológicas para segurança e automação residencial, preza pela inovação de seus produtos e a qualidade com que realiza seus trabalhos,
                        pois estas ações têm sido o fio condutor de atuação da empresa desde a sua constituição no ano de 2012, especificamente na incubadora de empresas do Instituto Nacional de Telecomunicações - Inatel.
                        </Text>

                        <Text style={[styles.texto, { marginTop: 5 }]}>      A Empresa se diferencia não apenas pela qualidade, mas também pelas funcionalidades dos produtos e ganhou notoriedade no mercado pelo desenvolvimento de interruptores inteligentes com tecnologia touch, sensível ao toque e com conexões sem fio, projetados para atender clientes que prezam pela tecnologia de ponta, design diferenciado e durabilidade dos produtos.
</Text>
<Text style={[styles.texto, { marginTop: 5 }]}>      Seja bem vindo para sentir, controlar e vivenciar novas experiências com a Lumenx.
</Text>

                        <View style={{ marginTop: 30, marginBottom: 10, alignItems: 'center' }}>
                            <Text style={styles.texto}>
                                Contato:
                            </Text>
                            <Text style={styles.texto}>

                                (35) 3473 – 0235
                        </Text>
                            <Text style={styles.texto}>
                                www.Lumenx.com.br
                        </Text>
                            <Text style={styles.texto}>
                                contato@lumenx.com.br
                        </Text>
                            <Text style={styles.texto}>
                                vendas@lumenx.com.br
                        </Text>
                        </View>


                    </ScrollView>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    texto: {
        color: '#002540',
        fontSize: 15,
        fontWeight: 'bold'
    }

});
