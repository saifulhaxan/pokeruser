import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomButton from "../../Components/CustomButton";

import './style.css'
import { useGet, usePost } from "../../Api";
import { logo, male1 } from "../../Assets/images";
import CustomModal from "../../Components/CustomModal";
import { base_url } from "../../Api/apiConfig";


const Profile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const LogoutData = localStorage.getItem('login');
    const { ApiData: UsersData, loading: UsersLoading, error: UsersError, get: GetUsers } = useGet(`user/me`);
    const { ApiData: SubscriptionCancelData, loading: SubscriptionCancelLoading, error: SubscriptionCancelError, post: GetSubscriptionCancel } = usePost(`user/cancelSubscription `);
    useEffect(() => {
        if (UsersData) {
            setUserData(UsersData);
        }

    }, [UsersData])

    useEffect(() => {
        document.title = 'Poker City | My Profile';

        GetUsers()
    }, []);

    const Continue = () => {
        fetch(`${base_url}user/cancel/subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LogoutData}`, // Pass token in Authorization header
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Subscription cancelled:', data);
                setShowModal(false)
                setShowModal2(true)
            })
            .catch((error) => console.error("Error cancelling subscription:", error));
    };



    const handleRedirect = () => {
        alert()
    }

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3 align-items-center justify-content-between">
                        <div className="col-md-6">
                            <h2 className="mainTitle">
                                My Profile
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn primaryButton px-4 rounded-5" onClick={() => { setShowModal(true) }}>
                                    Cancel Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <div className="row mb-3">
                                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                        <div className="profileImage">
                                            <img src={userData?.profilePicture === null ? logo : userData?.profilePicture} alt="User" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row mb-4">
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Full Name</h4>
                                                <p className="secondaryText">{userData?.name}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">DOB</h4>
                                                <p className="secondaryText">{userData.dob}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Email</h4>
                                                <p className="secondaryText">{userData.email}</p>
                                            </div>
                                            {/* <div className="col-lg-6">
                                                <div class="row">
                                                    <div className="col-md-6 mb-3">
                                                        <h4 className="secondaryLabel">State</h4>
                                                        <p className="secondaryText">{userData.state}</p>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <h4 className="secondaryLabel">City</h4>
                                                        <p className="secondaryText">{userData.city}</p>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Phone Number</h4>
                                                <p className="secondaryText">{userData.phone}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">User Status</h4>
                                                <p className={`secondaryText ${userData.isActive ? 'text-success' : 'text-danger'}`}>{userData.isActive ? 'Active' : 'Inactive'}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Subscription Status</h4>
                                                <p className={`secondaryText ${userData.subscribedUser ? 'text-success' : 'text-danger'}`}>{userData.subscribedUser ? 'Active' : 'Inactive'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Edit Profile" onClick={() => { navigate('/profile/edit-profile') }} />
                                        <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Change Password" onClick={() => { navigate('/profile/change-password') }} />
                                    </div>

                                </div>
                            </div> : ''}

                    </div>
                </div>
                <CustomModal show={showModal} action={Continue} close={() => { setShowModal(false) }} heading='Are you sure you want to cancel your subscription?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Subscription Cancelled Successfully' />
            </DashboardLayout>
        </>
    );
};

export default Profile;
