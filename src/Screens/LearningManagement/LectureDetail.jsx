/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:01:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { useGet, usePatch } from "../../Api";
import FormatDateTime from "../../Components/DateFormate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";

export const LectureDetails = () => {

    const { id } = useParams();
    const [details, setDatail] = useState({});
    const [data, setData] = useState({});
    const [status, setStatus] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)
    const { ApiData: UseeListingData, loading: UseeListingLoading, error: UseeListingError, get: GetUseeListing } = useGet(`lectures/${id}`);
    const { ApiData: StatusUpdateData, loading: StatusUpdateLoading, error: StatusUpdateError, patch: GetStatusUpdate } = usePatch(`courses/${id}`);
    const { ApiData: UseeListingDetailData, loading: UseeListingDetailLoading, error: UseeListingDetailError, get: GetUseeListingDetail } = useGet(`lectures`);

    const inActive = () => {
        setShowModal(false)
        setStatus({
            ...status,
            status: false
        })
        setShowModal2(true)

        setTimeout(() => {
            setShowModal2(false)
        }, 1000)
        console.log('status', status)
    }
    const Active = () => {
        setShowModal3(false)
        setStatus({
            ...status,
            status: true
        })
        setShowModal4(true)
        setTimeout(() => {
            setShowModal4(false)
        }, 1000)
        console.log('status', status)
    }






    useEffect(() => {
        GetUseeListing()
        GetUseeListingDetail()
    }, [id])


    useEffect(() => {
        if (UseeListingData) {
            setDatail(UseeListingData)
        }
    }, [UseeListingData])

    useEffect(() => {
        if (UseeListingDetailData) {
            setData(UseeListingDetailData.slice(0, 4))
        }
    }, [UseeListingDetailData])



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
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Course Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="videoInfoDetail">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        {/* <div class="progress-container">
                                            <div class="progress-bar" id="progressBar"></div>
                                        </div> */}
                                        <video width="100%" className="" controls src={details?.videoUpload}></video>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <h3 className="">{details?.name}</h3>
                                                <p> <FormatDateTime isoDateString={details?.createdAt} /></p>

                                                <p className="">{details?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 mt-5 pt-5">
                        <div className="col-md-12">
                            <h3 className="mainTitle">Recently Videos</h3>
                        </div>
                        {data?.length > 0 && data?.map((item, index) => (
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

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this course as inactive?' />
                <CustomModal show={showModal2} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this course as Active?' />
                <CustomModal show={showModal4} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

