import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Card = ({ item }) => {
    return (
        
        <View style={styles.container}>
            <View style={{marginRight:10}}>
                <Icon name='bus' size={30} color="#526D82" />
                <Text style={{marginTop:10}}>{item.company}</Text>
            </View>
            <View style={styles.dashed} />
            <View style={styles.box}>
                <View style={styles.row}>
                    <Text>{item.from}</Text>
                    <Text>{item.to}</Text>
                </View>
                <View style={[styles.dashed, styles.dashedH]} />
                <View style={styles.row}>
                    <Text >{item.depatureHour}</Text>
                    <Text style={styles.text}>{item.duration}</Text>
                    <Text>{item.arrivalHour}</Text>
                </View>
            </View>
            <View style={styles.dashed} />

            <View style={{marginLeft:10}}>
                <Text style={styles.price}>Ticket price</Text>
                <Text>{item.price} TL</Text>

                <View style={[styles.row, {
                    justifyContent: 'space-around',
                }]}>
                    <Icon name='seat' size={30} color="#526D82" />
                    <Text>{item.availableSeats}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        shadowColor: '#526D82',
        elevation: 2,
        shadowOpacity: 0.5,
        shadowOffset: {

        },
        marginVertical:10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal:3
    },
    dashed:
    {
        height: '100%',
        width: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#27374D',
        borderStyle: 'dotted'
    },
    dashedH: {
        width: '100%',
        height: 1,
        marginVertical: 10
    },
    box: {
        marginHorizontal: 15,
        flex: 1
    },
    price: {
        color: '#526D82',
        marginBottom:10
    },
    text: {
        // marginVertical: 10,
        color: '#526D82',
        // fontSize: 16,
        // marginBottom: 10,
        marginHorizontal: 5
    },


});
export default Card
