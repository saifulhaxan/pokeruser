/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 22:59:59
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash, faClock, faStar } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


// import "./style.css";
import { useDelete, useGet } from "../../Api";
import VideoBox from "../../Components/videoBox";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const PromotionManagement = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [saveVideo, setSave] = useState([{}]);
    const [delID, setDelID] = useState('');
    const { ApiData: SavedVideosData, loading: SavedVideosLoading, error: SavedVideosError, get: GetSavedVideos } = useGet(`promotion`);
    const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`lectures/${delID}`);


    const navigate = useNavigate();


    useEffect(() => {
        document.title = 'Poker | Promotion Management';
        GetSavedVideos()

    }, []);


    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        if (SavedVideosData) {
            setSave(SavedVideosData)
        }
    }, [SavedVideosData])

    useEffect(() => {
        console.log('save', saveVideo);
    }, [saveVideo])

    const handleApiResponse = (response) => {
        console.log('API Response:', response?.message);

        // Use a unique toast ID to prevent duplicate toasts
        toast(response?.message, { toastId: 'unique-toast-id' });

        // Refresh the saved videos
        GetSavedVideos();
    };








    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="row mb-3 justify-content-between">
                                    <div className="col-md-6 mb-2">
                                        <h2 className="mainTitle">Promotion Management</h2>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="addUser">
                                            {/* <CustomButton text="Add New Lecture" variant='primaryButton' onClick={hanldeRoute} /> */}
                                            <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    {
                                        saveVideo.filter(item => item?.title?.toLowerCase().includes(inputValue.toLowerCase()))?.map((item, index) => (
                                            <div className="col-xxl-12 col-xl-12 col-md-12 mb-5" key={index}>
                                                <div className="promotionBox">
                                                    <div className="imageBoxPromo">
                                                        <img src={item?.image} className="mw-100" />
                                                    </div>
                                                    <div className="promoContent shadow p-3">
                                                        <h3>{item?.title}</h3>
                                                        <p>{item?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </DashboardLayout>
        </>
    );
};
