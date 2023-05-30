/* eslint-disable */
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Swal from 'sweetalert2'

export default function BankInfoDialog(props) {
  const [creditType, setCreditType] = useState([])
  const [debitType, setDebitType] = useState([])
  const [creditHeading, setCreditHeading] = useState([])
  const [debitHeading, setDebitHeading] = useState([])
  const [creditAccount, setCreditAccount] = useState([])
  const [debitAccount, setDebitAccount] = useState([])
  const [relatedCreditType, setRelatedCreditType] = useState([])
  const [relatedCreditAccount, setRelatedCreditAccount] = useState('')
  const [relatedCreditHeader, setRelatedCreditHeader] = useState([])
  const [relatedDebitType, setRelatedDebitType] = useState([])
  const [relatedDebitAccount, setRelatedDebitAccount] = useState('')
  const [relatedDebitHeader, setRelatedDebitHeader] = useState([])
  const [fromType, setFromType] = useState('')
  const [toType, setToType] = useState('')

  const [medicineSale, setMedicineSale] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [showBank, setShowBank] = useState(false)
  const [showCash, setShowCash] = useState(false)
  const [credit, setCredit] = useState([])
  const [debit, setDebit] = useState([])
  const [flag, setFlag] = useState(false)
  const [accFlag, setAccFlag] = useState(false)
  const [debitFlag, setDebitFlag] = useState(false)
  const [debitAccFlag, setDebitAccFlag] = useState(false)

  //setting up for data
  const [amount, setAmount] = useState('')
  const [relatedAccounting, setRelatedAccounting] = useState('')
  const [date, setDate] = useState('')
  const [remark, setRemark] = useState('')

  const IncomeCreate = event => {
    // alert(JSON.stringify(jsonData));
    const data = {
      //   relatedAccounting: relatedAccounting,
      date: date,
      amount: amount,
      remark: remark
    }
    // console.log(jsonData);

    if (relatedCreditAccount) data.fromAcc = relatedCreditAccount
    if (relatedDebitAccount) data.toAcc = relatedDebitAccount
    if (fromType) data.fromAccType = fromType
    if (toType) data.toAccType = toType

    // alert(JSON.stringify(data))
    // console.log(jsonData);
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    // alert(JSON.stringify(jsonData));
    axios
      .post(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/journal",
        // 'http://localhost:9000/api/journal',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Journal Entry Data!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        window.location.reload()
        // props.setJournalEntryLists([...props.journalEntryLists, response.data.list[0]])
      })

    props.close()
  }

  //NOTE For Credit
  const handleAccountHeader = async event => {
    setRelatedCreditType(event)
    console.log(relatedCreditType, 'type')
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setCreditHeading(res.data.data)

    setFlag(true)
    console.log(setCreditHeading, 'heading')
  }

  const handleAccount = async event => {
    console.log(event, 'acc iD')

    setRelatedCreditHeader(event)
    console.log(event, 'acc iD')
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setCreditAccount(res.data.data)

    setAccFlag(true)
    console.log(setCreditAccount, 'Acc')
  }
  const handleInputAcc = event => {
    
    setRelatedCreditAccount(event)
    console.log(event, 'Credit Account ID')


  }

  //End For Credit

  //NOTE For Debit
  const handleDebitAccountHeader = async event => {
    setRelatedDebitType(event)
    console.log(relatedCreditType, 'type')
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')

    setDebitHeading(res.data.data)
    setDebitFlag(true)
    console.log(setDebitHeading, 'heading')
  }

  const handleDebitAccount = async event => {
    console.log(event, 'acc iD')

    setRelatedDebitHeader(event)
    console.log(event, 'acc iD')
    const url = `http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists/related/${event}`
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data.data, 'res.data.data')
    setDebitAccount(res.data.data)
    setDebitAccFlag(true)
    console.log(setDebitAccount, 'Acc')
  }
  const handleDebitInputAcc = event => {
    setRelatedDebitAccount(event)
  }

  //End For Debit

  const handleCalculation = event => {
    if (initialCurrency === 'MMK') {
      console.log(finalCurrency)
      let current = currencyList.filter(currency => currency.code === event)[0]
        .exchangeRate
      console.log(current)
      let ans = initialAmount / current
      setFinalAmount(ans.toFixed(2))
      console.log(ans)
    } else if (initialAmount != 'MMK') {
      let current = currencyList.filter(
        currency => currency.code === initialCurrency
      )[0].exchangeRate
      // console.log(initialAmount);
      // console.log(current);
      let ans = initialAmount * current
      setFinalAmount(ans.toFixed(2))
      console.log(finalAmount)
    }
    setFinalCurrency(event)
    console.log(initialAmount, 'Thate chit mi thwr p')
    if (initialCurrency == event) setFinalAmount(initialAmount)
  }

  useEffect(() => {
    const getCashLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )

        const cash = res.data.list.filter(
          el =>
            el.relatedHeader.name == 'Cash In Hand' &&
            el.relatedType.name === 'Assets'
        )
        setCashList(cash)
      } catch (err) {}
    }

    const getBankLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )

        const bank = res.data.list.filter(
          el =>
            el.relatedHeader.name == 'Cash At Bank' &&
            el.relatedType.name === 'Assets'
        )
        setBankList(bank)
      } catch (err) {}
    }

    const getType = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-types'
        )

        // setInitialAmount(medicineSale[0].amount);
        setCreditType(res.data.list)
        setDebitType(res.data.list)

        // setAccountingList(res.data.list)
      } catch (err) {}
    }
    // const getHeading = async () => {
    //   try {
    //     const res = await axios.get(
    //       'http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-headers'
    //     )

    //     setCreditHeading(res.data.list)
    //     setDebitHeading(res.data.list)
    //   } catch (err) {}
    // }
    const getAccount = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )

        setCreditAccount(res.data.list)
        setDebitAccount(res.data.list)
      } catch (err) {}
    }

    getBankLists()
    getAccount()
    getCashLists()
    getType()
    // getHeading()
    // getHeaderLists();
    // getAccountingLists()
    // getCurrencyLists();
  }, [])

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      className='my-modal
'
    >
      <DialogTitle>
        <div className='modal-header bg-info'>
          <h4 className='modal-title'>Journal Entry Create</h4>
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
      <DialogContent style={{ width: '500px' }}>
        <DialogContentText></DialogContentText>
        <div>
          <label className=''>From Account</label>
          <div className='form-group mt-3 px-3' id='bankkk'>
            <label className='text-gray'>Type</label>

            <select
              className='form-control'
              name='bank_acc'
              id='bank_acc'
              onChange={e => setFromType(e.target.value)}
            >
              <option value=''>Select Type</option>

              <option value='Credit'>Credit</option>
              <option value='Debit'>Debit</option>
            </select>
          </div>
          <div className='form-group mt-3 px-3' id='bankkk'>
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
          </div>
          {flag && (
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
          )}
          {accFlag && (
            <div className='form-group mt-3 px-3' id='bankkk'>
              <label className='text-gray'>Account</label>

              <select
                className='form-control'
                name='bank_acc'
                id='bank_acc'
                onChange={e => handleInputAcc(e.target.value)}
              >
                <option value=''>Select Account</option>

                {creditAccount.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className=''>To Account</label>
          <div className='form-group mt-3 px-3' id='bankkk'>
            <label className='text-gray'>Type</label>

            <select
              className='form-control'
              name='bank_acc'
              id='bank_acc'
              onChange={e => setToType(e.target.value)}
            >
              <option>Select Type</option>

              <option value='Credit'>Credit</option>
              <option value='Debit'>Debit</option>
            </select>
          </div>
          <div className='form-group mt-3 px-3' id='bankkk'>
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
          </div>
          {debitFlag && (
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
          )}
          {debitAccFlag && (
            <div className='form-group mt-3 px-3' id='bankkk'>
              <label className='text-gray'>Account</label>

              <select
                className='form-control'
                name='bank_acc'
                id='bank_acc'
                onChange={e => handleDebitInputAcc(e.target.value)}
              >
                <option value=''>Select Account</option>

                {debitAccount.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className='form-group'>
          <label className='control-label'>Amount</label>

          <input
            type='number'
            className='form-control'
            name='amount'
            id='convert_amount'
            onChange={event => setAmount(event.target.value)}
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
            onChange={e => setDate(e.target.value)}
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
            onChange={e => setRemark(e.target.value)}
          />
        </div>
        <div className='row'>
          <div className='col-md-9 mt-4'>
            <button
              type='submit'
              className='btn btn-success'
              onClick={IncomeCreate}
            >
              Submit
            </button>
            <button
              type='button'
              className='btn btn-inverse btn-dismiss'
              data-dismiss='modal'
              onClick={props.close}
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
// phyo
//maymyat
