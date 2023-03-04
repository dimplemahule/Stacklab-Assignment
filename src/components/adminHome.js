import React, { useEffect, useState } from "react";

export default function AdminHome({ userData }) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/getAlluser", {
            method: "GET",

        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            });
    }, [])

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };
    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{ width: "auto" }}>
                <h1>Welcome Admin page</h1>
                <table style={{ width: 500 }}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Addrss</th>
                        <th>UeerTpe</th>
                    </tr>
                    {data.map(i =>{
                        return(
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.phoneNo}</td>
                                <td>{i.address}</td>
                                <td>{i.userType}</td>
                            </tr>
                        )
                    })}
                </table>
                <button onClick={logOut} className="btn btn-primary">
                    Log Out
                </button>
            </div>
        </div>

    );
}