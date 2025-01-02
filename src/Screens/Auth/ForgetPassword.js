import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';
import { useAuth } from '../../Api';
import { toast } from 'react-toastify';


const ForgetPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState({})
    const { ApiData: ForgotResponse, loading: ForgotLoadning, error: ForgotError, post: submitData } = useAuth('auth/forgot-password');

    useEffect(() => {
        document.title = 'Poker City | Password Recovery';
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        submitData(email)
        
    }

    useEffect(()=>{
        if(ForgotResponse) {
            toast(ForgotResponse?.message);
            navigate('/forget-password3')
        }
    },[ForgotResponse])


    useEffect(()=>{
        if(ForgotError) {
            toast(ForgotError?.message);
        }
    },[ForgotError])

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter your email address to receive a verification code.' backOption={true}>
                <form onSubmit={handleClick}>
                    <CustomInput label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setEmail({email: event.target.value})
                    }} />
                    <div className="mt-4 text-center">
                        <CustomButton type='submit' variant='primaryButton' text='Continue' />
                    </div>
                </form>

            </AuthLayout>
        </>
    )
}



export default ForgetPassword
