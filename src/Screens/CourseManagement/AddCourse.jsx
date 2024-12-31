/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:01:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { CategoryList, DietaryList, MenuList } from "../../Components/CategoryList";
import { useGet, usePost } from "../../Api";
import { useNavigate } from "react-router";
import { userData } from "../../Config/Data";
export const AddCourse = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState();
    const navigate = useNavigate();
    const { ApiData: CustomerSupportData, loading: CustomerSupportLoading, error: CustomerSupportError, post: GetCustomerSupport } = usePost(`customer-support`);
    const { ApiData: UsersData, loading: UsersLoading, error: UsersError, get: GetUsers } = useGet(`user/me`);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('formData', formData)
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData?.name && formData?.message) {
            GetCustomerSupport(formData);
        }


    };


    useEffect(() => {
        if (CustomerSupportData) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
                navigate('/dashboard');
            }, 3000)
            
        }
    }, [CustomerSupportData])


    useEffect(() => {
        GetUsers()
    }, [])


    useEffect(() => {
        if (UsersData) {
            setFormData({
                ...formData,
                name: UsersData?.name,
                email: UsersData?.email
            })
        }
    }, [UsersData])






    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Support Form
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter  Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData?.name}
                                                    disabled
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    required
                                                    id='name'
                                                    type='email'
                                                    placeholder='Enter Email Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="title"
                                                    value={formData?.email}
                                                    disabled
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Message</label>
                                                        <textarea
                                                            name="message"
                                                            required
                                                            className="form-control shadow border-0"
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            value={formData?.message}
                                                            onChange={handleChange}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Your Query has been successfully submitted to the admin.' />

            </DashboardLayout>
        </>
    );
};

