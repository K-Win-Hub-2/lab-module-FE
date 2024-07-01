
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import apiInstance from "../../utils/api";

const ResultDialog = (props) => {
  const [referDate, setReferDate] = useState("");
  const [referAmount, setReferAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [vouchers, setVouchers] = useState([]);


  useEffect(() => {
    const getVoucher = async () => {
      try {
        const res = await apiInstance.get(
          "voucher/" +
          props.voucher
        );
        setVouchers(res.data.data.testResultList);
      } catch (err) { }
    };
    getVoucher();
  }, []);
  console.log(props.credit);

  const save = () => {
    const data = {

    };
    apiInstance
      .post(
        "repayment",
        data
      )
      .then(function (response) {
        setIsShow(false);
        window.location.reload(true);
      });
  };

  return (
    <div style={{ minWidth: "1000px" }}>

      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle className="text-center">
          <u>LABORATORY REPORT</u>
        </DialogTitle>
        <DialogContent>
          <h3>Collect</h3>
          <form>
            <div className="form-group">
              <input type="date" className="form-control"></input>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          {/* <Button onClick={save}>Pay</Button> */}
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ResultDialog;
