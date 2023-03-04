import React, { useState } from "react";
import app from './firebase_config';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [phoneNo,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  




// function onSignInSubmit(){
//   onCaptchaVarify();
//   const phoneNumber = "+91" + phoneNo;
//   const appVerifier = window.recaptchaVerifier;
//   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//           // SMS sent. Prompt user to type the code from the message, then sign the
//           // user in with confirmationResult.confirm(code).
//           window.confirmationResult = confirmationResult;
//           alert("otp sended")
//           console.log({ verifyOtp: true })
//           // ...
//       }).catch((error) => {
//           // Error; SMS not sent
//           // ...
//       });
// }


// function verifyCode() {

//   window.confirmationResult.confirm(otp).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(user)
//       alert("Verification Done ")
//       // ...
//   }).catch((error) => {
//       alert("Invalid Otp")
//       // User couldn't sign in (bad verification code?)
//       // ...
//   });
// }

// function changeMobile(e){
//   setPhone({ phoneNo: e.target.value }, function () {
//       if (phoneNo.length == 10) {
//           setPhone({
//               verifyButton: true,
//           })
//       }
//   })
// }



  const handleSubmit = (e) => {
    
    if (userType == "Admin" && secretKey != "Lalita") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNo,
          address,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Phone:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}