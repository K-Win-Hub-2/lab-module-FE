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
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

export default function BankInfoDialog(props) {
  const [code, setCode] = useState('')
  const [accountingTypes, setAccountingTypes] = useState('')
  const [headingList, setHeadingList] = useState([])
  const [subHeadingList, setSubHeadingList] = useState([])
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [accName, setAccName] = useState('')

  const [accType, setAccType] = useState([])

  const [amount, setAmount] = useState('')

  const [generalFlag, setGeneralFlag] = useState(true)
  // const [bankAddress, setBankAddress] = useState('');
  const [relatedCurrency, setRelatedCurrency] = useState('')
  const [carryForWork, setCarryForWork] = useState(false)
  const [flag, setFlag] = useState(false)
  const [subFlag, setSubFlag] = useState(false)

  const AccountCreate = () => {
    const data = {
      code: code,
      name: subHeading,
      relatedType: accountingTypes,
      relatedHeader: heading,
      relatedSubHeader: subHeading,
      name: accName,
      amount: amount,
      openingBalance: amount,
      generalFlag: generalFlag,
      relatedCurrency: relatedCurrency,
      carryForWork: carryForWork
    }

    // alert(JSON.stringify(data))

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    axios
      .post(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-list',
      // 'http://localhost:9000/api/accounting-list',
        data,
        config
      )
      .then(function (response) {
        // alert("success");
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully created!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        props.setAccountLists([...props.accountLists, response.data.data])

        // props.setAccountLists([...props.accountLists, response.data.list])
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Something Wrong!',
          text: 'Error',
          icon: 'warning',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
      })
    props.setOpen(false)
  }

  const handleHeading = async event => {
    setHeading(event)
    console.log(heading, headingList)
     const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-subheaders/related/${event}`
    //const url = `http://localhost:9000/api/account-subheaders/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setSubHeadingList(res.data.data)
    setSubFlag(true)
    // console.log(headingList, 'heading')
  }

  const handleSubHeading = async event => {
    setSubHeading(event)
  }

  const handleAccountHeader = async event => {
    setAccountingTypes(event)
    console.log(accountingTypes)
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setHeadingList(res.data.data)
    setFlag(true)
    console.log(headingList, 'heading')
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

    // const getAccountingHeadingType = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/${heading}`
    //     );
    //     setHeading(res.data.list);
    //   } catch (err) {}
    // };

    getAccountingType()
  }, [])

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>
          <div className='modal-header bg-info'>
            <h4 className='modal-title'>Add New Accounting</h4>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
              onClick={props.close}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          {/* @csrf */}
          <div class='modal-body'>
            <div class='form-group'>
              <label for='name'>Account Code</label>
              <input
                type='text'
                class='form-control border border-info'
                name='acc_code'
                id='acc_code'
                placeholder='eg. 123456'
                onChange={e => setCode(e.target.value)}
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
                <option>Choose Account Type</option>
                {accType.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
            {flag ? (
              <div class='form-group'>
                <label for='name'>Heading</label>
                <select
                  class='custom-select border-info'
                  name='account_type_id'
                  onChange={e => handleHeading(e.target.value)}
                >
                  <option>Choose Heading Account</option>
                  {headingList.map(option => (
                    <option value={option._id}>{option.name}</option>
                  ))}
                </select>
              </div>
            ) : null}
            {subFlag ? (
              <div class='form-group'>
                <label for='name'>Sub Heading</label>
                <select
                  class='custom-select border-info'
                  name='account_subheader'
                  onChange={e => handleSubHeading(e.target.value)}
                >
                  <option>Choose Account Sub Heading</option>
                  {subHeadingList.map(option => (
                    <option value={option._id}>{option.name}</option>
                  ))}
                </select>
              </div>
            ) : null}
            <div class='form-group'>
              <label for='name'>Account Name</label>

              <input
                type='text'
                name='sub_head'
                className='form-control border-info'
                id=''
                onChange={e => setAccName(e.target.value)}
              />
            </div>

            <div class='form-group'>
              <label for='name'>Balance</label>
              <input
                type='text'
                class='form-control border-info'
                name='balance'
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            <div class='form-group'>
              <label for='name'>Currency</label>
              <input
                type='text'
                class='form-control border-info'
                name='releatedCurrency'
                onChange={e => setRelatedCurrency(e.target.value)}
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
                      onclick='show_project()'
                      onChange={e => setGeneralFlag(true)}
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
                      onclick='hide_project()'
                      onChange={e => setGeneralFlag(false)}
                      checked
                    />
                    <label class='form-check-label text-info' for='no'>
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div class='form-group'>
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
                      onChange={e => setCarryForWork(true)}
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
                      onChange={e => setCarryForWork(false)}
                      checked
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
            <button
              type='button'
              class='btn btn-secondary'
              data-dismiss='modal'
              onClick={props.close}
            >
              Close
            </button>
            <Button
              type='submit'
              class='btn btn-primary'
              onClick={AccountCreate}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// phyo
//maymyat
