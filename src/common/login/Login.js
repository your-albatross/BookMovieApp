import React from 'react';
import { useState, useEffect } from 'react';
import "./Login.css"
import { Button } from '@material-ui/core';
import { InputLabel, Input } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

const Login = (props) => {
    

    //const [session, setSession] = React.useState(window.sessionStorage.getItem("access-token"));


    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [userNameError,setUserNameError] = useState(false);
    const [passwordError,setPasswordError] = useState(false)
    const [disableRegister,setDisableRegister] = useState(true)


    useEffect(()=>{

        disableButton();

    },[userName,password])

    const disableButton = ()=>{

        if(userName && password){
            setDisableRegister(false);
        }else{
            setDisableRegister(true);
        }

        

    }

    const handleChange = (e)=>{
        if(e.target.name === 'username'){
            setUserName(e.target.value);
        }else{
            setPassword(e.target.value);
        }

    }

    const handleError = (e)=>{
        if(e.target.name === 'username' && !userName){

            setUserNameError(!userNameError);
        }else if(e.target.name === 'password' && !password){
            setPasswordError(!passwordError);
        }else{

        }

    }

    const Login = () => {
          fetch(props.baseUrl +'auth/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Basic " + window.btoa(userName + ":" + password)
                    }
                }).then(response => {
                    if (response.status === 200) {
                        window.sessionStorage.setItem("access-token", response.headers.get("access-token"));
                        props.setSessionMethod();
                        props.getLoginData(userName,password);
                        props.openModal(false);
                    }
                }).catch(err => {
                    console.log(err.message);
                    props.openModal(false)
                });
      
          

    }


    return (
        <div className='loginContainer'>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>Username</InputLabel>
                <Input id="component-simple" value={userName} onChange={handleChange} name='username' onBlur={handleError}/>
                {userNameError &&
                <small className='error'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>Passowrd</InputLabel>
                <Input id="component-simple" value={password} onChange={handleChange} name='password' onBlur={handleError}/>
                {passwordError &&
                <small className='error'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='buttonContainer'>
            <Button variant="contained" color='primary' onClick={Login} disabled={disableRegister}>Login</Button>
            </div>
        </div>


    )
}
export default Login;
