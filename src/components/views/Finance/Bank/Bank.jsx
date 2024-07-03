/* eslint-disable */
import React, { useState } from 'react'
import BankTran from '../Bank/BankTran'
import BankReg from '../Bank/BankReg'
import axios from 'axios'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

import SideBar from '../../SideBar'
import {
  FaCashRegister,
  FaFileMedical,
  FaPenSquare,
  FaPaperPlane,
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa'

import useCollapse from 'react-collapsed'

import BankList from './Bank'
import { Link } from 'react-router-dom'
// import HeaderName from './HeaderName'
import { useSelector } from 'react-redux'
import apiInstance from '../../../../utils/api'

function Bank() {


  const [id, setId] = useState('')
  const [name, setBankName] = useState('')
  const [open, setOpen] = useState(false)
  const [bankRegOpen, setBankRegOpen] = useState(false)

  const [isShow, setIsShow] = useState(false)

  const [bankLists, setBankLists] = useState([])
  const [transferlist, setTransferLists] = useState([])

  const handleDelete = event => {
    apiInstance
      .delete('bank/' + event)
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = bankLists.filter(item => item._id !== event)
        setBankLists(result)
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

  const showDialog = val => {
    setOpen(true)
    setId(val)
    const getRelated = async () => {
      console.log(val)
      const res = await axios.get(url + 'bank/' + val)

      console.log(res.data.data)
      setBankName(res.data.data[0].accountName)
      console.log(res.data.data[0].accountName)
    }

    getRelated()
  }
  // const bankTransferDialog = () => setBankOpen(true);

  const bankRegDialog = () => {
    setBankRegOpen(true)
  }

  const handleTransationChange = val => {
    const getTransactionList = async () => {
      try {
        console.log(val)
        const res = await apiInstance.get('transactions/related/' + val)

        console.log(res)
        setTransferLists(res.data.data)
      } catch (err) { }
    }

    getTransactionList()

    if (isShow) {
      document.getElementById('toggle' + val).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + val).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  useEffect(() => {
    const getBankLists = async () => {
      try {
        const res = await apiInstance.get('banks?limit=50')
        console.log(res.data.list)
        setBankLists(res.data.list)
      } catch (err) { }
    }

    // const getTransactionList = async () => {
    //   try {
    //     const res = await axios.get(
    //       "http://backendcherryk.kwintechnologykw11.com:4000/api/transactions/related/"+bankLists._id
    //     );

    //     setTransactionLists(res.data.list);

    //   } catch (err) {}
    // };
    getBankLists()
  }, [])

  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Navbar --> */}
        {/* <HeaderName /> */}

        {/* <!-- /.navbar --> */}

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
                    <li className='breadcrumb-item active'>Bank List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='container-fluid'>
              <div className='card'>
                <div className='card-body p-b-0'>
                  {/* <label className="text-success">Bank List</label> */}
                  <button
                    className='float-right btn btn-dark mb-3'
                    data-toggle='modal'
                    data-target='#bank_register'
                    onClick={bankRegDialog}
                  >
                    Bank Register
                  </button>

                  <div className='table-responsive'>
                    <table className='table table-hover'>
                      <thead className='ok text-center'>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Acc No.</th>
                          <th>Bank</th>

                          <th>Acc Name</th>
                          <th>Holder Name</th>

                          <th>Balance</th>
                          <th>Method</th>
                          <th className=''>Action</th>
                        </tr>
                      </thead>

                      {bankLists.map((bankList, i) => (
                        <tbody className=''>
                          <tr className='px-3'>
                            <td>{++i}</td>
                            <td>{bankList.openingDate.split('T')[0]}</td>
                            <td>{bankList.accountNumber}</td>
                            <td>{bankList.bankName}</td>

                            <td>{bankList.accountName}</td>
                            <td>{bankList.accountHolderName}</td>

                            <td>
                              {
                                bankList.balance
                                // .toLocaleString(undefined, {
                                // maximumFractionDigits: 2,
                                // minimumFractionDigits: 2,
                                // })
                              }
                            </td>
                            <td className=''>
                              <button
                                type='button'
                                className='btn btn-sm btn-dark ml-2'
                                onClick={() =>
                                  handleTransationChange(bankList._id)
                                }
                              >
                                Transaction
                              </button>
                              <button
                                type='button'
                                className='btn btn-sm btn-dark ml-2'
                                onClick={() => showDialog(bankList._id)}
                              >
                                Transfer
                              </button>
                            </td>
                            <td>
                              <Link
                                to={'/bank-update/' + bankList._id}
                                className='btn btn-sm btn-warning'
                              >
                                <FaRegEdit />
                              </Link>
                              &nbsp;
                              <button
                                className='btn btn-sm btn-danger'
                                onClick={e => handleDelete(bankList._id)}
                              >
                                <FaRegTrashAlt />
                              </button>
                              &nbsp;
                            </td>
                          </tr>

                          <tr
                            className='bg-light'
                            id={'toggle' + bankList._id}
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

                                {transferlist
                                  ? transferlist.map((tranList, i) => (
                                    <div class='row'>
                                      <div class='col-md-2'>
                                        <div style={{ fontSize: '15px' }}>
                                          {++i}
                                        </div>
                                      </div>
                                      <div class='col-md-3'>
                                        <div style={{ fontSize: '15px' }}>
                                          {tranList.toAcc}
                                        </div>
                                      </div>
                                      <div class='col-md-2'>
                                        {/* {tranList.type} */}
                                      </div>
                                      <div class='col-md-2'>
                                        <div style={{ fontSize: '15px' }}>
                                          {tranList.date.split('T')[0]}
                                        </div>
                                      </div>
                                      <div class='col-md-2'>
                                        <div style={{ fontSize: '15px' }}>
                                          {tranList.amount}
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
              <BankReg
                bankRegOpen={bankRegOpen}
                close={() => setBankRegOpen(false)}
                setBankRegOpen={setBankRegOpen}
                bankLists={bankLists}
                setBankLists={setBankLists}
              />
              <BankTran
                open={open}
                close={() => setOpen(false)}
                id={id}
                name={name}
              />
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
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
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Bank
