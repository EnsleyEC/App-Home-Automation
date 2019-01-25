import React, { Component } from 'react';
import { Container, Content, Text, Button, Picker, Item } from 'native-base';

const data = [
        {'title' : 'Fruits',
        'items' : ["Banana", "Apple", "Strawberry"]
        },
        {'title' : 'Foods',
        'items' : ["1", "2", "3"]}
]

class Example extends Component {
  constructor() {
      super();
      this.state = {
          toggleDropdown: false
      }
  }
  onClickButton = () => {
      this.setState({
          toggleDropdown: !this.state.toggleDropdown
      })
  }
  render() {
    return (
        <Container>
          <Content>
            <Button primary onPress={this.onClickButton}>
                <Text>Click Me! </Text>
            </Button>
            {this.state.toggleDropdown &&  //check if toggle is true or false
                data.map((item, index) => { //loop the first dropdown
                    return (
                        <Content key={index}>
                        <Text style={{backgroundColor: '#CCC'}} >{item.title}</Text>
                        <Picker mode="dropdown" > 
                                {item.items.map((value, idx) => { //loop the second dropdown
                                    return(
                                        <Item key={idx} label={value} value={idx} />
                                    )
                                })}
                            </Picker>
                         </Content>
                    )
                })
            }
           </Content>
           <Content>
           <Button primary onPress={this.onClickButton}>
               <Text>Click Me! </Text>
           </Button>
           {this.state.toggleDropdown &&  //check if toggle is true or false
               data.map((item, index) => { //loop the first dropdown
                   return (
                       <Content key={index}>
                       <Text style={{backgroundColor: '#CCC'}} >{item.title}</Text>
                       <Picker mode="dropdown" > 
                               {item.items.map((value, idx) => { //loop the second dropdown
                                   return(
                                       <Item key={idx} label={value} value={idx} />
                                   )
                               })}
                           </Picker>
                        </Content>
                   )
               })
           }
          </Content>
        </Container>
    );
  }
}

export default Example