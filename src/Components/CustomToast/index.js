import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = (message) => {
  toast(message, {
    toastId: `toast-${Date.now()}`, // Ensure a unique toast ID
    autoClose: 1000, // Close after 1 second
    position: "top-right", // Adjust position as needed
    hideProgressBar: false, // Show/hide progress bar
    closeOnClick: true, // Allow clicking to dismiss
    pauseOnHover: true, // Pause dismissal on hover
  });
};

export default CustomToast;
