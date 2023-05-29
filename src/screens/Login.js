import React, { useState } from 'react'
import { SafeAreaView,Alert,ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader'

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        name: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please provide an email', 'email');
            isValid = false;
        }


        if (!inputs.password) {
            handleError('Please provide a password', 'password');
            isValid = false;
        }

        if (isValid) {
            login();
        }
    };

    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem('user');
            if (userData) {
                userData = JSON.parse(userData);
                if (inputs.email == userData.email && inputs.password == userData.password) {
                    AsyncStorage.setItem('user',JSON.stringify({...userData, loggedIn:true}));
                    navigation.navigate('HomeScreen',{user:userData});
                }else{
                    Alert.alert('Error', 'Invalid credintials');
                    

                }
            } else {
                Alert.alert('Error', 'User doesn\'t exists');
                handleError('Email doesn\'t exist', 'email');
                handleError('Password doesn\'t exist', 'password');
            }
        }, 3000)
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
                    Login
                </Text>
                <Text style={styles.text}>
                    Enter your Details to Login
                </Text>
                <Input
                    label="Email"
                    iconName="email-outline"
                    placeholder="Enter your email address"
                    onChangeText={text => handleOnchange(text, 'email')}
                    error={errors.email}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                // error="Input Email"
                />

                {/* <Input
                    label="Phone Number"
                    iconName="phone-outline"
                    placeholder="Enter your phone number"
                // error="Input Email"
                /> */}
                <Input
                    label="Password"
                    iconName="lock-outline"
                    placeholder="Enter a valid password"
                    password
                    onChangeText={text => handleOnchange(text, 'password')}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}

                // error="Input Email"
                />
                <Button title="Login" onPress={validate} />
                <View style={styles.row}>
                    <Text style={styles.text}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('RegistrationScreen')
                    }}>
                        <Text style={[styles.text, styles.login]}> Register</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


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
        color: '#526D82'
    },
    row: {
        flexDirection: 'row'
    },
    login: {
        fontSize: 14,
        fontWeight: 'bold'
    }

});

export default Login