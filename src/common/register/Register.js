import React from 'react';
import { useState, useEffect } from 'react';
import "./Register.css"
import { Button } from '@material-ui/core';
import { InputLabel, Input, FormHelperText } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

const Register = (props) => {


    const [firstName,setFirstName] = useState('');
    const [nameError,setNameError] = useState(false);
    const [lastName,setLastName] = useState('');
    const [lastNameError,setLastNameError] = useState(false);
    const [email,setEmail] = useState('');
    const [emailError,setEmailError] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const [contactNumber,setContactNumber] = useState('');
    const [contactNumberError,setContactNumberError] = useState(false);
    const [disableRegister,setDisableRegister] = useState(true)
    const [showdisplay, setShowDisplay] = useState("dispNone");

    useEffect(()=>{

        disableButton();

    },[firstName,lastName,email,password,contactNumber])

    const disableButton = ()=>{

        if(firstName && lastName && email && password &&contactNumber){
            setDisableRegister(false);
        }else{
            setDisableRegister(true);
        }

        

    }

    const handleChange = (e)=>{
        if(e.target.name === 'firstname'){
            setFirstName(e.target.value);
        }else if(e.target.name === 'lastname'){
            setLastName(e.target.value);
        }else if(e.target.name === 'email'){
            setEmail(e.target.value);
        }else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }else{
            setContactNumber(e.target.value);

        }

    }

    const handleError = (e)=>{
        if(e.target.name === 'firstname' && !firstName){

            setNameError(!nameError);
        }else if(e.target.name === 'lastname' && !lastName){
            setLastNameError(!lastNameError);
        }else if(e.target.name === 'email' && !email){
            setEmailError(!emailError);
        }else if(e.target.name === 'password' && !password){
            setPasswordError(!passwordError);
        }else if(e.target.name === 'contactnumber' && !contactNumber){
            setContactNumberError(!contactNumberError);
        }else{

        }

    }

    const registerUser = ()=>{

     

        let data = JSON.stringify({
            "email_address":email,
            "first_name":firstName,
            "last_name":lastName,
            "mobile_number":contactNumber,
            "password":password

        })

        fetch(props.baseUrl +'signup',{
        method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: data,
        }
        )
        .then(res => res.json())
        .then(data =>{
            if(data.status === 'ACTIVE'){
                setShowDisplay("dispBlock")
            }

        });
       // setShowDisplay("dispBlock")

    }


    return (
        <div className='registerContainer'>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>First Name</InputLabel>
                <Input id="component-simple" value={firstName} onChange={handleChange} name='firstname' required onBlur={handleError}/>
                {nameError &&
                <small className='errorContainer'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple"required>Last Name</InputLabel>
                <Input id="component-simple" value={lastName} onChange={handleChange} name='lastname' required onBlur={handleError}/>
                {lastNameError &&
                <small className='errorContainer'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>Email</InputLabel>
                <Input id="component-simple" value={email} onChange={handleChange} name='email' required onBlur={handleError}/>
                {emailError &&
                <small className='errorContainer'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>Passowrd</InputLabel>
                <Input id="component-simple" value={password} onChange={handleChange} name='password' onBlur={handleError}/>
                {passwordError &&
                <small className='errorContainer'>Required Feild</small>
                }
            </FormControl>
            </div>
            <div className='inputContainer'>
            <FormControl variant="standard">
                <InputLabel htmlFor="component-simple" required>Contact Number</InputLabel>
                <Input id="component-simple" value={contactNumber} onChange={handleChange} name='contactnumber' onBlur={handleError}/>
                {contactNumberError &&
                <small className='errorContainer'>Required Feild</small>
                }
            </FormControl></div>
            <div>
            <FormHelperText className={showdisplay} style={{fontSize:"14px", color:"black"}}>Registration Successful. Please Login!</FormHelperText>
            </div>
            <div className='buttonContainer'>
            <Button variant="contained" color='primary' onClick={registerUser} disabled={disableRegister}>Register</Button>
            </div>
        </div>


    )
}
export default Register;
