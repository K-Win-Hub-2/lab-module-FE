/* eslint-disable */

import React, { useState } from "react";
import SideBar from "../components/views/SideBar";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
`;

const Left = styled.div`
  font-weight: normal;
  flex: 1;
  display: flex;
`;

const Center = styled.div`
  flex: 1;
  display: inline;
  text-align: center;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  justify-content: center;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
`;

const Title = styled.h5`
  font-weight: bold;
  margin-top: 10px;
`;
const Div = styled.div``;
const Label = styled.label``;
const Input = styled.input`
  width: 100%;
`;
const Span = styled.span`
  color: red;
`;
const Textarea = styled.textarea``;
const DivF = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  justify-content: center;
  margin-top: 15px;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate('');

  //  const handleImageUpload = (e) => {
  //    setImg(e.target.files[0]);
  //  };

  const patientCreate = () => {
    const data = {
      name: name,
      // email: email,
      age: age,
      // phone: phone,
      img: img,
      address: address,
      occupation: occupation,

      gender: gender,
      patientStatus: "Old",
    };

    // if (img) data.img = img;

    if (email !== null) data.email = email;
    if (phone !== null) data.phone = phone;
    //  if (address) data = { ...data, address: address };
    //  if (occupation) data = { ...data, occupation: occupation };
    // alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/patient",
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: "Success",
          text: "successfully Patient Create!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        }).then(function () {
          // alert("success");
          navigate("/patient/list");
        });
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: "Warning",
          text: "Something Wrong!",
          icon: "warning",
          confirmButtonText: "CANCEL",
        });
      });
  };
  return (
    <div className="wrapper">
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <Left>
              <Title>Patient Register</Title>
            </Left>
            <Div className="card">
              <Div className="card-body">
                <Div className="row">
                  <Div className="offset-2 col-4 form-group ">
                    <Label>
                      Name<Span>*</Span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Div>
                  <Div className="col-4 form-group">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Div>
                </Div>
                <Div className="row mt-3">
                  <Div className="offset-2 col-4 form-group">
                    <Label>
                      Phone<Span>*</Span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Div>
                  <Div className="col-4 form-group">
                    <Label>
                      Age<Span>*</Span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </Div>
                </Div>
                <Div className="row mt-3">
                  <Div className="offset-2 col-4 form-group">
                    <Label>
                      Gender<Span>*</Span>
                    </Label>
                    <DivF>
                      Male
                      <Input
                        type="radio"
                        name="genderdata"
                        id="male"
                        onClick={(e) =>
                          e.target.checked ? setGender("Male") : ""
                        }
                      />
                      Female
                      <Input
                        type="radio"
                        name="genderdata"
                        id="female"
                        onClick={(e) =>
                          e.target.checked ? setGender("Female") : ""
                        }
                      />
                    </DivF>
                  </Div>
                </Div>
                <Div className="row mt-3">
                  <Div className="offset-2 col-8 form-group">
                    <Label>Occupation</Label>
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </Div>
                </Div>
                <Div className="row mt-3">
                  <Div className="offset-2 col-8 form-group">
                    <Label>
                      Address<Span>*</Span>
                    </Label>
                    <Textarea
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Div>
                </Div>
                <Div className="row mt-3">
                  <Div className="offset-2 col-8 form-group">
                    <Label>Photo</Label>
                    <Input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImg(e.target.files[0])}
                    // onChange={handleImageUpload}
                    />
                  </Div>
                </Div>
                <Top>
                  <Center>
                    <Button onClick={patientCreate}>Register</Button>
                  </Center>
                </Top>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
