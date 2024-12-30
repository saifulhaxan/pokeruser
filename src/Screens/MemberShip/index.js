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
import { useApi, useGet, usePost } from "../../Api";

import "./style.css";
import CustomInput from "../../Components/CustomInput";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";




export const Membership = () => {
    const [data, setData] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [recived, setReceived] = useState('');
    const [amount, setAmount] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const { ApiData: UsersData, loading: UsersLoading, error: UsersError, get: GetUsers } = useGet(`user/me`);
    const { ApiData: ClientSecretData, post: GetClientSecret } = usePost(`user/create/subscription`);
    const LogoutData = localStorage.getItem('login');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (!stripe || !elements) {
          console.error("Stripe or Elements not loaded");
          return;
        }
      
        const cardElement = elements.getElement(CardElement);
      
        // Validate the card input
        if (!cardElement) {
          console.error("CardElement is not loaded");
          return;
        }
      
        const { error: validationError } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
      
        if (validationError) {
          console.error("Card validation error:", validationError.message);
          return;
        }
      
        // Proceed to fetch client secret if card input is valid
        fetch("https://devapi.archcitylms.com/user/create/subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LogoutData}`, // Pass token in Authorization header
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data?.clientSecret) {
              setClientSecret(data?.clientSecret);
              // Confirm the payment with the fetched client secret
              stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                  card: cardElement,
                },
              })
                .then((result) => {
                  if (result.error) {
                    console.error("Payment confirmation error:", result.error.message);
                  } else if (result.paymentIntent) {
                    console.log("Payment successful:", result.paymentIntent);
                  }
                })
                .catch((error) => console.error("Error confirming payment:", error));
            } else {
              console.error("Client secret not found in response:", data);
            }
          })
          .catch((error) => console.error("Error fetching client secret:", error));
      };
      



   

    useEffect(() => {

        document.title = 'Poker User | Membership';
        GetUsers()
    }, []);


    useEffect(() => {
        if (UsersData) {
            setData(UsersData);
        }

    }, [UsersData])

    console.log(data)


    return (
        <>
            <DashboardLayout>
                <section className="membershipSection">
                    <div className="container">

                        {
                            !showForm ? (

                                <div className="row justify-content-center">
                                    <div className="col-md-7">
                                        <div className="elevateContent text-center">
                                            <span className="subTitle text-dark mb-2 d-inline-block">Learn. Improve. Win.</span>
                                            <h2 className="f-40 mainThemeHead mb-3 text-center text-theme-primary">Membership Plan</h2>
                                        </div>
                                        <div className="packageBox">
                                            <div className="packageHead pb-3 mb-5 border-bottom">
                                                <h2 className="mainThemeHead text-white"><sup>USD</sup>49.99<sub>Monthly</sub></h2>
                                                <p className="text-white">Membership sign up unlocks full access to all No Limit Hold'em and Pot Limit Omaha content, including video tutorials crafted for every skill level.</p>
                                            </div>
                                            <div className="packageBody">
                                                <ul className="text-white">
                                                    <li>New content uploads weekly</li>
                                                    <li>No contract required - cancel at any time!</li>
                                                    <li>Includes a custom-built Learning Management System tailored for players of all skill levels, providing easy navigation and access to content</li>
                                                    <li>Custom learning modules ranging from foundational skills for beginners to advanced theoretical concepts for seasoned players</li>
                                                    <li>Build a personalized video library for easy access to specific topics</li>
                                                </ul>
                                            </div>
                                            <div className="packageFooter">
                                                <p className="text-center"><button type="button" className="primaryThemeBtn" onClick={() => { setShowForm(true) }}>Select Plan</button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="paymentForm">
                                        <div className="row">
                                            <div className="col-md-12 mb-5">
                                                <div className="elevateContent text-center">
                                                    <span className="subTitle text-dark mb-2 d-inline-block">You can't change the profile info until you get membership.</span>
                                                    <h2 className="f-40 mainThemeHead mb-3 text-center text-theme-primary">Payment Form</h2>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='User Name'
                                                    required
                                                    id='userName'
                                                    type='text'
                                                    placeholder='Enter Your Username'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    disabled
                                                    value={data?.name}

                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Email Address'
                                                    required
                                                    id='userEmail'
                                                    type='email'
                                                    placeholder='Enter Your Email Address'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    disabled
                                                    value={data?.email}

                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <CustomInput
                                                    label='DOB'
                                                    required
                                                    id='dob'
                                                    type='date'
                                                    placeholder='Enter Your DOB'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    disabled
                                                    value={data?.dob}

                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <CustomInput
                                                    label='Phone'
                                                    required
                                                    id='phone'
                                                    type='text'
                                                    placeholder='Enter Your Phone'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    disabled
                                                    value={data?.phone}

                                                />
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <CardElement />
                                                <button type="submit" className="customButton primaryButton mt-5" disabled={!stripe}>
                                                    Pay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }

                    </div>
                </section>
            </DashboardLayout>
        </>
    );
};
