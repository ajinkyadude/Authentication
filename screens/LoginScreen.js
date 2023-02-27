import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../Util/Auth';
import { Alert } from 'react-native';
import { AuthContext } from '../Store/auth-context';

function LoginScreen() {

  const [isAuthentication, setIsAuthenticating]=useState(false)

  const authCtx=useContext(AuthContext);

  async function loginHandler({email, password}){
      setIsAuthenticating(true);
      try
      {
        const token=await login(email, password);
        authCtx.authenticate(token)
      }
      catch(error)
      {
        Alert.alert('Authentication Failed..',
        'Could not log in . Please check your credentials or try again later!'
        )
        setIsAuthenticating(false);
      }
  }

  if(isAuthentication)
  {
    return(<LoadingOverlay message="Logging In..." />)
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
