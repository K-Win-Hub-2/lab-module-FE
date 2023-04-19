import React, { useState } from "react";
// import ExpenseDialog from "../views/ExpenseDialog";
import { useEffect } from "react";
import axios from "axios";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { ExcelExportColumn } from "@progress/kendo-react-excel-export";
import { Link } from 'react-router-dom';
import { FaCashRegister } from "react-icons/fa";

const LabServiceList = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [expenseLists, setExpenseLists] = useState([]);

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
    // const getExpenseLists = async () => {
     
    //     const res = await axios.get(
    //       "http://clinicdenovobackend.kwintechnologies.com:3000/api/expenses"
    //     );

    //     setExpenseLists(res.data.list);
   
    // };
    // getExpenseLists();
  }, []);
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        {/* <!-- Navbar --> */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* <!-- Left navbar links --> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#">
                <i className="fas fa-bars"></i>
              </a>
            </li>
          </ul>
          <div className="title">
            <h1>Lab Module </h1>
          </div>

          {/* {{-- <h1 style="font-family:nunito" classNameName="text-center font-weight-bold font-italic text-info ml-auto">Inventory Management</h1> --}} */}
          <div className="user-panel d-flex offset-sm-10">
            {/* <div className="image">
        <img src="/assets/img/user1-128x128.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div> */}
            {/* @if(session()->get('user')->hasRole('Project Manager'))
            <div classNameName="info">
            <a href="#" classNameName="d-block">{{ session()->get('user')->name }}</a>
            </div>
        </div>

        @endif */}
          </div>
          {/* <!-- end youtube test -->
    <!-- Right navbar links --> */}
          <ul className="navbar-nav ml-auto"></ul>
        </nav>
        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
        <aside className="main-sidebar  elevation-4">
          {/* <!-- Brand Logo --> */}
          {/* {{-- <a href="index3.html" classNameName="brand-link">
      <img src="{{asset('image/logo.jpg')}}" alt="K-win Technology" classNameName="brand-image img-circle"
           style="opacity: .8;margin-top:10px;">
        </a> --}} */}
          <h4 className="brand-text font-weight-light text-center mt-2">
            K-Win Technology
          </h4>

          {/* 
    <!-- Sidebar --> */}
          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav sidebar-nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false">
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link" id="admin_data">
                    <i className="nav-icon fas fa-user-alt"></i>
                    <p>
                      Admin
                      {/* <i className="right fas fa-angle-left"></i> */}
                    </p>
                  </a>
                </li>
                <li className="ml-3">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Lab Service Register</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/expense" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Lab Service List</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Voucher Register</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/expense" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Lab Service List</p>
                    </Link>
                  </li>
                </li>

                <li className="nav-item">
                  <Link to="/account_list" className="nav-link">
                    <i className="nav-icon far fa-address-card"></i>
                    <p>Master Data</p>
                  </Link>
                </li>
                <li className="ml-3">
                  <li className="nav-item">
                    <Link to="/acc_type" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Doctor/Clinic Register</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/head" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Category Register </p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <a href="/subHead" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Sub Heading Type</p>
                    </a>
                  </li> */}
                </li>

                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link" id="master_data">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Report
                      {/* <i className="right fas fa-angle-left"></i> */}
                    </p>
                  </a>
                </li>
                <li className="ml-3">
                  <li className="nav-item">
                    <Link to="/profit_loss" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Profit & Loss</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/balance_sheet" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Balance Sheet</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trail_bal" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>Trail Balance</p>
                    </Link>
                  </li>
                </li>

                <li className="nav-item">
                  <Link
                    to="http://clinicdenovopos.kwintechnologies.com/"
                    className="nav-link">
                    <FaCashRegister />
                    <span className="ml-2">POS</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <a href="" className="nav-link">
                    <i className="nav-icon fas fa-power-off"></i>
                    <span className="ml-2">Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
            {/* <!-- /.sidebar-menu --> */}
          </div>
          {/* <!-- /.sidebar --> */}
        </aside>

        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
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
                  <div className="row">
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
                        style={{ marginTop: "38px" }}
                        onclick="date_filter()">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="offset-md-1 col-md-5">
                  <div className="input-group" style={{ marginTop: "35px" }}>
                    <input
                      type="search"
                      className="form-control rounded"
                      id="search_code"
                      placeholder="Enter Account Code"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{ height: "0.97cm", marginTop: "0.2cm" }}
                      onclick="acc_code_search()">
                      search
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div class="card">
                    <div class="card-header">
                      <div class="row justify-content-between">
                        <label class="">
                          Expense Transaction List
                          <span class="float-right">
                            {" "}
                            <button
                              type="button"
                              data-toggle="modal"
                              data-target="#add_incomes"
                              class="btn btn-primary"
                              onclick="hide_bank_acc()"
                              onClick={showDialog}>
                              <i class="fas fa-plus"></i> Add Expense
                            </button>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={excelExport}>
                              Export Excel
                            </button>
                          </span>
                        </label>
                      </div>
                      <div class="row" id="trial_balance"></div>
                    </div>

                    <div class="card-body">
                      {/* Export data in Excel */}
                      <ExcelExport data={expenseLists} ref={_export}>
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
                      </ExcelExport>
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
                                  <th class="text-center">Code</th>
                                  {/* <th class="text-center">Bank / Cash Account</th>  */}
                                  <th class="text-center">Name</th>

                                  <th class="text-center">Category</th>
                                  {/* <th class="text-center">Voucher No</th> */}
                                  <th class="text-center">Refer Doctor</th>
                                  <th class="text-center">Charges</th>
                                </tr>
                              </thead>

                              <tbody className="text-center">
                                  <tr>
                                    <td>LS-001</td>
                                    <td>testName</td>
                                    {/* <td>
                                      {incomeList.relatedBankAccount
                                        ? incomeList.relatedBankAccount.name
                                        : incomeList.relatedCashAccount.name}
                                    </td> */}
                                    <td>
                                      testCategory
                                    </td>
                                    {/* <td>
                                      {
                                        expenseList.relatedAccounting
                                          .accountingTypes
                                      }
                                    </td> */}

                                    <td>Dr. Soe Min Oo</td>

                                    <td>200,000</td>

                                    <td className="text-center">
                                      <a
                                        className="btn btn-primary btn-sm "
                                        data-toggle="collapse"
                                        href="#related{{$trans->id}}"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="multiCollapseExample1">
                                        Related
                                      </a>
                                    </td>
                                  </tr>
                              </tbody>
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
            </div>{" "}
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
