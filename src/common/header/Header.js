import React from 'react';
import './Header.css'
import logoUrl from '../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { useState ,useEffect} from 'react';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from "../login/Login"
import Register from "../register/Register"


const Header = (props) => {



    const [session, setSession] = useState(window.sessionStorage.getItem("access-token"))
    const [showModal, setShowModal] = useState(false)
    const [tabValue, setTabValue] = useState(0);
    const [id,setId] = useState('')
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [flagForBookShow,setFlagForBookShow]=useState(false);

    
    useEffect(()=>{

        let arr = window.location.href.split('/');
        setId(arr[arr.length-1])
        
        if(arr[arr.length-2] === 'movie'){
            setFlagForBookShow(true);
        }


    },[])

    const setSessionMethod = ()=>{
        setSession(window.sessionStorage.getItem("access-token"))

    }

    const getLoginData = (x,y)=>{
        setUserName(x);
        setPassword(y);
    }

    const openModal = () => {
        setShowModal(!showModal)
    }

    

    

    const Logout = async ()=>{
        
           const rawResponse = await fetch(props.baseUrl + '/auth/logout',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Basic " + window.btoa(userName + ":" + password)
                    }
                });
            window.sessionStorage.removeItem("access-token");
            setSession(window.sessionStorage.getItem("access-token"));
            const data = await rawResponse.json();
            console.log(data);
    }




    return (
        <div className="header">
            <span>
                <img src={logoUrl} alt="logo"  className='logo'/>
            </span>
            {flagForBookShow && 
            <span className='bookShow'>
                 <Button variant='contained' color='primary' onClick={!session ? openModal : event =>  window.location.href=`/bookshow/${id}`}>Book Show</Button> 
            </span>}
            {
                !session && <div className='login'>
                    <Button variant="contained" onClick={openModal}>Login</Button>
                </div>
            }
            {
                session && <span className='logout'>
                    <Button variant="contained" onClick={Logout}>Logout</Button>
                </span>
            }
            <Modal
                isOpen={showModal}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
                style={
                    {
                        content: {
                            width: '350px',
                            backgroundColor: 'white',
                            height:'auto',
                            border: '1px solid black',
                            borderRadius: '5px'
                            

                        }
                    }
                }

            >

                <Tabs value={tabValue}  centered>
                    <Tab label="Login" onClick={() => setTabValue(0)} />
                    <Tab label="Register" onClick={() => setTabValue(1)} />
                </Tabs>
                {tabValue === 0 &&
                    <Login openModal={openModal} setSessionMethod={setSessionMethod} getLoginData={getLoginData} baseUrl={props.baseUrl}/>
                }
                {
                    tabValue === 1 &&
                    <Register baseUrl={props.baseUrl}/>
                }





            </Modal>


        </div>
    )
}

export default Header;

