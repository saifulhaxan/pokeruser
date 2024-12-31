import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { country, currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import CustomModal from "../../Components/CustomModal";

import './style.css'
import { useGet, usePatch } from "../../Api";
import ImageUpload from "../../Components/ImageUpload";
import { logo } from "../../Assets/images";

const EditProfile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const [userNewData, setUserNewData] = useState({})
    const [optionData, setOptionData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { ApiData: UsersData, loading: UsersLoading, error: UsersError, get: GetUsers } = useGet(`user/me`);
    const { ApiData: StatusUpdateData, loading: StatusUpdateLoading, error: StatusUpdateError, patch: GetStatusUpdate } = usePatch(`user/update/profile`);

    const keysToRemove = [
        'id',
        'email',
        'subscribedUser',
        'isActive',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'stripeCustomer',
    ];

    // Remove specified keys




    useEffect(() => {
        if (UsersData) {
            setUserData(UsersData);
        }

    }, [UsersData])

    const handleClickPopup = () => {
        keysToRemove.forEach(key => {
            delete userData[key];
        });

        GetStatusUpdate(userData)

    }

    useEffect(() => {
        if (StatusUpdateData) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        }
    }, [StatusUpdateData])

    const [imageId, setImageId] = useState(null);

    // Callback function to handle the image ID received from the child component
    const handleImageUpload = (response) => {
        console.log('Image upload response:', response);
        setUserData({
            ...userData,
            profilePicture: response?.imageUrl
        })
    };

    const handleClose = () => {
        setShowModal(false);
        navigate('/profile')
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(userData)
    };





    useEffect(() => {

        document.title = 'Poker City | Edit Profile';
        GetUsers()
    }, []);



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                            <div className="profileImage">
                                                <img src={userData?.profilePicture === null ? logo : userData?.profilePicture } alt="User" />
                                                <ImageUpload onUpload={handleImageUpload} title="Edit" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <CustomInput label="Name" labelClass="mainLabel" required type="text" placeholder="Enter Name" inputClass="mainInput" onChange={handleChange} name="name" value={userData?.name} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <h4 className="secondaryLabel">Email Address</h4>
                                                    <p className="secondaryText">{userData.email}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <CustomInput label="Phone Number" labelClass="mainLabel" required type="text" placeholder="Phone Number" inputClass="mainInput" onChange={handleChange} name="phone" value={userData?.phone} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12">
                                            <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Save" onClick={handleClickPopup} />
                                            <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Cancel" onClick={() => { navigate('/profile') }} />
                                        </div>

                                    </div>
                                </form>
                            </div> : ''}

                    </div>
                </div>
                <CustomModal show={showModal} close={handleClose} success heading='Your profile is Successfully Updated! Continue' />
            </DashboardLayout>
        </>
    );
};

export default EditProfile;
