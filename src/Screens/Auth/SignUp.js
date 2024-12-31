import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"
import { useAuth } from '../../Api';
import CustomModal from '../../Components/CustomModal';


const AdminLSignUp = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { ApiData: LoginResponse, loading: LoginLoadning, error: LoginError, post: submitData } = useAuth('auth/signup');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });




    useEffect(() => {
        document.title = 'Poker City | Signup';
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData?.email != "" && formData?.password != "") {
            submitData(formData)
        }
    };

    useEffect(() => {
        if (LoginResponse) {
            if (LoginResponse?.token) {
                setShowModal(true);
                setTimeout(()=>{
                    navigate('/');
                },2000)
            }
        }
    }, [LoginResponse])

    useEffect(() => {
        if (LoginError) {
            console.log(LoginError)
        }
    }, [LoginError])


    return (
        <>
            <AuthLayout authTitle='Sign Up' authPara='Sign up your account'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        label='User Name'
                        required
                        id='userName'
                        type='text'
                        placeholder='Enter Your Username'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, name: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <CustomInput
                        label='Email Address'
                        required
                        id='userEmail'
                        type='email'
                        placeholder='Enter Your Email Address'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <CustomInput
                        label='DOB'
                        required
                        id='dob'
                        type='date'
                        placeholder='Enter Your DOB'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, dob: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <CustomInput
                        label='Phone'
                        required
                        id='phone'
                        type='text'
                        placeholder='Enter Your Phone'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, phone: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <div className='signupText text-center mt-3'>
                        <p className='mb-0'>If you have an account please <Link to={'/'} className='primaryColor'>Login</Link></p>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Sign Up' type='submit' />
                    </div>
                </form>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='User registered successfully, Please login your email and verify your account.' />
            </AuthLayout>
        </>
    )
}


export default AdminLSignUp
