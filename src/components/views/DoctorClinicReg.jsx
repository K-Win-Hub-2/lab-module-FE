import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

function LabServiceRegister() {
  const [name, setName] = useState("");
  const [selection, setSelection] = useState("");
  const [value, setValue] = useState("");
  const [valueType, setValueType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [position, setPosition] = useState("");
  const [showRelatedDoc, setShowRelatedDoc] = useState(false);

  const DoctorCreate = (event) => {
    const data = {
      name: name,
      selection: selection,
      value: value,
      education: education,
      position: position,
      valueType: valueType,
      phone: phone,
      email: email,
    };
 
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor",
        data,
        config
      )
      .then(function (response) {
        // alert("success");
        // setCategory([...category, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  return (
    <div classNameName="App">
      <div className="wrapper">
        <Sidebar />
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/doctorClinic">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active mt-1">
                      Doctor / Clinic Register
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}
              <div class="card">
                <div class="card-body p-b-0">
                  {/* @if($com == null) */}
                  <form onSubmit={DoctorCreate}>
                    {/* @csrf */}

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-4">
                          <label>Doctor</label>&nbsp;
                          <input
                            type="radio"
                            id="doccl"
                            name="doccl"
                            value="Doctor"
                            onChange={(e) => {
                              setSelection(e.target.value);
                              setShowRelatedDoc(true);
                            }}
                          />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="col-md-4">
                          <label>Clinic</label>&nbsp;
                          <input
                            type="radio"
                            id="doccl"
                            name="doccl"
                            value="Clinic"
                            onChange={(e) => {
                              setSelection(e.target.value);
                              setShowRelatedDoc(false);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company_address"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="company_contact"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder=""
                        name="company_email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <div className="row  mt-3">
                        <div className="col-md-4">
                          <label>Amount</label>&nbsp;
                          <input
                            type="radio"
                            id="amoper"
                            name="amoper"
                            value="Amount"
                            onChange={(e) => setValueType(e.target.value)}
                          />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="col-md-4">
                          <label>%</label>&nbsp;
                          <input
                            type="radio"
                            id="amoper"
                            name="amoper"
                            value="Percent"
                            onChange={(e) => setValueType(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Value</label>

                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                    {showRelatedDoc ? (
                      <div>
                        <div className="form-group">
                          <label className="control-label">Education</label>

                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setEducation(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="control-label">Position</label>

                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setPosition(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <br />

                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className=" col-md-9">
                            <button type="submit" className="btn btn-primary">
                              Create
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* <!-- /.row (main row) --> */}
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>

        {/* <!-- /.content-wrapper --> */}
        <footer className="main-footer">
          <strong>
            Copyright &copy; 2017-2020{" "}
            <a href="http://www.kwintechnologies.com">K-win Technology</a>.
          </strong>
          All rights reserved.
        </footer>

        {/* <!-- Control Sidebar --> */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
        {/* <!-- /.control-sidebar --> */}
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default LabServiceRegister;
