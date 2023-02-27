import axios from "axios";

const API_KEY= 'AIzaSyCg4zDvrC5GMCSO2D0xMJTWb8Y8pvteo7M';

async function Authenticate(mode, email, password){
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

    const response=await axios.post(url,{
        email: email,
        password: password,
        returnSecureToken: true
    });
    const Token=response.data.idToken;
    return Token;
    //console.log(response.data)
}

export function createUser(email, password){
    return Authenticate('signUp',email,password)
    
}
export function login(email,password){
    return Authenticate('signInWithPassword',email,password);
}