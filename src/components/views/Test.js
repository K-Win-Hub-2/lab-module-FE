import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { useLocation, Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft, FaMinus, FaSave } from "react-icons/fa";
import Sidebar from "./SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import Buffer from "buffer";
import { Base64 } from "js-base64";
import ReactHtmlParser from "react-html-parser";
import ResultDialog from "../../patients/ResultDialog";

function LabServiceRegister() {
  const [vouDate, setVouDate] = useState("");
  const [referRange, setReferRange] = useState([]);
  const [referDoctorLists, setReferDoctorLists] = useState([]);
  const [voucherLists, setVoucherLists] = useState([]);
  const [patientLists, setPatientLists] = useState([]);
  const [serviceLists, setServiceLists] = useState([]);
  const [testArray, setTestArray] = useState([]);
  const [testID, setTestID] = useState([]);
  const [testSelectionId, setTestSelectionId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  const [remark, setRemark] = useState("");
  const [specialComment, setSpecialComment] = useState("");
  const patient_id = useLocation().pathname.split("/")[2]; 
   const [pname, setPname] = useState("");
   const [vouId, setVouId] = useState("");
   const [page, setPage] = useState("");
   const [pgender, setPgender] = useState("");

   const show = (id) => {
     setVouId(id);
     setIsOpen(!isOpen);
   };
  
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

  const handleTestSelection = (event) => {
    console.log(event._id, "event");
    const data = {
      testSelectionID: event._id,
      voucherID: TestVou_id,
      result: result,
      remark: remark,
    };

    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .put("http://localhost:9000/api/vouchers/document", data, config)
      .then(function (response) {
        alert("success");
        //  setTestID([testID, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/voucher/" + TestVou_id
        );

        // console.log(vouDate);
        setVoucherLists(res.data.data.testSelection);

        setTestID(res.data.data.testSelection[0]);
        // console.log(res.data.data.testSelection[0].name.specialComment);

        setVouDate(res.data.data.date.split("T")[0]);
        // console.log(res.data.data.testSelection[0].result);
      } catch (err) {}
    };

    const getPatientList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/voucher/" + TestVou_id
        );

        setPatientLists(res.data.data.relatedPatient);
      } catch (err) {}
    };

    const getReferDoctorList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/voucher/" + TestVou_id
        );

        setReferDoctorLists(res.data.data.referDoctor);
      } catch (err) {}
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
                      <Link to="/test_voucher/">
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
                    <table className="table table-bordered ">
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
                          <td>{referDoctorLists.name}</td>
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
                          <th>Refference Range</th>
                          <th>Unit</th>
                          <th>Remark</th>
                          {/* <th>States</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>

                      {voucherLists.map((testSelect) => (
                        <tbody>
                          <tr>
                            <td>{testSelect.name.name}</td>
                            <td>
                              <div className="col-md-12 border-0">
                                <input
                                  type="text"
                                  id="result"
                                  onChange={(e) => setResult(e.target.value)}
                                  class="form-control"
                                  placeholder="Enter Result"
                                />
                              </div>
                            </td>

                            <td>
                              {testSelect.name.referenceRange.map((refer) => (
                                <p>
                                  {refer.gender}: &nbsp;
                                  {refer.from}-{refer.to} &nbsp;
                                </p>
                              ))}
                            </td>

                            <td>
                              {testSelect.name.referenceRange.map((refer) => (
                                <p>{refer.unit}</p>
                              ))}
                            </td>

                            <td>
                              <div className="col-md-12 border-0">
                                <input
                                  type="text"
                                  id="remark"
                                  onChange={(e) => setRemark(e.target.value)}
                                  class="form-control"
                                  placeholder="Enter Remark"
                                />
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={(e) => handleTestSelection(testSelect)}
                                className="btn btn-sm btn-info ml-2">
                                <FaSave />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="card px-3 py-2">
                    <h4>Reference Ranges</h4>
                    {voucherLists.map((specDecode) => (
                      <div>
                        <h6 className="text-bold">
                          {specDecode.name.name} Reference Range
                        </h6>
                        <p>{formatString(specDecode.name.specialComment)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="">
                    <Link
                      to={"/test_voucher/" + patient_id + "/" + TestVou_id}
                      name={pname}
                      age={page}
                      gender={pgender}>
                      <button className="btn btn-sm btn-success">Print</button>
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
