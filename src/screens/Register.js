import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader'
import RadioButton from '../components/RadioButton';
import { DatePickerModal } from 'react-native-paper-dates';

const Register = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmPass: '',
        kimlik: '',
        gender: '',
    });


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState(null);
    const gender = [
        { value: 'Female' },
        { value: 'Male' },
    ];
   
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please provide an email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please provide a valid email', 'email');
            isValid = false;
        }

        if (!inputs.name) {
            handleError('Please provide a first name', 'name');
            isValid = false;
        }
        if (!inputs.surname) {
            handleError('Please provide a last name', 'surname');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please provide a password', 'password');
            isValid = false;
        } else if (inputs.password.length < 8) {
            handleError('Minimum password length of 8', 'password');
            isValid = false;
        }
        if (!inputs.confirmPass) {
            handleError('Please provide a password', 'confirmPass');
            isValid = false;
        } else if (inputs.confirmPass != inputs.password) {
            handleError('Passwords don\'t match', 'confirmPass');
            isValid = false;
        }
        if (!inputs.kimlik) {
            handleError('Please provide a valid TC kimlik number', 'kimlik');
            isValid = false;
        }
        if (isValid) {
            register();
        }
    };
    // console.log(checked)
    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('user', JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <SafeAreaView>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={styles.title}>
                    Register
                </Text>
                <Text style={styles.text}>
                    Enter your Details To Complete the Registeration
                </Text>
                <Input
                    label="Email"
                    // type="date"
                    iconName="email-outline"
                    placeholder="Enter your email address"
                    onChangeText={text => handleOnchange(text, 'email')}
                    email
                    error={errors.email}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                />
                <Input
                    label="Name"
                    iconName="account-outline"
                    placeholder="Enter your first name"
                    onChangeText={text => handleOnchange(text, 'name')}
                    error={errors.name}
                    onFocus={() => {
                        handleError(null, 'name')
                    }}
                />
                <Input
                    label="Surname"
                    iconName="account-outline"
                    placeholder="Enter your last name"
                    onChangeText={text => handleOnchange(text, 'surname')}
                    error={errors.surname}
                    onFocus={() => {
                        handleError(null, 'surname')
                    }}
                />
                <Input
                    label="Kimlik No."
                    iconName="id-card"
                    placeholder="Enter your TC kimlik number"
                    onChangeText={text => handleOnchange(text, 'kimlik')}
                    numeric
                    error={errors.kimlik}
                    onFocus={() => {
                        handleError(null, 'kimlik')
                    }}
                />
                <RadioButton data={gender} onSelect={(value) => { setOption(value) }} initialVal={gender[0]} />

                <Input
                    label="Password"
                    iconName="lock-outline"
                    placeholder="Enter a valid password"
                    password
                    onChangeText={text => handleOnchange(text, 'password')}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password')
                        console.log(inputs)
                    }}
                />
                <Input
                    label="Confirm Password"
                    iconName="lock-outline"
                    placeholder="Enter a valid password"
                    password
                    onChangeText={text => handleOnchange(text, 'confirmPass')}
                    error={errors.confirmPass}
                    onFocus={() => {
                        handleError(null, 'confirmPass')
                    }}
                />
                <Button title="Register" onPress={validate} />
                <View style={styles.row}>
                    <Text style={styles.text}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('LoginScreen')
                    }}>
                        <Text style={[styles.text, styles.login]}> Login</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#000000',
        fontSize: 40,
        fontWeight: 'bold'
    },
    text: {
        marginVertical: 10,
        color: '#526D82',
        fontSize: 16,
        marginBottom: 20
    },
    row: {
        flexDirection: 'row'
    },
    login: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    radio: {
        alignItems: 'center',
        backgroundColor: '#DDE6ED',
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center'
    }

}); 