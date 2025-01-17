/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 21:20:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import AdminLSignUp from "../Screens/Auth/SignUp";
import { Dashboard } from "../Screens/Dashboard";
import { UserManagement } from "../Screens/UserManagement";
import { AddUser } from "../Screens/UserManagement/AddUser";
import { EditUser } from "../Screens/UserManagement/EditUser";
import { UserDetails } from "../Screens/UserManagement/UserDetail";
import { CategotyManagement } from "../Screens/CategoryManagement";
import { TagManagement } from "../Screens/TagManagement";
import { CustomerSupport } from "../Screens/CustomerSupport";
import { AddMessage } from "../Screens/CustomerSupport/AddMessage";
import { EditMessage } from "../Screens/CustomerSupport/EditMessage";
import { MessageDetail } from "../Screens/CustomerSupport/MessageDetail";
import { NotificationManagement } from "../Screens/NotificationManagement";
import { AddNotification } from "../Screens/NotificationManagement/AddNotification";
import { EditNotification } from "../Screens/NotificationManagement/EditNotification";
import { NotificationDetail } from "../Screens/NotificationManagement/NotificationDetail";
import { CourseManagement } from "../Screens/CourseManagement";
import { AddCourse } from "../Screens/CourseManagement/AddCourse";
import { EditCourse } from "../Screens/CourseManagement/EditCourse";
import { CourseDetails } from "../Screens/CourseManagement/CourseDetail";
import { PromotionManagement } from "../Screens/PromotionManagement";

import { LectureManagement } from "../Screens/LearningManagement";
import { AddLecture } from "../Screens/LearningManagement/AddLecture";
import { EditLecture } from "../Screens/LearningManagement/EditLecture";
import { LectureDetails } from "../Screens/LearningManagement/LectureDetail";
import ChunkedFileUpload from "../Screens/demo/demo";
import { ContentLibrary } from "../Screens/ContentLibrary";
// end


import { SavedVideos } from "../Screens/SavedVideos";
import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import VideoUploader from "../Screens/demo";
import FileUpload from "../Screens/demo/demo";
import Thankyou from "../Screens/Auth/ThankYou";
import { Membership } from "../Screens/MemberShip";
import Error from "../Screens/Error";


export default function AdminRouter() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />
        <Route path="/sign-up" element={<AdminLSignUp />} />
        <Route path="/thankyou-verification" element={<Thankyou />} />
        {/* <Route path="/video" element={<ProtectedRoutes Components={VideoUploader} />} /> */}
        <Route path="/video" element={<ProtectedRoutes Components={ChunkedFileUpload} />} />
        <Route path="/video-upload" element={<ProtectedRoutes Components={FileUpload} />} />
        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/add-user" element={<ProtectedRoutes Components={AddUser} />} />
        <Route path="/edit-user" element={<ProtectedRoutes Components={EditUser} />} />
        <Route path="/user-management/user-details/:id" element={<ProtectedRoutes Components={UserDetails} />} />
        <Route path="/customer-support" element={<ProtectedRoutes Components={CustomerSupport} />} />
        <Route path="/add-message" element={<ProtectedRoutes Components={AddMessage} />} />
        <Route path="/edit-message" element={<ProtectedRoutes Components={EditMessage} />} />
        <Route path="/customer-support/message-details/:id" element={<ProtectedRoutes Components={MessageDetail} />} />

        <Route path="/notification-management" element={<ProtectedRoutes Components={NotificationManagement} />} />
        <Route path="/add-notification" element={<ProtectedRoutes Components={AddNotification} />} />
        <Route path="/edit-notification" element={<ProtectedRoutes Components={EditNotification} />} />
        <Route path="/notification-management/message-details/:id" element={<ProtectedRoutes Components={NotificationDetail} />} />

        <Route path="/category-management" element={<ProtectedRoutes Components={CategotyManagement} />} />
        <Route path="/tag-management" element={<ProtectedRoutes Components={TagManagement} />} />

        <Route path="/course-management" element={<ProtectedRoutes Components={CourseManagement} />} />
        <Route path="/help-form" element={<ProtectedRoutes Components={AddCourse} />} />
        <Route path="/edit-course/:id" element={<ProtectedRoutes Components={EditCourse} />} />
        <Route path="/course-management/course-details/:id" element={<ProtectedRoutes Components={CourseDetails} />} />

        <Route path="/lecture-management" element={<ProtectedRoutes Components={LectureManagement} />} />
        <Route path="/add-lecture" element={<ProtectedRoutes Components={AddLecture} />} />
        <Route path="/edit-lecture/:id" element={<ProtectedRoutes Components={EditLecture} />} />
        <Route path="/lecture-management/lecture-details/:id" element={<ProtectedRoutes Components={LectureDetails} />} />

        <Route path="/content-library" element={<ProtectedRoutes Components={ContentLibrary} />} />

        <Route path="/promotion-management" element={<ProtectedRoutes Components={PromotionManagement} />} />

        <Route path="/select-plan" element={<ProtectedRoutes Components={Membership} />} />
        <Route path="/saved-videos" element={<ProtectedRoutes Components={SavedVideos} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
