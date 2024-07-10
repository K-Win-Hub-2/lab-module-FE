import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutSuccess } from '../../redux/authRedux'
import Swal from 'sweetalert2'
import Win from '../../assets/img/win.png'
function Sidebar() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    Swal.fire({
      title: 'Success',
      text: 'successfully Logout!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    }).then(function () {
      dispatch(logoutSuccess())
      navigate('/')
    })
  }
  return (
    <div className=''>
      {/* <!-- Navbar --> */}
      <nav className='main-header navbar navbar-expand navbar-white navbar-light re'>
        {/* <!-- Left navbar links --> */}
        <ul className='navbar-nav'>
          <li className='nav-item'>
            {/* <a className='nav-link' data-widget='pushmenu' href='#'>
              <i className='fas fa-bars'></i>
            </a> */}
          </li>
        </ul>
        <div className='title text-center'>
          <h1 >Lab Module </h1>
        </div>

        {/* {{-- <h1 style="font-family:nunito" classNameName="text-center font-weight-bold font-italic text-info ml-auto">Inventory Management</h1> --}} */}

        {/* <!-- end youtube test -->
    <!-- Right navbar links --> */}
        <ul className='navbar-nav ml-auto'></ul>
      </nav>
      {/* <!-- /.navbar --> */}

      {/* <!-- Main Sidebar Container --> */}
      <aside className='main-sidebar  elevation-4'>

        <img src={Win} alt='' width='200px' />

        {/* 
    <!-- Sidebar --> */}
        <div className='sidebar'>
          <nav className='mt-2'>
            <ul
              className='nav sidebar-nav nav-pills nav-sidebar flex-column'
              data-widget='treeview'
              role='menu'
              data-accordion='false'
            >
              {user.user.role === 'Admin' && (
                <>
                  <li className='nav-item has-treeview'>
                    <a href='#' className='nav-link' id='admin_data'>
                      <i style={{ fontSize: '21px' }} className='nav-icon fas'>
                        &#xf2bd;
                      </i>
                      <p>
                        Admin
                        {/* <i className="right fas fa-angle-left"></i> */}
                      </p>
                    </a>
                  </li>
                  <li className='ml-3'>
                    <li className='nav-item'>
                      <Link to='/lab-cat' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Category</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/lab-test' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Lab Test</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/package' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Package</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/reagent' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Reagent</p>
                      </Link>
                    </li>
                    {/*                     
                    <li className='nav-item'>
                      <Link to='/supplier' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Supplier</p>
                      </Link>
                    </li> */}
                    <li className='nav-item'>
                      <Link to='/doctorClinic' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Doctor/Clinic</p>
                      </Link>
                    </li>
                  </li>
                </>
              )}

              {/* Patient */}
              {user.user.role === 'Sales' && (
                <>
                  <li className='nav-item has-treeview'>
                    <a href='#' className='nav-link' id='admin_data'>
                      <i
                        className='nav-icon fas fa-poll'
                        style={{ fontSize: '22px' }}
                      ></i>
                      <p>
                        Sales
                        {/* <i className="right fas fa-angle-left"></i> */}
                      </p>
                    </a>
                  </li>

                  <li className='ml-3'>
                    <li className='nav-item'>
                      <Link to='/income' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Income</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/expense' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Expense</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/doctorClinic' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Doctor/Clinic</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/patient/list' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Patient List</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/lab-cat' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Category</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/lab-test' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Lab Test</p>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link to='/package' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Package</p>
                      </Link>
                    </li>
                    {/* <li className='nav-item'>
                      <Link to='/tvoucherList' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Voucher</p>
                      </Link>
                    </li> */}
                    <li className='nav-item'>
                      <Link to='/tvoucherList' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Test Voucher List</p>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link to='/ftvl' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Cashier Report</p>
                      </Link>
                    </li>
                  </li>
                </>
              )}

              {user.user.role === 'Laboratory' && (
                <>
                  <li className='nav-item'>
                    <Link to='/account_list' className='nav-link'>
                      <i
                        className='nav-icon fas fa-flask'
                        style={{ fontSize: '20px' }}
                      ></i>
                      <p>Laboratory</p>
                    </Link>
                  </li>
                  <li className='ml-3'>
                    <li className='nav-item'>
                      <Link to='/lab-test' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Lab Test List</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/tresultList' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Test Result List</p>
                      </Link>
                    </li>
                  </li>
                </>
              )}

              {user.user.role === 'Finance' && (
                <>
                  <li className='nav-item has-treeview'>
                    <a href='#' className='nav-link' id='master_data'>
                      <i style={{ fontSize: '21px' }} className='nav-icon far'>
                        &#xf15c;
                      </i>
                      &nbsp;
                      <p>Finance</p>
                    </a>
                  </li>
                  <li className='ml-3'>
                    {/* <li className='nav-item'>
                      <Link to='/tvoucherList' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Voucher</p>
                      </Link>
                    </li> */}
                    <li className='nav-item'>
                      <Link to='/trial-balance' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Trial Balance</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/account_list' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Account Lists</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/account_type' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Type</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/account_head' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Heading</p>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link to='/account_subhead' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Sub Heading</p>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link to='/fix-ass' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Fixed Asset</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/income' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Income</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/expense' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Expense</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/bank' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Bank</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/transfer' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Transfer Lists</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/transaction' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Transaction Lists</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/journal' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Journal Entry</p>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link to='/balance_sheet' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Balance Sheet</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/profit_loss_statement' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Income Statement</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/profit_loss_statement' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Profit & Loss</p>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/ftvl' className='nav-link'>
                        <i className='nav-icon fas fa-circle'></i>&nbsp;
                        <p>Cashier Report</p>
                      </Link>
                    </li>
                  </li>
                </>
              )}

              <li className='nav-item'>
                <a className='nav-link' onClick={logout}>
                  <i className='nav-icon fas fa-power-off'></i>
                  <span className='ml-2'>Logout</span>
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
  )
}
export default Sidebar
