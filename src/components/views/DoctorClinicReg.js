import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

function LabServiceRegister() {
  const [category, setCategory] = useState([]);
  const [referDoctor, setReferDoctor] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState("");

  const CategoryCreate = () => {
    const data = {
      code: code,
      name: name,
      description: description,
      flag: flag,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("http://localhost:9000/api/category", data, config)
      .then(function (response) {
        alert("success");
        setCategory([...category, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
    document.getElementById("desc").value = "";
    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
    document.getElementById("flag").value = "";
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/categories?limit=30"
        );

        setCategory(res.data.data);
      } catch (err) {}
    };

    const getReferDoctor = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/doctors?limit=30"
        );

        setReferDoctor(res.data.data);
      } catch (err) {}
    };
    getReferDoctor();
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
                  <form>
                    {/* @csrf */}
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Selection</label>
                            <input
                              type="radio"
                              className="form-control"
                              name="company_name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_address"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Description</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="company_contact"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Lead Time</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="company_email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Category</label>

                            <select
                              name="currency"
                              id=""
                              className="form-control mt-1"
                              onchange="convert(this.value)">
                              <option value="">Choose Category</option>
                              {category.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Charges</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="capital"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Cost</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="md_name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Refer Doctor
                            </label>

                            <select
                              name="currency"
                              id=""
                              className="form-control mt-1"
                              onchange="convert(this.value)">
                              <option value="">Choose Doctor</option>
                              {referDoctor.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="control-label">Add Reagent</label>
                          <select
                            name="currency"
                            id=""
                            className="form-control mt-1"
                            onchange="convert(this.value)">
                            <option value="">Choose Reagent</option>
                            <option></option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label for="name" className="text-secondary">
                              Nominal Flag
                            </label>
                            <select
                              class="custom-select border-info"
                              name="account_type_id"
                              id="flag"
                              onChange={(e) => setFlag(e.target.value)}>
                              <option></option>
                              <option value="Above">Above</option>
                              <option value="Below">Below</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="form-actions">
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
                </div>
              </div>

              {/* <!-- /.row (main row) --> */}
            </div>{" "}
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
