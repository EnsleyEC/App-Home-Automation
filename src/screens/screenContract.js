import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, Button, StyleSheet } from 'react-native';
import { Text as TextBase, Icon as IconTwo, Container } from 'native-base'
import { Right, Left } from 'native-base';
import HeaderExtra from '../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
import { Alert } from 'react-native'
var db;

let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

export default class ScreenContract extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: <View style={{ width: screenWidth }}>
            <Container style={{
                backgroundColor: '#002540', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: screenHeight / 8
            }}>
                <Left >
                    <Icon size={22} style={{ marginLeft: 15, color: 'white' }} name={'arrow-left'}
                        onPress={() => { navigation.goBack() }} />
                </Left>
              {/*   <Image style={{ width: 80, height: 30 }}
                    source={require('../img/logo.png')} /> */}

                <Right />
            </Container>
        </View>
    });
    constructor(props) {
        super(props);


        db = openDatabase({ name: 'lumenx.db' });

        this.create_table()
        this.verifyContract()
    }

    create_table = () => {

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
                [],
                function (tx, res) {

                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS user(id INT NOT NULL PRIMARY KEY, concordou int)',
                            []
                        );

                    }
                    else {
                        console.log('Tabela existente da posicao 0: ' + res.rows.item(0).name)
                    }
                }
            );
        });
    }

    verifyContract = () => {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM user', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                if (temp.length != 0) { this.props.navigation.navigate('ScreenOne') }
                else {
                    tx.executeSql(
                        'INSERT INTO user(id,concordou) VALUES (?,?)',
                        [1, 1],
                        (tx, results) => {
                            console.log('Results', results.rowsAffected);

                            if (results.rowsAffected > 0) {
                                console.log('User salvo no banco com sucesso!')
                            } else {
                                console.log('Erro ao salvar o user no banco!')
                            }
                        }
                    );
                }


            });
        })

    }

    verify() {
        this.props.navigation.navigate('ScreenOne') 
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 0.5, alignItems: 'center' }}>

                    <Image style={{ width: 110, marginTop: 15, height: 40 }}
                        source={require('../img/lumenx2.png')} />
                    <Text style={{ marginTop: 15, fontSize: 18 }}>TERMO DE USO DO APLICATIVO</Text>
                </View>

                <ScrollView style={{ flex: 7, marginLeft: 15, marginRight: 5 }}>
                    <Text style={styles.texto}>
                        Bem-vindo a bordo!
                    </Text>

                    <Text style={styles.texto}>
                        Então você comprou um de nossos dispositivos de hardware da LUMENX e está começando a usar o aplicativo da LUMENXAPP e todas as suas funcionalidades! Qualquer informação que você compartilhe conosco (por exemplo criar uma conta LUMENXAPP) nos ajudará a fornecer serviços relacionados ao dispositivo LUMENXAPP e a melhorá-los para torna-los ainda melhores. Explicamos aqui nossas formas de coletar e usar informações e como protegeremos sua privacidade. Nesta política de privacidade “dados pessoais” significam informações que podem ser usadas para identificar um indivíduo, somente a partir destas informações, ou destas informações e outras informações sobre as quais temos acesso a este indivíduo, se caso forem necessários.  Coletamos dados pessoais e não pessoais para criar, facilitar e melhorar o máximo a experiencia do usuário.
                    </Text>

                    <Text style={styles.textoTitulo}>
                        1° ACEITAÇÃO
                    </Text>
                    <Text style={styles.texto}>
                        Este é um contrato firmado entre você, de agora em diante denominado como usuário, e a LUMENX Industria e Comercio de Produtos Eletrônicos Ltda, empresa cadastrada no CNPJ sob nº 16.705.855/0001-58 com sede no município de Santa Rita do Sapucaí - MG, a Rua da Inspiração 73A, e de agora em diante denominada simplesmente de LUMENX. Este “Termo de Uso de Aplicativo” rege o uso de todos os aplicativos disponibilizados gratuitamente pela LUMENX sejam para dispositivos móveis (Android, IOS, Windows Mobile), servidores, computadores pessoais (desktops) ou serviços web. Se você não concordar com estes termos não use este aplicativo. Você reconhece que analisou e aceitou as condições de uso. Leia-as atentamente pois o uso deste aplicativo significa que você aceitou todos os termos e concorda em cumpri-los. Se você, usuário, for menor de idade ou declarado incapaz em quaisquer aspectos, precisará da permissão de seus pais ou responsáveis que também deverão concordar com estes mesmos termos e condições.
                    </Text>

                    <Text style={styles.textoTitulo}>
                        2.LICENÇA LIMITADA
                    </Text>
                    <Text style={styles.texto}>
                        Você recebeu uma licença limitada, não transferível, não exclusiva, livre de royalties e revogável para baixar, instalar, executar e utilizar este aplicativo em seu dispositivo. Você reconhece e concorda que a LUMENX concede ao usuário uma licença exclusiva para uso e desta forma não lhe transfere os direitos sobre o produto. O aplicativo deverá ser utilizado por você, usuário. A venda, transferência, modificação, engenharia reversa ou distribuição bem como a cópia de textos, imagens ou quaisquer partes nele contido é expressamente proibida.
                    </Text>

                    <Text style={styles.textoTitulo}>
                        3.ALTERAÇÕES, MODIFICAÇÕES E RESCISÃO                    </Text>
                    <Text style={styles.texto}>
                        A LUMENX reserva-se no direito de, a qualquer tempo, modificar estes termos seja incluindo, removendo ou alterando quaisquer de suas cláusulas. Tais modificações terão efeito imediato. Após publicadas tais alterações, ao continuar com o uso do aplicativo você terá aceitado e concordado em cumprir os termos modificados. A LUMENX pode, de tempos em tempos, modificar ou descontinuar (temporária ou permanentemente) a distribuição ou a atualização deste aplicativo. A LUMENX não é obrigada a fornecer nenhum serviço de suporte para este aplicativo. O usuário não poderá responsabilizar a LUMENX em seus diretores, executivos, funcionários, afiliados, agentes, contratados ou licenciadores por quaisquer modificações, suspensões ou descontinuidade do aplicativo.
                    </Text>

                    <Text style={styles.textoTitulo}>
                        4.	CONSENTIMENTO PARA COLETA E USO DE DADOS
                    </Text>
                    <Text style={styles.texto}>
                        Você concorda que a LUMENX pode coletar e usar dados técnicos de seu dispositivo tais como especificações, configurações, versões de sistema operacional, tipo de conexão à internet e afins.
                    </Text>

                    <Text style={styles.textoTitulo}>
                        5.	ISENÇÃO DE GARANTIAS E LIMITAÇÕES DE RESPONSABILIDADE                     </Text>
                    <Text style={styles.texto}>
                        Este aplicativo estará em contínuo desenvolvimento e pode conter erros e, por isso, o uso é fornecido "no estado em que se encontra" e sob risco do usuário final. Na extensão máxima permitida pela legislação aplicável a LUMENX e seus fornecedores isentam-se de quaisquer garantias e condições expressas ou implícitas incluindo, sem limitação, garantias de comercialização, adequação a um propósito específico, titularidade e não violação no que diz respeito ao aplicativo e qualquer um de seus componentes ou ainda à prestação ou não de serviços de suporte. A LUMENX não garante que a operação deste aplicativo seja contínua e sem defeitos.                    </Text>
                    <Text style={styles.texto}>
                        Exceto pelo estabelecido neste documento não há outras garantias, condições ou promessas aos aplicativos, expressas ou implícitas, e todas essas garantias, condições e promessas podem ser excluídas de acordo com o que é permitido por lei sem prejuízo à LUMENX seus colaboradores.
                    </Text>

                    <Text style={styles.texto2}>
                        I.	A LUMENX não garante, declara ou assegura que o uso deste aplicativo será ininterrupto ou livre de erros e você concorda que a LUMENX poderá remover por períodos indefinidos ou cancelar este aplicativo a qualquer momento sem que você seja avisado.
                    </Text>
                    <Text style={styles.texto2}>
                        II.	A LUMENX não garante, declara nem assegura que este aplicativo esteja livre de perda, interrupção, ataque, vírus, interferência, pirataria ou outra invasão de segurança e isenta-se de qualquer responsabilidade em relação à essas questões. Você é responsável pelo backup do seu próprio dispositivo.
                    </Text>
                    <Text style={styles.texto2}>
                        III.	Em hipótese alguma a LUMENX, bem como seus diretores, executivos, funcionários, afiliadas, agentes, contratados ou licenciadores responsabilizar-se-ão por perdas ou danos causados pelo uso do aplicativo.                     </Text>
                    <Text style={styles.texto2}>
                        IV.	 A LUMENX isenta-se de qualquer responsabilidade direta ou indireta sobre estes conteúdos e o acesso aos mesmos é facultativo ao usuário, os conteúdos transmitidos pelos aplicativos de terceiros que afetem e/ou interferem de alguma maneira o funcionamento e/ou roubam dados diversos do LUMENXAPP tais como dados pessoais e/ou afins são de responsabilidade de seus idealizadores ou do usuário desde aplicativo.                    </Text>
                    <Text style={styles.texto2}>
                        V.	Para utilizar este aplicativo LUMENXAPP você está de acordo que LUMENX isenta-se de qualquer responsabilidade direta ou indireta.
                    </Text>

                    <Right style={{ marginTop: 20 }}>
                        <Text style={{
                            color: '#002540',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>
                            Santa Rita do Sapucaí 26 de março de 2019.
                    </Text>
                    </Right>

                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.5 }}>
                    <Button
                        onPress={() => this.verify()}
                        title="Li e concordo com os termos"
                        color="#002540"
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    texto: {
        marginTop: 10,
        color: '#002540',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textoTitulo: {
        marginTop: 15,
        color: '#002540',
        fontSize: 20,
        fontWeight: 'bold'
    },
    texto2: {
        marginTop: 10,
        color: '#002540',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20
    }


});
