
/* eslint-disable */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Swal  from 'sweetalert2';

export default function BankInfoDialog(props) {
  const [bankList, setBankList] = useState([]);
  const [cashList, setCashList] = useState([]);
  const [incomeAccountList, setIncomeAccountList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [showBank, setShowBank] = useState(false);
  const [showCash, setShowCash] = useState(false);

  //setting up for data
  const [initialAmount, setInitialAmount] = useState("");
  const [relatedBankAcc, setRelatedBankAcc] = useState("");
  const [relatedCashAcc, setRelatedCashAcc] = useState("");
  const [relatedAccounting, setRelatedAccounting] = useState("");
  const [initialCurrency, setInitialCurrency] = useState("");
  const [date, setDate] = useState("");
  const [remark, setRemark] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [finalCurrency, setFinalCurrency] = useState("");

  const IncomeCreate = (event) => {
    // alert(JSON.stringify(jsonData));
    const jsonData = {
      relatedAccounting: relatedAccounting,
      date: date,
      initialAmount: initialAmount,
      initialCurrency: initialCurrency,
      finalAmount: initialAmount,
      finalCurrency: initialCurrency,
      remark: remark,
    };
    // console.log(jsonData);

    if (relatedCashAcc) jsonData.relatedCashAccount = relatedCashAcc;
    if (relatedBankAcc) jsonData.relatedBankAccount = relatedBankAcc;
    // alert(JSON.stringify(jsonData));
    // console.log(jsonData);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // alert(JSON.stringify(jsonData));
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/income",
       // "http://localhost:9000/api/income",
        jsonData,
        config
      )
      .then(function (response) {
         setFinalAmount("");
         Swal.fire({
           title: "Successful!",
           text: "You Created Income Data!",
           icon: "success",
           // showCancelButton: true,

           cancelButtonText: "Close",
         });
        props.setIncomeLists([...props.incomeLists, response.data.data[0]]);
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
    props.close();
  };

  const handleBankRadioChange = () => {
    setShowBank(true);
    setShowCash(false);
  };

  const handleCashRadioChange = () => {
    setShowBank(false);
    setShowCash(true);
  };

  const handleCalculation = (event) => {
    if (initialCurrency === "MMK") {
      console.log(finalCurrency);
      let current = currencyList.filter(
        (currency) => currency.code === event
      )[0].exchangeRate;
      console.log(current);
      let ans = initialAmount / current;
      setFinalAmount(ans.toFixed(2));
      console.log(ans);
    } else if (initialAmount != "MMK") {
      let current = currencyList.filter(
        (currency) => currency.code === initialCurrency
      )[0].exchangeRate;
      // console.log(initialAmount);
      // console.log(current);
      let ans = initialAmount * current;
      setFinalAmount(ans.toFixed(2));
      console.log(finalAmount);
    }
    setFinalCurrency(event);
    console.log(initialAmount, "Thate chit mi thwr p");
    if (initialCurrency == event) setFinalAmount(initialAmount);
  };

  useEffect(() => {
    const getCashLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
          //"http://localhost:9000/api/accounting-lists"
        );

        const cash = res.data.list.filter(
          (el) =>
          el.relatedSubHeader.name == "Cash" &&
            el.relatedHeader.name == "Current Asset" &&
            el.relatedType.name === "Assets"
        );
        setCashList(cash);
      } catch (err) {}
    };

    const getBankLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
        // "http://localhost:9000/api/accounting-lists"
        );

        const bank = res.data.list.filter(
          (el) =>
          el.relatedSubHeader.name == "Bank" &&
            el.relatedHeader.name == "Current Asset" &&
            el.relatedType.name === "Assets"
        );
        setBankList(bank);
      } catch (err) {}
    };

    const getAccountingLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
          //"http://localhost:9000/api/accounting-lists"
        );
        const incomeAccounts = res.data.list.filter(
          (el) =>  el.relatedSubHeader.name == "Other Income" &&
          el.relatedHeader.name == "Other Income" &&
          el.relatedType.name === "Income"
        );
        console.log(incomeAccounts)
       // setInitialAmount(medicineSale[0].amount);
        setIncomeAccountList(incomeAccounts);
        // setAccountingList(res.data.list)
      } catch (err) {}
    };
    // const getCurrencyLists = async () => {
    //   try {
    //     const res = await axios.get(
    //       "http://centralclinicbackend.kwintechnologykw11.com:3000/api/currencies"
    //     );
    //     setCurrencyList(res.data.list);
    //     setInitialCurrency(currencyList.initialCurrency);
    //     setFinalCurrency(currencyList.finalCurrency);
    //   } catch (err) {}
    // };
    getBankLists();
    getCashLists();
    // getHeaderLists();
    getAccountingLists();
   // getCurrencyLists();
  }, []);

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      
      className="my-modal">
      <DialogTitle>
        <div className="modal-header">
          <h4 className="modal-title">Incoming</h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        {/* @csrf */}
        <div className="row offset-md-4">
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
              <label className="form-check-label text-success" for="bank">
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
              <label className="form-check-label text-success" for="cash">
                Cash
              </label>
            </div>
          </div>
        </div>

        {showBank && (
          <div className="form-group mt-3" id="bankkk">
            <label className="control-label">Bank Account</label>

            <select
              className="form-control"
              name="bank_acc"
              id="bank_acc"
              onChange={(e) => setRelatedBankAcc(e.target.value)}>
              <option value="">Select Bank Account</option>

              {bankList.map((option) => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>
          </div>
        )}

        {showCash && (
          <div className="form-group mt-3" id="cash">
            <label className="control-label">Cash Account</label>

            <select
              className="form-control"
              name="cash_acc"
              id="cash_acc"
              onChange={(e) => setRelatedCashAcc(e.target.value)}>
              <option value="">Select Cash Account</option>
              {/* @foreach ($cash_account as $acc) */}
              {cashList.map((option) => (
                <option value={option._id}>{option.name}</option>
              ))}

              {/* @endforeach */}
            </select>
          </div>
        )}

        <div className="form-group mt-3">
          <label className="control-label">Income Account</label>
          <select
            className="form-control"
            name="exp_acc"
            onChange={(e) => setRelatedAccounting(e.target.value)}>
            <option value="">Select Income Account</option>
            {/* @foreach ($inc_account as $acc) */}

            {incomeAccountList.map((option) => (
              <option value={option._id}>{option.name}</option>
            ))}

            {/* @endforeach */}
          </select>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Income Amount</label>

              <input
                type="number"
                className="form-control"
                name="amount"
                id="convert_amount"
                onChange={(event) => setInitialAmount(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Currency</label>

              <select
                name="currency"
                id=""
                className="form-control mt-1"
               
                onChange={(e) => setInitialCurrency(e.target.value)}>
                <option value="">Choose Currency</option>
                {/* {currencyList.map((option) => (
                  <option value={option.code}>{option.code}</option>
                ))} */}
                <option value="MMK">MMK</option>
                  <option value="Baht">Baht</option>
                  <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Final Amount</label>

              <input
                type="number"
                className="form-control"
                name="amount"
                id="convert_amount"
                defaultValue={finalAmount}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Final Currency</label>

              <select
                name="currency"
                id=""
                className="form-control mt-1"
                onchange="convert(this.value)"
                onChange={(e) => handleCalculation(e.target.value)}>
                <option value="">Choose Currency</option>

                {currencyList.map((option) => (
                  <option value={option.code}>{option.code}</option>
                ))}
              </select>
            </div>
          </div>
        </div> */}

        <div className="form-group">
          <label className="control-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
                                <label className="control-label">Voucher Number</label>
                                <input type="text" className="form-control" name="voucher_id"/>
                            </div> */}

        <div className="form-group">
          <label className="control-label">Remark</label>
          <input
            type="text"
            className="form-control"
            name="remark"
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-9 mt-4">
            <button
              type="submit"
              className="btn btn-success"
              onClick={IncomeCreate}>
              Submit
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
      </DialogContent>
    </Dialog>
  );
}
// phyo
//maymyat
