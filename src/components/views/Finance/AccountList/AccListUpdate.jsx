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
import AccountList from './AccountList'
import { Link } from 'react-router-dom'
import { valueOf } from '../../../../assets/plugins/moment/src/lib/moment/to-type'

export default function BankInfoDialog(props) {
  const [code, setCode] = useState('')
  
  const [headingList, setHeadingList] = useState([])
  const [accType, setAccType] = useState([])
  const [subHeadingList, setSubHeadingList] = useState([])

  const [upWork, setUpWork] = useState(false)
  const [flag, setFlag] = useState(false)
  const [upFlag, setUpFlag] = useState(true)
  const [upCode, setUpCode] = useState('')
  const [upSub, setUpSub] = useState('')
  const [upBal, setUpBal] = useState('')
  const [upCur, setUpCur] = useState('')
  const [reHead, setReHead] = useState('')
  const [reSubHead, setReSubHead] = useState('')
  const [reType, setReType] = useState('')
  const Id = useLocation().pathname.split('/')[2]

  const AccountUpdate = () => {
    const data = {
      id: Id,
      code: upCode,
      name: upSub,
      relatedType: reType,
      relatedHeader: reHead,
      relatedSubHeader: reSubHead,
      subHeader: upSub,
      amount: upBal,
      openingBalance: upBal,
      generalFlag: upFlag,
      relatedCurrency: upCur,
      carryForWork: upWork
    }
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    // alert(JSON.stringify(data))
    axios
      .put(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-list',
      // 'http://localhost:9000/api/accounting-list',
        data,
        config
      )
      .then(function (response) {
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

  const handleHeading = async event => {
   // setHeading(event)
   setReHead(event)
    // console.log(heading, headingList)
    //const url = `http://localhost:9000/api/account-subheaders/related/${event}`
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-subheaders/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setSubHeadingList(res.data.data)

  }

  

  const handleAccountHeader = async event => {
    //setAccountingTypes(event)
    setReType(event)
    // console.log(accountingTypes)
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    // console.log(res.data.data, 'res.data.data')
    setHeadingList(res.data.data)
    setFlag(true)
    // console.log(headingList, 'heading')
  }
  useEffect(() => {
    const getAccountingType = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-types'
        )
        setAccType(res.data.list)
      } catch (err) {}
    }

    const getAccount = async () => {
      try {
        console.log(Id, 'Id')
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-list/' +
          //'http://localhost:9000/api/accounting-list/' +
            Id
        )
        console.log(res.data.data)
        setUpCode(res.data.data[0].code)
        // console.log(res.data.data[0].code)

        setUpSub(res.data.data[0].name)
        setUpBal(res.data.data[0].amount)
        setUpCur(res.data.data[0].relatedCurrency)

        setReHead(res.data.data[0].relatedHeader)
        setReType(res.data.data[0].relatedType)
        setReSubHead(res.data.data[0].relatedSubHeader)
        console.log(reSubHead)
        
      } catch (err) {}
    }
    getAccountingType()
    getAccount()
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
                  <div class='form-group'>
                    <label for='name'>Account Code</label>
                    <input
                      type='text'
                      class='form-control border border-info'
                      name='acc_code'
                      id='acc_code'
                      defaultValue={upCode}
                      onChange={e => setUpCode(e.target.value)}
                    />
                  </div>
                  {/* <div class="form-group">
                <label for="name">Account Name</label>
                <input
                  type="text"
                  class="form-control border-info"
                  name="acc_name"
                  id="acc_name"
                  placeholder="eg. Revenue Account"
                  onChange={(e) => setName(e.target.value)}
                />
              </div> */}

                  <div class='form-group'>
                    <label for='name'>Account Type</label>
                    <select
                      class='custom-select border-info'
                      name='account_type_id'
                      onChange={e => handleAccountHeader(e.target.value)}
                    >
                      <option value={reType._id}>{reType.name}</option>
                      {accType.map(option => (
                        <option value={option._id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {reHead.name ? (
                    <div class='form-group'>
                      <label for='name'>Heading</label>
                      <select
                        class='custom-select border-info'
                        name='account_type_id'
                        onChange={e => handleHeading(e.target.value)}
                      >
                        <option value={reHead._id}>{reHead.name}</option>
                        {headingList.map(option => (
                          <option value={option._id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    ''
                  )}

                  {reSubHead.name ? (
                    <div class='form-group'>
                      <label for='name'>Sub Heading</label>
                      <select
                        class='custom-select border-info'
                        name='account_subhead'
                        onChange={e => setReSubHead(e.target.value)}
                      >
                        <option value={reSubHead._id}>{reSubHead.name}</option>
                        {subHeadingList.map(option => (
                          <option value={option._id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    ''
                  )}

                  <div class='form-group'>
                    <label for='name'>Account Name</label>

                    <input
                      type='text'
                      name='sub_head'
                      className='form-control border-info'
                      id=''
                      defaultValue={upSub}
                      onChange={e => setUpSub(e.target.value)}
                    />
                  </div>

                  <div class='form-group'>
                    <label for='name'>Balance</label>
                    <input
                      type='text'
                      class='form-control border-info'
                      name='balance'
                      defaultValue={upBal}
                      onChange={e => setUpBal(e.target.value)}
                    />
                  </div>
                  <div class='form-group'>
                    <label for='name'>Currency</label>
                    <input
                      type='text'
                      class='form-control border-info'
                      name='releatedCurrency'
                      defaultValue={upCur}
                      onChange={e => setUpCur(e.target.value)}
                    />
                  </div>
                  {/* <div class='form-group'>
                    <label for='name'>General Flag</label>
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='yes_no'
                            id='yes'
                            onChange={e => setUpFlag(true)}
                          />
                          <label class='form-check-label text-info' for='yes'>
                            Yes
                          </label>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='yes_no'
                            id='no'
                            onChange={e => setUpFlag(false)}
                          />
                          <label class='form-check-label text-info' for='no'>
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='form-group'>
                    <label for='name'>Carry Forward</label>
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='no_yes'
                            id='yes1'
                            onclick='show_project()'
                            onChange={e => setUpWork(true)}
                          />
                          <label class='form-check-label text-info' for='bank'>
                            Yes
                          </label>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='no_yes'
                            id='no1'
                            onclick='hide_project()'
                            onChange={e => setUpWork(false)}
                          />
                          <label class='form-check-label text-info' for='cash'>
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div class='modal-footer'>
                  <Link to='/account_list' className='btn btn-secondary' type='button'> Close</Link>
                  
                  <Button class='btn btn-primary' onClick={AccountUpdate}>
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
