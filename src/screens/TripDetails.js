import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome'


const TripDetails = ({ route, navigation }) => {
    const [column, setColumn] = useState([
        { empty: true, selected: false, gender: '', row: 1 },
        { empty: true, selected: false, gender: '', row: 1 },
        { empty: false, selected: false, gender: 'Female', row: 2 },
        { empty: true, selected: false, gender: '', row: 2 },
        { empty: false, selected: false, gender: 'Female', row: 3 },
        { empty: false, selected: false, gender: 'Male', row: 3 },
        { empty: false, selected: false, gender: 'Male', row: 4 },
        { empty: true, selected: false, gender: '', row: 4 },
        { empty: true, selected: false, gender: '', row: 5 },
        { empty: false, selected: false, gender: 'Female', row: 5 },
        { empty: false, selected: false, gender: 'Male', row: 6 },
        { empty: false, selected: false, gender: 'Female', row: 6 },
        { empty: false, selected: false, gender: 'Male', row: 7 },
        { empty: true, selected: false, gender: '', row: 7 },
        { empty: true, selected: false, gender: '', row: 8 },
        { empty: true, selected: false, gender: '', row: 8 },
    ]);
    const [price, setPrice] = useState(0.00);
    const [other, setOther] = useState([
        { empty: true, selected: false, gender: '', row: 1 },
        { empty: true, selected: false, gender: '', row: 1 },
        { empty: false, selected: false, gender: 'Female', row: 2 },
        { empty: false, selected: false, gender: 'Male', row: 2 },
        { empty: false, selected: false, gender: 'Female', row: 3 },
        { empty: true, selected: false, gender: '', row: 3 },
        { empty: false, selected: false, gender: 'Male', row: 4 },
        { empty: true, selected: false, gender: '', row: 4 },
        { empty: true, selected: false, gender: '', row: 5 },
        { empty: false, selected: false, gender: 'Female', row: 5 },
        { empty: false, selected: false, gender: 'Male', row: 6 },
        { empty: true, selected: false, gender: '', row: 6 },
        { empty: false, selected: false, gender: 'Male', row: 7 },
        { empty: false, selected: false, gender: 'Female', row: 7 },
        { empty: true, selected: false, gender: '', row: 8 },
        { empty: true, selected: false, gender: '', row: 8 },

    ]);
    const [userDetails, setUserDetails] = useState();
    const [seatsCounter, setSeatsCounter] = useState(1);
    const [tripInfo, setTripInfo] = useState();

    useEffect(() => {
        getUserData();
        // setTripInfo(route.params.data);
        console.log(route.params.data);
        // setPrice(parseFloat(route.params.data.price))
        console.log(price);
    }, []);


    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            setUserDetails(JSON.parse(userData));
            // TO BE REMOVED LATER
            setUserDetails(prevState => ({ ...prevState, 'gender': 'Female' }));
        }
    };

    const showToast = (text1, text2) => {
        console.log("here")
        Toast.show({
            type: 'error',
            text1: text1,
            text2: text2
        });
    }


    const onSelectColumn = (index, columnNum) => {
        var columnTem = [];
        columnTem = columnNum == 1 ? column : other
        var temSeats = []
        console.log(index)
        columnTem.map((item, index1) => {
            if (index == index1) {
                console.log("1", item)
                var valid = checkValidity(columnTem, index);
                console.log(valid)
                if (valid) {
                    let counter = seatsCounter
                    if (item.selected == true) {
                        console.log('selected')
                        item.selected = false;
                        item.empty = true;
                        counter -= 1;

                    } else {
                        console.log('unselected')
                        item.selected = true;
                        item.empty = false;
                        counter += 1

                    }
                    item.gender = userDetails.gender;
                    setSeatsCounter(counter);
                    var total = route.params.data.price;
                    // total = seatsCounter * price;
                    setPrice(Math.round(seatsCounter * total));

                } else {
                    showToast('attention', 'you can\'t set next to gender different than yours');
                    console.log("invalid selection")
                }

            }
            temSeats.push(item)
        })
        console.log("rrr", seatsCounter)
        columnNum == 1 ? setColumn(temSeats) : setOther(temSeats)
    }

    const checkValidity = (columnTem, index) => {
        var validSeat = true
        var nextPerson = {}
        columnTem.map((item, index1) => {
            if (item.row == columnTem[index].row && index1 != index) {
                nextPerson = item
            }
        });

        console.log("next person", nextPerson);

        if (nextPerson.empty == false && nextPerson.gender != userDetails.gender) {
            validSeat = false;
            console.log("invalid person")
        }
        return validSeat;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Select your seat</Text>
            <Toast
                position='bottom'
                bottomOffset={40}
            />
            <View style={styles.subContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>{route.params.data.company}</Text>
                    <Text style={styles.text}>{route.params.data.price}</Text>
                </View>


                <View style={styles.row}>
                    <Text style={styles.text}>Date:</Text>
                    <Text style={styles.text2}>{route.params.data.date}</Text>
                </View>


                <Text style={styles.text}>Timing:</Text>
                <View style={styles.row}>
                    <Text style={styles.text2}>Depature at</Text>
                    <Text style={[styles.text2, { color: '#AA4A44', }]}>{route.params.data.depatureHour}</Text>
                    <Text style={styles.text2}>Arrival at</Text>
                    <Text style={[styles.text2, { color: '#AA4A44', }]}>{route.params.data.arrivalHour}</Text>
                </View>

            </View>


            <View style={styles.box}>
                <View style={styles.row}>
                    <View>
                        <FlatList data={column} numColumns={2} renderItem={({ item, index }) => {
                            var disabled = false
                            if (item.selected == false && item.empty == false) {
                                disabled = true
                            }
                            return <TouchableOpacity style={{ margin: 10 }} disabled={disabled} onPress={() => {
                                if (seatsCounter > 5) {
                                    showToast('Attention', 'You can book 5 seats at most');

                                } else {
                                    onSelectColumn(index, 1);
                                }
                            }}>
                                {item.empty == false && item.selected == true ?
                                    <Image source={require("../../assets/seat2.png")} style={[styles.seat, { tintColor: 'green' }]} />
                                    : item.empty == true && item.selected == false ?
                                        <Image source={require("../../assets/seat2.png")} style={styles.seat} />
                                        : item.empty == false && item.selected == false ?
                                            <ImageBackground source={require("../../assets/seat2.png")} style={[styles.seat, {
                                                alignItems: 'center', justifyContent: 'center'
                                            }]} imageStyle={{ tintColor: '#526D82' }}
                                            ><Icon name={item.gender == "Female" ? "female" : "male"} size={25} color={item.gender == "Female" ? "#FFC0CB" : "#89CFF0"} />
                                            </ImageBackground>
                                            : null
                                }
                            </TouchableOpacity>
                        }} />
                    </View>
                    <View>
                        <FlatList data={other} numColumns={2} renderItem={({ item, index }) => {
                            var disabled = false
                            if (item.selected == false && item.empty == false) {
                                disabled = true
                            }
                            return <TouchableOpacity style={{ margin: 10 }} disabled={disabled} onPress={() => {
                                if (seatsCounter > 5) {
                                    showToast('Attention', 'You can book 5 seats at most');

                                } else {
                                    onSelectColumn(index, 2);
                                }
                            }}>
                                {item.empty == false && item.selected == true ?
                                    <Image source={require("../../assets/seat2.png")} style={[styles.seat, { tintColor: 'green' }]} />
                                    : item.empty == true && item.selected == false ?
                                        <Image source={require("../../assets/seat2.png")} style={styles.seat} />
                                        : item.empty == false && item.selected == false ?
                                            <ImageBackground source={require("../../assets/seat2.png")} style={[styles.seat, {
                                                alignItems: 'center', justifyContent: 'center'
                                            }]} imageStyle={{ tintColor: '#526D82', }}
                                            ><Icon name={item.gender == "Female" ? "female" : "male"} size={25} color={item.gender == "Female" ? "#FFC0CB" : "#89CFF0"} />
                                            </ImageBackground>
                                            : null
                                }
                            </TouchableOpacity>
                        }} />
                    </View>
                </View>

            </View>
            <View style={{ width: '70%' }}>
                <Button title={"Pay " + price + " TL"} onPress={() => navigation.navigate("PaymentScreen", { price: price })} />

            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        // marginHorizontal: 10
    },
    box: {
        width: '70%',
        borderWidth: 1,
        borderRadius: 10,
        height: '50%',
        borderColor: '#27374D',
        justifyContent: 'center',

    },
    title: {
        color: '#000000',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: 30

    },
    subContainer: {
        paddingVertical: 20,

    },
    text: {
        marginVertical: 10,
        color: '#526D82',
        fontSize: 16,
        // marginHorizontal: 10,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 16,
        marginHorizontal: 5,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row2: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },

    seat: {
        width: 35,
        height: 30,

    }

});
export default TripDetails