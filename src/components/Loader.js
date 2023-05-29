import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard, useWindowDimensions } from 'react-native'

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions();
    return visible &&
        <View style={[styles.container, { height, width }]}>
            <View style={styles.loader}>
                <ActivityIndicator size="large" color='#27374D'/>
                <Text style={styles.text}>Loading</Text>
            </View>
        </View>;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    loader: {
        height: 70,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 50,
        borderRadius: 5
    },
    text: {
        // marginVertical: 10,
        marginLeft:10,
        color: '#526D82',
        fontSize:18
    },
});
export default Loader
