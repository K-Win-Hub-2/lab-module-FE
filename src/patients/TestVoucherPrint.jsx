import React, { useState, useEffect } from "react";
import SideBar from "../components/views/SideBar";
import styled from "styled-components";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { FaCashRegister, FaArrowLeft, FaMinus, FaSave } from "react-icons/fa";
import { Base64 } from "js-base64";
import ReactHtmlParser from "react-html-parser";
// import Printer from "@eyelly/react-printer";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Left = styled.div`
  font-weight: normal;
  flex: 1;
`;

const Title = styled.h5`
  font-weight: bold;
  margin-top: 10px;
`;

const Right = styled.div`
  font-weight: normal;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  justify-content: flex-end;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
`;

const Btn = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  margin-left: 13px;
`;

const Div = styled.div``;
const Input = styled.input`
  width: 165px;
  border: 1px solid grey;
  border-radius: 12px;
  padding: 3px;
`;
const Table = styled.table``;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  text-align: center;
`;
const Th = styled.th`
  font-size: 15px;
`;
const Td = styled.td`
  font-size: 14px;
`;
const Select = styled.select`
  padding: 0px 7px;
  border-radius: 5px;
`;
const Option = styled.option``;

const TestVoucherPrint = (props) => {
  const [vouDate, setVouDate] = useState("");
  const [referRange, setReferRange] = useState([]);
  const [referDoctorLists, setReferDoctorLists] = useState([]);
  const [voucherLists, setVoucherLists] = useState([]);
  const [patientLists, setPatientLists] = useState([]);
  const [serviceLists, setServiceLists] = useState([]);
  const [testArray, setTestArray] = useState([]);
  const [labID_VouCode, setLabID_VouCode] = useState([]);
  const [headerOn, setHeaderOn] = useState(true);
  const [refOn, setRefOn] = useState(true);
  const [resOn,setResOn] = useState(true);
  // const [headerOff, setHeaderOff] = useState(false);
 

  const handleOnCheck = () =>
  {
    setHeaderOn(true); 
}

   const handleOffCheck = () => {
     setHeaderOn(false);  
   };
   const RefOnCheck = () =>
   {
     setRefOn(true); 
 }
 
    const RefOffCheck = () => {
      setRefOn(false);  
    };
    const ResOnCheck = () =>
   {
     setResOn(true); 
 }
 
    const ResOffCheck = () => {
      setResOn(false);  
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


// var og_date = labID_VouCode.date;
// console.log(og_date.split("T"));
  // const sampleStr = 'Hello world';
  // console.log(sampleStr.split(' '));
  // const Regdate = labID_VouCode.date;

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
            TestVou_id
        );

        // console.log(vouDate);
        setVoucherLists(res.data.data.testSelection);

        setLabID_VouCode(res.data.data);

        // console.log(res.data.data.testSelection[0].name.specialComment);

        setVouDate(res.data.data.date.split("T")[0]);
        // console.log(res.data.data.testSelection[0].result);
      } catch (err) {}
    };

    const getPatientList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
            TestVou_id
        );

        setPatientLists(res.data.data.relatedPatient);
      } catch (err) {}
    };

    const getReferDoctorList = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
            TestVou_id
        );

        setReferDoctorLists(res.data.data.referDoctor);
      } catch (err) {}
    };

    getReferDoctorList();
    getPatientList();
    getVoucherList();
  }, []);

  const print = () => {
    var print_div = document.getElementById("print");
    var print_area = window.open();
    print_area.document.write(print_div.innerHTML);
    print_area.document.close();
    print_area.focus();
    print_area.print();
    print_area.close();

 
  };

  return (
    <div className="wrapper">
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <div
              calssName="card content"
              // style={{ maxWidth: "700px", marginLeft: "170px" }}
              id="print">
              <div
                calssName="card-body"
                style={{ border: "1px solid black", padding: "14px 14px" }}>
              
                  <div className="row" style={{visibility: headerOn ? 'visible' : 'hidden' }}>
                    <div className="col-3">
                      <img src={require("../logo.png")} alt="" />
                    </div>
                    <div className="offset-1 col-md-5">
                      Clinic 1 - 51/A Min Ye Kyaw Swar Road, Ahlone Township,
                      <br />
                      Yangon, Myanmar.
                      <br />
                      Tel : 09 400 662 (Clinic), 09 400 400 650 (Lab)
                      <br />
                      Clinic 2 - 435, May Dawi Road, North Okkalapa Township,
                      <br />
                      Yangon, Myanamr.
                      <br />
                      Tel : 09 400 400 870 (Clinic), 09 400 200 651 (Lab)
                    </div>
                    <div className="col-md-3">
                      <img
                        src={require("../logo1.png")}
                        alt=""
                        style={{ marginLeft: "120px" }}
                      />
                    </div>
                  </div>
                

               

                <p style={{ textAlign: "center" }} className="mt-5">
                  <b>
                    <u>LABORATORY REPORT</u>
                  </b>
                </p>
                <table className="table table-hover mt-4">
                  <thead>
                    <tr>
                      <th>Patient Name:</th>
                      <td colSpan="2">{patientLists.name}</td>
                      <th>Laboratory Id:</th>
                      <td colSpan="2">{labID_VouCode.code}</td>
                    </tr>
                    <tr>
                      <th>Age & Gender:</th>
                      <td colSpan="2">
                        {patientLists.age}yrs&nbsp;/ &nbsp;
                        {patientLists.gender}
                      </td>
                      <th>Registration Date:</th>
                      <td colSpan="2">
                        {labID_VouCode.date
                          ? labID_VouCode.date.split("T")[0]
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th>Referring Doctor:</th>
                      <td colSpan="2">{referDoctorLists.name}</td>
                      <th>Clinic:</th>
                      <td colSpan="2">Central Clinic</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
               {resOn && <table className="table table-hover mt-5">
                  <thead className="bg-secondary">
                    <tr>
                      <th>Test</th>
                      <th>Result</th>
                      <th>Reference Range</th>
                      <th>Unit</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>Vitamin D (25 – OH)</td>
                      <td></td>
                      <td>nmol /L</td>
                      <td>See Below</td>
                    </tr>
                  
                  </tbody> */}

                  {voucherLists.map((testSelect) => (
                    <tbody>
                      <tr>
                        <td>{testSelect.name.name}</td>
                        <td>{testSelect.result}</td>

                        <td>
                          {testSelect.name.referenceRange.map((refer) => (
                            <p className="">
                              {refer.from}-{refer.to} &nbsp;
                            </p>
                          ))}
                        </td>

                        <td>
                          {testSelect.name.referenceRange.map((refer) => (
                            <p>{refer.unit}</p>
                          ))}
                        </td>

                        <td>{testSelect.remark}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>}

                {refOn && <div className="px-3 py-2">
                  <div className="row">
                    {voucherLists.map((specDecode) => (
                      <div className="col-md-6">
                        <h6 className="text-bold text-decoration-underline">
                          {specDecode.name.name} Reference Range
                        </h6>
                        <p>{formatString(specDecode.name.specialComment)}</p>
                      </div>
                    ))}
                  </div>
                </div>}
                <div className="row" style={{ marginTop: "50px" }}>
                  <div className="col-6">
                    <span>Laboratory Technician</span>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <span>{referDoctorLists.name}</span>
                    <br></br>
                    <span>{referDoctorLists.position}</span>
                    <br></br>
                    <span>{referDoctorLists.education}</span>
                    <br></br>
                    <span>Central Lab, Ahlone, Yangon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <div className="offset-1 col-md-3 mb-4" style={{ marginTop: "2em" }}>
            <label>Reference On</label>&nbsp;
            <input
              type="radio"
              id="on"
              name="reference"
              onChange={RefOnCheck}
              
            />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input
              type="radio"
              id="off"
              name="reference"
              onChange={RefOffCheck}
            />
          </div>
          <div className="col-md-3 mb-4" style={{ marginTop: "2em" }}>
            <label>Result On</label>&nbsp;
            <input
              type="radio"
              id="on"
              name="result"
              onChange={ResOnCheck}
              
            />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input
              type="radio"
              id="off"
              name="result"
              onChange={ResOffCheck}
            />
          </div>
         
          <div className="col-md-3 mb-4" style={{ marginTop: "2em" }}>
            <label>Header On</label>&nbsp;
            <input
              type="radio"
              id="on"
              name="amoper"
              onChange={handleOnCheck}
              
            />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input
              type="radio"
              id="off"
              name="amoper"
              onChange={handleOffCheck}
            />
          </div>
          <div className="offset-md-3">
            <button
              className="btn btn-success mt-3 mb-4"
              style={{ marginLeft: "150px" }}
              onClick={print}>
              Print
            </button>
          </div>
        </div>
      </div>

      {/* <ResultDialog open={isOpen} close={()=>setIsOpen(false)} name={pname} age={page} gender={pgender} voucher={vouId}/> */}
    </div>
  );
};

export default TestVoucherPrint;
