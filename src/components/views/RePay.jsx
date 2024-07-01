/* eslint-disable */

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";
import apiInstance from "../../utils/api";

export default function BankInfoDialog(props) {
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [crdAmount, setCrdAmount] = useState("");
  const VoucherID = useLocation().pathname.split("/")[2];


  const Repay = () => {
    const data = {
      voucherID: VoucherID,
      repayAmount: repayAmount,
      repayDate: date,
      creditRemark: remark,
      creditAmount: -crdAmount
    };
    alert(JSON.stringify(data));
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    apiInstance
      .put(
        "vouchers/repayment",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        // props.setVouchers([...props.vouchers, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  useEffect(() => {
    const getAccountingType = async () => {
      try {
        console.log(VoucherID, "id");
        const res = await apiInstance.get(
          "voucher/" +
          VoucherID
        );

        setCrdAmount(res.data.data.creditAmount);
        console.log(res.data.data.creditAmount, "credit");
      } catch (err) { }
    };
    getAccountingType();
  }, []);
  // const crdAmo= -(crdAmount);

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
                      <Link to="/tvoucherList">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Repay</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}

              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Credit Amount</label>
                  <input
                    type="text"
                    class="form-control border border-info"
                    name="acc_code"
                    id="acc_code"
                    min="0"
                    step="1"
                    value={-crdAmount}
                    onChange={(e) => setCrdAmount(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="name">Repay Amount</label>
                  <input
                    type="number"
                    class="form-control border border-info"
                    name="acc_code"
                    id="acc_code"
                    onChange={(e) => setRepayAmount(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="name">Credit Remark</label>

                  <input
                    type="text"
                    name="sub_head"
                    className="form-control border-info"
                    id=""
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="name">Repay Date</label>

                  <input
                    type="date"
                    name="sub_head"
                    className="form-control border-info"
                    id=""
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="name">Is Paid</label>

                  <input
                    type="checkbox"
                    name="sub_head"
                    className="ml-3"
                    style={{ width: "1.5em", height: "1.5em" }}
                    value="true"
                    id=""
                    onChange={(e) => setIsPaid(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={props.close}>
                  Close
                </button>
                <button class="btn btn-primary" onClick={Repay}>
                  Save
                </button>
              </div>

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
