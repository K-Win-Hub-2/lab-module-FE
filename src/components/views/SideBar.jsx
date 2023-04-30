import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from '../../redux/authRedux';
import Swal from "sweetalert2";

function Sidebar() {
  const user =  useSelector(state=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () =>{
    Swal.fire({
      title: "Success",
      text: "successfully Logout!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
    dispatch(logoutSuccess())
    navigate('/');
    })
  }
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
              {user.user.role == 'Admin' && <><li className="nav-item has-treeview">
                <a href="#" className="nav-link" id="admin_data">
                  <i style={{ fontSize: "21px" }} className="nav-icon fas">
                    &#xf2bd;
                  </i>
                  <p>
                    Admin
                    {/* <i className="right fas fa-angle-left"></i> */}
                  </p>
                </a>
              </li>
              <li className="ml-3">
                <li className="nav-item">
                  <Link to="/lab-cat" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Category</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lab-test" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Lab Test</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/package" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Package</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reagent" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Reagent</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/doctorClinic" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Doctor/Clinic</p>
                  </Link>
                </li>
              </li></>}

              {/* Patient */}
              {user.user.role == 'Sales' && <><li className="nav-item has-treeview">
                <a href="#" className="nav-link" id="admin_data">
                  <i
                    className="nav-icon fas fa-poll"
                    style={{ fontSize: "22px" }}></i>
                  <p>
                    Sales
                    {/* <i className="right fas fa-angle-left"></i> */}
                  </p>
                </a>
              </li>
              <li className="ml-3">
                
                <li className="nav-item">
                  <Link to="/patient/list" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Patient List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lab-cat" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Category</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lab-test" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Lab Test</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/package" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Package</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tvoucherList" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Voucher</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tvoucherList" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Test Voucher List</p>
                  </Link>
                </li>
              </li></>}

              {user.user.role == 'Laboratory' && <><li className="nav-item">
                <Link to="/account_list" className="nav-link">
                  <i
                    className="nav-icon fas fa-flask"
                    style={{ fontSize: "20px" }}></i>
                  <p>Laboratory</p>
                </Link>
              </li>
              <li className="ml-3">
                <li className="nav-item">
                  <Link to="/tresultList" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Results</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tresultList" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Test Result List</p>
                  </Link>
                </li>
              </li></>}

              {user.user.role == 'Finance' && <><li className="nav-item has-treeview">
                <a href="#" className="nav-link" id="master_data">
                  <i style={{ fontSize: "21px" }} className="nav-icon far">
                    &#xf15c;
                  </i>
                  &nbsp;
                  <p>Finance</p>
                </a>
              </li>
              <li className="ml-3">
                <li className="nav-item">
                  <Link to="/tvoucherList" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Voucher</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profit_loss" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Profit & Loss</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/balance_sheet" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Income</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/trail_bal" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>&nbsp;
                    <p>Expense</p>
                  </Link>
                </li>
              </li></>}

              <li className="nav-item">
                <a  className="nav-link" onClick={logout}>
                  <i className="nav-icon fas fa-power-off"></i>
                  <span className="ml-2">Logout</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="nav-icon fas fa-power-off"></i>
                  <span className="ml-2">LogIn</span>
                </Link>
              </li> */}
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