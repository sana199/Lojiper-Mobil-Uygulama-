import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import { SelectList } from 'react-native-dropdown-select-list'
import RadioButton from '../components/RadioButton'
import { DatePickerModal } from 'react-native-paper-dates';
import moment from 'moment'

const TripInquiry = ({ route, navigation }) => {

    const [userDetails, setUserDetails] = useState();
    const [depature, setDepature] = useState("");
    const [arrival, setArrival] = useState("");
    const [option, setOption] = useState(null);
    const [date, setDate] = useState(undefined);
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [formatted, setFormatted] = useState("");
    const [open, setOpen] = useState(false);
    const [erros, setErrors] = useState([]);

    const today = new Date();

    const cities = [
        { key: '1', value: 'Istanbul' },
        { key: '2', value: 'Ankara' },
        { key: '3', value: 'Adana' }
    ]
    const radio = [
        { value: 'One-Way' },
        { value: 'Round-Trip' },
    ];


    useEffect(() => {
        getUserData();
        setOption(radio[0].value);
        
    }, []);

    const onDismiss = () => {
        setOpen(false);
    }
    const formatDate = (rawDate) => {
        console.log("date 1 " + rawDate)
        var newDate = moment(rawDate, 'DD-MM-YYYY').format();
        console.log("date 2 " + newDate)
        newDate = newDate.split('T')[0];
        console.log("date 3 " + newDate)
        return newDate;
    }
    const onConfirm = ({ date }) => {
        var formatted = formatDate(date);

        setOpen(false);
        setDate(date);
        setFormatted(formatted);
        handleError(null, 'formatted')

        console.log("date is " + date)
    }
    const onConfirmRange = ({ startDate, endDate }) => {
        const newStartDate = formatDate(startDate);
        const newEndDate = formatDate(endDate);
        // check here
        setOpen(false);
        setRange({ startDate: startDate, endDate: endDate });
        setFormatted([newStartDate, newEndDate ]);
        handleError(null, 'formatted');
    }

    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };
    const logout = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        );
        navigation.navigate('LoginScreen');
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
        
    };

    const validate = () => {
        console.log(depature,arrival,option,formatted);
        var valid = true;
        if (!depature) {
            handleError('You have to select a depature station', 'depature');
            valid = false;
        }
        if (!arrival) {

            handleError('You have to select an arrival station', 'arrival');
            valid = false;
        }
        if (option == 'One-Way' && date == undefined) {
            console.log(date)
            handleError('You have to select a date', 'formatted');
            valid = false;
        }
        else if (option == 'Round-Trip' && (range.startDate == undefined || range.endDate == undefined))
        {
            console.log("here2")

            handleError('You have to select a date', 'formatted');
            valid = false;

        }
        if (valid) {
            var searchData = costumeRequest();
            console.log(">>>>>>",searchData);
            navigation.navigate("AvailableTripsScreen", {data: searchData });
        }
    }
    const costumeRequest = () => {

        const request = { from: depature, to: arrival, date: formatted, type: option }
        return request;
    }


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome {route.params.user.name}</Text>
                <Text style={styles.text}>Fill in your trip details below</Text>
                <RadioButton data={radio} onSelect={(value) => { setOption(value)}} initialVal={radio[0]} />
                {erros.option && <Text style={styles.error}>{erros.option}</Text>}

                <Text style={styles.text}>From</Text>
                <SelectList
                    setSelected={(val) => {
                        setDepature(val);
                        handleError(null, 'depature')
                    }}
                    data={cities}
                    save="value"
                    placeholder='Select a city'
                />
                {erros.depature && <Text style={styles.error}>{erros.depature}</Text>}

                <Text style={styles.text}>To</Text>
                <SelectList
                    setSelected={(val) => {
                        if (val === depature) {
                            handleError('depature and arrival can\'t be the same station', 'arrival')
                        } else if (!depature) {
                            handleError('choose the depature station first', 'arrival')

                        } else {
                            handleError(null, 'arrival')
                            setArrival(val)
                        }
                    }}
                    data={cities}
                    save="value"
                    placeholder='Select a city'
                />
                {erros.arrival && <Text style={styles.error}>{erros.arrival}</Text>}
                <Button onPress={() => setOpen(true)} title={formatted? Array.isArray(formatted)?formatted[0] +" --> "+formatted[1]: formatted: "Select a date"} date>
                    Pick single date
                </Button>
                {option == 'One-Way' ?
                    <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={open}
                        onDismiss={onDismiss}
                        date={date}
                        onConfirm={onConfirm}
                        startYear={2023}
                        validRange={{ startDate: today }}
                    /> : 
                    // option == 'Round-Way'?
                    <DatePickerModal
                        locale="en"
                        mode="range"
                        visible={open}
                        onDismiss={onDismiss}
                        startDate={range.startDate}
                        endDate={range.endDate}
                        onConfirm={onConfirmRange}
                        startYear={2023}
                        validRange={{ startDate: today }}
                    />
                    // :
                }
                {erros.formatted && <Text style={styles.error}>{erros.formatted}</Text>}
                <Button title="Search a Trip" onPress={() => validate() } />
                <Button title="Logout" onPress={logout} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 30
    },
    title: {
        color: '#000000',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        marginVertical: 10,
        color: '#526D82',
        fontSize: 16,
        marginBottom: 10
    },
    error: {
        color: '#AA4A44',
        fontSize: 16
    }

});
export default TripInquiry