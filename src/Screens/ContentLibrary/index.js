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


import "./style.css";
import { useDelete, useGet } from "../../Api";
import VideoBox from "../../Components/videoBox";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ContentLibrary = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [delID, setDelID] = useState('');
  const [categories, setCategories] = useState();
  const [displayData, setDisplayData] = useState([]);
  const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`lectures`);
  const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`lectures/${delID}`);
  const { ApiData: CategoryData, loading: CategoryLoading, error: CategoryError, get: GetCategory } = useGet(`category`);


  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    if (CategoryData) {
      setCategories(CategoryData)
    }
  }, [CategoryData])
  console.log();

  const hanldeRoute = () => {
    navigate('/add-lecture')
  }

  //delete 

  useEffect(() => {
    if (delID) {
      GetTagDelete()
    }
  }, [delID])


  useEffect(() => {
    if (TagDeleteData) {
      GetUseeListing()
    }
  }, [TagDeleteData])




  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data;



  useEffect(() => {
    document.title = 'Poker | Content Library';
    GetUseeListing()
    GetCategory()
  }, []);


  useEffect(() => {
    if (UseeListingData) {
      setData(UseeListingData)
      setDisplayData(UseeListingData);
    }
  }, [UseeListingData])

  const [titleData, setTitle] = useState('All');

  const [refresh, setRefresh] = useState();
  const handleApiResponse = (response) => {
    console.log('API Response:', response?.message);
  
    // Use a unique toast ID to prevent duplicate toasts
    toast(response?.message, {
      toastId: 'unique-toast-id',
      autoClose: 1000, // Toast will auto-close after 1 second (1000 milliseconds)
    });
  

  };
  

  const handleCategorySelect = (e) => {
    const selectedCategoryId = e.target.value;

    if (selectedCategoryId == "undifiend") {
      // User selected "Select Category", reset to show all data
      GetUseeListing(); // Ensure this function resets the data appropriately
      setTitle('All');
    } else {
      // User selected a specific category
      const selectedCategoryName = e.target.options[e.target.selectedIndex].text;
      setTitle(selectedCategoryName);

      const filteredData = data.filter(item =>
        item.category.id === parseInt(selectedCategoryId, 10)
      );

      setDisplayData(filteredData);
    }
  };

  console.log('dd', displayData)








  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Content Library</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser flex-md-nowrap">
                      {/* <CustomButton text="Add New Lecture" variant='primaryButton' onClick={hanldeRoute} /> */}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput flex-shrink-0" onChange={handleChange} />
                      <select name="category" className="mainInput w-50" onChange={handleCategorySelect}>
                        <option value="undifiend">Select Category</option>
                        {categories && categories.map((item) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                      </select>

                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3 className="mainTitle">NLHE (No-Limit Hold'em) - {titleData ? titleData : 'All'} </h3>
                  </div>
                  {displayData?.map((item, index) => (
                    <div className="col-xxl-3 col-xl-4 col-md-6 mb-5" key={index}>
                      <VideoBox
                        key={item.id}
                        item={item}
                        list={[...displayData]}
                        index={index}
                        onApiResponse={handleApiResponse}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />



        </div>
        <ToastContainer />
      </DashboardLayout>
    </>
  );
};
