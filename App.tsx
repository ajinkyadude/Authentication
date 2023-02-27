import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { StatusBar } from 'react-native';
import AuthContextProvider, { AuthContext } from './Store/auth-context';
import { useContext } from 'react';
import IconButton from './components/ui/IconButton';
import LoadingOverlay from './components/ui/LoadingOverlay';
import Button from './components/ui/Button';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx=useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor})=><IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout} />
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx=useContext(AuthContext);

  return (
    
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated &&  <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root(){

  const [isTryingLogin, setIsTryingLogin]=useState(true);

  const authCtx=useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
        const storedToken = await AsyncStorage.getItem('token');


        if (storedToken) {
           authCtx.authenticate(storedToken);
        }
        setIsTryingLogin(false);
    }


    fetchToken();
}, [])

if(isTryingLogin)
{
  return <LoadingOverlay message="Plzzz Wait....." />
}

return <Navigation />  

}

export default function App() {

  return (
    <>
      <StatusBar/>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>  
       
    </>
  );
}