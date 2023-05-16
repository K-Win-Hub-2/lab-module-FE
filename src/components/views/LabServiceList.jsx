/* eslint-disable */

import React, { useState } from "react";
// import ExpenseDialog from "../views/ExpenseDialog";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { FaCashRegister, FaFileMedical, FaFileExcel } from 'react-icons/fa'

import Swal from "sweetalert2";
import LabServiceUpdate from "../views/LabServiceUpdate";

const LabServiceList = () => {
  const [open, setOpen] = useState(false);
  const [labServiceLists, setLabServiceLists] = useState([]);
  const[filteredList, setFilteredList] = useState([]);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [multiTestLists, setMultiTestLists] = useState([]);
  const [id, setId] = useState('');
  const[testName,setTestName] = useState('');


  const handleInputChange = (event) => {
    setFilteredList(labServiceLists.filter(test=> test.name.includes(event.target.value)))
  }

  const handleDelete = (event) => {
    console.log(event, "event");
    axios
      .delete(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service/" +
          event
      )
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Successfully Deleted!",
          icon: "success",
          confirmButtonText: "OK",
        });
        const result = labServiceLists.filter((item) => item._id !== event);
        setLabServiceLists(result);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        });
      });
  };

  // const handleUpdate = (val) => {
  //   setId(val);
  //   setUpdateDialog(true);
  // };

  const handleCheckChange = (val) => {
    const getMultiTestList = async () => {
      try {
        console.log(val);
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/service/" +
            val
        );

        console.log(res.data.data);
        setMultiTestLists(res.data.data);
      } catch (err) {}
    };

    getMultiTestList();

    if (isShow) {
      document.getElementById("toggle" + val).removeAttribute("hidden");
    } else {
      document.getElementById("toggle" + val).setAttribute("hidden", "hidden");
    }
    setIsShow(!isShow);
  };

  const showDialog = () => setOpen(true);
  const _export = React.useRef(null);
  const excelExport = () => {
    if (_export.current !== null) {
      console.log(_export.current.props.data);
      _export.current.props.data.map(function (element, index) {
        element.date = element.date.split("T")[0];
      });
      _export.current.save();
    }
  };
  useEffect(() => {
    const getLabServiceLists = async () => {
      const res = await axios.get(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/services?limit=30"
      );

      setLabServiceLists(res.data.data);
      setFilteredList(res.data.data);
    };
    getLabServiceLists();
  }, []);
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
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
                      <a href="/lab-test">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Lab Service List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  {/* <div className="row">
                    <div className="form-group col-md-5">
                      <label>From</label>
                      <input
                        type="date"
                        name="from"
                        id="from"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <label>To</label>
                      <input
                        type="date"
                        name="to"
                        id="to"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <button
                        className="btn btn-sm btn-primary form-control"
                        style={{ marginTop: "32px" }}
                        onclick="date_filter()">
                        Search
                      </button>
                    </div>
                  </div> */}
                </div>
                <div className="offset-md-2 col-md-4">
                  <div className="input-group" style={{ marginTop: "35px",marginBottom: "10px" }}>
                    <input
                      type="search"
                      className="form-control rounded"
                      id="search_code"
                      placeholder="Search By Test Name"
                      onChange={event =>
                        handleInputChange(
                          event
                        )
                      }
                    />
                    &nbsp;
                    {/* <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{ height: "0.97cm", marginTop: "0.1em" }}
                      onclick="acc_code_search()">
                      Search
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div class="card">
                    <div class="card-header">
                      <div class="row justify-content-between">
                        <label class="">
                          <span class="float-right">
                            <Link to="/lab-register" class="btn btn-primary">
                              <i class="fas fa-plus"></i> &nbsp;Lab Test
                              Register
                            </Link>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={excelExport}>
                              <FaFileExcel
/>&nbsp;Export
                            </button>
                          </span>
                        </label>
                      </div>
                      <div class="row" id="trial_balance"></div>
                    </div>

                    <div class="card-body">
                      {/* Export data in Excel */}
                      {/* <ExcelExport data={expenseLists} ref={_export}>
                        <ExcelExportColumn
                          field=""
                          title="No"
                          locked={true}
                          width={30}
                        />
                        <ExcelExportColumn
                          field="date"
                          title="Date"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={200}
                        />

                        <ExcelExportColumn
                          field="relatedBankAccount.name"
                          title="Bank Account"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field="relatedCashAccount.name"
                          title="Cash Account"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field="relatedAccounting.name"
                          title="Account"
                          width={150}
                        />
                        <ExcelExportColumn
                          field="remark"
                          title="Remark"
                          width={150}
                        />
                      </ExcelExport> */}
                      {/* Export Data in Excel end */}
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="table-responsive text-black"
                            id="slimtest2">
                            <table class="table table-hover" id="filter_date">
                              <thead class="bg-info text-white">
                                <tr>
                                  <th>#</th>
                                  <th>Code</th>
                                  {/* <th>Bank / Cash Account</th>  */}
                                  <th>Name</th>

                                  <th>Category</th>

                                  <th>Refer Amount</th>
                                  <th>Charges</th>
                                  {/* <th className="text-center">Multi Test</th> */}
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>

                              {filteredList.map((labService, i) => (
                                <tbody className="">
                                  <tr>
                                    <td>{++i}</td>
                                    <td>
                                      {labService.code ? labService.code : ""}
                                    </td>

                                    <td>
                                      {labService.name ? labService.name : ""}
                                    </td>

                                    <td>Test Cat</td>

                                    <td>
                                      {labService.referAmount
                                        ? labService.referAmount
                                        : ""}
                                    </td>
                                    <td>
                                      {labService.charges
                                        ? labService.charges
                                        : ""}
                                    </td>
                                    {/* <td className="text-center">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-primary ml-2"
                                        onClick={() =>
                                          handleCheckChange(
                                            labService.subTest._id
                                          )
                                        }>
                                        Check
                                      </button>
                                    </td> */}
                                    <td className="text-center">
                                      <Link to={"/lab-test/" + labService._id}>
                                        <a
                                          className="btn btn-sm btn-warning text-white"
                                          role="button">
                                          Update
                                        </a>
                                      </Link>
                                      &nbsp;
                                      <a
                                        className="btn btn-sm btn-danger text-white"
                                        role="button"
                                        onClick={(e) =>
                                          handleDelete(labService._id)
                                        }>
                                        Delete
                                      </a>
                                    </td>
                                  </tr>

                                  <tr
                                    className="bg-light"
                                    id={"toggle" + labService.subTest._id}
                                    hidden>
                                    <td colspan="12">
                                      <div>
                                        <div class="row">
                                          <div class="col-md-2">
                                            <label
                                              style={{ fontSize: "15px" }}
                                              class="text-dark">
                                              No
                                            </label>
                                          </div>
                                          <div class="col-md-3">
                                            <label
                                              style={{ fontSize: "15px" }}
                                              class="text-dark">
                                              Name
                                            </label>
                                          </div>
                                          <div class="col-md-2">
                                            <label
                                              style={{ fontSize: "15px" }}
                                              class="text-dark">
                                              Unit
                                            </label>
                                          </div>
                                        </div>

                                        {multiTestLists
                                          ? multiTestLists.map((multi, i) => (
                                              <div class="row">
                                                <div class="col-md-2">
                                                  <div
                                                    style={{
                                                      fontSize: "15px",
                                                    }}>
                                                    {++i}
                                                  </div>
                                                </div>
                                                <div class="col-md-3">
                                                  <div
                                                    style={{
                                                      fontSize: "15px",
                                                    }}>
                                                    {multi.name}
                                                  </div>
                                                </div>
                                                <div class="col-md-2">
                                                  {multi.unit}
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <ExpenseDialog
                open={open}
                close={() => setOpen(false)}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
              /> */}
              {/* <LabServiceUpdate
                open={updateDialog}
                close={() => setUpdateDialog(false)}
                labid={id}
                setUpdateDialog={setUpdateDialog}
               
                setLabServiceLists={setLabServiceLists}
                labServiceLists={labServiceLists}
              /> */}
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
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

      {/* <!-- ./wrapper --> */}
    </div>
  );
};
export default LabServiceList;
