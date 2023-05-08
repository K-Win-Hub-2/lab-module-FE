import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { FaArrowLeft, FaMinus } from "react-icons/fa";

import {useState, useEffect } from "react";
import { useLocation,Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../SideBar";
import AccountList from './AccountList';
import { Link } from 'react-router-dom';



export default function BankInfoDialog(props) {
  const [code, setCode] = useState("");
  const [accountingTypes, setAccountingTypes] = useState("");
  const [headingList, setHeadingList] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [accType, setAccType] = useState([]);

  const [amount, setAmount] = useState("");
  // const [openingBalance, setOpeningBalance] = useState('');
  const [generalFlag, setGeneralFlag] = useState(false);
  // const [bankAddress, setBankAddress] = useState('');
  const [relatedCurrency, setRelatedCurrency] = useState("");
  const [carryForWork, setCarryForWork] = useState(false);
  const [flag, setFlag] = useState(false);
  const [upCode, setUpCode] = useState('');
  const [upSub,setUpSub]=useState('');
  const [upBal,setUpBal]=useState('');
  const [upCur,setUpCur]=useState('');
const Id = useLocation().pathname.split("/")[2];

  const AccountCreate = () => {
    const data = {
      id: Id,
      code: code,
      name: subHeading,
      relatedType: accountingTypes,
      relatedHeader: heading,
      subHeader: subHeading,
      amount: amount,
      openingBalance: amount,
      generalFlag: generalFlag,
      relatedCurrency: relatedCurrency,
      carryForWork: carryForWork,
    };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // alert(JSON.stringify(data));
    axios
      .put(
        "http://backendcherryk.kwintechnologykw11.com:4000/api/accounting-list",
        data,
        config
      )
      .then(function (response)
      {
        alert("success");
        // props.setAccountLists([...props.accountLists, response.data.data]);
        // const index = props.accountLists.findIndex(
        //   (item) => item._id === props.id
        // );
        // let arr = [...props.accountLists];
        // arr[index] = {
        //   ...arr[index],
        //   ...response.data.data,
        // };
        // props.setAccountLists(arr);
      });
      
     
  
  };

  const handleHeading = async (event) => {
    setHeading(event);
    console.log(heading, headingList);
  };

  const handleAccountHeader = async (event) => {
    setAccountingTypes(event);
    console.log(accountingTypes);
    const url = `http://backendcherryk.kwintechnologykw11.com:4000/api/account-headers/related/${event}`;
    console.log(url);
    const res = await axios.get(url);
    console.log(res.data.data, "res.data.data");
    setHeadingList(res.data.data);
    setFlag(true);
    console.log(headingList, "heading");
  };
  useEffect(() => {
    const getAccountingType = async () => {
      try {
        const res = await axios.get(
          "http://backendcherryk.kwintechnologykw11.com:4000/api/account-types"
        );
        setAccType(res.data.list);
      } catch (err) {}
    };

    const getAccount = async () => {
      try {
        console.log(Id, "Id");
        const res =await axios.get(
          "http://backendcherryk.kwintechnologykw11.com:4000/api/accounting-list/"+Id
        );
        console.log(res.data.data);
        setUpCode(res.data.data[0].code);
        setUpSub(res.data.data[0].name);
        setUpBal(res.data.data[0].amount);
        setUpCur(res.data.data[0].relatedCurrency);
      } catch (err) {}
    };
    getAccountingType();
    getAccount();
  },);

  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        {/* <!-- Main Sidebar Container --> */}
        <SideBar />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/account_list">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Account List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}

              <form action="" method="post">
                {/* @csrf */}
                <div class="modal-body">
                  <div class="form-group">
                    <label for="name">Account Code</label>
                    <input
                      type="text"
                      class="form-control border border-info"
                      name="acc_code"
                      id="acc_code"
                      defaultValue={upCode}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  {/* <div class="form-group">
                <label for="name">Account Name</label>
                <input
                  type="text"
                  class="form-control border-info"
                  name="acc_name"
                  id="acc_name"
                  placeholder="eg. Revenue Account"
                  onChange={(e) => setName(e.target.value)}
                />
              </div> */}

                  <div class="form-group">
                    <label for="name">Account Type</label>
                    <select
                      class="custom-select border-info"
                      name="account_type_id"
                      onChange={(e) => handleAccountHeader(e.target.value)}>
                      <option>Choose Account Type</option>
                      {accType.map((option) => (
                        <option value={option._id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {flag ? (
                    <div class="form-group">
                      <label for="name">Heading</label>
                      <select
                        class="custom-select border-info"
                        name="account_type_id"
                        onChange={(e) => handleHeading(e.target.value)}>
                        <option>Choose Heading Account</option>
                        {headingList.map((option) => (
                          <option value={option._id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  <div class="form-group">
                    <label for="name">Sub Heading</label>

                    <input
                      type="text"
                      name="sub_head"
                      className="form-control border-info"
                      id=""
                      defaultValue={upSub}
                      onChange={(e) => setSubHeading(e.target.value)}
                    />
                  </div>

                  <div class="form-group">
                    <label for="name">Balance</label>
                    <input
                      type="text"
                      class="form-control border-info"
                      name="balance"
                      defaultValue={upBal}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="name">Currency</label>
                    <input
                      type="text"
                      class="form-control border-info"
                      name="releatedCurrency"
                      defaultValue={upCur}
                      onChange={(e) => setRelatedCurrency(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="name">General Flag</label>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="yes_no"
                            id="yes"
                            onclick="show_project()"
                            onChange={(e) => setGeneralFlag(true)}
                          />
                          <label class="form-check-label text-info" for="yes">
                            Yes
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="yes_no"
                            id="no"
                            onclick="hide_project()"
                            onChange={(e) => setGeneralFlag(false)}
                            checked
                          />
                          <label class="form-check-label text-info" for="no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="name">Carry Forward</label>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="no_yes"
                            id="yes1"
                            onclick="show_project()"
                            onChange={(e) => setCarryForWork(true)}
                          />
                          <label class="form-check-label text-info" for="bank">
                            Yes
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="no_yes"
                            id="no1"
                            onclick="hide_project()"
                            onChange={(e) => setCarryForWork(false)}
                            checked
                          />
                          <label class="form-check-label text-info" for="cash">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">
                    Close
                  </button>
                  <Button class="btn btn-primary" onClick={AccountCreate}>
                    Update
                  </Button>
                </div>
              </form>

              {/* <!-- /.row (main row) --> */}
            </div>
          </section>
          {/* <!-- /.content --> */}
        </div>
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
      <aside classNameName="control-sidebar control-sidebar-dark">
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}
    </div>
  );
}
// phyo
//maymyat
