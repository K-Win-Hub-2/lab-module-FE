/* eslint-disable */
import { PaginationControl } from "react-bootstrap-pagination-control";
import React, { useState } from "react";
// import ExpenseDialog from "../views/ExpenseDialog";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { FaCashRegister, FaFileMedical, FaFileExcel, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import Swal from "sweetalert2";
import LabServiceUpdate from "../views/LabServiceUpdate";
import apiInstance from "../../utils/api";

const LabServiceList = () => {
  const [open, setOpen] = useState(false);
  const [labServiceLists, setLabServiceLists] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [multiTestLists, setMultiTestLists] = useState([]);
  const [id, setId] = useState('');
  const [testName, setTestName] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = React.useState("");
  const [dataCount, setDataCount] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const paginationItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredList.slice(start, end);
  }, [page, filteredList]);

  const handleInputChange = (event) => {
    const searchData = labServiceLists.filter(test => test.name.includes(event.target.value))
    setFilteredList(searchData)
    setDataCount(
      searchData.length
    );
    setPages(
      searchData.length %
        rowsPerPage ===
        0
        ? searchData.length /
        rowsPerPage
        : Math.floor(
          searchData.length /
          rowsPerPage
        ) + 1
    );
  }

  const handleDelete = (event) => {
    console.log(event, "event");
    apiInstance
      .delete(
        "service/" +
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
      const res = await apiInstance.get(
        "services?limit=30"
      );

      setLabServiceLists(res.data.data);
      setFilteredList(res.data.data);
      setDataCount(
        res.data.data.length
      );
      setPages(
        res.data.data.length %
          rowsPerPage ===
          0
          ? res.data.data.length /
          rowsPerPage
          : Math.floor(
            res.data.data.length /
            rowsPerPage
          ) + 1
      );
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
                  <div className="input-group" style={{ marginTop: "35px", marginBottom: "10px" }}>
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
                          <span className='mt-5'>Total {filteredList?.length} List</span>
                          <span class="float-right">
                            <Link to="/lab-register" className='regbtn'>
                              <i class="fas fa-plus"></i> &nbsp;Lab Test
                              Register
                            </Link>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}

                            <button
                              type="button"
                              className="btn btn-success mb-2"
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
                              <thead className="headtable text-white">
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

                              {paginationItems.map((labService, i) => (
                                <tbody className="">
                                  <tr>
                                    <td>{++i}</td>
                                    <td>
                                      {labService.code ? labService.code : ""}
                                    </td>

                                    <td>
                                      {labService.name ? labService.name : ""}
                                    </td>

                                    <td>{labService.relatedCategory ? labService.relatedCategory.name : ''}</td>

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
                                    <td className='d-flex justify-content-between'>
                                      <Link to={"/lab-test/" + labService._id}>
                                        <a
                                          className="btn btn-sm btn-warning text-white"
                                          role="button">
                                          <FaRegEdit />
                                        </a>
                                      </Link>
                                      &nbsp;
                                      <button
                                        className="btn btn-sm btn-danger text-white"

                                        onClick={(e) =>
                                          handleDelete(labService._id)
                                        }>
                                        <FaRegTrashAlt />
                                      </button>
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
                          <div className='mt-4'>
                            <PaginationControl
                              page={page}
                              between={4}
                              total={dataCount}
                              limit={50}
                              changePage={(page) => {
                                setPage(page);
                              }}
                              ellipsis={1}
                            />
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
