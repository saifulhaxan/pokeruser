import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faHeart as faHeartSolid, faHeart as faHeartOutline, faHeart } from '@fortawesome/free-solid-svg-icons'; // Importing solid heart icon
import { Link } from 'react-router-dom';
import "./style.css";
import { usePost } from '../../Api';
import { ToastContainer, toast } from 'react-toastify';

const VideoBox = ({ item, index, onApiResponse }) => {
    // State to store video durations
    const [videoDurations, setVideoDurations] = useState({});
    const [formData, setFormData] = useState({});
    // State to handle the "liked" status (wishlist)
    const [isLiked, setIsLiked] = useState(false);
    const { ApiData: AddSavedData, loading: AddSavedLoading, error: AddSavedError, post: GetAddSaved } = usePost(`user/create-favorite`);


    // Handle video metadata load (store video duration)
    const handleMetadataLoaded = (index, duration) => {
        setVideoDurations((prevDurations) => ({
            ...prevDurations,
            [index]: duration, // Store duration for each video by its index
        }));
    };

    // Handle mouse enter (play the video)
    const handleMouseEnter = (e) => {
        e.target.play();
    };

    // Handle mouse leave (pause the video and reset to the start)
    const handleMouseLeave = (e) => {
        e.target.pause();
        e.target.currentTime = 0; // Optional: Reset the video to the start
    };

    // Handle heart icon click (toggle wishlist)
    const handleHeartClick = (id) => {
        setFormData({
            ...formData,
            lectureId: id
        })
        // setIsLiked((prevLiked) => !prevLiked); // Toggle the liked state
    };

    useEffect(() => {
        if (formData?.lectureId) {
            GetAddSaved(formData)

        }
    }, [formData])


    useEffect(() => {
        if (AddSavedData) {
            setFormData('');
            if (onApiResponse) {
                onApiResponse(AddSavedData); // Pass the API response to the parent
            }
        }
    }, [AddSavedData, onApiResponse])
    return (
        <div className="videoCard shadow h-100 rounded-4 overflow-hidden">
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
                {
                    item?.tags && (
                        <p>
                            <FontAwesomeIcon icon={faStar} /> {item?.tags[0]?.title}
                        </p>
                    )
                }

                <div className="videoFooter">
                    <Link to={`/lecture-management/lecture-details/${item?.id}`} className="buttonPrimary">View Lecture</Link>
                </div>

                {/* Wishlist heart icon */}
                <div className="wishlistIcon" >
                    <button onClick={() => { handleHeartClick(item?.id) }} type='button' className='border-0 bg-transparent'>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`heartIcon ${item?.isFavourite ? 'filled' : 'empty'}`}
                        />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default VideoBox;
