import { useEffect, useState } from "react";
import { SafeAreaView, Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'

const RadioButton = ({ data, onSelect, initialVal }) => {

    const [userOption, setUserOption] = useState();


    useEffect(() => {
        setUserOption(initialVal.value);
        // console.log(initialVal)
    }, []);

    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };


    return (
        <View>
            <View style={styles.row} >
                <TouchableOpacity onPress={() => selectHandler(data[0].value)} style={data[0].value === userOption ? styles.selected : styles.unselected}>
                    <Text style={[styles.option, { color: data[0].value === userOption ? '#fff' : '#000000' }]}> {data[0].value}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => selectHandler(data[1].value)} style={data[1].value === userOption ? styles.selected : styles.unselected}>
                    <Text style={[styles.option, { color: data[1].value === userOption ? '#fff' : '#000000' }]}> {data[1].value}</Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    option: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500'
    },
    unselected: {
        backgroundColor: '#DDE6ED',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 3,
        flex: 1,
        color: '#000000'
    },
    selected: {
        backgroundColor: '#526D82',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 3,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default RadioButton;