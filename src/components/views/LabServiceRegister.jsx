import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaSave } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Base64 } from "js-base64";

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
  const [description, setDescription] = useState("");
  const [tempReagent, setTempReagent] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("");
  const [specialComment, setSpecialComment] = useState("");
  const [showNextRef, setShowNextRef] = useState(false);
  const [refArray, setRefArray] = useState([]);
  const [specialFlag, setSpecialFlag] = useState('');
  const [showSpecialCmt, setShowSpecialCmt] = useState(false);
  const [showRefForm, setShowRefForm] = useState(false);
<<<<<<< HEAD
  const [showMultiTest, setShowMultiTest] = useState(false);
  const [showSpecialRange, setShowSpecialRange] = useState(false);

  const handleMultipleTests = (event) => {
    
  }

  const handleYesChange = () => {
    setShowSpecialCmt(true);
    setShowRefForm(false);
  }

  const handleNoChange = () => {
    setShowSpecialCmt(false);
    setShowRefForm(true);
  };
=======
>>>>>>> 528f070 (lab_module)

  const handleYesChange = () =>
  {
    setShowSpecialCmt(true);
    setShowRefForm(false);
  }

   const handleNoChange = () => {
     setShowSpecialCmt(false);
     setShowRefForm(true);
   };
  
  
  const handleBox = (event) => {
    let newReagent = {
      id: tempReagent.split(".")[0],
      name: tempReagent.split(".")[1],
      amount: 0,
    };
    setReagentArray([...reagentArray, newReagent]);
  };

  const handleRefRange = (event) => {
    let newRef = {
      from: from,
      to: to,
      gender: gender,
      unit: unit,
    };
    setRefArray([...refArray, newRef]);
  };

  const clearTextBox = (textboxId) => {
    const textbox = document.getElementById(textboxId);
    if (textbox && textbox.value) {
      textbox.value = "";
    }
  };

  const clearForm = () => {
    clearTextBox("code")
    clearTextBox("name")
    clearTextBox("desc")
    clearTextBox("lead")
    clearTextBox("noVal")
    clearTextBox("flag")
    clearTextBox("charge")
    clearTextBox("cost")
    clearTextBox("referdoc")
    clearTextBox("cat")
    clearTextBox("textArea")
  }

  const ServiceCreate = (event) => {
    event.preventDefault();
    const specialCommentEncode = specialComment.replace(/\n/g, "<br />");

    const myString = specialCommentEncode;
    const encodedString = Base64.encode(myString);

    const data = {
      code: code,
      name: name,
      leadTime: leadTime,
      referDoctor: doctor,
      relatedCategory: relatedCategory,
      charges: charges,
      cost: cost,
      reagentItems: reagentArray,
      referenceRange: refArray,
      description: description,
      specialFlag: specialFlag,
      specialComment: encodedString,
    };

    // if(specialFlag)
    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        clearForm()
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
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories?limit=30"
        );

        setCategory(res.data.data);
      } catch (err) { }
    };

    const getReferDoctor = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctors?limit=30"
        );

        setReferDoctor(res.data.data.filter((e) => e.selection == "Doctor"));

      } catch (err) { }
    };

    const getReagent = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/reagents?limit=30"
        );
        setReagentItems(res.data.data);
      } catch (err) { }
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
                              id="code"
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
                              id="name"
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
                              id="desc"
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
                              id="lead"
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
                              id="cat"
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
                              id="charge"
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
                              id="cost"
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
                              id="referdoc"
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
                        <div className="col-md-12">
                          <label className="control-label">Add Reagent</label>
                          <div className="row">
                            <div className="col-md-10">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) => {
                                  setTempReagent(e.target.value);
                                }}>
                                <option value="">Choose Reagent</option>
                                {reagentItems.map((option) => (
                                  <option
                                    value={option._id + "." + option.name}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
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
                        </div>
<<<<<<< HEAD
                      </div>
                      <div className="row">
                        <div className="row pt-3">
                          <div className="col-md-4">
                            <label>Multiple Tests</label>
=======
                        {/* <div className="col-md-12 mt-3">
                          <div class="form-group">
                            <label for="name" className="">
                              Nominal Flag
                            </label>
                            <select
                              class="custom-select border-info"
                              name="account_type_id"
                              id="flag"
                              >
                              <option></option>
                              <option value="Above">Above</option>
                              <option value="Below">Below</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="name" className="">
                            Nominal Value
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="noVal"
                            
                          />
                        </div> */}

                        <div className="row mt-5">
                          <div className="col-md-4">
                            <label>Special Reference Range</label>
>>>>>>> 528f070 (lab_module)
                          </div>

                          <div className="col-md-4">
                            <label>Yes</label>&nbsp;
                            <input
                              type="radio"
                              id="yes"
                              name="amoper"
                              value="true"
                              onChange={(e) => {
<<<<<<< HEAD
                                setShowMultiTest(true)
                                setShowSpecialRange(false)
=======
                                setSpecialFlag(e.target.value);
                                handleYesChange();
>>>>>>> 528f070 (lab_module)
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <label>No</label>&nbsp;
                            <input
                              type="radio"
                              id="no"
                              name="amoper"
                              value="false"
                              onChange={(e) => {
<<<<<<< HEAD
                                setShowSpecialRange(true)
                                setShowMultiTest(false)
=======
                                setSpecialFlag(e.target.value);
                                handleNoChange();
>>>>>>> 528f070 (lab_module)
                              }}
                            />
                          </div>
                        </div>
                        {showSpecialCmt && (
                          <div className="row mt-5">
                            <div className="col-md-12">
                              <label>Write Comment</label>
                              <textarea
                                rows="10"
                                cols="40"
                                className="form-control"
                                onChange={(e) =>
                                  setSpecialComment(e.target.value)
                                }></textarea>
                            </div>
                          </div>
                        )}

                        {showRefForm && (
                          <div className="row mt-3">
                            <label>Refference Range</label>
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="From"
                                className="form-control"
                                onChange={(e) => setFrom(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="To"
                                className="form-control"
                                onChange={(e) => setTo(e.target.value)}
                              />
                            </div>
                            <div className="col-md-3">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) => {
                                  setGender(e.target.value);
                                  setGenderMale(true);
                                }}>
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Null">Nutral</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <input
                                type="text"
                                placeholder="Unit"
                                className="form-control"
                                onChange={(e) => setUnit(e.target.value)}
                              />
                            </div>
                            {/* Action button for add data to refArr */}
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleRefRange(e.target.value)}>
                                <i class="fa fa-plus"></i>
                              </button>
                            </div>
                            {/* End */}
                          </div>
                        )}
                      </div>
                      {showMultiTest ? (<div className="row pt-3">
                        <div className="col-md-12">
                          <label className="control-label">Add Multiple Tests</label>
                          <div className="row">
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                id="subTestName"
                                name="subTestName"

                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Reference Range"
                                id="subTestRR"
                                name="subTestRR"

                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Unit"
                                id="subTestUnit"
                                name="subTestUnit"

                              />
                            </div>
                            <div className="col-md-3">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleMultipleTests(e.target.value)}>
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
                        </div>
                      </div>) : ""}
                      { showSpecialRange ? (<div className="row">
                        <div className="row mt-5">
                          <div className="col-md-4">
                            <label>Special Reference Range</label>
                          </div>

                          <div className="col-md-4">
                            <label>Yes</label>&nbsp;
                            <input
                              type="radio"
                              id="yes"
                              name="amoper"
                              value="true"
                              onChange={(e) => {
                                setSpecialFlag(e.target.value);
                                handleYesChange();
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <label>No</label>&nbsp;
                            <input
                              type="radio"
                              id="no"
                              name="amoper"
                              value="false"
                              onChange={(e) => {
                                setSpecialFlag(e.target.value);
                                handleNoChange();
                              }}
                            />
                          </div>
                        </div>
                        {showSpecialCmt && (
                          <div className="row mt-5">
                            <div className="col-md-12">
                              <label>Write Comment</label>
                              <textarea
                                rows="10"
                                cols="40"
                                className="form-control"
                                id='textArea'
                                onChange={(e) =>
                                  setSpecialComment(e.target.value)
                                }></textarea>
                            </div>
                          </div>
                        )}

                        {showRefForm && (
                          <div className="row mt-3">
                            <label>Reference Range</label>
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="From"
                                className="form-control"
                                onChange={(e) => setFrom(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="To"
                                className="form-control"
                                onChange={(e) => setTo(e.target.value)}
                              />
                            </div>
                            <div className="col-md-3">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) => {
                                  if (e.target.value === 'Male' || 'Female') setShowNextRef(true)
                                  if (e.target.value === 'Null') setShowNextRef(false)

                                }}>
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Null">Neutral</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <input
                                type="text"
                                placeholder="Unit"
                                className="form-control"
                                onChange={(e) => setUnit(e.target.value)}
                              />
                            </div>
                            {/* Action button for add data to refArr */}
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleRefRange(e.target.value)}>
                                <i class="fa fa-save"></i>
                              </button>
                            </div>
                            {/* End */}
                          </div>
                        )}
                      </div>) : "" }
                      {/* Action to add data in text box  */}
                      {showNextRef ? (
                        <div>
                          <div className="row mt-3">
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="From"
                                className="form-control"
                                onChange={(e) => setFrom(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                placeholder="To"
                                className="form-control"
                                onChange={(e) => setTo(e.target.value)}
                              />
                            </div>
                            <div className="col-md-3">
                              <select
                                class="custom-select border-info"
                                name="account_type_id"
                                id="flag"
                                onChange={(e) => setGender(e.target.value)}>
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <input
                                type="text"
                                placeholder="Unit"
                                className="form-control"
                                onChange={(e) => setUnit(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => handleRefRange(e.target.value)}>
                                <i class="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* End */}

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
