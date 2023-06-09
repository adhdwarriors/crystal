import React, {FC, useState, Component} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';

// import connect to connect with redux store
// import { connect } from 'react-redux';

// import action
// import { deleteNotes} from '../Public/redux/action/notes';

export const Thought = 
    function Thought(_props)
    {
        return (
            <TouchableOpacity
                onPress={() => {_props.openMod(_props.index)}}
            // onLongPress={()=>{this.deleteHandler(this.props.data)}}
                style={[styles.card,{backgroundColor: "#121212"}]}>

                {/* <Text style={styles.create}>{this.state.createdAt.getDate()} {this.state.monthList[this.state.createdAt.getMonth()]}</Text> */}
                <Text numberOfLines={1} style={styles.title}>{_props.data.title}</Text>
                <Text numberOfLines={1} style={styles.category}>{_props.data.category}</Text>
                <Text numberOfLines={4} style={styles.note}>{_props.data.desc}</Text>
            
            </TouchableOpacity>
        )
    }
// connect with redux,first param is map and second is component
// export default connect(mapStateToProps)(Card);
export default Thought;

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
        fontSize:12,
        top:10,
        left:10
    }
  });