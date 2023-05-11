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
const [creditAmount,setCreditAmount]=useState('');
const [remark,setRemark]=useState('');
const [date,setDate]=useState('');
const [isPaid,setIsPaid]=useState('');
const [repayAmount,setRepayAmount]=useState('');
 const [crdAmount, setCrdAmount] = useState("");

  const Repay = () => {
    const data = {
      id: props.id,
      repayAmount: repayAmount,
      repayDate: date,
      creditRemark: remark,
      creditAmount: Number(crdAmount),
    };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    alert(JSON.stringify(data));
    axios
      .put(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/repayment",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        props.setVouchers([...props.vouchers, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });
    props.setOpen(false);
  };


  useEffect(() => {
    const getAccountingType =() => {
      console.log(props.id,'id');
      try {
        const res = axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/today"
        );
        console.log(res.data.data.creditAmount);
        setCrdAmount(res.data.data.creditAmount,'credit');
        
      } catch (err) {}
    };
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
                  defaultValue={crdAmount}
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
              <Button class="btn btn-primary" onClick={Repay}>
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
