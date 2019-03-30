import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import { Right, Left } from 'native-base';

export default class ScreenHelp extends Component {

    constructor(props) {
        super(props);



    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <Container style={{
                        backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30
                    }}>

                        <Image style={{ width: 80, height: 30,marginHorizontal: 100 }}
                            source={require('../../img/logo-tok.png')} />

                    </Container>
                </View>

                <View style={{ flex: 6, backgroundColor: 'white' }}>
                    <ScrollView style={{marginLeft:15,marginRight:5}}>
                    <View style={{alignItems:'center'}}>
                   
                        <Image style={{ width: 110, marginTop:15, height: 40}}
                            source={require('../../img/lumenx2.png')} />
                                 
                    </View>
                        <Text style={[styles.texto, { marginTop: 30 }]}>      A Lumenx Indústria e Comércio de Produtos Eletrônicos LTDA é uma empresa focada no desenvolvimento de soluções tecnológicas para segurança e automação residencial, preza pela inovação de seus produtos e a qualidade com que realiza seus trabalhos,
                        pois estas ações têm sido o fio condutor de atuação da empresa desde a sua constituição no ano de 2012, especificamente na incubadora de empresas do Instituto Nacional de Telecomunicações - Inatel.
                        </Text>

                        <Text style={[styles.texto, { marginTop: 5 }]}>      A Empresa se diferencia não apenas pela qualidade, mas também pelas funcionalidades dos produtos e ganhou notoriedade no mercado pelo desenvolvimento de interruptores inteligentes com tecnologia touch, sensível ao toque e com conexões sem fio, projetados para atender clientes que prezam pela tecnologia de ponta, design diferenciado e durabilidade dos produtos.Seja bem vindo para sentir, controlar e vivenciar novas experiências com a Lumenx!
</Text>


                        <View style={{marginTop:30, marginBottom:10,alignItems:'center'}}>
                            <Text style={styles.texto}>
                                Contato:
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
