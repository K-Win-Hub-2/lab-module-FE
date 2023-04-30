import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function BankInfoDialog(props) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("")
    const [doctor, setDoctor] = useState("");
    const [category, setCategory] = useState("");
    const [categoryLists, setCategoryLists] = useState([]);
    const [doctorLists, setDoctorLists] = useState([]);
    const [headingList, setHeadingList] = useState([]);
    const [heading, setHeading] = useState("");
    const [relatedCurrency, setRelatedCurrency] = useState("");
    const [flag, setFlag] = useState(false);
    const [upCode, setUpCode] = useState("");

    const AccountCreate = () => {
        const data = {
            id: props.id,
            code: code,
            name: name,
            relatedCategory: category,
            referDoctor: doctor,
            charges: relatedCurrency
        };
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        alert(JSON.stringify(data));
        axios
            .put(
                "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service",
                data,
                config
            )
            .then(function (response) {
                Swal.fire({
                    title: "Success",
                    text: "successfully Registered!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
                window.location.reload(false);
                // const index = props.accountLists.findIndex(
                //     (item) => item._id === props.id
                // );
                // let arr = [...props.labServiceLists];
                // arr[index] = {
                //     ...arr[index],
                //     ...response.data.data,
                // };
                // props.setLabServiceLists(arr);
            })
            .catch(function (err) {
                Swal.fire({
                    title: "Error",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "CANCEL",
                })
            });

        props.close();


    };

    const handleHeading = async (event) => {
        setHeading(event);
        console.log(heading, headingList);
    };
    useEffect(() => {
        const getDoctorLists = async () => {
            try {
                console.log('here')
                const res = await axios.get(
                    "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctors"
                );
                setDoctorLists(res.data.data.filter(item => item.selection === 'ReferDoctor'));
            } catch (err) {
                Swal.fire({
                    title: "Error",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "CANCEL",
                })
            }
        };
        const getCategoryLists = async () => {
            try {
                const res = await axios.get(
                    "http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories"
                );
                setCategoryLists(res.data.data);
            } catch (err) {
                Swal.fire({
                    title: "Error",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "CANCEL",
                })
            }
        };
        getCategoryLists();
        getDoctorLists();
    }, []);

    return (
        <div>
            <Dialog open={props.updateDialog} onClose={props.close}>
                <DialogTitle>
                    <div className="modal-header bg-info">
                        <h4 className="modal-title">Update Account</h4>
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
                                <label for="name">Code</label>
                                <input
                                    type="text"
                                    class="form-control border border-info"
                                    name="acc_code"
                                    id="acc_code"
                                    defaultValue={upCode}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    class="form-control border border-info"
                                    name="acc_code"
                                    id="acc_code"
                                    defaultValue={upCode}
                                    onChange={(e) => setName(e.target.value)}
                                />
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
                                <label for="name">Category</label>
                                <select
                                    class="custom-select border-info"
                                    name="account_type_id"
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option>Choose Category</option>
                                    {categoryLists.map((option) => (
                                        <option value={option._id}>{option.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="name">Refer Doctor</label>
                                <select
                                    class="custom-select border-info"
                                    name="account_type_id"
                                    onChange={(e) => setDoctor(e.target.value)}>
                                    <option>Choose Refer Doctor</option>
                                    {doctorLists.map((option) => (
                                        <option value={option._id}>{option.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="name">Charges</label>
                                <input
                                    type="text"
                                    class="form-control border-info"
                                    name="releatedCurrency"
                                    onChange={(e) => setRelatedCurrency(e.target.value)}
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
