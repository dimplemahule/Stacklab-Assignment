import React, { Component } from 'react'
import app from './firebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            phoneNo: "",
            address: "",
            verifyButton: false,
            verifyOtp: false,
            otp: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSignInSubmit = this.onSignInSubmit.bind(this)
        this.verifyCode = this.verifyCode.bind(this)
    }

    //******************************************************** */

    onCaptchaVarify() {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                this.onSignInSubmit();
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },

        }, auth);
    }

    //*********************************************** */
    onSignInSubmit() {
        this.onCaptchaVarify()
        const phoneNumber = "+91" + this.state.phoneNo;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("otp sended")
                this.setState({ verifyOtp: true })
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }
    //*********************************************** */
    verifyCode() {

        window.confirmationResult.confirm(this.state.otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user)
            alert("Verification Done ")
            // ...
        }).catch((error) => {
            alert("Invalid Otp")
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    
    handleSubmit(e) {
        e.preventDefault()
        const { name, email, password, phoneNo, address } = this.state;
        console.log(name, email, password, phoneNo, address);
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
                //userType,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
            })
    }

    //******************************************************** */
    changeMobile(e) {
        this.setState({ phoneNo: e.target.value }, function () {
            if (this.state.phoneNo.length == 10) {
                this.setState({
                    verifyButton: true,
                })
            }
        })
    }
    //*********************************************

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div id="recaptcha-container"></div>
                <div className="mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Mobile No: </label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter MobileNo"
                        onChange={e => this.changeMobile(e)}
                    />
                    {this.state.verifyButton ? (
                        <input type="button" value="verify"
                        onClick={this.onSignInSubmit}
                         style=
                            {{
                                backgroundColor: "Highlight",
                                width: "100%",
                                padding: 8,
                                color: "white",
                                border: "none"
                            }} />) : null}
                </div>

                {this.state.verifyOtp ? (
                    <div className="mb-3">
                        <label>OTP: </label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            onChange={e => this.setState({ otp: e.target.value })}
                        />

                        <input type="button" value="OTP" 
                        onClick={this.verifyCode}
                        style=
                            {{
                                backgroundColor: "Highlight",
                                width: "100%",
                                padding: 8,
                                color: "white",
                                border: "none"
                            }} />
                    </div>
                ) : null}

                <div className="mb-3">
                    <label>Address</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        onChange={e => this.setState({ address: e.target.value })}
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
        )
    }
}