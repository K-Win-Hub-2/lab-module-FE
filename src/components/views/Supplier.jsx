/* eslint-disable */
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import useCollapse from 'react-collapsed'
import Swal from 'sweetalert2'
import {
  FaCashRegister,
  FaFileMedical,
  FaAngleDown,
  FaAngleUp,
  FaList,
  FaRegUser,
  FaClipboardCheck,
  FaPowerOff
} from 'react-icons/fa'
import apiInstance from '../../utils/api'

function Dashboard() {
  const [isExpanded, setExpanded] = useState(false)
  const [isAccData, setAccData] = useState(false)

  const [updateDialog, setUpdateDialog] = useState(false)
  const [id, setId] = useState('')
  const showUpdate = val => {
    setId(val)
    setUpdateDialog(true)
  }

  const handleAdminChange = () => {
    setExpanded(!isExpanded)
  }

  const handleAccChange = () => {
    setAccData(!isAccData)
  }
  const [supplierList, setSupplierList] = useState([])

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  const AccountTypeCreate = () => {
    const data = {
      name: name,
      code: code,
      description: description
    }
    // alert(JSON.stringify(data));
    console.log(data)
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    apiInstance
      .post(
        'account-type',
        data,
        config
      )
      .then(function (response) {
        // alert("success");
        setAccountType([...accountType, response.data.data])
      })
      .catch(function (err) {
        alert(err.message)
      })
    document.getElementById('description').value = ''
    document.getElementById('name').value = ''
    //      props.setOpen(false);
  }

  const handleDelete = event => {
    apiInstance
      .delete(
        'account-type/' +
        event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = accountType.filter(item => item._id !== event)
        setAccountType(result)
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'CANCEL'
        })
      })
  }
  useEffect(() => {
    const getSupplier = async () => {
      try {
        console.log(VoucherID, "id");
        const res = await apiInstance.get(
          "suppliers"
        );

        setSupplierList(res.data.data);
        console.log(res.data.data);
      } catch (err) { }
    };
    getSupplier();
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
            <h1>Financial Report</h1>
          </div>

          <ul className="navbar-nav ml-auto"></ul>
        </nav>
        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
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
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Account Type List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                  <div className="card">
                    <div className="card-header">
                      {/* <h3 className="card-title">Cost Center List</h3> */}
                    </div>
                    <div className="card-body">
                      <table id="example1" className="table">
                        <thead className="bg-info">
                          <tr>
                            <th>No</th>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>

                            <th>Action</th>
                          </tr>
                        </thead>

                        {supplierList.map((accType, i) => (
                          <tbody className="">
                            <tr>
                              <td>{++i}</td>

                              <td>{accType.name}</td>
                              <td>{accType.description}</td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  onClick={() => showUpdate(accType._id)}
                                  class="btn btn-warning btn-sm ml-2">
                                  Update
                                </button>
                                &nbsp;
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={(e) => handleDelete(accType._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card px-3 py-3 float-left">
                    <h5 className="card-header mb-4 fw-5 text-secondary">
                      Create Acc Types
                    </h5>
                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control border-info"
                        name="balance"
                        id="name"
                        //   ref={(el) => (this.name = el)}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Phone
                      </label>
                      <input
                        type="text"
                        class="form-control border-info"
                        name="balance"
                        id="name"
                        //   ref={(el) => (this.name = el)}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <label for="name" className="text-secondary">
                        Address
                      </label>
                      <input
                        type="text"
                        class="form-control border-info"
                        name="balance"
                        id="name"
                        //   ref={(el) => (this.name = el)}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary form-control text-center fw-5"
                      onClick={AccountTypeCreate}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {/* <AccTypeUpdate
                updateDialog={updateDialog}
                close={() => setUpdateDialog(false)}
                setUpdateDialog={setUpdateDialog}
                id={id}
                setAccountType={setAccountType}
                accountType={accountType}
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
}
export default Dashboard
