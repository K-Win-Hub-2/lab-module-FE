/* eslint-disable */
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import Swal from 'sweetalert2'

import {
  FaCashRegister,
  FaFileMedical,
  FaPenSquare,
  FaRegEdit,
  FaFileExcel,
  FaRegTrashAlt
} from 'react-icons/fa'

const LabServiceList = () => {
  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)
  const [doctorLists, setDoctorLists] = useState([])

  const handleDelete = event => {
    console.log(event, 'event')
    axios
      .delete(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor/' +
          event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = doctorLists.filter(item => item._id !== event)
        setDoctorLists(result)
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

  const showDialog = () => setOpen(true)
  const _export = React.useRef(null)
  const excelExport = () => {
    if (_export.current !== null) {
      console.log(_export.current.props.data)
      _export.current.props.data.map(function (element, index) {
        element.date = element.date.split('T')[0]
      })
      _export.current.save()
    }
  }
  useEffect(() => {
    const getDoctorLists = async () => {
      const res = await axios.get(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctors?limit=30'
      )

      setDoctorLists(res.data.data)
    }
    getDoctorLists()
  }, [])
  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-12'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <a href='/lab-test'>Home</a>
                    </li>
                    <li className='breadcrumb-item active'>
                      Doctor-Clinic List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                {/* <div className="col-md-6">
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
                        style={{ marginTop: "32px" }}
                        onclick="date_filter()">
                        Search
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className='col-md-4 '>
                  <div className='input-group' style={{ marginTop: '35px' }}>
                    <input
                      type='search'
                      className='form-control rounded'
                      id='search_code'
                      placeholder='Enter Account Code'
                    />
                    &nbsp;
                    <button
                      type='button'
                      className='btn btn-outline-primary ml-2'
                      style={{ height: '0.97cm', marginTop: '0.1em' }}
                      onclick='acc_code_search()'
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-12'>
                  <div class='card'>
                    <div class='card-header'>
                      <div class='row justify-content-between py-3'>
                        <label class=''>
                          <span class='float-right'>
                            <Link to='/doctorClinicReg' class='btn btn-primary'>
                              <i class='fas fa-plus'></i> &nbsp;Doctor/Clinic
                              Register
                            </Link>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}
                            <button
                              type='button'
                              className='btn btn-success'
                              onClick={excelExport}
                            >
                              <FaFileExcel />
                              &nbsp;Export
                            </button>
                          </span>
                        </label>
                      </div>
                      <div class='row' id='trial_balance'></div>
                    </div>

                    <div class='card-body'>
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
                      <div class='row'>
                        <div class='col-md-12'>
                          <div
                            class='table-responsive text-black'
                            id='slimtest2'
                          >
                            <table class='table table-hover' id='filter_date'>
                              <thead class='bg-info text-white'>
                                <tr>
                                  <th>#</th>

                                  {/* <th>Bank / Cash Account</th>  */}
                                  <th>Name</th>

                                  <th>Selection</th>

                                  <th>Education</th>
                                  <th>Position</th>
                                  <th className='text-center'>Action</th>
                                </tr>
                              </thead>

                              {doctorLists.map((doctor, i) => (
                                <tbody className=''>
                                  <tr>
                                    <td>{++i}</td>

                                    <td>{doctor.name ? doctor.name : ''}</td>

                                    <td>
                                      {doctor.selection ? doctor.selection : ''}
                                    </td>
                                    <td>
                                      {doctor.education ? doctor.education : ''}
                                    </td>
                                    <td>
                                      {doctor.position ? doctor.position : ''}
                                    </td>

                                    <td className='text-center d-flex justify-content-between'>
                                      <button className='btn btn-sm btn-info'>
                                        <Link
                                          to={'/refDoctor/' + doctor._id}
                                          className='btn btn-sm btn-info'
                                        >
                                          Commission
                                        </Link>
                                      </button>
                                      &nbsp;
                                      <button className='btn bt-sm btn-warning text-light'>
                                        <FaRegEdit />
                                      </button>
                                      &nbsp;
                                      <button
                                        className='btn bt-sm btn-danger'
                                        onClick={e => handleDelete(doctor._id)}
                                      >
                                        <FaRegTrashAlt />
                                      </button>
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
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className='main-footer'>
        <strong>
          Copyright &copy; 2017-2020{' '}
          <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside classNameName='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default LabServiceList
