/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const uri = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/';

export default function TransferModal(props) {

    const [fromList, setFromList] = useState([]);
    const [toList, setToList] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [remark, setRemark] = useState('');

    const postTransfer = (props) => {
        let data = {
            date: date,
            fromAcc: from,
            toAcc: to,
            amount: amount,
            remark:remark
        }
        axios.post(uri + 'transfer', data).then((response) => {
            
            Swal.fire({
                title: 'Success',
                text: 'Successfully Transfer',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            // props.setTransferList([...props.transferList,response.data.data[0]])
            window.location.reload()
        })
        
    }

    return (
        <div>
            {/* {console.log('props',props.bankList, props.cashList)} */}
            <Dialog open={props.open} onClose={props.close}>
                <DialogTitle>
                    {" "}
                    <div className="modal-header">
                        <h4 className="modal-title">Transfer</h4>
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
                <DialogContent style={{ width: '500px' }}>
                    <DialogContentText></DialogContentText>

                    {/* @csrf */}
                    <div className="form-group mt-3">
                        <label className="control-label">From</label>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-check form-check-inline mt-2 ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                onClick={(e) => setFromList(props.bankList)}
                                                name='from'
                                            />
                                            &nbsp;
                                            <label className="form-check-label text-success" for="bank">
                                                Bank
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check form-check-inline mt-2 px-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                onClick={(e) => setFromList(props.cashList)}
                                                name='from'

                                            />
                                            <label className="form-check-label text-success" for="cash">
                                                Cash
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <select
                                    className="form-control"
                                    name="exp_acc"
                                    onChange={e=>setFrom(e.target.value)}
                                >
                                    <option value="">Select From Account</option>
                                    {fromList.map((option) => (
                                        <option value={option._id}>{option.name}</option>
                                    ))}

                                </select>
                            </div>

                        </div>

                    </div>




                    <div className="form-group mt-3">
                        <label className="control-label">To</label>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-check form-check-inline mt-2 ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                onClick={(e) => setToList(props.bankList)}
                                                name='to'
                                            />
                                            &nbsp;
                                            <label className="form-check-label text-success" for="bank">
                                                Bank
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check form-check-inline mt-2 px-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                onClick={(e) => setToList(props.cashList)}
                                                name='to'

                                            />
                                            <label className="form-check-label text-success" for="cash">
                                                Cash
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <select
                                    className="form-control"
                                    name="exp_acc"
                                    onChange={e=>setTo(e.target.value)}

                                >
                                    <option value="">Select To Account</option>
                                    {toList.map((option) => (
                                        <option value={option._id}>{option.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>

                    </div>

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
                        <label className="control-label">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            name="remark"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

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
                                onClick={e=>{
                                    props.setOpen(false)
                                    postTransfer()
                                }}>
                                Submit
                                
                            </button>
                            <button
                                type="button"
                                className="btn btn-inverse btn-dismiss"
                                data-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}