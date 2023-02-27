import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../Store/auth-context';
import { createUser } from '../Util/Auth';

function SignupScreen() {

  const [isAuthentication, setIsAuthenticating]=useState(false) 

  const authctx=useContext(AuthContext);

  async function signupHandler({email, password}){
      setIsAuthenticating(true);
      try
      {
        const Token=await createUser(email, password);
        authctx.authenticate(Token);
      }
      catch(error)
      {
        Alert.alert('Authentication Failed..',
        'Could not log in . Please check your credentials or try again later!');
        setIsAuthenticating(false);
      }
  }

  if(isAuthentication)
  {
    return(<LoadingOverlay message="Creating User..." />)
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
