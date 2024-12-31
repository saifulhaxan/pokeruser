/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 22:30:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faPenFancy,
  faMoneyBill,
  faTableList,
  faTag,
  faYenSign,
  faHeadphonesAlt,
  faVideo,
  faAd
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

export const Sidebar = (props) => {

  const location = useLocation();
  const isSubscribe = localStorage.getItem('isSubscribe');
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      {
        isSubscribe && isSubscribe == "true" ? (
          <ul className="list-unstyled">
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faBorderAll} />
                </span>
                <span className="sideLinkText">Dashboard</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/profile') ? 'active' : ''}`} to="/profile">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <span className="sideLinkText">User Profile</span>
              </Link>
            </li>

            {/* <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('customer-support') ? 'active' : ''}`} to="/customer-support">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadphonesAlt} />
            </span>
            <span className="sideLinkText">Customer Support</span>
          </Link>
        </li> */}
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('lecture-management') ? 'active' : ''}`} to="/lecture-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faVideo} />
                </span>
                <span className="sideLinkText">Learning Center</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <span className="sideLinkText">Content Library</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/saved-videos') ? 'active' : ''}`} to="/saved-videos">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faYenSign} />
                </span>
                <span className="sideLinkText">Saved Videos</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} to="#">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faAd} />
                </span>
                <span className="sideLinkText">Promotions</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/help-form') ? 'active' : ''}`} to="/help-form" >
                <span>
                  <FontAwesomeIcon icon={faTableList} />
                </span>
                <span className="sideLinkText"> Help/Support</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="list-unstyled">
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/select-plan') ? 'active' : ''}`} to="/select-plan">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <span className="sideLinkText">Purchase Plan</span>
              </Link>
            </li>
          </ul>
        )
      }


    </div>
  );
};
