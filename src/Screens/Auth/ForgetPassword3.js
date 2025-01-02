import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';



import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';
import CustomModal from '../../Components/CustomModal';

import "./style.css";
import { useAuth, usePatch } from '../../Api';
import { toast } from 'react-toastify';

const ForgetPassword3 = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get("token");
    const [formData, setFormData] = useState({
        token: paramValue
    })

    const { ApiData: ChangePasswordResponse, loading: ChangePasswordLoadning, error: ChangePasswordError, patch: submitData } = usePatch('auth/reset-password');

    useEffect(() => {
        document.title = 'Poker City | Password Recovery';
    }, [])


    const handleClick = (e) => {
        e.preventDefault();
        if (formData?.token && formData?.password && formData?.confirmPassword) {
            submitData(formData);
        }

    }

    useEffect(() => {
        if (ChangePasswordResponse) {
            toast(ChangePasswordResponse?.message);
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        }
    }, [ChangePasswordResponse])


    useEffect(() => {
        if (ChangePasswordError) {
            toast(ChangePasswordError?.message);
        }
    }, [ChangePasswordError])






    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('formData', formData)
    };


    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter a new password.' backOption={true}>
                <form onSubmit={handleClick}>
                    <CustomInput label='New Password' required id='pass' type='password' name="password" placeholder='Enter New Password' labelClass='mainLabel' inputClass='mainInput' onChange={handleChange} />
                    <CustomInput label='Confirm Password' required id='cPass' type='password' name="confirmPassword" placeholder='Confirm Password' labelClass='mainLabel' inputClass='mainInput' onChange={handleChange} />

                    <div className="mt-4 text-center">
                        <CustomButton type='submit' variant='primaryButton' text='Update' />
                    </div>
                </form>
            </AuthLayout>

            {/* <CustomModal show={showModal} success heading='Password updated successfully. Please login to continue' btnTxt="Continue" /> */}
        </>
    )
}



export default ForgetPassword3





