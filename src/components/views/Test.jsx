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
  //const [subTestList, setSubTestList] = useState([]);
  const [subTest, setSubTest] = useState([]);
  const [updateUrl, setUpdateUrl] = useState("");
  const [stextArea, setsTextArea] = useState('');
  const [textArea, settextArea] = useState("");
  const TestVou_id = useLocation().pathname.split('/')[2]


  const url = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api'


  const show = (id) => {
    setVouId(id);
    setIsOpen(!isOpen);
  };

  const handleAlert = () => {
    Swal.fire({
      title: "Success",
      text: "successfully Registered!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  const handleInputChange = (event, testSelectId,testId, field) => {

    const newData = subTest.map(data => {
      if (data.tsid === testSelectId && data._id === testId ) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setSubTest(newData)
  }

  function decodeBase64(data) {
    const decode = Base64.decode(data);

    return decode;
  }
  // end

  const updateTextArea = async (event) => {
    let data = {
      id: TestVou_id,
      comment: textArea
    }
    axios.put(url + '/voucher', data).then((response) => {
      console.log(response.data.data)
      handleAlert();
    })
  }

  // change /br to line brake format
  function formatString(data) {
    const base64String = decodeBase64(data);
    const reactElements = ReactHtmlParser(base64String);

    return reactElements;
  }
  // end

  const handleTestSelection = (event, id) => {

    let newData = [];
    if (event.name.subTestFlag) {

      subTest.map(data => {
        if (data.tsid === id) {
          newData.push(data)
        }
      })
      console.log(newData);
      const data = {
        testSelectionID: id,
        voucherID: TestVou_id,
        subTest: newData
      };
      axios
        .put(
          // "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/" + updateUrl,  
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/subtests",
          // "http://localhost:9000/api/vouchers/subtests",
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
        const newList = []
        var newData = [];
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
          // "http://localhost:9000/api/voucher/" +
          TestVou_id
        );

        // console.log(vouDate);
        console.log(res.data.data);

        setsTextArea(res.data.data.comment)
        // console.log(res.data.data.testSelection[0].name.referenceRange.gender);

        setTestID(res.data.data.testSelection[0]);
        // console.log(res.data.data.testSelection[0].name.specialComment);

        setVouDate(res.data.data.date.split("T")[0]);



        res.data.data.testSelection.map((test) => {
          if (test.name.subTestFlag) {
           
            test.name.subTest.map(refdata => {
              test.subTest.map((realdata, i) => {
                if (realdata._id === refdata._id) {
                   test.subTest[i] = { ...realdata, "name": refdata.name, "defaultResult": refdata.defaultResult, "referenceRange": refdata.referenceRange, "unit": refdata.unit, "type": refdata.type}
                  //test.subTest[i] = prep
                  newData.push({ ...realdata, "name": refdata.name, "defaultResult": refdata.defaultResult, "referenceRange": refdata.referenceRange, "unit": refdata.unit, "type": refdata.type,"tsid":test._id})
                }
              })
            })
            let diff = test.name.subTest.length - test.subTest.length
            let subTestLength = test.subTest.length;
            if (diff > 0) {
              console.log(diff,'diff')
              for (let i = 0; i < diff; i++) {
               // console.log('new sub test',test.name.subTest[test.subTest.length+i])
               test.subTest.push(test.name.subTest[subTestLength + i])
               newData.push({...test.name.subTest[subTestLength + i],"tsid" : test._id})
              }
            }
            // if (test.name.subTest.length > test.subTest.length) {
            //   //console.log('here123')
            //   let index = { ...test.name.subTest[test.name.subTest.length - 1]}
            //   test.subTest[test.subTest.length-1] = prep
            // }
            // console.log(newData, 'newData');
            // newList.push(newData)
            console.log(newData)
            setSubTest(newData)
            console.log(test.subTest)
          }
        }
        )
       // setSubTest(newList)
       // console.log(subTest, 'subTest')
      //  console.log(newData);
      //  setSubTest(newData);
        setVoucherLists(res.data.data.testSelection);
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
                          {console.log('testSelect', testSelect)}
                          {(testSelect.name.subTestFlag) ? (<tr>
                            <td>
                              <div className="col-md-12 border-0">
                                <p><u><b>{testSelect.name.name}</b></u></p>
                                {
                                  testSelect.subTest.map((test) => (
                                    <span>{(test !== null) ? ((test.type === "underline") ? (<p><u><b>{test.name}</b></u></p>) : (test.type === "highlight") ? (<p style={{ color: 'red' }}><b>{test.name}</b></p>) : (test.type === "both") ? (<p style={{ color: 'red' }}><u><b>{test.name}</b></u></p>) : (<p>{test.name}</p>)) : (<p>{test.name}</p>)} </span>
                                    // <p>{(test.type === "underline") ? <u> : ""}{test.name}{(test.type === "underline") ? </u> : ""}</p>

                                  ))
                                }
                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                <div style={{ height: '40px' }}></div>
                                {
                                  testSelect.subTest.map((test) => (

                                    <span>  {(test !== null) ? ((test.type === "underline" || test.type === "highlight" || test.type === "both") ? (<p style={{ color: 'white' }}>""</p>) : (<input
                                      type="text"
                                      id="result"
                                      onChange={event =>
                                        handleInputChange(
                                          event,
                                          testSelect._id,
                                          test._id,
                                          'result'
                                        )}
                                      defaultValue={(test !== null && test.result !== "") ? test.result : (test !== null && test.defaultResult !== "") ? test.defaultResult : ""}
                                      class="form-control"
                                      placeholder={test.name}
                                      style={{ marginBottom: '2px' }}
                                    />)) : ("")}
                                    </span>
                                  ))
                                }

                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                <div style={{ height: '40px' }}></div>
                                {
                                  testSelect.subTest.map((test) => (
                                    <span >{(test !== null ) ? ((test.type === "underline" || test.type === "highlight" || test.type === "both") ? (<p style={{ color: 'white' }}>""</p>) : (
                                      <p style={{height: "20px", marginBottom: "20px"}}>{(test.type === "multiline") ? formatString(test.referenceRange) : (test.referenceRange === "") ? "-" : test.referenceRange} </p>)) : (
                                      <p style={{height: "10px"}}>{test.referenceRange}</p>)}
                                    </span>
                                  ))
                                }
                              </div>
                            </td>
                            <td>
                              <div className="col-md-12 border-0">
                                <div style={{ height: '40px' }}></div>
                                {
                                  testSelect.subTest.map((test) => (

                                    <span>  {(test !== null ) ? ((test.type === "underline" || test.type === "highlight" || test.type === "both") ? (<p style={{ color: 'white' }}>""</p>) : (
                                      <p>{test.unit === "" ? "-" : test.unit}</p>)) : (
                                      <p>{test.unit}</p>)}
                                    </span>

                                  ))
                                }
                              </div>
                            </td>

                            <td>
                              <div style={{ height: '40px' }}></div>
                              {
                                testSelect.subTest.map((test) => (
                                  <span>  {(test !== null) ? ((test.type === "underline" || test.type === "highlight" || test.type === "both") ? (<p style={{ color: 'white' }}>""</p>) : (
                                    <input
                                      type="text"
                                      id="remark"
                                      onChange={event =>
                                        handleInputChange(
                                          event,
                                          testSelect._id,
                                          test._id,
                                          'remark'
                                        )}
                                      defaultValue={(test.remark !== null) ? test.remark : ""}
                                      class="form-control"
                                      placeholder="Enter Remark"
                                      style={{ marginBottom: '2px' }}
                                    />
                                  )) : (
                                    ""
                                  )}
                                  </span>
                                ))
                              }
                            </td>
                            <td>
                              <p style={{ color: 'white' }}>""</p>

                              <button
                                type="button"
                                onClick={(e) => handleTestSelection(testSelect, testSelect._id)}
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
                                {/* <div style={{ height: '40px' }}></div> */}
                                <div>
                                  {testSelect.name.specialComment ? (
                                    "See below"
                                  ) : (
                                    <div>
                                      {testSelect.name.referenceRange.map(
                                        (refer) => (
                                          <p>

                                            <div>
                                              {/* {refer.gender} &nbsp;
                                                {refer.from}-{refer.to} &nbsp; */}
                                              {refer.refRange}
                                            </div>

                                          </p>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>

                              <td>
                                {/* <div style={{ height: '40px' }}></div> */}
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
                                {/* <div style={{ height: '40px' }}></div> */}
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
                                  onClick={(e) => handleTestSelection(testSelect, testSelect.name._id)}
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
                            {specDecode.name.specialFlag ? `${specDecode.name.name} Reference Range` : ""}
                          </h6>
                          <p>{formatString(specDecode.name.specialComment)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <label>Comment</label>
                    <textarea rows="4" cols="50" placeholder="Enter..." defaultValue={stextArea} onChange={(e) => {settextArea(e.target.value); }}>
                    </textarea>
                    {console.log(textArea)}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary mt-8" onClick={updateTextArea}>Save Comment</button>
                    <br></br>
                    <Link
                      to={"/test_voucher/" + patient_id + "/" + TestVou_id}
                      name={pname}
                      age={page}
                      gender={pgender}>
                      &nbsp;
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
