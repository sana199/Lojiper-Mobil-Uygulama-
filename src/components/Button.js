import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text, Colors, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Button = ({ title, onPress = () => { }, date = false }) => {
    return (
        <>
            {date ?
                <TouchableOpacity
                    style={styles.date}
                    onPress={onPress}
                    activeOpacity={0.7}>
                    <Icon name="calendar" style={styles.icon}/>
                    <Text style={styles.dateText}>
                        {title}
                    </Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    style={styles.container}
                    onPress={onPress}
                    activeOpacity={0.7}>
                    <Text style={styles.text}>
                        {title}
                    </Text>
                </TouchableOpacity>}
        </>

    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: '#27374D',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 10
    },
    date: {
        height: 55,
        backgroundColor: '#DDE6ED',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 10,
        flexDirection:'row'
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 22,
        color: '#27374D',
        marginRight: 10

    },
    dateText: {
        color: '#000',
        fontSize: 18,
    },
});