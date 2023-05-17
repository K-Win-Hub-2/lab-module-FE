/* eslint-disable */

import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import ReactHtmlParser from "react-html-parser";
import Swal from "sweetalert2";

function LabServiceRegister() {
  const [vouDate, setVouDate] = useState("");
  const [referDoctorLists, setReferDoctorLists] = useState([]);
  const [voucherLists, setVoucherLists] = useState([]);
  const [patientLists, setPatientLists] = useState([]);
  const [testID, setTestID] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  const [remark, setRemark] = useState("");
  const patient_id = useLocation().pathname.split("/")[2];
  const [pname, setPname] = useState("");
  const [vouId, setVouId] = useState("");
  const [page, setPage] = useState("");
  const [pgender, setPgender] = useState("");
  const [patientID, setPatientID] = useState([]);
  const [subTestList, setSubTestList] = useState([]);
  const [subTest, setSubTest] = useState([]);
  const [updateUrl, setUpdateUrl] = useState("");


  const show = (id) => {
    setVouId(id);
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event, id, field) => {
    console.log(event.target.value)
    const newData = subTestList.map(data => {
      if (data._id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData);
    setSubTest(newData)
  }

  function decodeBase64(data) {
    const decode = Base64.decode(data);

    return decode;
  }
  // end

  // change /br to line brake format
  function formatString(data) {
    const base64String = decodeBase64(data);
    const reactElements = ReactHtmlParser(base64String);

    return reactElements;
  }
  // end
  const TestVou_id = useLocation().pathname.split("/")[2];

  const handleTestSelection = (event,id) => {
    console.log(event, "event");
    console.log(event.name.subTestFlag);
    if (event.name.subTestFlag) {

      const data = {
        testSelectionID: id,
        voucherID: TestVou_id,
        subTest: subTest
      };
      axios
        .put(
          // "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/" + updateUrl,  
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/subtests",
          data
        )
        .then(function (response) {
          Swal.fire({
            title: "Success",
            text: "successfully Updated!",
            icon: "success",
            confirmButtonText: "OK",
          })
          //  setTestID([testID, response.data.data]);
        })
        .catch(function (err) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "CANCEL",
          })
        });

    } else {
      const data = {
        testSelectionID: event._id,
        voucherID: TestVou_id,
        result: result,
        remark: remark,
      };
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      axios
        .put(
          // "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/" + updateUrl,
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/document",
          data,
          config
        )
        .then(function (response) {
          Swal.fire({
            title: "Success",
            text: "successfully Updated!",
            icon: "success",
            confirmButtonText: "OK",
          })
          //  setTestID([testID, response.data.data]);
        })
        .catch(function (err) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "CANCEL",
          })
        });

    }



  };

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
          TestVou_id
        );

        // console.log(vouDate);
        setVoucherLists(res.data.data.testSelection);

        console.log(res.data.data.testSelection);
        // console.log(res.data.data.testSelection[0].name.referenceRange.gender);

        setTestID(res.data.data.testSelection[0]);
        // console.log(res.data.data.testSelection[0].name.specialComment);

        setVouDate(res.data.data.date.split("T")[0]);

        res.data.data.testSelection.map((test) => {
          if (test.name.subTestFlag) {
            // const newArray = test.name.subTest.map(obj => {
            //   const { _id, ...rest } = obj;
            //   return rest;
            // });
            setSubTestList(test.name.subTest)
            console.log(subTestList)
          }
        }
        )


      } catch (err) { }
    };

    const getPatientList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
          TestVou_id
        );

        setPatientLists(res.data.data.relatedPatient);
        setPatientID(res.data.data.relatedPatient);
        console.log(res.data.data._id);
      } catch (err) { }
    };

    const getReferDoctorList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
          TestVou_id
        );

        setReferDoctorLists(res.data.data.referDoctor.name);
      } catch (err) { }
    };

    getReferDoctorList();
    getPatientList();
    getVoucherList();
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
                      <Link to={"/test_voucher/" + patientID._id}>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active mt-1">Test</li>
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
                <h4 className="text-center mt-3">Test Result List</h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Date</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-6">
                          <label>States</label>
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 card px-3 py-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name:</th>
                          <td>{patientLists.name}</td>
                          <th>Age:</th>
                          <td>{patientLists.age}</td>
                          <th>Sex:</th>
                          <td>{patientLists.gender}</td>
                        </tr>
                        <tr>
                          <th>Referred From:</th>
                          <td>{referDoctorLists}</td>
                          <th>Lab Reg No:</th>
                          <td>123</td>
                          <th>Date of Report:</th>
                          <td>{vouDate}</td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="row mt-3 card px-3 py-3">
                    <table className="table table-bordered ">
                      <thead>
                        <tr>
                          <th>Test</th>
                          <th>Result</th>
                          <th>Reference Range</th>
                          <th>Unit</th>
                          <th>Remark</th>
                          {/* <th>States</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>

                      {voucherLists.map((testSelect) => (

                        <tbody>
                          {(testSelect.name.subTestFlag) ? (<tr>
                            <td>
                              <div className="col-md-12 border-0">
                                <p><u><b>{testSelect.name.name}</b></u></p>
                                {
                                  testSelect.name.subTest.map((test) => (
                                    <p>{test.name}</p>
                                  ))
                                }
                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                <p> </p>
                                {
                                  testSelect.name.subTest.map((test) => (
                                    <input
                                      type="text"
                                      id="result"
                                      onChange={event =>
                                        handleInputChange(
                                          event,
                                          test._id,
                                          'result'
                                        )}
                                      defaultValue={(test.result !== null) ? test.result : ""}
                                      class="form-control"
                                      placeholder={test.name}
                                      style={{ marginBottom: '6px' }}
                                    />
                                  ))
                                }

                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                <p></p>
                                {
                                  testSelect.name.subTest.map((test) => (
                                    <p style={{ marginTop: '22px' }}>{test.referenceRange}</p>
                                  ))
                                }
                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                {
                                  testSelect.name.subTest.map((test) => (
                                    <p style={{ marginTop: '18px' }}>{test.unit}</p>
                                  ))
                                }
                              </div>
                            </td>

                            <td>
                              <p></p>
                              {
                                testSelect.name.subTest.map((test) => (
                                  <input
                                    type="text"
                                    id="remark"
                                    onChange={event =>
                                      handleInputChange(
                                        event,
                                        test._id,
                                        'remark'
                                      )}
                                    defaultValue={(test.remark !== null) ? test.remark : ""}
                                    class="form-control"
                                    placeholder="Enter Remark"
                                    style={{ marginBottom: '6px' }}
                                  />
                                ))
                              }
                            </td>
                            <td>
                              <p></p>
                              <button
                                type="button"
                                onClick={(e) => handleTestSelection(testSelect, testSelect.name._id)}
                                className="btn btn-sm btn-info ml-2">
                                <FaSave />
                              </button>
                            </td>
                          </tr>) : (
                            <tr>
                              <td>{testSelect.name.name}</td>
                              <td>
                                <div className="col-md-12 border-0">
                                  <input
                                    type="text"
                                    id="result"
                                    onChange={(e) => setResult(e.target.value)}
                                    defaultValue={(testSelect.result !== null) ? testSelect.result : ""}
                                    class="form-control"
                                    placeholder="Enter Result"
                                  />
                                </div>
                              </td>

                              <td>
                                <div>
                                  {testSelect.name.specialComment ? (
                                    "See below"
                                  ) : (
                                    <div>
                                      {testSelect.name.referenceRange.map(
                                        (refer) => (
                                          <p>
                                            {refer.gender ? (
                                              <div>
                                                {refer.gender}: &nbsp;
                                                {refer.from}-{refer.to} &nbsp;
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </p>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>

                              <td>
                                {testSelect.name.specialComment ? (
                                  "See Below"
                                ) : (
                                  <div>
                                    {testSelect.name.referenceRange.map(
                                      (refer) => (
                                        <p> {refer.unit}</p>
                                      )
                                    )}
                                  </div>
                                )}
                              </td>

                              <td>
                                <div className="col-md-12 border-0">
                                  <input
                                    type="text"
                                    id="remark"
                                    onChange={(e) => setRemark(e.target.value)}
                                    defaultValue={(testSelect.remark !== null) ? testSelect.remark : ""}
                                    class="form-control"
                                    placeholder="Enter Remark"
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={(e) => handleTestSelection(testSelect,testSelect.name._id)}
                                  className="btn btn-sm btn-info ml-2">
                                  <FaSave />
                                </button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="px-3 py-3 card">
                    <div className="row">
                      {voucherLists.map((specDecode) => (
                        <div className="col-md-6 px-3 py-3">
                          <h6 className="text-bold text-decoration-underline">
                            {specDecode.name.name} Reference Range
                          </h6>
                          <p>{formatString(specDecode.name.specialComment)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={"/test_voucher/" + patient_id + "/" + TestVou_id}
                      name={pname}
                      age={page}
                      gender={pgender}>
                      <button className="btn btn-success">Print</button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* 
              <ResultDialog open={isOpen} close={() => setIsOpen(false)} /> */}
            </div>

            {/* <!-- /.row (main row) --> */}

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
