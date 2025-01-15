import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import './style.css'
import { usePatch } from "../../Api";

const ChangePassword = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    const [showModal, setShowModal] = useState(false);

      const { ApiData: passwordData, loading: passwordLoading, error: passwordError, patch: Getpassword } = usePatch(`user/update/password`);

    const handleClickPopup = ()=> {
        setShowModal(true);
    }

    useEffect(() => {

        document.title = 'Poker City | Change Password';
    }, []);


    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('userData', userData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userData?.password && userData?.confirmPassword) {
            Getpassword(userData);
        }
    }


    useEffect(()=>{
        if(passwordData) {
            setShowModal(true);
            setTimeout(()=>{
                setShowModal(false);
            },1500)
        }
    },[passwordData])

     return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                <span className="px-2">Change Password</span>
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-4 col-lg-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="New Password" name="password" labelClass="mainLabel" required type="password" placeholder="Enter New Password" inputClass="mainInput" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Confirm New Password" name="confirmPassword" labelClass="mainLabel" required type="password" placeholder="Confirm New Password" inputClass="mainInput" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomButton type="submit" variant="primaryButton" className="me-3 mb-2" text="Update" />
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={()=>{setShowModal(false)}} success heading='Your Password is Successfully Updated!' />
            </DashboardLayout>
        </>
    );
};

export default ChangePassword;
