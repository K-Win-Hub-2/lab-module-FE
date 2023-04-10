import React from "react";
import { createDate } from "../../assets/plugins/moment/src/lib/create/date-from-array";
import { Link } from 'react-router-dom';
import { FaCashRegister } from "react-icons/fa";
function LabServiceRegister() {
  return (
    <div classNameName="App">
      {/* <!-- preloader --> */}
      {/* <!-- <div classNameName="preloader" id="preloaders" style="  position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('../../image/loader2.gif') 50%50% no-repeat rgb(249, 249, 249);
    opacity: 0.9;"></div> -->

 */}

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
            {/* <li className="">  Company General Infomation </li> */}
          </ul>
          <div className="title justify-content-center" >
            <h1>LabModule</h1>
          </div>

          {/* <!-- Youtube --> */}
          {/* <!-- <div classNameName="wrapper1">
      <span>i</span>
      <span>n</span>
      <span>v</span>
      <span>e</span>
      <span>n</span>
      <span>t</span>
      <span>o</span>
      <span>r</span>
      <span>y</span>
      <span>m</span>
      <span>a</span>
      <span>n</span>
      <span>a</span>
      <span>g</span>
      <span>e</span>
      <span>m</span>
      <span>e</span>
      <span>n</span>
      <span>t</span>
    </div> --> */}
          {/* {{-- <h1 style="font-family:nunito" classNameName="text-center font-weight-bold font-italic text-info ml-auto">Inventory Management</h1> --}} */}
          <div className="user-panel d-flex offset-sm-10">
            <div className="image">
              <img
                src="/assets/img/user1-128x128.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
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
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      {" "}
                      Lab Service Register{" "}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}
              <div class="card">
                <div class="card-body p-b-0">
                  <h3 className="text-success text-center">
                    Lab Service Register
                  </h3>
                  {/* @if($com == null) */}
                  <form
                    action="{{route('store_company')}}"
                    method="POST"
                    className="mt-5">
                    {/* @csrf */}
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_address"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="company_contact"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Lead Time
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="company_email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Category</label>

                            <select
                              name="currency"
                              id=""
                              className="form-control mt-1"
                              onchange="convert(this.value)">
                              <option value="">Choose Category</option>
                              <option></option>

                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Charges
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="capital"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Cost
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="md_name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Refer Doctor</label>

                            <select
                              name="currency"
                              id=""
                              className="form-control mt-1"
                              onchange="convert(this.value)">
                              <option value="">Choose Doctor</option>
                              <option></option>

                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label className="control-label">Add Reagent</label>
                          <select
                            name="currency"
                            id=""
                            className="form-control mt-1"
                            onchange="convert(this.value)">
                            <option value="">Choose Reagent</option>
                            <option></option>

                          </select>
                        </div>
                      </div>
                      <br></br>
                      <div className="form-actions">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className=" col-md-9">
                                <button
                                  type="submit"
                                  className="btn btn-primary">
                                  Create
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-dismiss="modal">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* @else */}
                  {/* <form action="{{route('update_company')}}" method="POST" className="mt-5">
                        {/* @csrf */}
                  {/* <div className="form-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Company Name</label>
                                    <input type="text" className="form-control" name="company_name" value="{{$com->company_name}}"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Company Address</label>
                                    <input type="text" className="form-control" name="company_address" value="{{$com->company_address}}"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Company Contact</label>
                                    <input type="text" className="form-control" placeholder="" name="company_contact" value="{{$com->company_contact}}"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Company Email</label>
                                    <input type="text" className="form-control" placeholder="" name="company_email" value="{{$com->company_email}}"/>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Company MD Name</label>
                                    <input type="text" className="form-control" placeholder="" name="md_name" value="{{$com->company_md_name}}"/>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Starting Capital</label>
                                    <input type="text" className="form-control" placeholder="" name="capital" value="{{$com->starting_capital}}"/>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Financial Year Start Date</label>
                                    <input type="date" className="form-control" placeholder="" name="start_date" id="mdate" value="{{$com->financial_start_date}}"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Financial Year End Date</label>
                                    <input type="date" className="form-control" placeholder="" name="end_date" id="mdate" value="{{$com->financial_end_date}}"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Net Profit for Previous Year</label>
                                    <input type="text" className="form-control" placeholder="" name="pre_year" id="mdate" value="{{$com->netprofit_pre_year}}"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Net Profit for Current Year</label>
                                    <input type="text" className="form-control" placeholder="" name="curr_year" id="mdate" value="{{$com->netprofit_current_year}}"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className=" col-md-9">
                                            <button type="submit" className="btn btn-primary">Update</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div> */}
                  {/* </form>  */}
                  {/* @endif */}
                </div>
              </div>

              {/* <!-- /.row (main row) --> */}
            </div>{" "}
            {/*<!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
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
        <aside className="control-sidebar control-sidebar-dark">
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
        {/* <!-- /.control-sidebar --> */}
      </div>
      {/* <!-- ./wrapper --> */}
      {/* <!-- jQuery --> */}
      <script src="{{asset('plugins/jquery/jquery.min.js')}}"></script>
      {/* <!-- jQuery UI 1.11.4 --> */}
      <script src="{{asset('plugins/jquery-ui/jquery-ui.min.js')}}"></script>
      {/* <!-- Select2 --> */}

      {/* <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->*/}
      <script>$.widget.bridge('uibutton', $.ui.button)</script>
      {/* <!-- Bootstrap 4 --> */}
      <script src="{{asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
      {/* <!-- ChartJS --> */}
      <script src="{{asset('plugins/chart.js/Chart.min.js')}}"></script>
      {/* <!-- Sparkline --> */}
      <script src="{{asset('plugins/sparklines/sparkline.js')}}"></script>
      {/* <!-- jQuery Knob Chart --> */}
      <script src="{{asset('plugins/jquery-knob/jquery.knob.min.js')}}"></script>
      {/* <!-- daterangepicker --> */}
      <script src="{{asset('plugins/moment/moment.min.js')}}"></script>
      <script src="{{asset('plugins/daterangepicker/daterangepicker.js')}}"></script>

      {/* <!-- Tempusdominus Bootstrap 4 --> */}
      <script src="{{asset('plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
      {/* <!-- Summernote --> */}
      <script src="{{asset('plugins/summernote/summernote-bs4.min.js')}}"></script>
      {/* <!-- overlayScrollbars --> */}
      <script src="{{asset('plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
      {/* <!-- AdminLTE App --> */}
      <script src="{{asset('dist/js/adminlte.js')}}"></script>
      {/* <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="{{asset('dist/js/pages/dashboard.js')}}"></script> -->
<!-- AdminLTE for demo purposes --> */}
      <script src="{{asset('dist/js/demo.js')}}"></script>
      {/* <!-- Bootstrap 4 -->
<!-- DataTable -->
{{-- <script src="{{asset('assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js')}}"></script>

<script src="{{asset('assets/plugins/bootstrap-datepicker/bootstrap-datetimepicker.min.js')}}"></script>
<script src="{{asset('assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js')}}"></script>

<script src="{{asset('assets/plugins/datatables/jquery.dataTables.min.js')}}"></script> --}} */}

      <script src="{{asset('plugins/datatables/jquery.dataTables.js')}}"></script>
      <script src="{{asset('plugins/datatables/dataTables.bootstrap')}}"></script>
      <script src="{{asset('plugins/datatables-bs4/js/dataTables.bootstrap4.js')}}"></script>
      <script src="{{asset('plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js')}}"></script>

      {/* @yield('js')
<script>

// $(window).on('load', function(){
//                 $("#preloaders").fadeOut(100);
//             });
//             $(document).ajaxStart(function(){
//                 $("#preloaders").show();
//             });
//             $(document).ajaxComplete(function(){
//                 $("#preloaders").hide();
//             });
// $( document ).ready(function() {
//     // window.location.reload();
// });

</script> */}
    </div>
  );
}
export default LabServiceRegister;
