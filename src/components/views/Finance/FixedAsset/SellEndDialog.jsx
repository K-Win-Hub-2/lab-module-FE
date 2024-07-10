/* eslint-disable */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import { FaArrowLeft, FaMinus } from "react-icons/fa";

import { useLocation } from "react-router";
import SideBar from "../../SideBar";
import { Link } from "react-router-dom";
import apiInstance from "../../../../utils/api";
// import Bank from './Bank';

export default function BankInfoDialog(props) {
  const [main, setMain] = useState(true);
  const [showSell, setShowSell] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [cashList, setCashList] = useState([]);
  const [showCash, setShowCash] = useState(false);
  const [showBank, setShowBank] = useState(false);


  const FixedId = useLocation().pathname.split("/")[2];
  const handleBankRadioChange = () => {
    setShowBank(true);
    setShowCash(false);
  };

  const handleCashRadioChange = () => {
    setShowBank(false);
    setShowCash(true);
  };

  //setting up for data
  const [initialAmount, setInitialAmount] = useState("");

  const [sellDate, setSellDate] = useState("");
  const [remark, setRemark] = useState("");
  const [useLife, setUseLife] = useState("");
  const [usedYear, setUsedYear] = useState("");
  const [remainYear, setRemainYear] = useState("");
  const [currentPrice, setCurrentPrice] = useState([]);
  const [sellPrice, setSellPrice] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flag, setFlag] = useState("");
  const [name, setName] = useState("");
  const [relatedBankAcc, setRelatedBankAcc] = useState('');
  const [relatedCashAcc, setRelatedCashAcc] = useState("");
  const [profitLoss, setProfitLoss] = useState("");

  const SellEndCreate = (event) => {
    // alert(JSON.stringify(jsonData));

    const jsonData = {
      relatedFixedAsset: FixedId,
    };

    if (flag == "Sell" && relatedCashAcc) {

      jsonData.flag = flag;
      jsonData.sellDate = sellDate;
      jsonData.currentValue = currentPrice;
      jsonData.sellPrice = sellPrice;
      jsonData.profitAndLoss = profitLoss;
      jsonData.relatedAccounting = relatedCashAcc;
    }


    if (flag == "Sell" && relatedBankAcc) {
      jsonData.flag = flag;
      jsonData.sellDate = sellDate;
      jsonData.currentValue = currentPrice;
      jsonData.sellPrice = sellPrice;
      jsonData.profitAndLoss = profitLoss;
      jsonData.relatedAccounting = relatedBankAcc;
    }


    if (flag == "End" && relatedCashAcc) {
      jsonData.flag = flag;
      jsonData.endDate = endDate;
      jsonData.usedYears = usedYear;
      jsonData.remaniningYears = remainYear;
      jsonData.remark = remark;
      jsonData.profitAndLoss = 0;
      jsonData.relatedAccounting = relatedCashAcc;
    }

    if (flag == "End" && relatedBankAcc) {
      jsonData.flag = flag;
      jsonData.endDate = endDate;
      jsonData.usedYears = usedYear;
      jsonData.remaniningYears = remainYear;
      jsonData.remark = remark;
      jsonData.profitAndLoss = 0;
      jsonData.relatedAccounting = relatedBankAcc;
    }
    // console.log(jsonData);

    // alert(JSON.stringify(jsonData));
    // console.log(jsonData);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // alert(JSON.stringify(jsonData));
    apiInstance
      .post(
        "sellend",
        jsonData,
        config
      )
      .then(function (response) {
        // alert("success");
        // props.setIncomeLists([...props.incomeLists, response.data.data[0]]);
        Swal.fire({
          title: "Successful!",
          text: "You Created Income Data!",
          icon: "success",
          // showCancelButton: true,

          cancelButtonText: "Close",
        });

      })
      .catch(function (err) {
        Swal.fire({
          title: "Something Wrong!",
          text: "Try again, Please.",
          icon: "warning",
          // showCancelButton: true,

          cancelButtonText: "Close",
        });
      });
  };

  const handleSellRadioChange = () => {
    setMain(false);
    setShowSell(true);
    setShowEnd(false);
  };

  const handleEndRadioChange = () => {
    setMain(false);
    setShowSell(false);
    setShowEnd(true);
  };

  const handleCalculation = (event) => {
    if (currentPrice) {
      setProfitLoss((event - currentPrice).toFixed(2));
    }

    setSellPrice(event);
  };

  useEffect(() => {
    const getFixedLists = async () => {
      try {
        console.log(FixedId);
        const res = await apiInstance.get(
          "fixed-asset/" +
          FixedId
        );

        setUsedYear(res.data.data[0].usedYear);
        setCurrentPrice(res.data.data[0].currentPrice);
        setName(res.data.data[0].name);
        // console.log(res.data.data[0].usedYear);
        setUseLife(res.data.data[0].usedLife);
        let remainYear = useLife - usedYear;
        setRemainYear(remainYear);
      } catch (err) { }
    };

    const getAccountingLists = async () => {
      try {
        const res = await apiInstance.get(
          "accounting-lists"
        );
        const bank = res.data.list.filter(
          (el) =>
            el.relatedHeader.name == "Cash At Bank" &&

            el.relatedType.name === "Assets"
        );
        const cash = res.data.list.filter(
          (el) =>
            el.relatedHeader.name == "Cash In Hand" &&
            el.relatedType.name === "Asset"

        );
        setBankList(bank);
        setCashList(cash);
      } catch (err) { }
    };

    getAccountingLists();
    getFixedLists();
  }, []);

  return (
    <div classNameName="App">
      <div className="wrapper">
        {/* <!-- Navbar --> */}


        <SideBar />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/fix-ass">
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ marginTop: "0.15em" }}>
                      Sell End
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div className="container">
                <div className="card">
                  <div className="card-header bg-info">
                    <h3
                      className="card-title text-white py-2"
                      id="exampleModalLabel">
                      {name}'s Sell End
                    </h3>
                  </div>
                  <div className="card-body" id='clear'>
                    <div className="row offset-md-4">
                      <div className="col-md-2">
                        <div className="form-check form-check-inline mt-2 ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radiobuttonchanges"
                            id="sell"
                            value="Sell"
                            onChange={(e) => {
                              setFlag(e.target.value);
                              handleSellRadioChange();
                            }}
                          />
                          &nbsp;
                          <label
                            className="form-check-label text-success"
                            for="sell">
                            Sell
                          </label>
                        </div>
                      </div>
                      &nbsp;
                      <div className="col-md-2">
                        <div className="form-check form-check-inline mt-2 px-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radiobuttonchanges"
                            id="end"
                            value="End"
                            onChange={(e) => {
                              setFlag(e.target.value);
                              handleEndRadioChange();
                            }}
                          />
                          <label
                            className="form-check-label text-success"
                            for="end">
                            End
                          </label>
                        </div>
                      </div>
                    </div>

                    {main && (
                      <div>
                        <div class="form-group">
                          <label for="">Current Value</label>
                          <input
                            type="text"
                            className="form-control"
                            name="current_value"
                            value={currentPrice}
                            readonly
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Sell Price</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sell_price"
                            onChange={(e) => handleCalculation(e.target.value)}
                            id="sell"
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Sell Date</label>

                          <input
                            type="date"
                            name="sell"
                            id="sell"
                            onChange={(e) => setSellDate(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group" id="profit_loss">
                          <label for="">Profit/Loss</label>
                          <input
                            type="text"
                            className="form-control"
                            name="profit_loss"
                            readonly
                            id="pfloss"
                            value={profitLoss}
                          />
                        </div>
                      </div>
                    )}

                    {showSell && (
                      <div>
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-check form-check-inline mt-2 ">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="bank_cash"
                                id="bank"
                                value="1"
                                onClick={handleBankRadioChange}
                              />
                              &nbsp;
                              <label
                                className="form-check-label text-success"
                                for="bank">
                                Bank
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-check form-check-inline mt-2 px-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="bank_cash"
                                id="cash"
                                value="2"
                                onClick={handleCashRadioChange}
                              />
                              <label
                                className="form-check-label text-success"
                                for="cash">
                                Cash
                              </label>
                            </div>
                          </div>
                        </div>

                        {showBank && (
                          <div className="form-group mt-3" id="bankkk">
                            <label className="control-label">
                              Bank Account
                            </label>

                            <select
                              className="form-control"
                              name="bank_acc"
                              id="bank_acc"
                              onChange={(e) =>
                                setRelatedBankAcc(e.target.value)
                              }>
                              <option value="">Select Bank Account</option>

                              {bankList.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {showCash && (
                          <div className="form-group mt-3" id="bankkk">
                            <label className="control-label">
                              Cash Account
                            </label>

                            <select
                              className="form-control"
                              name="bank_acc"
                              id="bank_acc"
                              onChange={(e) =>
                                setRelatedCashAcc(e.target.value)
                              }>
                              <option value="">Select Cash Account</option>

                              {cashList.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div class="form-group">
                          <label for="">Current Value</label>
                          <input
                            type="text"
                            className="form-control"
                            name="current_value"
                            value={currentPrice}
                            readonly
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Sell Price</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sell_price"
                            onChange={(e) => handleCalculation(e.target.value)}
                            id="sell"
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Sell Date</label>

                          <input
                            type="date"
                            name="sell"
                            id="sell"
                            onChange={(e) => setSellDate(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group" id="profit_loss">
                          <label for="">Profit/Loss</label>
                          <input
                            type="text"
                            className="form-control"
                            name="profit_loss"
                            readonly
                            id="pfloss"
                            value={profitLoss}
                          />
                        </div>
                      </div>
                    )}

                    {showEnd && (
                      <div>
                        <div className="row">
                          <div className="offset-8 col-md-2">
                            <div className="form-check form-check-inline mt-2 ">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="bank_cash"
                                id="bank"
                                value="1"
                                onClick={handleBankRadioChange}
                              />
                              &nbsp;
                              <label
                                className="form-check-label text-success"
                                for="bank">
                                Bank
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-check form-check-inline mt-2 px-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="bank_cash"
                                id="cash"
                                value="2"
                                onClick={handleCashRadioChange}
                              />
                              <label
                                className="form-check-label text-success"
                                for="cash">
                                Cash
                              </label>
                            </div>
                          </div>
                        </div>

                        {showBank && (
                          <div className="form-group mt-3" id="bankkk">
                            <label className="control-label">
                              Bank Account
                            </label>

                            <select
                              className="form-control"
                              name="bank_acc"
                              id="bank_acc"
                              onChange={(e) =>
                                setRelatedBankAcc(e.target.value)
                              }>
                              <option value="">Select Bank Account</option>

                              {bankList.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {showCash && (
                          <div className="form-group mt-3" id="bankkk">
                            <label className="control-label">
                              Cash Account
                            </label>

                            <select
                              className="form-control"
                              name="bank_acc"
                              id="bank_acc"
                              onChange={(e) =>
                                setRelatedCashAcc(e.target.value)
                              }>
                              <option value="">Select Cash Account</option>

                              {cashList.map((option) => (
                                <option value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div class="form-group">
                          <label for="">Used Year</label>
                          <input
                            type="text"
                            className="form-control"
                            name="used_year"
                            value={usedYear}
                            readonly
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Remaining Year</label>
                          <input
                            type="text"
                            className="form-control"
                            name="remaining_year"
                            value={remainYear}
                            id="sel"
                          />
                        </div>
                        <div className="form-group">
                          <label for="">Remark</label>

                          <input
                            type="text"
                            name="sell"
                            id="sell"
                            className="form-control"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                        </div>
                        <div className="form-group" id="profit_loss">
                          <label for="">End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="end_date"
                            readonly
                            id="pfloss"
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-md-9 mt-4">
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={SellEndCreate}>
                          Create
                        </button>
                        <button
                          type="button"
                          className="btn btn-inverse btn-dismiss"
                          data-dismiss="modal"
                          onClick={props.close}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

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
