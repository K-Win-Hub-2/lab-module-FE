import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const ResultDialog = (props) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const getVoucher = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/" +
            props.voucher
        );
        setVouchers(res.data.data.testResultList);
      } catch (err) {}
    };
    getVoucher();
  }, []);
  console.log(props.credit);

  const save = () => {
    const data = {
      remaningCredit: props.credit,
      description: description,
      relatedPateintTreatment: props.patientTreatmentId,
      repaymentDate: date,
      repaymentAmount: amount,
    };
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/repayment",
        data
      )
      .then(function (response) {
        setIsShow(false);
        window.location.reload(true);
      });
  };

  return (
    <div style={{ minWidth: "1000px" }}>
      {isShow && (
        <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <u>LABORATORY REPORT</u>
          </DialogTitle>
          <DialogContent>
            <table className="table table-hover mt-4">
              <thead>
                <tr>
                  <th>Name:</th>
                  <th colSpan="2">{props.name}</th>
                  <th>Age:</th>
                  <th colSpan="2">{props.age}</th>
                  <th>Sex</th>
                  <th colSpan="2">{props.gender}</th>
                </tr>
                <tr>
                  <th>Referred from:</th>
                  <th colSpan="2"></th>
                  <th>Lab:Reg:No</th>
                  <th colSpan="2"></th>
                  <th>Date of Report</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <table className="table table-hover mt-5">
              <thead className="bg-secondary">
                <tr>
                  <th>Test</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vitamin D (25 – OH)</td>
                  <td></td>
                  <td>nmol /L</td>
                  <td>See Below</td>
                </tr>
                {vouchers.testResultList.map((voucher, index) => (
                  <tr>
                    <td>{voucher.name}</td>
                    <td>{voucher.result}</td>
                    <td>{voucher.unit}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5 className="mt-4">
              <u>Reference Ranges For 25-OH Vitamin D</u>
            </h5>
            <table className="table table-hover mt-2">
              <tbody>
                <tr>
                  <td>Level</td>
                  <td>Clinical</td>
                </tr>
                <tr>
                  <td>30 nmol/L</td>
                  <td>
                    Severe Vitamin D deficiency. Suggest high dose
                    supplementation.
                  </td>
                </tr>
                <tr>
                  <td>30 – 50 nmol/L</td>
                  <td>
                    Vitamin D insufficiency, if bone health an issue, suggest
                    standard-dose supplementation. No repeat vitamin D
                    measurement required.
                  </td>
                </tr>
                <tr>
                  <td>50 – 125 nmol/L</td>
                  <td>Adequate. No action required</td>
                </tr>
                <tr>
                  <td>350 nmol/L</td>
                  <td>Toxicity. Very rare</td>
                </tr>
              </tbody>
            </table>
            <div className="row" style={{ marginTop: "90px" }}>
              <div className="col-6">
                <span>Laboratory Technician</span>
              </div>
              <div className="col-6 float-right">
                <span>Dr. Khine Min Htet</span>
                <br></br>
                <span>SpecialistPathologist</span>
                <br></br>
                <span>M.B.,B.S (Ygn), M.Med.Sc (Pathology)</span>
                <br></br>
                <span>Central Lab, Ahlone, Yangon</span>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close}>Cancel</Button>
            {/* <Button onClick={save}>Pay</Button> */}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ResultDialog;
