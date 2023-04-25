import React from "react";
import { Link } from "react-router-dom";
import { FaCashRegister } from "react-icons/fa";

function Sidebar()
{
  return (
    <div>
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
        <h4 className="brand-text font-weight-light ml-4 mt-2">
          Central Clinic
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
                    <p>Lab Test List</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Voucher Register</p>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/reagent" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Reagent List & Register </p>
                  </Link>
                </li>
              </li>

              {/* Patient */}
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link" id="admin_data">
                  <i className="nav-icon fas fa-user-injured"></i>
                  <p>
                    Patient
                    {/* <i className="right fas fa-angle-left"></i> */}
                  </p>
                </a>
              </li>
              <li className="ml-3">
                <li className="nav-item">
                  <Link to="/patient/register" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Patient Register</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/patient/list" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Patient List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/patient/credit_list" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Patient Credit</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/patient/member" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Member List </p>
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
                  <Link to="/doctorClinic" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Doctor/Clinic Register</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lab-cat" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Category Register </p>
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link to="/test" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Test Result List</p>
                  </Link>
                </li> */}

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

              {/* <li className="nav-item">
                <Link
                  to="http://clinicdenovopos.kwintechnologies.com/"
                  className="nav-link">
                  <FaCashRegister />
                  <span className="ml-2">POS</span>
                </Link>
              </li> */}

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
    </div>
  );
}
export default Sidebar;