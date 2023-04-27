import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft, FaMinus } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
// window.Buffer = window.Buffer || require("buffer").Buffer;
import Buffer from "buffer";
import { Base64 } from "js-base64";

function LabServiceRegister() {
  const [category, setCategory] = useState([]);
  const [packageArray, setPackageArray] = useState([]);
  const [serviceLists, setServiceLists] = useState([]);
  const [name, setName] = useState("");
  const [relatedCategory, setRelatedCategory] = useState("");
  const [cost, setCost] = useState("");
  const [charges, setCharges] = useState("");
  const [status, setStatus] = useState("");
  const [packageLists, setPackageLists] = useState([]);
  const [description, setDescription] = useState("");
  const [tempPackage, setTempPackage] = useState("");
  const [amount, setAmount] = useState("");

  const handleBox = (event) => {
    console.log(event, "event");
    let newPackage = {
      id: tempPackage.split(".")[0],
      amount: tempPackage.split(".")[1],
      name: tempPackage.split(".")[2],
    };
    console.log(newPackage);
    setPackageArray([...packageArray, newPackage]);
    console.log(packageArray, "packageArray", newPackage);
  };

  const handleCalculation = (event) =>
  {
    console.log(event);
      if (packageArray) {
        let sum = packageArray.reduce((a, b) => {
    return a + b["amount"];
  }, 0);
       
        console.log(sum);
        setCharges(sum.toFixed(2));
      }

      setTempPackage(event);
    };


  const TestPackageCreate = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      totalCharges: charges,
      totalCost: cost,
      package: packageArray,
      status: status,
      description: description,
    };

    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/package",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        // props.setReagent([...props.category, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("status").value = "";
    document.getElementById("flag").value = "";
    document.getElementById("charge").value = "";
    document.getElementById("cost").value = "";
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories?limit=30"
        );

        setCategory(res.data.data);
      } catch (err) {}
    };

    const getServiceLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/services?limit=30"
        );

        setServiceLists(res.data.data);

        console.log(res.data.data);
      } catch (err) {}
    };

    const getPackage = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/services?limit=30"
        );
        console.log(res.data.list);
        setPackageLists(res.data.list);
      } catch (err) {}
    };

    getPackage();
    getServiceLists();
    getCategory();
  }, []);
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
                      <Link to="/package">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active mt-1">
                      Test Package Register
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
                {/* <h3 className="text-center py-3">Test Package Register</h3> */}
                <div class="card-body p-b-0 py-5 px-5">
                  {/* @if($com == null) */}
                  <form onSubmit={TestPackageCreate}>
                    {/* @csrf */}
                    <div className="form-body">
                      <div className="form-group">
                        <label>Package Name</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label className="control-label">Tests</label>
                          <div className="row d-flex justify-content-between">
                            <div className="col-md-11">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) => {
                                  setTempPackage(e.target.value);
                                }}>
                                <option value="">Choose Tests</option>
                                {serviceLists.map((option) => (
                                  <option
                                    value={
                                      option._id +
                                      "." +
                                      option.charges +
                                      "." +
                                      option.name
                                    }>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-1">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleBox(e.target.value)}>
                                <i class="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          {packageArray ? (
                            <div>
                              {packageArray.map((regArr) => (
                               
                                <div className="row mt-3">
                                   
                                  <div className="col-md-5">
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      value={regArr.name}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-5">
                                    <label>Charges</label>
                                    <input
                                      type="text"
                                      value={regArr.amount}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <button
                                      className="btn btn-sm btn-danger rounded-circle opacity-75"
                                      style={{ marginTop: "2.5em" }}>
                                      <FaMinus />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label>Total Charges</label>
                        <input
                          type="number"
                          id="charge"
                          className="form-control"
                          
                        />
                      </div>

                      <div className="form-group">
                        <label>Total Cost</label>
                        <input
                          type="number"
                          id="cost"
                          className="form-control"
                          onChange={(e) => setCost(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Status</label>
                        <select
                          class="custom-select border-info"
                          name="account_type_id"
                          id="status"
                          onChange={(e) => setStatus(e.target.value)}>
                          <option>Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <label>Description</label>
                        <textarea
                          rows="8"
                          cols="40"
                          id="desc"
                          className="form-control"
                          onChange={(e) =>
                            setDescription(e.target.value)
                          }></textarea>
                      </div>

                      <div className="form-actions mt-3">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className=" col-md-9">
                                <button
                                  type="submit"
                                  className="btn btn-primary">
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
                      </div>
                    </div>
                  </form>
                  {/* <!-- /.row (main row) --> */}
                </div>
                {/*<!-- /.container-fluid --> */}
              </div>
            </div>
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
