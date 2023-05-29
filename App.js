import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registeration from './src/screens/Register'
import Login from './src/screens/Login'
import Home from './src/screens/TripInquiry'
import Loader from './src/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AvailableTrips from './src/screens/AvailableTrips'
import TripDetails from './src/screens/TripDetails';
import Payment from './src/screens/Payment';


const Stack = createStackNavigator();

export default function App() {
  const [userData, setUser] = useState();
  const [initialRouteName, setInitialRouteName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      console.log("user")
      console.log(userData)
      if (userData) {
        userData = JSON.parse(userData);
        setUser(userData);
        if (userData.loggedIn) {
          console.log("user1")
          setInitialRouteName('HomeScreen');
        } else {
          console.log("user2")
          setInitialRouteName('LoginScreen');
        }
        }else{
          setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      console.log(error)
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <NavigationContainer>
      {initialRouteName==''?
      <Loader visible={true}/>:
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        <Stack.Screen
          name='RegistrationScreen'
          component={Registeration} />
        <Stack.Screen
          name='LoginScreen'
          component={Login} />
         <Stack.Screen
          name='AvailableTripsScreen'
          component={AvailableTrips} /> 
          <Stack.Screen
          name='TripDetailsScreen'
          component={TripDetails} /> 
           <Stack.Screen
          name='PaymentScreen'
          component={Payment} /> 
        <Stack.Screen
          name='HomeScreen'
          component={Home}
          initialParams={{ user:userData}} />
      </Stack.Navigator>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9DB2BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
