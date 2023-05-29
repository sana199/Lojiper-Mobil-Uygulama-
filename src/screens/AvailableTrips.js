import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../components/Card';
import Button from '../components/Button';

const AvailableTrips = ({ route, navigation }) => {

    const [data, setData] = useState();
    const trips = [
        { from: 'Istanbul', to: 'Ankara', type: 'One-Way', date: "2023-06-02", availableSeats: 3, depatureHour: "01:30", arrivalHour: "05:30", price: "170.69", duration: "4 hr", company: "PAMMUKLE" },
        { from: 'Istanbul', to: 'Ankara', type: 'One-Way', date: "2023-06-02", availableSeats: 5, depatureHour: "11:30", arrivalHour: "15:00", price: "190.69", duration: "3 hr and 30 min", company: "ANADOL" },
        { from: 'Istanbul', to: 'Ankara', type: 'One-Way', date: "2023-06-02", availableSeats: 13, depatureHour: "11:30", arrivalHour: "16:00", price: "160.00 ", duration: "4 hr and 30 min", company: "ANADOL" },


        { from: 'Ankara', to: 'Istanbul', type: 'One-Way', date: "2023-06-03", availableSeats: 5, depatureHour: "11:30", arrivalHour: "15:00", price: "200.00", duration: "3 hr and 30 min", company: "PAMMUKLE" },
        { from: 'Ankara', to: 'Istanbul', type: 'Round-Trip', date: ["2023-06-03", "2023-06-05"], availableSeats: 20, depatureHour: "16:30", arrivalHour: "20:00", price: "180.00", duration: "3 hr and 30 min", company: "ANADOL" },
        { from: 'Istanbul', to: 'Ankara', type: 'Round-Trip', date: ["2023-06-02", "2023-06-06"], availableSeats: 10, depatureHour: "10:00", arrivalHour: "14:00", price: "200.00", duration: "4 hr", company: "ANADOL" }
    ];

    useEffect(() => {
        setData(route.params.data);
    }, []);


    var match = false
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Available trips </Text>
                {trips.map((item, key) => {
                    if (route.params.data.type === 'Round-Trip') {
                        if (item.from === route.params.data.from && item.to === route.params.data.to && item.type === route.params.data.type && JSON.stringify(item.date) === JSON.stringify(route.params.data.date)) {
                            match = true;
                            console.log("maatch********")
                            return <TouchableOpacity onPress={() => { navigation.navigate('TripDetailsScreen', { data: item }) }}><Card item={item} /></TouchableOpacity>
                        }
                    }
                    else {
                        if (item.from === route.params.data.from && item.to === route.params.data.to && item.type === route.params.data.type && item.date === route.params.data.date) {
                            match = true;
                            console.log("maatch********2")
                            return <TouchableOpacity onPress={() => { navigation.navigate('TripDetailsScreen', { data: item }) }}><Card item={item} /></TouchableOpacity>
                        }
                    }
                })}

                {!match &&
                    <View style={styles.box}>
                        <Text style={styles.text}>
                            Sorry, we could not find a match for your search results
                        </Text>
                        <Button title="Search again" onPress={() => navigation.navigate('HomeScreen')} />
                    </View>

                }
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    box: {
        marginHorizontal: 20
    },
    title: {
        color: '#000000',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 10

    },
    text: {
        marginVertical: 10,
        color: '#526D82',
        fontSize: 16,
        // marginHorizontal: 10,
        fontWeight: '500'
    },
    error: {
        color: '#AA4A44',
        fontSize: 16
    }

});
export default AvailableTrips