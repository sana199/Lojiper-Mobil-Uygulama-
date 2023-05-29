import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, Colors, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Input = ({ label, iconName, error, password, onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [hidePass, setHidePass] = useState(password)
    // console.log(props)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.input, { borderColor: error ? '#AA4A44' : isFocused ? '#526D82' : '#DDE6ED' }]}>
                <Icon name={iconName} style={styles.icon}></Icon>
                <TextInput
                    {...props}
                    style={styles.plsceholder}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    secureTextEntry={hidePass}
                    keyboardType={props.numeric ? 'numeric' : props.email ? 'email-address' : 'default'}

                />
                {password && <Icon
                    style={styles.icon}
                    name={hidePass ? "eye-outline" : "eye-off-outline"}
                    onPress={() => {
                        setHidePass(!hidePass)
                    }}
                />}
            </View>
            {error && <Text style={styles.errorr}>{error}</Text>}
        </SafeAreaView>
    )
}

export default Input


const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        fontSize: 14,
        marginVertical: 5,
        // marginTop: 20,
        color: '#526D82'
    },
    input: {
        height: 55,
        backgroundColor: '#DDE6ED',
        flexDirection: 'row',
        paddingHorizontal: 15,
        // borderRadius: 0.5,
        borderWidth: 0.4,
        alignItems: 'center',
    },
    icon: {
        fontSize: 22,
        color: '#27374D',
        marginRight: 10

    },
    plsceholder: {
        color: '#526D82',
        flex: 1
    },
    errorr: {
        color: '#AA4A44',
        fontSize: 12,
        marginTop: 5
    }
});
