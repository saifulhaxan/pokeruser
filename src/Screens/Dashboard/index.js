/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 21:22:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
//y
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { male1, male2, userImage, female1, male3 } from "../../Assets/images";
import { useApi, useGet } from "../../Api";

import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import VideoBox from "../../Components/videoBox";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [data, setData] = useState('');
  const [saveVideo, setSave] = useState([{}]);

  const { ApiData: DashboardStatsData, loading: DashboardStatsLoading, error: DashboardStatsError, get: GetDashboardStats } = useGet(`user/dashboard`);
  const { ApiData: SavedVideosData, loading: SavedVideosLoading, error: SavedVideosError, get: GetSavedVideos } = useGet(`user/get-favorites`);


  useEffect(() => {

    document.title = 'Poker Admin | Dashboard';
    GetDashboardStats()
    GetSavedVideos()
  }, []);


  useEffect(() => {
    if (SavedVideosData) {
      setSave(SavedVideosData)
    }
  }, [SavedVideosData])

  useEffect(() => {
    console.log('save', saveVideo);
  }, [saveVideo])

  useEffect(() => {
    if (DashboardStatsData) {
      setData(DashboardStatsData)
    }

  }, [DashboardStatsData])

  console.log(data)

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
                <div className="row">
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {leadLoading ? 'Loading...' : <h3 className="statsNumber">{`$ ${data?.totalSum}`}</h3>} */}
                          <h3 className="statsNumber">{data?.totalWatchedTime?.totalWatchedHours}</h3>
                          <p className="statsText">Total Watch Time</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {receivedLoading ? 'Loading... ' : <h3 className="statsNumber">{`$ ${recived?.totalSumReceivedAmount}`}</h3>} */}
                          <h3 className="statsNumber">{data?.totalProgress?.progress}%</h3>
                          <p className="statsText">Total Lecture Progress</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">{data?.totalCompletedVideos}</h3>
                          <p className="statsText">Total Completed Videos</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="titleArea mb-4">
                      <h3 className="mainTitle">Recently Login</h3>
                    </div>
                    <div className="dashData">
                      <div className="userBox">
                        <div className="userImage">
                          <img src={male1} alt="Jhon" />
                        </div>
                        <div className="userName">
                          <h5>Jhon Mikal</h5>
                          <p>Last Login: 7:32 AM</p>
                        </div>
                      </div>
                      <div className="userBox">
                        <div className="userImage">
                          <img src={male3} alt="Jhon" />
                        </div>
                        <div className="userName">
                          <h5>Jhon Mikal</h5>
                          <p>Last Login: 7:32 AM</p>
                        </div>
                      </div>
                      <div className="userBox">
                        <div className="userImage">
                          <img src={male2} alt="Jhon" />
                        </div>
                        <div className="userName">
                          <h5>Jhon Mikal</h5>
                          <p>Last Login: 7:32 AM</p>
                        </div>
                      </div>
                      <div className="userBox">
                        <div className="userImage">
                          <img src={female1} alt="Jhon" />
                        </div>
                        <div className="userName">
                          <h5>Jhon Mikal</h5>
                          <p>Last Login: 7:32 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="titleArea mb-4">
                      <h3 className="mainTitle">Recently Registered</h3>
                    </div>
                    <div className="dashData">
                      {
                        data && data?.map((item, index) => (

                          <div className="userBox" key={index}>
                            <div className="userImage">
                              <img src={male1} alt="Jhon" />
                            </div>
                            <div className="userName">
                              <div className="info">
                                <h5 className="text-capitalize">{item?.name}</h5>
                                <small>{item?.email}</small>
                              </div>
                              <p>{item?.createdAt}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="titleArea">
                        <h3 className="mainTitle">Your Saved Lectures</h3>
                      </div>
                      <div className="titleArea">
                        <Link className="text-theme-primary" to="/saved-videos">View All</Link>
                      </div>
                    </div>

                  </div>
                  {
                    Array.isArray(saveVideo?.favoriteLectures) && saveVideo.favoriteLectures.length > 0 ? (
                      saveVideo.favoriteLectures.slice(0, 8)?.map((item, index) => (
                        <div className="col-xxl-3 col-xl-4 col-md-6 mb-5" key={index}>
                          <VideoBox
                            key={item?.id}
                            item={item}
                            index={index}
                            onApiResponse={handleApiResponse}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No favorite lectures available.</p>
                    )
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
