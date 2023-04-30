import React, {FC, useState, Component, useEffect} from 'react';
import {TouchableOpacity, View, Text, Button, TextInput, Alert, Pressable, StyleSheet} from 'react-native';

// import connect to connect with redux store
// import { connect } from 'react-redux';

// import action
// import { deleteNotes} from '../Public/redux/action/notes';

export const ThoughtCardMag = 
    function ThoughtCardMag(_props)
    {
        console.log(_props.data);
        const [title, setTitle] = useState<string>(_props.data.title);
        const [desc, setDesc] = useState<string>(_props.data.desc);
        
        // useEffect(() => {
        //     _props.editThought();
        //   }, [_props.editThought, title, desc]);

        return (
            <TouchableOpacity
                onPress={() => {_props.openMod(_props.data.id)}}
                // onLongPress={()=>{this.deleteHandler(this.props.data)}}
                style={[styles.card,{backgroundColor: "#121212"}]}>

                {/* <Text style={styles.create}>{this.state.createdAt.getDate()} {this.state.monthList[this.state.createdAt.getMonth()]}</Text> */}
                <TextInput
                    style={styles.note}
                    onChangeText={setTitle}
                    value={title}
                    numberOfLines={1}
                />
                <TextInput
                    style={styles.note}
                    onChangeText={setDesc}
                    value={desc}
                    numberOfLines={4}
                />
                <View>
                
                </View>
            </TouchableOpacity>
        )
    }
// connect with redux,first param is map and second is component
// export default connect(mapStateToProps)(Card);
export default ThoughtCardMag;

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderRadius: 5,
        margin:20,
        paddingRight:20,
        width:138,
        height:136,
        color: '#fff',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
    create:{
        fontSize:11,
        alignSelf:'flex-end',
        color: '#fff',
        right:-10,
        top:5
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        top:10,
        left:10,
    },
    category:{
        color: '#FFFBFB',
        fontSize: 10,
        top:8,
        left:10
    },
    note:{
        color: '#fff',
        fontSize:16,
        top:10,
        left:10
    }
  });