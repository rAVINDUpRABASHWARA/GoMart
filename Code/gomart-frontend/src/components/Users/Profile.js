import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import logo from "./img/Logo.png";
import './ProfileScreen.css'
import { useEffect } from "react";


const Profile = ({history}) => {

    const [cusId, setCusId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateCustomer = () => {
        alert("Update User");
    }
    
    const deleteCustomer = (id) => {
        // alert(`${id}`);
        axios.delete(`http://localhost:8000/api/users/deleteUser/${id}`);
        window.localStorage.clear();
        window.location.replace("http://localhost:3000");

    }

    // const fetchCurrentUser = async(id) => {
    //     const user = await axios.get(`http://localhost:8000/api/users/current/${id}`);
    //     setCurrentUser(user);
    //     // setFullName(currentUser.data.user.full_name);
    // }

    // const getCurrentUser = () => {
        
    // }
    
    useEffect(() => {
        const infor = JSON.parse(window.localStorage.getItem('data'));
        if (!infor) {
            history.push("/");
        } else {
        // fetchCurrentUser(infor.data.data._id);
        // getCurrentUser();
        setCusId(infor.data._id);
        setFullName(infor.data.full_name)
        setEmail(infor.data.email)
        }
    })
return (

    // <div class="container mt-5">
    // <div class="row d-flex justify-content-center">
    //     <div class="col-md-7">
    //         <div class="card p-3 py-4">
    //             <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="90" class="rounded-circle"/> </div>
    //             <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">Text</span>
    //                 <h5 class="mt-2 mb-0">Name</h5> <span>Gender</span>
    //                 <div class="px-4 mt-1">
    //                     <p class="fonts">Address Address Address Address Address Address Address Address Address Address Address Address Address </p>
    //                 </div>
                
    //                     <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> 
    //                     <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-7">
            <div class="card p-3 py-4">
        <div>
            <h2>Profile Page</h2>
            <Row className="profileContainer">
            <Col md={6}>
                <Form>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    contentEditable
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email1"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>{" "}
                <Form.Group controlId="pic">
                </Form.Group>
                    <Button size="lg" variant="success" type="submit" onClick={() =>{
                        updateCustomer()
                    }}>
                    Update
                    </Button>
                    <Button size="lg" variant="danger" type="submit" onClick={() => {
                        deleteCustomer(cusId)
                    }}>
                    Delete
                    </Button>
                </Form>
            </Col>
            <Col
                style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <img src= {logo} alt="Full Name" className="profilePic" />
            </Col>
            </Row>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Profile;
