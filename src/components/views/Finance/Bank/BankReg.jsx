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

  const BankReg = () => {
    const data = {
      bankName: bankName,
      accountName: accountName,
      accountNumber: accountNumber,
      accountHolderName: accountHolderName,
      bankContact: bankContact,
      openingDate: openingDate,
      balance: balance,
      bankAddress: bankAddress
    }
    // alert(JSON.stringify(data));
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .post(
        //"http://centralclinicbackend.kwintechnologykw11.com:3000/api/bank",
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/bank',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Income Data!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        props.setBankLists([...props.bankLists, response.data.data])
      })
    props.close()
  }

  useEffect(() => {
    const getTypeLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-types'
        )

        const types = res.data.list.filter(el => el.name == 'Assets')
        setTypeList(types)
      } catch (err) {}
    }

    const getHeaderLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/64269ba7122dbb7ab32f4e1c'
        )

        setHeaderList(res.data.data.filter(el => el.name == 'Cash At Bank'))
      } catch (err) {}
    }

    //getTypeLists();
    //getHeaderLists();
  }, [])

  return (
    <div>
      <Dialog open={props.bankRegOpen} onClose={props.close}>
        <DialogTitle>
          {' '}
          <div className='modal-header bg-info'>
            <h4 className='modal-title'>Bank Registeration Form</h4>
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

          <div className='form-body'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>Bank Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='bank_name'
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
                    onChange={e => setAccountNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='control-label'>Account Holder Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder=''
                    name='holder_name'
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
                    onChange={e => setBalance(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Types</label>

                  <select
                    name="currency"
                    id=""
                    className="form-control mt-1"
                    onchange="convert(this.value)"
                    onChange={(e) => setType(e.target.value)}>
                    <option value="">Choose Types</option>
                    {typeList.map((option) => (
                      <option value={option._id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Heading</label>
                  <select
                    name="currency"
                    id=""
                    className="form-control mt-1"
                    onchange="convert(this.value)"
                    onChange={(e) => setHeader(e.target.value)}>
                    <option value="">Choose Heading</option>
                    {headerList.map((option) => (
                      <option value={option._id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Sub Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="opening_date"
                    id="mdate"
                    onChange={(e) => setSubHeading(e.target.value)}
                  />
                </div>
              </div>
            </div> */}
            <div className='form-actions'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className=' col-md-9'>
                      <Button className='bg-success' onClick={BankReg}>
                        Submit
                      </Button>
                      &nbsp;
                      <Button className='bg-warning' onClick={props.close}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// phyo
//maymyat
