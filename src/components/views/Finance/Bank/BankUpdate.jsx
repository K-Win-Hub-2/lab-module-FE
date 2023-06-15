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
import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { FaRegEdit, FaRegTrashAlt, FaArrowLeft } from 'react-icons/fa'

import axios from 'axios'
import Swal from 'sweetalert2'
import SideBar from '../../SideBar'

import { useSelector } from 'react-redux'
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Input = styled.input`
  flex: 1;
  min-width: 500px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`

const FilterTitle = styled.span`
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 3px;
`
// hello world

const FilterSelect = styled.select`
  padding: 5px;
`

const FilterOption = styled.option``

const QRBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`

export default function BankTran(props) {
  const url = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/'

  const BankID = useLocation().pathname.split('/')[2]
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')

  const [accountHolderName, setAccountHolderName] = useState('')
  const [bankContact, setBankContact] = useState('')
  const [openingDate, setOpeningDate] = useState('')
  const [balance, setBalance] = useState('')
  const [bankAddress, setBankAddress] = useState('')
  const [type, setType] = useState('')
  const [header, setHeader] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [typeList, setTypeList] = useState([])
  const [headerList, setHeaderList] = useState([])
  const [bankIDLilst, setBankIDList] = useState([])
  const [typeName, setTypeName] = useState('')
  const [headerName, setHeaderName] = useState('')
  const [bankLists, setBankLists] = useState([])

  const BankReg = () => {
    const data = {
      id: BankID,
      bankName: bankName,
      // relatedType: type,
      // relatedHeader: header,
      accountName: accountName,
      accountNumber: accountNumber,
      accountHolderName: accountHolderName,
      bankContact: bankContact,
      openingDate: openingDate,
      balance: balance,
      bankAddress: bankAddress
      // subHeading: subHeading
    }
    // alert(JSON.stringify(data))
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios.put(url + 'bank', data, config).then(function (response) {
      Swal.fire({
        title: 'Successful!',
        text: 'You Created Bank Data!',
        icon: 'success',
        // showCancelButton: true,

        cancelButtonText: 'Close'
      })
      setBankLists([...bankLists, response.data.data])
    })
  }

  useEffect(() => {
    const getTypeLists = async () => {
      try {
        const res = await axios.get(url + 'account-types')

        const types = res.data.list.filter(el => el.name == 'Assets')
        setTypeList(types)
      } catch (err) {}
    }

    const getHeaderLists = async () => {
      try {
        const res = await axios.get(url + 'account-headers')

        const header = res.data.list.filter(el => el.name === 'Cash At Bank')
        setHeaderList(header)
        console.log(
          res.data.list.filter(el => el.name === 'Cash At Bank'),
          'header name'
        )
      } catch (err) {}
    }

    const getBankLists = async () => {
      try {
        const res = await axios.get(url + 'bank/' + BankID)

        setBankIDList(res.data.data)
        console.log(res.data.data, 'bank')
        setBankName(res.data.data[0].bankName)
        setBankAddress(res.data.data[0].bankAddress)
        setBankContact(res.data.data[0].bankContact)
        setAccountName(res.data.data[0].accountName)
        setAccountNumber(res.data.data[0].accountNumber)
        setAccountHolderName(res.data.data[0].accountHolderName)
        setOpeningDate(
          res.data.data[0].openingDate
            ? res.data.data[0].openingDate.split('T')[0]
            : ''
        )
        setBalance(res.data.data[0].balance)
        setTypeName(
          res.data.data[0].relatedAccounting.relatedType ? 'Assets' : ''
        )
        setHeaderName(
          res.data.data[0].relatedAccounting.relatedHeader ? 'Bank' : ''
        )
        setSubHeading(
          res.data.data[0].relatedAccounting
            ? res.data.data[0].relatedAccounting.subHeader
            : ''
        )
      } catch (err) {}
    }

    getBankLists()
    getTypeLists()
    getHeaderLists()
  }, [])

  return (
    <div classNameName='App'>
      <div className='wrapper'>
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
                      <Link to='/bank'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    {/* <li className='breadcrumb-item active'>
                      Stock Request Create
                    </li> */}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='card row py-3'>
                <h5 className='card-header text-center py-3 fs-3 mb-3'>
                  Bank Update
                </h5>
                <div className='form-body'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Bank Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='bank_name'
                          defaultValue={bankName}
                          onChange={e => setBankName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Bank Address</label>
                        <input
                          type='text'
                          className='form-control'
                          name='bank_address'
                          defaultValue={bankAddress}
                          onChange={e => setBankAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Bank Contact</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          name='bank_contact'
                          defaultValue={bankContact}
                          onChange={e => setBankContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Account Name</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          name='acc_name'
                          defaultValue={accountName}
                          onChange={e => setAccountName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Account Number</label>
                        <input
                          type='number'
                          className='form-control'
                          placeholder=''
                          name='acc_code'
                          defaultValue={accountNumber}
                          onChange={e => setAccountNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>
                          Account Holder Name
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          name='holder_name'
                          defaultValue={accountHolderName}
                          onChange={e => setAccountHolderName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Opening Date</label>
                        <input
                          type='date'
                          className='form-control'
                          placeholder=''
                          name='opening_date'
                          defaultValue={openingDate}
                          id='mdate'
                          onChange={e => setOpeningDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Current Balance</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          name='current_balance'
                          defaultValue={balance}
                          onChange={e => setBalance(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Types</label>

                        <select
                          name='currency'
                          id=''
                          className='form-control mt-1'
                          onchange='convert(this.value)'
                          onChange={e => setType(e.target.value)}
                        >
                          <option value=''>{typeName}</option>
                          {typeList.map(option => (
                            <option value={option._id}>{option.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Heading</label>
                        <select
                          name='currency'
                          id=''
                          className='form-control mt-1'
                          onchange='convert(this.value)'
                          onChange={e => setHeader(e.target.value)}
                        >
                          <option value=''>{headerName}</option>
                          {headerList.map(option => (
                            <option value={option._id}>{option.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='control-label'>Sub Heading</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          name='opening_date'
                          id='mdate'
                          defaultValue={subHeading}
                          onChange={e => setSubHeading(e.target.value)}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className='form-actions mt-2'>
                    <div className='row'>
                      <div className='offset-4 col-md-6'>
                        <div className='row'>
                          <div className=' col-md-6'>
                            <button className='btn btn-dark' onClick={BankReg}>
                              Submit
                            </button>
                            &nbsp;
                          </div>
                          <div className='col-md-6'>
                            <Link to='/bank' className='btn btn-dark'>
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <!-- /.content-wrapper --> */}
      <footer className='main-footer' style={{ marginTop: '50px;' }}>
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
// phyo
//maymyat
