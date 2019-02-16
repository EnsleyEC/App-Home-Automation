import React from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native'



export default class EditableText extends React.Component {

    constructor(props){

        super(props)

        this.state={

            edited:false,
            name:'',

            Validate:{

                err:false,

                msg:''

            },

        }

    }

  render() {

    return (

     <View marginHorizontal = {30}>

         <TouchableOpacity

            onPress={()=>{

                this.setState({edited:!this.state.edited})

            }}

         >

            {

                this.state.edited?<TextInput

                style={{fontSize:this.props.fontSize,color:this.props.color,width:this.props.width,textAlign:this.props.textAlign,borderBottomColor: this.props.borderBottomColor,borderBottomWidth:this.state.Validate.err?this.props.borderBottomWidth:0}} 

                value={this.props.value}

                onChangeText={(val)=>{

                    this.setState({name:val})
                    
                }}

                onBlur={()=>{

                   if(this.state.Validate.err){

                       return;

                   }

                    this.setState({edited:false})

                }}

                autoFocus={this.state.edited}

                multiline={this.props.multiline}
                maxLength={40}
                width={100}
                numberOfLines={this.props.numberOfLines}
    
                />:<Text 

                style={{fontSize:this.props.fontSize,color:this.props.color,width:this.props.width,textAlign:this.props.textAlign}}                 

                >{this.props.item.name}</Text>

            }

         </TouchableOpacity>

        <Text style={{color:'red'}}>{this.state.Validate.msg}</Text>

     </View>

    )

  }

};