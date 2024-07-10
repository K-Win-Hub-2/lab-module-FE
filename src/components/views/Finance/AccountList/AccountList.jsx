/* eslint-disable */
import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaCashRegister, FaFileMedical, FaFileExcel } from 'react-icons/fa'

import SideBar from '../../SideBar'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '../../../../features/accountListSlice'
import CreateAccList from '../../../views/Finance/AccountList/CreateAccList'
// import AccListUpdate from "../../../views/Finance/AccountList/AccListUpdate";
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { Link } from 'react-router-dom'
import { calendar } from '../../../../assets/plugins/moment/src/lib/moment/calendar'
import apiInstance from '../../../../utils/api'

function AccountList() {
  const [accountLists, setAccountLists] = useState([])
  const [filteredLists, setFilteredLists] = useState([])
  const [open, setOpen] = useState(false)

  const showDialog = () => setOpen(true)
  //const accountList = useSelector((state)=>state.accountName);
  // const dispatch = useDispatch();

  const handleDelete = val => {
    const getDELETE = async () => {
      console.log('ehre==')

      const res = await apiInstance
        .delete(
          'accounting-list/' +
          val
        )
        .then(response => {
          Swal.fire({
            title: 'Success',
            text: 'Successfully Deleted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          setAccountLists(accountLists.filter(item => item._id !== val))
        })

        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
    getDELETE()
  }
  const _export = React.useRef(null)
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save()
    }
  }
  const [updateDialog, setUpdateDialog] = useState(false)
  const [id, setId] = useState('')
  const showUpdate = val => {
    setId(val)
    setUpdateDialog(true)
  }

  // const handleAdminChange = () =>
  // {
  //   setExpanded(!isExpanded);
  // }

  //   const handleAccChange = () => {
  //     setAccData(!isAccData);
  //   };

  const handleInputChange = (event) => {
    setFilteredLists(accountLists.filter(account => account.name.includes(event.target.value) || account.relatedSubHeader.name.includes(event.target.value)))
  }

  useEffect(() => {
    const getAccountLists = async () => {
      try {
        const res = await apiInstance.get(
          'accounting-lists'

        )

        setAccountLists(res.data.list)
        setFilteredLists(res.data.list)
        // dispatch(setList("success"));
        //  console.log(accountList);
      } catch (err) { }
    }
    getAccountLists()
  }, [])

  return (
    <>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Main Sidebar Container --> */}
        <SideBar />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row '>
                <div className='col-sm-12'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <a href='/'>Home</a>
                    </li>
                    <li className='breadcrumb-item active'>Account List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class='content'>
            <div class='container-fluid'>
              {/* <!-- Small boxes (Stat box) --> */}

              <div class='row'>
                <div class='col-12'>
                  <div class='offset-9 col-3' style={{ marginBottom: "5px" }}>
                    <input
                      type="search"
                      className="form-control rounded"
                      id="search_code"
                      placeholder="Search By Account Name"
                      onChange={event =>
                        handleInputChange(
                          event
                        )
                      }
                    />
                  </div>
                  <div class='card'>
                    <div class='card-header'>
                      {/* <h3 class="card-title">Account List</h3> */}
                      <div className='row justify-content-between py-4'>



                        <div>

                          <span className='float-right'>

                            <button
                              type='button'
                              id=''
                              className='btn btn-sm btn-primary'
                              data-toggle='modal'
                              data-target='#new_account'
                              onClick={showDialog}
                            >
                              <i class='fa fa-plus'></i> Create Acc
                            </button>{' '}
                            &nbsp;
                            <button
                              type='button'
                              className='btn btn-sm btn-success'
                              data-toggle='modal'
                              data-target='#new_account'
                              onClick={excelExport}
                            >




                              <FaFileExcel />
                              &nbsp; Export
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class='card-body'>
                      {/* Export data in Excel */}
                      <ExcelExport data={accountLists} ref={_export}>
                        <ExcelExportColumn
                          field=''
                          title='No'
                          locked={true}
                          width={30}
                        />
                        <ExcelExportColumn
                          field='code'
                          title='Code'
                          width={100}
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          CellOptions={{
                            textAlign: 'center'
                          }}
                        />
                        <ExcelExportColumn
                          field='name'
                          title='Sub Heading'
                          width={250}
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          CellOptions={{
                            textAlign: 'center'
                          }}
                        />
                        <ExcelExportColumn
                          field='relatedType.name'
                          title='Type'
                          width={150}
                        />
                        <ExcelExportColumn
                          field='relatedHeader.name'
                          title='Header'
                          width={150}
                        />
                        <ExcelExportColumn
                          field='amount'
                          title='Balance'
                          width={100}
                          className='text-center'
                        />
                        <ExcelExportColumn
                          field='relatedCurrency'
                          title='Currency'
                          width={100}
                        />
                      </ExcelExport>
                      {/* Export Data in Excel end */}
                      <table id='example1' class='table'>
                        <thead class=' bg-info'>
                          <tr>
                            <th>No</th>
                            <th>Code</th>

                            <th>Type</th>
                            <th>Header</th>
                            <th>SubHeader</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Currency</th>
                            {/* <th>Flag</th>
                            <th>Forward</th> */}
                            <th className='text-center'>Action</th>
                          </tr>
                        </thead>
                        <tbody className=''>
                          {filteredLists.map((accountList, i) => (
                            <tr key={accountList._id}>
                              <td>{++i}</td>
                              <td>{accountList.code}</td>

                              <td>{accountList.relatedType.name}</td>
                              <td>
                                {accountList.relatedHeader
                                  ? accountList.relatedHeader.name
                                  : ''}
                              </td>
                              <td>
                                {accountList.relatedSubHeader
                                  ? accountList.relatedSubHeader.name
                                  : ''}
                              </td>
                              <td>{accountList.name}</td>
                              <td>{accountList.amount}</td>
                              <td>{accountList.relatedCurrency}</td>
                              {/* <td>{accountList.generalFlag ? 'Yes' : 'No'}</td>
                              <td>{accountList.carryForWork ? 'Yes' : 'No'}</td> */}
                              <td>
                                <div className='row'>
                                  <div className='col-md-4'>
                                    <Link
                                      to={'/accUpdate/' + accountList._id}
                                      className='btn btn-warning btn-sm'
                                    >
                                      Update
                                    </Link>
                                  </div>

                                  <div className='offset-1 col-md-4 ml-4'>
                                    <button
                                      onClick={() =>
                                        handleDelete(accountList._id)
                                      }
                                      class='btn btn-danger btn-sm '
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <CreateAccList
                open={open}
                close={() => setOpen(false)}
                setOpen={setOpen}
                setAccountLists={setAccountLists}
                accountLists={accountLists}
              />
              {/* 
              <AccListUpdate
                updateDialog={updateDialog}
                close={() => setUpdateDialog(false)}
                setUpdateDialog={setUpdateDialog}
                id={id}
                setAccountLists={setAccountLists}
                accountLists={accountLists}
              /> */}

              {/* <!-- /.row (main row) --> */}
            </div>
          </section>
          {/* <!-- /.content --> */}
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
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}
    </>
  )
}
export default AccountList
