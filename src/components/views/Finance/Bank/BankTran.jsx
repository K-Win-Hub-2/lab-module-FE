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
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 500px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const FilterTitle = styled.span`
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 3px;
`;
// hello world

const FilterSelect = styled.select`
  padding: 5px;
`;

const FilterOption = styled.option``;

const QRBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

export default function BankInfoDialog(props) {
  const [relatedAccounting, setRelatedAccounting] = useState("");
  const [relatedBank, setRelatedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [remark, setRemark] = useState("");
  const [toAccLists, setToAccLists] = useState([]);

  console.log(props.name);

  const BankTran = () => {
    const data = {
      fromAcc: "6423eaaa5fb841d5566db369",
      toAcc: relatedBank,
      amount: Number(amount),
      date: date,
      remark: remark,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const res = axios
      .post("http://centralclinicbackend.kwintechnologykw11.com:3000/api/transfer", data, config)
      .then(function (response) {
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
        console.log(err);
      });
    props.close();
  };
  useEffect(() => {
    const getAccountingLists = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
        );
        const toBank = res.data.list.filter(
          (el) =>
            el.relatedHeader.name == "Cash At Bank" &&
            el.relatedType.name === "Assets"
        );
        setToAccLists(toBank);
      } catch (err) {}
    };

    getAccountingLists();
  }, []);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>
          <div className="modal-header bg-info">
            <h4 className="modal-title">Bank Transfer Form</h4>
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

          <form>
            {/* @csrf */}

            <div class="form-group">
              <label for="">From Account</label>

              <input
                type="text"
                name="from"
                class="form-control"
                value={props.name}
                readonly
              />
            </div>
            <div class="form-group">
              <label for="">To Account</label>
              <select
                name="transfer_acc"
                id=""
                class="form-control"
                onChange={(e) => setRelatedBank(e.target.value)}>
                <option value="">Choose Account</option>

                {toAccLists.map((option) => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="">Date</label>
              <input
                type="date"
                name="date"
                id=""
                class="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="">Remark</label>
              <input
                type="text"
                name="remark"
                id=""
                class="form-control"
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label for="">Amount</label>
              <input
                type="number"
                name="amount"
                id=""
                class="form-control"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={props.close}>
                Close
              </button>
              <Button className="bg-success" onClick={BankTran}>
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
