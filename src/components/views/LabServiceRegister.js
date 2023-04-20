import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft, FaMinus } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

function LabServiceRegister() {
  const [category, setCategory] = useState([]);
  const [reagentArray, setReagentArray] = useState([]);
  const [referDoctor, setReferDoctor] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [relatedCategory, setRelatedCategory] = useState("");
  const [doctor, setDoctor] = useState("");
  const [charges, setCharges] = useState("");
  const [cost, setCost] = useState("");
  const [reagentItems, setReagentItems] = useState([]);
  const [nominalFlag, setNominalFlag] = useState("");
  const [nominalValue, setNominalValue] = useState("");
  const [description, setDescription] = useState("");
  const [tempReagent, setTempReagent] = useState("");
  const handleBox = (event) => {
    let newReagent = { name: tempReagent, amount: 0 };
    setReagentArray([...reagentArray, newReagent]);
    console.log(reagentArray, "reagentArray");
  };
  const ServiceCreate = (event) => {
    event.preventDefault();
    const data = {
      code: code,
      name: name,
      leadTime: leadTime,
      referDoctor: doctor,
      relatedCategory: relatedCategory,
      charges: charges,
      cost: cost,
      reagentItems: reagentItems,
      nominalFlag: nominalFlag,
      nominalValue: nominalValue,
      description: description,
    };

    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("http://localhost:9000/api/service", data, config)
      .then(function (response) {
        alert("success");
        // props.setReagent([...props.category, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
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
        console.log(res.data.data[0]._id);
      } catch (err) {}
    };

    const getReagent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/reagents?limit=30"
        );
        console.log(res.data.data);
        setReagentItems(res.data.data);
      } catch (err) {}
    };

    getReagent();
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
                      <Link to="/">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active mt-1">
                      Lab Service Register
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
                  <form onSubmit={ServiceCreate}>
                    {/* @csrf */}
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_name"
                              onChange={(e) => setCode(e.target.value)}
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
                              onChange={(e) => setName(e.target.value)}
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
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Lead Time</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder=""
                              name="company_email"
                              onChange={(e) => setLeadTime(e.target.value)}
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
                              onchange="convert(this.value)"
                              onChange={(e) =>
                                setRelatedCategory(e.target.value)
                              }>
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
                              onChange={(e) => setCharges(e.target.value)}
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
                              onChange={(e) => setCost(e.target.value)}
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
                              onchange="convert(this.value)"
                              onChange={(e) => setDoctor(e.target.value)}>
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
                        {/* <div className="col-md-6">
                          <label className="control-label">Add Reagent</label>
                          <div className="row">
                            <div className="col-md-8">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) =>
                                  setTempReagent(e.target.value)
                                }>
                                <option value="">Choose Reagent</option>
                                {reagentItems.map((option) => (
                                  <option value={option.name}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-4">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleBox(e.target.value)}>
                                <i class="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          {reagentArray ? (
                            <div>
                              {reagentArray.map((regArr) => (
                                <div className="row mt-3">
                                  <div className="col-md-5">
                                    <input
                                      type="text"
                                      value={regArr.name}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-5">
                                    <input
                                      type="text"
                                      defaultValue={0}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <button className="btn btn-sm btn-danger rounded-circle opacity-75">
                                      <FaMinus />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div> */}
                        <div className="col-md-12">
                          <div class="form-group">
                            <label for="name" className="">
                              Nominal Flag
                            </label>
                            <select
                              class="custom-select border-info"
                              name="account_type_id"
                              id="flag"
                              onChange={(e) => setNominalFlag(e.target.value)}>
                              <option></option>
                              <option value="Above">Above</option>
                              <option value="Below">Below</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group mt-2">
                          <label for="name" className="">
                            Nominal Value
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setNominalValue(e.target.value)}
                          />
                        </div>
                      </div>

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
