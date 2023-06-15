/* eslint-disable */
import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import styled from 'styled-components'
import { FaArrowLeft, FaMinus } from 'react-icons/fa'
import Swal from 'sweetalert2'

import { useState, useEffect } from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SideBar from '../../SideBar'
import AccountList from '../AccountList/AccountList.jsx'
import { Link } from 'react-router-dom'
import { valueOf } from '../../../../assets/plugins/moment/src/lib/moment/to-type'

export default function JournalEntryEdit(props) {
  const [fromAccounts, setFromAccounts] = useState([])
  const [toAccounts, setToAccounts] = useState([])
  const [firstTransId, setFirstTransId] = useState([])
  const [secondTransId, setSecondTransId] = useState([])

  const [fromPreAcc, setFromPreAcc] = useState('')
  const [toPreAcc, setToPreAcc] = useState('')
  const [fromPreAccType, setFromPreAccType] = useState('')
  const [toPreAccType, setToPreAccType] = useState('')
  const [fromPreAccNature, setFromPreAccNature] = useState('')
  const [toPreAccNature, setToPreAccNature] = useState('')

  const [fromCurAcc, setFromCurAcc] = useState('')
  const [toCurAcc, setToCurAcc] = useState('')
  const [fromCurAccType, setFromCurAccType] = useState('')
  const [toCurAccType, setToCurAccType] = useState('')
  const [fromCurAccNature, setFromCurAccNature] = useState('')
  const [toCurAccNature, setToCurAccNature] = useState('')

  const [preAmount, setPreAmount] = useState('')
  const [curAmount, setCurAmount] = useState('')
  const [date, setDate] = useState('')
  const [remark, setRemark] = useState('')
  const [update, setUpDate] = useState('')
  const [upremark, setUpRemark] = useState('')

  const Id = useLocation().pathname.split('/')[2]

  const JournalUpdate = () => {
    const data = {
      firstTransId: firstTransId,
      secondTransId: secondTransId,
      fromPreAcc: fromPreAcc,
      fromPreAccType: fromPreAccType,
      fromPreAccNature: fromPreAccNature,
      toPreAcc: toPreAcc,
      toPreAccType: toPreAccType,
      toPreAccNature: toPreAccNature,
      fromCurAcc: fromCurAcc,
      fromCurAccType: fromCurAccType,
      fromCurAccNature: fromCurAccNature,
      toCurAcc: toCurAcc,
      toCurAccType: toCurAccType,
      toCurAccNature: toCurAccNature,
      preAmount: preAmount,
      curAmount: curAmount,
      date: update,
      remark: upremark
    }
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    // alert(JSON.stringify(data))
    axios
      .put(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/journal',
        //'http://localhost:9000/api/journal',
        data,
        config
      )
      .then(function (response) {
        console.log(response.data.firstTrans)
        console.log(response.data.secondTrans)
        Swal.fire({
          title: 'Success',
          text: 'Successfully Updated!',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        // props.setAccountLists([...props.accountLists, response.data.data]);
        // const index = props.accountLists.findIndex(
        //   (item) => item._id === props.id
        // );
        // let arr = [...props.accountLists];
        // arr[index] = {
        //   ...arr[index],
        //   ...response.data.data,
        // };
        // props.setAccountLists(arr);
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
    const getAccount = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )

        setFromAccounts(res.data.list)
        setToAccounts(res.data.list)
      } catch (err) {}
    }

    const getTransaction = async () => {
      try {
        console.log(Id, 'Id')
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/transaction/' +
            //'http://localhost:9000/api/accounting-list/' +
            Id
        )
        console.log(res.data.data)
        setFirstTransId(Id)
        setSecondTransId(res.data.data[0].relatedTransaction._id)

        setFromPreAcc(res.data.data[0].relatedAccounting._id)
        setFromPreAccType(res.data.data[0].type)

        setFromPreAccNature(res.data.data[0].relatedAccounting.accountNature)
        setToPreAcc(res.data.data[0].relatedTransaction.relatedAccounting)
        setToPreAccType(res.data.data[0].relatedTransaction.type)
        toAccounts.map(account => {
          if (
            account._id ===
            res.data.data[0].relatedTransaction.relatedAccounting
          ) {
            setToPreAccNature(account.accountNature)
            console.log(account.accountNature)
          }
        })
        // setToPreAccNature(res.data.data[0].relatedTransaction.relatedAccounting.accountNature)
        setPreAmount(res.data.data[0].amount)
        setRemark(res.data.data[0].remark)
        setDate(res.data.data[0].date.split('T')[0])
        setCurAmount(res.data.data[0].amount)
        setUpRemark(res.data.data[0].remark)
        setUpDate(res.data.data[0].date.split('T')[0])
      } catch (err) {}
    }

    getAccount()
    getTransaction()
  }, [])

  const handleFromInputAcc = event => {
    setFromCurAcc(event)
    fromAccounts.map(account => {
      if (account._id === event) {
        setFromCurAccNature(account.accountNature)
      }
    })
  }

  const handleToInputAcc = event => {
    setToCurAcc(event)
    toAccounts.map(account => {
      if (account._id === event) {
        setToCurAccNature(account.accountNature)
      }
    })
  }

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
                      <Link to='/account_list'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active'>Account List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class='content'>
            <div class='container card px-3 py-3'>
              {/* <!-- Small boxes (Stat box) --> */}

              <form action='' method='post'>
                {/* @csrf */}
                <div class='modal-body'>
                  <div>
                    <label className=''>From Account</label>
                    <div className='form-group mt-3 px-3' id='bankkk'>
                      <label className='text-gray'>Type</label>

                      <select
                        className='form-control'
                        name='bank_acc'
                        id='bank_acc'
                        onChange={e => setFromCurAccType(e.target.value)}
                      >
                        <option value=''>Select Type</option>

                        <option
                          value='Credit'
                          selected={fromPreAccType === 'Credit' ? true : false}
                        >
                          Credit
                        </option>
                        <option
                          value='Debit'
                          selected={fromPreAccType === 'Debit' ? true : false}
                        >
                          Debit
                        </option>
                      </select>
                    </div>
                    {/* <div className='form-group mt-3 px-3' id='bankkk'>
            <label className='text-gray'>Account Type</label>

            <select
              className='form-control'
              name='bank_acc'
              id='bank_acc'
              onChange={e => handleAccountHeader(e.target.value)}
            >
              <option value=''>Select Account Type</option>

              {creditType.map(option => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>
          </div> */}
                    {/* {flag && (
            <div className='form-group mt-3 px-3' id='bankkk'>
              <label className='text-gray'>Heading</label>

              <select
                className='form-control'
                name='bank_acc'
                id='bank_acc'
                onChange={e => handleAccount(e.target.value)}
              >
                <option value=''>Select Heading</option>

                {creditHeading.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
          )} */}

                    <div className='form-group mt-3 px-3' id='bankkk'>
                      <label className='text-gray'>Account</label>

                      <select
                        className='form-control'
                        name='bank_acc'
                        id='bank_acc'
                        onChange={e => handleFromInputAcc(e.target.value)}
                      >
                        <option value=''>Select Account</option>

                        {fromAccounts.map(option => (
                          <option
                            value={option._id}
                            selected={fromPreAcc === option._id ? true : false}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className=''>To Account</label>
                    <div className='form-group mt-3 px-3' id='bankkk'>
                      <label className='text-gray'>Type</label>

                      <select
                        className='form-control'
                        name='bank_acc'
                        id='bank_acc'
                        onChange={e => setToCurAccType(e.target.value)}
                      >
                        <option>Select Type</option>

                        <option
                          value='Credit'
                          selected={toPreAccType === 'Credit' ? true : false}
                        >
                          Credit
                        </option>
                        <option
                          value='Debit'
                          selected={toPreAccType === 'Debit' ? true : false}
                        >
                          Debit
                        </option>
                      </select>
                    </div>
                    {/* <div className='form-group mt-3 px-3' id='bankkk'>
            <label className='text-gray'>Account Type</label>

            <select
              className='form-control'
              name='bank_acc'
              id='bank_acc'
              onChange={e => handleDebitAccountHeader(e.target.value)}
            >
              <option value=''>Select Account Type</option>

              {debitType.map(option => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>
          </div> */}
                    {/* {debitFlag && (
            <div className='form-group mt-3 px-3' id='bankkk'>
              <label className='text-gray'>Heading</label>

              <select
                className='form-control'
                name='bank_acc'
                id='bank_acc'
                onChange={e => handleDebitAccount(e.target.value)}
              >
                <option value=''>Select Heading</option>

                {debitHeading.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
          )} */}

                    <div className='form-group mt-3 px-3' id='bankkk'>
                      <label className='text-gray'>Account</label>

                      <select
                        className='form-control'
                        name='bank_acc'
                        id='bank_acc'
                        onChange={e => handleToInputAcc(e.target.value)}
                      >
                        <option value=''>Select Account</option>

                        {toAccounts.map(option => (
                          <option
                            value={option._id}
                            selected={toPreAcc === option._id ? true : false}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='form-group'>
                    <label className='control-label'>Amount</label>

                    <input
                      type='number'
                      className='form-control'
                      name='amount'
                      id='convert_amount'
                      defaultValue={preAmount}
                      onChange={event => setCurAmount(event.target.value)}
                    />
                  </div>

                  {/* <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Final Amount</label>

              <input
                type="number"
                className="form-control"
                name="amount"
                id="convert_amount"
                defaultValue={finalAmount}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Final Currency</label>

              <select
                name="currency"
                id=""
                className="form-control mt-1"
                onchange="convert(this.value)"
                onChange={(e) => handleCalculation(e.target.value)}>
                <option value="">Choose Currency</option>

                {currencyList.map((option) => (
                  <option value={option.code}>{option.code}</option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
                  <div className='form-group'>
                    <label className='control-label'>Date</label>
                    <input
                      type='date'
                      className='form-control'
                      name='date'
                      value={date}
                      onChange={e => setUpDate(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group">
                                <label className="control-label">Voucher Number</label>
                                <input type="text" className="form-control" name="voucher_id"/>
                            </div> */}
                  <div className='form-group'>
                    <label className='control-label'>Remark</label>
                    <input
                      type='text'
                      className='form-control'
                      name='remark'
                      defaultValue={remark}
                      onChange={e => setUpRemark(e.target.value)}
                    />
                  </div>
                </div>
                <div class='modal-footer'>
                  <Link
                    to='/account_list'
                    className='btn btn-secondary'
                    type='button'
                  >
                    {' '}
                    Close
                  </Link>

                  <Button class='btn btn-primary' onClick={JournalUpdate}>
                    Update
                  </Button>
                </div>
              </form>

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
// phyo
//maymyat
