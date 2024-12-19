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

export const LectureManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [delID, setDelID] = useState('');
  const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`lectures`);
  const { ApiData: TagDeleteData, loading: TagDeleteLoading, error: TagDeleteError, del: GetTagDelete } = useDelete(`lectures/${delID}`);


  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const filterData = data.filter(item =>
    item?.name?.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);




  useEffect(() => {
    document.title = 'Poker | Lecture Management';
    GetUseeListing()

  }, []);


  useEffect(() => {
    if (UseeListingData) {
      setData(UseeListingData)
    }
  }, [UseeListingData])

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Lecture Name",
    },
    {
      key: "count",
      title: "Category",
    },
    {
      key: "count",
      title: "Tag",
    },
    {
      key: "count",
      title: "Course Name",
    },
    {
      key: "created_at",
      title: "Created On",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },
  ];

  const [videoDurations, setVideoDurations] = useState({});

  const handleMetadataLoaded = (index, duration) => {
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [index]: duration, // Store duration for each video by its index
    }));
  };

  const handleMouseEnter = (e) => {
    e.target.play();
  };

  const handleMouseLeave = (e) => {
    e.target.pause();
    e.target.currentTime = 0; // Optional: Reset the video to the start
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
                    <h2 className="mainTitle">Learning Center</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {/* <CustomButton text="Add New Lecture" variant='primaryButton' onClick={hanldeRoute} /> */}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  {data?.map((item, index) => (
                    <div className="col-xxl-3 col-xl-4 col-md-6 mb-5" key={index}>
                      <div class="videoCard shadow h-100 rounded-4 overflow-hidden">
                        <div className="videoBox">
                          <video
                            width="100%"
                            src={item?.videoUpload}
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave} 
                            muted
                            onLoadedMetadata={(e) =>
                              handleMetadataLoaded(index, e.target.duration)
                            }
                          ></video>
                        </div>
                        <div className="videoBoxContent">
                          <h3>{item?.name}</h3>
                          <p>
                            <FontAwesomeIcon icon={faClock} />{" "}
                            {videoDurations[index]
                              ? `${Math.floor(videoDurations[index] / 60)} min ${Math.floor(
                                videoDurations[index] % 60
                              )} sec`
                              : "Loading..."}
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faStar} /> {item?.tags[0]?.title}
                          </p>
                          <div className="videoFooter">
                            <Link to={`/lecture-management/lecture-details/${item?.id}`} className="buttonPrimary">View Lecture</Link>
                          </div>
                        </div>
                        
                      </div>
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
      </DashboardLayout>
    </>
  );
};
