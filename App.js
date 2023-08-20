import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Icon, Root } from 'native-base';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './scenes/auth/Auth';
import Login from './scenes/auth/Login';
import LoginPhoto from './scenes/auth/LoginPhoto';
import HomeAdmin from './scenes/Main/HomeAdmin';
import HomeUser from './scenes/Main/HomeUser';
import HomePhoto from './scenes/Main/HomePhoto';
import Time from './scenes/Time/Time';
import AllBy7 from './scenes/Report/AllBy7';
import AllPerCompany from './scenes/Report/AllPerCompany';
import Registrasi from './scenes/Admin/Registrasi';
import RegistrasiCompany from './scenes/Admin/RegistrasiCompany';
import RegistrasiPhoto from './scenes/Admin/RegistrasiPhoto';
import RegistrasiPreview from './scenes/Admin/RegistrasiPreview';
import ReqReset from './scenes/auth/ReqReset';
import Reset from './scenes/auth/Reset';
import ClearImei from './scenes/Admin/ClearImei';
import ClearGPS from './scenes/Admin/ClearGPS';
import Card from './scenes/Card/Card';
import Fitures from './scenes/Admin/Fitures';
import Health from './scenes/Questionnaire/Health';
import GuestAdmin from './scenes/Guest/GuestAdmin';
import GuestUser from './scenes/Guest/GuestUser';
import RegisGuest from './scenes/Guest/RegisGuest';
import GuestPhoto from './scenes/Guest/GuestPhoto';
import GuestPreview from './scenes/Guest/GuestPreview';
import GuestCheck from './scenes/GuestCheck/GuestCheck';
import GuestResult from './scenes/GuestCheck/GuestResult';

console.disableYellowBox = true;
global.version = 3.0;
// global.baseURL = 'http://10.10.17.86:3000';
global.baseURL = 'https://absensi.smma.co.id/DSB';
// global.baseURL = 'http://192.168.100.5:3000';
global.cardUrl = 'https://absensi.smma.co.id/kartunama/service/contact.php';
global.qr = 'https://absensi.smma.co.id/kartunama/data.php';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const LoginStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="LoginPhoto" component={LoginPhoto} />
    <Stack.Screen name="GuestCheck" component={GuestCheck} />
    <Stack.Screen name="GuestResult" component={GuestResult} />
    <Stack.Screen name="ReqReset" component={ReqReset} />
    <Stack.Screen name="Reset" component={Reset} />
  </Stack.Navigator>
);

const RegistrasiStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Registrasi" component={Registrasi} />
    <Stack.Screen name="RegistrasiPhoto" component={RegistrasiPhoto} />
    <Stack.Screen name="RegistrasiPreview" component={RegistrasiPreview} />
  </Stack.Navigator>
);

const HomeUserStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeUser" component={HomeUser} />
    <Stack.Screen name="HomePhoto" component={HomePhoto} />
  </Stack.Navigator>
);

const GuestUserStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GuestUser" component={GuestUser} />
    <Stack.Screen name="RegisGuest" component={RegisGuest} />
    <Stack.Screen name="GuestPhoto" component={GuestPhoto} />
    <Stack.Screen name="GuestPreview" component={GuestPreview} />
  </Stack.Navigator>
);

const GuestAdminStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GuestAdmin" component={GuestAdmin} />
    {/* Add other GuestAdminStack screens here */}
  </Stack.Navigator>
);

const AdminDrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeAdmin} />
    <Drawer.Screen name="Report" component={AllPerCompany} />
    <Drawer.Screen name="Time" component={Time} />
    <Drawer.Screen name="Clear Imei" component={ClearImei} />
    <Drawer.Screen name="Clear GPS" component={ClearGPS} />
    <Drawer.Screen name="Registration" component={RegistrasiStackScreen} />
    <Drawer.Screen name="Features" component={Fitures} />
    <Drawer.Screen name="Guest" component={GuestAdminStackScreen} />
  </Drawer.Navigator>
);

const UserDrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeUserStackScreen} />
    <Drawer.Screen name="Report" component={AllBy7} />
    <Drawer.Screen name="Health" component={Health} />
    <Drawer.Screen name="Guest" component={GuestUserStackScreen} />
  </Drawer.Navigator>
);


const AppNav = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="LoginStack" component={LoginStackScreen} />
      <Stack.Screen name="User" component={UserDrawerScreen} />
      <Stack.Screen name="Admin" component={AdminDrawerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => (
  <Provider store={store}>
    <Root>
      <AppNav />
    </Root>
  </Provider>
);

export default App;
