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
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const AccountCreate = () => {
    const data = {
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
      .post(
        "http://backendcherryk.kwintechnologykw11.com:4000/api/accounting-list",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        props.setAccountLists([...props.accountLists, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
    props.setOpen(false);
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

    // const getAccountingHeadingType = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://localhost:9000/api/account-headers/related/${heading}`
    //     );
    //     setHeading(res.data.list);
    //   } catch (err) {}
    // };

    getAccountingType();
  }, []);

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>
          <div className="modal-header bg-info">
            <h4 className="modal-title">Add New Accounting</h4>
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

          <form action="" method="post">
            {/* @csrf */}
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Credit Amount</label>
                <input
                  type="number"
                  class="form-control border border-info"
                  name="acc_code"
                  id="acc_code"

                  //   onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="name">Repay Amount</label>
                <input
                  type="number"
                  class="form-control border border-info"
                  name="acc_code"
                  id="acc_code"

                  //   onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="name">Credit Remark</label>

                <input
                  type="text"
                  name="sub_head"
                  className="form-control border-info"
                  id=""
                  //   onChange={(e) => setSubHeading(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="name">Repay Date</label>

                <input
                  type="date"
                  name="sub_head"
                  className="form-control border-info"
                  id=""
                  //   onChange={(e) => setSubHeading(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="name">Is Paid</label>

                <input
                  type="checkbox"
                  name="sub_head"
                  className="ml-3"
                  style={{ width: "1.5em", height:'1.5em'}}
                  value="Is Paid"
                  id=""
                  //   onChange={(e) => setSubHeading(e.target.value)}
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
              <Button class="btn btn-primary" onClick={AccountCreate}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// phyo
//maymyat
