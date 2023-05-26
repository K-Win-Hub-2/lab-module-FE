/* eslint-disable */
import React, { useState } from 'react'
import JEDialog from '../Journal-Entry/JEDialog'
import axios from 'axios'
import { useEffect } from 'react'
import SideBar from '../../SideBar'
import Swal from 'sweetalert2'

import { ExcelExport } from '@progress/kendo-react-excel-export'
import { ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { Link } from 'react-router-dom'

import useCollapse from 'react-collapsed'
import {
  FaCashRegister,
  FaFileMedical,
  FaFileExcel,
  FaAngleDown,
  FaAngleUp,
  FaList,
  FaRegUser,
  FaClipboardCheck,
  FaPowerOff,
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa'

const Income = () => {
  const [isExpanded, setExpanded] = useState(false)
  const [isAccData, setAccData] = useState(false)
  const [relatedLists, setRelatedLists] = useState([])
  const [isShow, setIsShow] = useState(false)

  const { getCollapseProps, getToggleProps } = useCollapse()

  const handleAdminChange = () => {
    setExpanded(!isExpanded)
  }

  const handleAccChange = () => {
    setAccData(!isAccData)
  }

  const [journalEntryLists, setJournalEntryLists] = useState([])
  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)

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

  const handleDelete = val => {
    const getDELETE = async () => {
      console.log('ehre==')

      const res = await axios
        .delete(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/journal/' +
            val
        )
        .then(response => {
          Swal.fire({
            title: 'Success',
            text: 'Successfully Deleted!',
            icon: 'success',
            confirmButtonText: 'OK'
          })

          setAccountLists(accountLists.filter(item => item._id !== val))
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
    getDELETE()
  }

  const handleRelatedShow = (id, val) => {
    const getRelated = async () => {
      try {
        console.log(val)
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/journal/related/' +
            val
        )

        console.log(res.data.data)
        setRelatedLists(res.data.data)
      } catch (err) {}
    }

    getRelated()

    if (isShow) {
      document.getElementById('toggle' + id).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + id).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  useEffect(() => {
    const getIncomeLists = async () => {
      try {
        const res = await axios.get(
          'http://localhost:9000/api/journals?limit=50'
        )

        // const result = res.data.list.filter((e) => e.relatedCashAccount.name == 'Cash in Hand-MMK');

        // console.log(result);
        // console.log();
        setJournalEntryLists(res.data.list)
      } catch (err) {
        alert(err.message)
      }
    }
    getIncomeLists()
  }, [])

  return (
    <div classNameName='App'>
      <div className='wrapper'>
        {/* <!-- Main Sidebar Container --> */}
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
                      <a href='/'>Home</a>
                    </li>
                    <li className='breadcrumb-item active'>
                      Journal Entry List
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
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='form-group col-md-5'>
                      <label>From</label>
                      <input
                        type='date'
                        name='from'
                        id='from'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-5'>
                      <label>To</label>
                      <input
                        type='date'
                        name='to'
                        id='to'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-2'>
                      <button
                        className='btn btn-sm btn-primary form-control'
                        style={{ marginTop: '31px' }}
                        onclick='date_filter()'
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className='offset-2 col-md-4'>
                  <div className='input-group' style={{ marginTop: '35px' }}>
                    <input
                      type='search'
                      className='form-control rounded'
                      id='search_code'
                      placeholder='Enter Account Code'
                    />
                    <button
                      type='button'
                      className='btn btn-outline-primary ml-3'
                      style={{ height: '0.97cm' }}
                      onclick='acc_code_search()'
                    >
                      search
                    </button>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='card'>
                    <div className='card-header'>
                      <div className='row justify-content-between'>
                        <label className=''>
                          {/* Income Transaction List */}
                          <span className='float-right'>
                            <button
                              type='button'
                              className='btn btn-sm btn-primary'
                              onClick={showDialog}
                            >
                              <i className='fas fa-plus'></i> Add Journal Entry
                            </button>
                            &nbsp;
                            {/* <a href="/income_type" className="btn btn-primary">
                            Income Type
                          </a> */}
                            <button
                              type='button'
                              className='btn btn-sm btn-success'
                              onClick={excelExport}
                            >
                              <FaFileExcel />
                              &nbsp; Export
                            </button>
                          </span>
                        </label>
                      </div>
                      <div className='row' id='trial_balance'></div>
                    </div>

                    <div className='card-body'>
                      {/* Export data in Excel */}
                      <ExcelExport data={journalEntryLists} ref={_export}>
                        <ExcelExportColumn
                          field=''
                          title='No'
                          locked={true}
                          width={30}
                        />
                        <ExcelExportColumn
                          field='date'
                          title='Date'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={200}
                        />

                        <ExcelExportColumn
                          field='relatedBankAccount.name'
                          title='Bank Account'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field='relatedCashAccount.name'
                          title='Cash Account'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field='relatedAccounting.name'
                          title='Account'
                          width={150}
                        />
                        <ExcelExportColumn
                          field='remark'
                          title='Remark'
                          width={150}
                        />
                      </ExcelExport>
                      {/* Export Data in Excel end */}
                      <div className='row'>
                        <div className='col-md-12'>
                          <div
                            className='table-responsive text-black'
                            id='slimtest2'
                          >
                            <table
                              className='table table-hover'
                              id='filter_date'
                            >
                              <thead className='bg-info text-white'>
                                <tr>
                                  <th>#</th>
                                  <th>Date</th>
                                  <th>Account</th>
                                  <th>Credit / Debit</th>
                                  <th>Amount</th>

                                  <th>Remark</th>
                                  <th className='text-center'>Action</th>
                                </tr>
                              </thead>

                              {journalEntryLists.map((journalEntry, i) => (
                                <tbody className=''>
                                  <tr>
                                    <td>{++i}</td>
                                    <td>{journalEntry.date.split('T')[0]}</td>
                                    <td>
                                      {journalEntry.relatedAccounting
                                        ? journalEntry.relatedAccounting.name
                                        : ''}
                                    </td>
                                    <td>
                                      {journalEntry.type}

                                      {/* {
                                        journalEntry.relatedCashAccount ? journalEntry
                                          .relatedCashAccount.name:''
                                      } */}
                                    </td>

                                    <td>{journalEntry.amount}</td>

                                    <td>{journalEntry.remark}</td>

                                    <td className='text-center'>
                                      <Link
                                        to
                                        className='btn btn-sm btn-warning'
                                        onClick={e =>
                                          handleUpdate(journalEntry._id)
                                        }
                                      >
                                        <FaRegEdit />
                                      </Link>
                                      &nbsp;
                                      <button
                                        className='btn btn-sm btn-danger'
                                        onClick={e =>
                                          handleDelete(journalEntry._id)
                                        }
                                      >
                                        <FaRegTrashAlt />
                                      </button>
                                    </td>
                                  </tr>

                                  <tr
                                    className='bg-light'
                                    id={'toggle' + journalEntry._id}
                                    hidden
                                  >
                                    <td colspan='12'>
                                      <div>
                                        <div class='row'>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              No
                                            </label>
                                          </div>
                                          <div class='col-md-3'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Account
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Type
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Date
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Amount
                                            </label>
                                          </div>
                                        </div>

                                        {relatedLists
                                          ? relatedLists.map((reList, i) => (
                                              <div class='row'>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {++i}
                                                  </div>
                                                </div>
                                                <div class='col-md-3'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {
                                                      reList.relatedAccounting
                                                        .name
                                                    }
                                                  </div>
                                                </div>
                                                <div class='col-md-2'>
                                                  {reList.type}
                                                </div>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {reList.date.split('T')[0]}
                                                  </div>
                                                </div>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {reList.amount}
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          : ''}
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

              <JEDialog
                open={open}
                close={() => setOpen(false)}
                setJournalEntryLists={setJournalEntryLists}
                journalEntryLists={journalEntryLists}
              />
            </div>
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
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>

      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Income
