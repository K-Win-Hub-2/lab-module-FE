/* eslint-disable */

import React, { useEffect, useState } from "react";
import SideBar from "../components/views/SideBar";
import styled from "styled-components";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { MdDiscount } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const Top = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  justify-content: center;
  padding: 5px 30px;
  border: none;
  border-radius: 10px;
`;
const Div = styled.div``;
const Textarea = styled.textarea`
  margin-top: 20px;
  width: 100%;
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
  width: 100%;
  padding: 6px 5px;
  border-radius: 7px;
`;
const Input = styled.input`
  width: 100%;
  margin-top: 20px;
`;
const Label = styled.label``;

const Option = styled.option``;

const TestSale = () => {
  const [pname, setPname] = useState("");
  const [pcode, setPcode] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [net, setNet] = useState(0);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(0);
  const [option, setOption] = useState("Collect");
  const [servs, setServs] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [did, setDid] = useState("");
  const [arr, setArr] = useState([]);
  const [array, setArray] = useState([]);
  const [serId, setSerId] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [bankShow, setBankShow] = useState(false);
  const [cashShow, setCashShow] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [cashList, setCashList] = useState([]);
  const [accountingList, setAccountingList] = useState([]);
  const [relatedBankAcc, setRelatedBankAcc] = useState("");
  const [relatedCashAcc, setRelatedCashAcc] = useState("");
  const [account, setAccount] = useState("");
  const patient_id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const getCashLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
        );

        const cash = res.data.list.filter(
          (el) =>
            el.relatedHeader.name == "Cash In Hand" &&
            el.relatedType.name === "Asset"
        );
        setCashList(cash);
      } catch (err) {}
    };

    const getBankLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
        );

        const bank = res.data.list.filter(
          (el) =>
            el.relatedHeader.name == "Cash At Bank" &&
            el.relatedType.name === "Assets"
        );
        setBankList(bank);
      } catch (err) {}
    };

    const getAccountingLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
        );
        const acc = res.data.list.filter(
          (e) => e.relatedType.name == "Revenues"
        );

        setAccountingList(acc);
      } catch (err) {}
    };

    const getVoucherCode = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/code/" +
            patient_id
        );

        console.log(res.data.data.voucherID);
        setVoucherCode(res.data.data.voucherID);
      } catch (err) {}
    };

    const getPatient = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/patient/" +
            patient_id
        );
        setPname(res.data.data.name);
        setPcode(res.data.data.patientID);
      } catch (err) {}
    };
    const getServs = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/services"
        );
        // console.log("good");
        setServs(res.data.data);
      } catch (err) {}
    };
    const getDoctors = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctors"
        );
        setDoctors(res.data.data);
      } catch (err) {}
    };
    getPatient();
    getServs();
    getDoctors();
    getCashLists();
    getVoucherCode();
    getBankLists();
    getAccountingLists();
  }, []);

  const addService = async () => {
    const res = await axios.get(
      "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service/" +
        serId
    );
    console.log(res.data.data, "res.data.data");
    setArr((arr) => [...arr, res.data.data]);
    setTotal(total + res.data.data.charges);
    setNet(total + res.data.data.charges);
    const obj = {
      name: res.data.data._id,
      qty: 1,
      unitCharge: res.data.data.charges,
      subCharge: res.data.data.charges,
    };
    setArray((array) => [...array, obj]);
  };

  const delSer = (id) => {
    const charges = arr.filter((el) => el._id == id);
    setTotal(total - charges[0].charges);
    setNet(total - charges[0].charges);
    setArr(arr.filter((el) => el._id != id));
    setArray(array.filter((el) => el.name != id));
  };
  const saveTest = () => {
    const data = {
      code: voucherCode,
      relatedAccounting: account,
      date: date,
      relatedPatient: patient_id,
      // referDoctor: did,
      options: option,
      email: email,
      testSelection: array,
      totalCharge: total,
      discount: discount,
      netDiscount: net,
      pay: pay,
      change: change,
      amount: 0,
      seq: 2,
    };
    if (relatedCashAcc) data.relatedCashAccount = relatedCashAcc;
    if (relatedBankAcc) data.relatedBankAccount = relatedBankAcc;
    if (did) data.referDoctor = did;

    if (change < 0) {
      data.creditAmount = change;
    }

    const res = axios
      .post("http://localhost:9000/api/voucher", data)
      .then(function () {
        Swal.fire({
          title: "Success",
          text: "successfully Registered!",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate(-1);
      })

      .catch(function () {
        Swal.fire({
          title: "Error",
          text: "Something Wrong",
          icon: "error",
          confirmButtonText: "CANCEL",
        });
      });
  };
  const print = () => {
    var print_div = document.getElementById("print");
    var print_area = window.open();
    print_area.document.write(print_div.innerHTML);
    print_area.document.close();
    print_area.focus();
    print_area.print();
    print_area.close();
    // saveTest();
  };
  return (
    <div className="wrapper">
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className="content-wrapper" id="ifmcontentstoprint">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <Top>
              {/* <Right><Button>Refresh</Button></Right> */}
              <h5 className="text-center">Lab Test Voucher</h5>
            </Top>
            <Div className="card">
              <Div className="card-body row">
                <Div className="row">
                  <div className="col-6">
                    <label htmlFor="">Voucher Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="">Voucher Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={voucherCode}
                    />
                  </div>
                  <div className="col-6 mt-2">
                    <label htmlFor="">Patient Name</label>
                    <input type="text" className="form-control" value={pname} />
                  </div>
                  <div className="col-6 mt-2">
                    <label htmlFor="">Patient Code</label>
                    <input type="text" className="form-control" value={pcode} />
                  </div>
                  <div className="col-6 mt-4">
                    <label htmlFor="">Refer Doctor</label>
                    <input
                      className="ml-4"
                      type="radio"
                      name="doctordata"
                      id="male"
                      onClick={() => setIsDoctor(true)}
                    />{" "}
                    Yes
                    <input
                      className="ml-4"
                      type="radio"
                      name="doctordata"
                      id="male"
                      onClick={() => setIsDoctor(false)}
                      active
                    />{" "}
                    No
                  </div>
                  {isDoctor && (
                    <div className="col-6 mt-2">
                      <label htmlFor="">Select Doctor</label>
                      <select
                        className="form-control"
                        onChange={(e) => setDid(e.target.value)}>
                        <option>Choose Doctor</option>
                        {doctors.map((doc, index) => (
                          <option value={doc._id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="col-6 mt-4">
                    <label htmlFor="">Collect Or Email</label>
                    <input
                      className="ml-4"
                      type="radio"
                      name="data"
                      id="male"
                      onClick={() => {
                        setIsEmail(false);
                        setOption("Collect");
                      }}
                      active
                    />{" "}
                    Collect
                    <input
                      className="ml-4"
                      type="radio"
                      name="data"
                      id="male"
                      onClick={() => {
                        setIsEmail(true);
                        setOption("Email");
                      }}
                    />{" "}
                    Email
                  </div>
                  {isEmail && (
                    <div className="col-6 mt-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mt-4">
                      <label htmlFor="">Bank / Cash</label>
                      <input
                        className="ml-4"
                        type="radio"
                        name="doctordata"
                        id="male"
                        onClick={() => {
                          setBankShow(true);
                          setCashShow(false);
                        }}
                      />{" "}
                      Bank
                      <input
                        className="ml-4"
                        type="radio"
                        name="doctordata"
                        id="male"
                        onClick={() => {
                          setBankShow(false);
                          setCashShow(true);
                        }}
                        active
                      />{" "}
                      Cash
                    </div>

                    {bankShow && (
                      <div className="col-6 mt-3">
                        <label className="ml-2">Select Bank</label>
                        <select
                          className="form-control"
                          onChange={(e) => setRelatedBankAcc(e.target.value)}>
                          <option>Choose Bank</option>
                          {bankList.map((doc, index) => (
                            <option value={doc._id}>{doc.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {cashShow && (
                      <div className="col-6 mt-3">
                        <label className="ml-2">Select Cash</label>
                        <select
                          className="form-control"
                          onChange={(e) => setRelatedCashAcc(e.target.value)}>
                          <option>Choose Cash</option>
                          {cashList.map((doc, index) => (
                            <option value={doc._id}>{doc.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-6 mt-3">
                      <label className="ml-2">Income Account</label>
                      <select
                        className="form-control"
                        onChange={(e) => setAccount(e.target.value)}>
                        <option>Choose Account</option>
                        {accountingList.map((doc, index) => (
                          <option value={doc._id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Div className="col-10 mt-5">
                    <Select
                      onChange={(e) => setSerId(e.target.value)}
                      id="changes">
                      <Option value="0">Select Service</Option>
                      {servs.map((ser, index) => (
                        <Option value={ser._id}>{ser.name}</Option>
                      ))}
                    </Select>
                  </Div>
                  <Div className="col-2 mt-5">
                    <Button onClick={addService}>Add</Button>
                  </Div>
                </Div>
                <Table className="table table-hover mt-4">
                  <Thead>
                    <Tr>
                      <Th>No.</Th>
                      <Th>Name</Th>
                      <Th>Qty</Th>
                      <Th>Unit Charge</Th>
                      <Th>Sub Charge</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {arr.map((ar, i) => (
                      <Tr key={ar._id}>
                        <Td>{++i}</Td>
                        <Td>{ar.name}</Td>
                        <Td>1</Td>
                        <Td>{ar.charges}</Td>
                        <Td>{ar.charges}</Td>
                        <Td>
                          <RxCross2 onClick={() => delSer(ar._id)} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <tfoot>
                    <Tr>
                      <Td colSpan="5" className="text-right">
                        Total Charge
                      </Td>
                      <Td>{total}</Td>
                    </Tr>
                    <Tr>
                      <Td colSpan="5" className="text-right">
                        Discount
                      </Td>
                      <Td>0</Td>
                    </Tr>
                    <Tr>
                      <Td colSpan="5" className="text-right">
                        Net Charge
                      </Td>
                      <Td>{total}</Td>
                    </Tr>
                    <Tr>
                      <Td colSpan="5" className="text-right">
                        Pay
                      </Td>
                      <Td>
                        <input
                          type="number"
                          onChange={(e) => {
                            setPay(e.target.value);
                            setChange(e.target.value - total);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colSpan="5" className="text-right">
                        Change
                      </Td>
                      <Td>{change}</Td>
                    </Tr>
                  </tfoot>
                </Table>
                <div id="print" width="100%" hidden>
                  <h3 style={{ textAlign: "center" }}>Lab Test Voucher</h3>
                  <div className="row">
                    <div className="col-8">
                      <span>Voucher Date : {date}</span>
                    </div>
                    <div className="offset-1 col-3">
                      <span>Voucher Code : {code}</span>
                    </div>
                  </div>
                  <Table className="table table-hover mt-4">
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Name</Th>
                        <Th>&nbsp;&nbsp;Qty</Th>
                        <Th>&nbsp;&nbsp;Unit Charge</Th>
                        <Th>&nbsp;&nbsp;Sub Charge</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {arr.map((ar, i) => (
                        <Tr key={ar._id}>
                          <Td>{++i}</Td>
                          <Td>{ar.name}</Td>
                          <Td>&nbsp;&nbsp;1</Td>
                          <Td>&nbsp;&nbsp;{ar.charges}</Td>
                          <Td>&nbsp;&nbsp;{ar.charges}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <tfoot>
                      <br></br>
                      <Tr>
                        <Td colSpan="5" style={{ textAlign: "right" }}>
                          Total Charge-
                        </Td>
                        <Td>{total}</Td>
                      </Tr>
                      <Tr>
                        <Td
                          colSpan="5"
                          className="text-right"
                          style={{ textAlign: "right" }}>
                          Discount-
                        </Td>
                        <Td style={{ textAlign: "right" }}>0</Td>
                      </Tr>
                      <Tr>
                        <Td
                          colSpan="5"
                          className="text-right"
                          style={{ textAlign: "right" }}>
                          Net Charge-
                        </Td>
                        <Td style={{ textAlign: "right" }}>{total}</Td>
                      </Tr>
                      <Tr>
                        <Td
                          colSpan="5"
                          className="text-right"
                          style={{ textAlign: "right" }}>
                          Pay-
                        </Td>
                        <Td style={{ textAlign: "right" }}>{pay}</Td>
                      </Tr>
                      <Tr>
                        <Td
                          colSpan="5"
                          className="text-right"
                          style={{ textAlign: "right" }}>
                          Change-
                        </Td>
                        <Td style={{ textAlign: "right" }}>{change}</Td>
                      </Tr>
                    </tfoot>
                  </Table>
                </div>
                <div className="row mt-5">
                  <div className="offset-5 col-4">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={saveTest}>
                      Save
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-sm btn-primary" onClick={print}>
                      Print
                    </button>
                  </div>
                </div>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSale;
