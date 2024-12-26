import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"
import { useAuth, usePatch } from '../../Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCross, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../Assets/images';
import { base_url } from '../../Api/apiConfig';


const Thankyou = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get("token");


    const codeData = async () => {
        setLoading(true);
        setError(false);
        setLoading(true)
        try {
            const response =  await fetch(`${base_url}auth/verification/${paramValue}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('abc', result);
            setLoading(false);
            setStatus(result?.status)

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };


    useEffect(() => {
        if (paramValue != "") {
            codeData()
        }
    }, [paramValue])


    useEffect(() => {
        if (status) {
            setTimeout(()=>{
                navigate('/');
            },5000)
        }
    }, [status])





    useEffect(() => {
        document.title = 'Poker City | Verification Page';
    }, [])




    return (
        <>
            <div className='verificationModule h-100vh d-flex pt-5 mt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="m-auto siteLogo text-center w-100">
                                <img src={logo} className="mw-100" />
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='moduleData text-center'>

                                {
                                    loading && (
                                        <h1>Verifying your identity...</h1>
                                    )
                                }

                                {
                                    status && (
                                        <>
                                            <FontAwesomeIcon icon={faCheckCircle} className='text-success'></FontAwesomeIcon>
                                            <h3>Thank You For Verification</h3>
                                        </>
                                    )
                                }

                                {
                                    error && (
                                        <>
                                            <FontAwesomeIcon icon={faTimesCircle} className='text-danger'></FontAwesomeIcon>
                                            <h3>Verification Error, Please try again.</h3>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Thankyou
