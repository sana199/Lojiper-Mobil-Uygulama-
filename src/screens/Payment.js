import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader'

const Payment = ({ route, navigation }) => {
    const year = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035']
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const [CardMonth, setCardMonth] = useState('')
    const [CardYear, setCardYear] = useState('')
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        cardNo: '',
        cvv: ''
    });
    const YearData =
        [{ key: '2023', value: '2023' },
        { key: '2024', value: '2024' },
        { key: '2025', value: '2025' },
        { key: '2026', value: '2026' },
        { key: '2027', value: '2027' },
        { key: '2028', value: '2028' },
        { key: '2029', value: '2029' },
        { key: '2030', value: '2030' }]
    const MonthData =
        [{ key: '01', value: '01' },
        { key: '02', value: '02' },
        { key: '03', value: '03' },
        { key: '04', value: '04' },
        { key: '05', value: '05' },
        { key: '06', value: '06' },
        { key: '07', value: '07' },
        { key: '08', value: '08' },
        { key: '09', value: '09' },
        { key: '10', value: '10' },
        { key: '11', value: '11' },
        { key: '12', value: '12' }]

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.cardNo) {
            handleError('Please provide a card number', 'cardNo');
            isValid = false;
        } else if (inputs.cardNo.toString().length != 16) {
            handleError('Card number length should be 16', 'cardNo');
            isValid = false;
        }

        if (!inputs.name) {
            handleError('Please provide a valid name', 'name');
            isValid = false;
        }
        if (!inputs.cvv) {
            handleError('Please provide a CVV', 'cvv');
            isValid = false;
        } else if (inputs.cvv.toString().length != 3) {
            handleError('CVV should be of length 3', 'cvv');
            isValid = false;
        }

        if (isValid) {
            pay();
        }
    };
    // console.log(checked)
    const pay = () => {
        setLoading(true);
        setTimeout(() => {
            navigation.navigate("HomeScreen")
        }, 2000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        >

            <View style={styles.container}>
                <Loader visible={loading} />

                <Text style={styles.title}>Enter your card details </Text>
                <Input
                    label="Card Holder Name"
                    iconName="account-outline"
                    placeholder="Please enter card holder name"
                    onChangeText={text => handleOnchange(text, 'name')}
                    error={errors.name}
                    onFocus={() => {
                        handleError(null, 'name')
                    }}
                />
                <Input
                    label="Card No"
                    iconName="credit-card"
                    placeholder="Please enter card number"
                    onChangeText={text => { handleOnchange(text, 'cardNo') }
                    }
                    numeric
                    error={errors.cardNo}
                    onFocus={() => {
                        handleError(null, 'cardNo')
                    }}

                />
                <Text style={styles.text}>Expiry date</Text>
                <View style={styles.row}>
                    <SelectList
                        setSelected={(val) => {
                            setCardYear(val);
                            handleError(null, 'year');

                        }}
                        boxStyles={{ width: '50%', alignSelf: 'center' }}
                        // dropdownStyles={{ width: '50%', alignSelf: 'center' }}
                        data={YearData}
                        save="value"
                        placeholder='Year'
                    />
                    <SelectList
                        setSelected={(val) => {
                            setCardMonth(val);
                            handleError(null, 'month')
                        }}
                        boxStyles={{ width: '50%', alignSelf: 'center' }}

                        data={MonthData}
                        save="value"
                        placeholder='Month'
                    />
                </View>
                <View>
                    <Input
                        label="CVV No"
                        iconName="credit-card"
                        placeholder="Please enter CVV"
                        onChangeText={text => handleOnchange(text, 'cvv')}
                        numeric
                        hidden
                        error={errors.cvv}
                        onFocus={() => {
                            handleError(null, 'cvv')
                        }}

                    />
                </View>
                <Button title={"Pay " + route.params.price + " TL"} onPress={() => validate()} />
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: 30,
        marginTop: 50
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10
    }
});
export default Payment