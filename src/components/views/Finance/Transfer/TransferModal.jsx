/* eslint-disable */
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
const uri = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/'

export default function TransferModal(props) {
  const [fromList, setFromList] = useState([])
  const [toList, setToList] = useState([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [remark, setRemark] = useState('')

  //for from bank Acc
  const [fromBankList, setFromBankList] = useState([])
  const [fromCashList, setFromCashList] = useState([])

  const [showFromBank, setShowFromBank] = useState(false)
  const [showFromCash, setShowFromCash] = useState(false)
  const [showFromOrigin, setShowFromOrigin] = useState(true)

  const [fromBank, setFromBank] = useState('')
  const [fromCash, setFromCash] = useState('')

  //end

  //for to Bank Acc
  const [toBankList, setToBankList] = useState([])
  const [toCashList, setToCashList] = useState([])

  const [showToBank, setShowToBank] = useState(false)
  const [showToCash, setShowToCash] = useState(false)
  const [showToOrigin, setShowToOrigin] = useState(true)

  const [toBank, setToBank] = useState('')
  const [toCash, setToCash] = useState('')

  //end
  const postTransfer = () => {
    let data = {
      date: date,
      //   fromAcc: from,
      //   toAcc: to,
      amount: amount,
      remark: remark
    }
    if (fromBank) {
      data.fromAcc = fromBank
    } else {
      data.fromAcc = fromCash
    }
    if (toBank) {
      data.toAcc = toBank
    } else {
      data.toAcc = toCash
    }
    axios.post(uri + 'transfer', data).then(response => {
      console.log(response.data)
      Swal.fire({
        title: 'Success',
        text: 'Successfully Transfer',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // props.setTransferList([...props.transferList,response.data.data[0]])
      // window.location.reload()
    })
  }

  //for show from
  const handleFromBank = () => {
    setShowFromBank(true)
    setShowFromCash(false)
    setShowFromOrigin(false)
  }

  const handleFromCash = () => {
    setShowFromBank(false)
    setShowFromCash(true)
    setShowFromOrigin(false)
    console.log('done')
  }

  //end
  //for show To
  const handleToBank = () => {
    setShowToBank(true)
    setShowToCash(false)
    setShowToOrigin(false)
  }

  const handleToCash = () => {
    setShowToBank(false)
    setShowToCash(true)
    setShowToOrigin(false)
  }
  //end

  useEffect(() => {
    const getCashLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
         // 'http://localhost:9000/api/accounting-lists'
        )

        const cash = res.data.list.filter(
          el =>
            el.relatedSubHeader.name == 'Cash' &&
            el.relatedHeader.name == 'Current Asset' &&
            el.relatedType.name === 'Assets'
        )
        console.log('cash', cash)
        setFromCashList(cash)
        setToCashList(cash)
      } catch (err) {}
    }

    const getBankLists = async () => {
      try {
        const res = await axios.get(
          //'http://centralclinicbackend.kwintechnologykw11.com:3000/api/banks'
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )

        const bank = res.data.list.filter(
          el =>
          el.relatedSubHeader.name == 'Bank' &&
            el.relatedHeader.name == 'Current Asset' &&
            el.relatedType.name === 'Assets'
        )
        setFromBankList(bank)
        setToBankList(bank)
      } catch (err) { }
    }

    getBankLists()
    getCashLists()
  }, [])

  return (
    <div>
      {/* {console.log('props',props.bankList, props.cashList)} */}
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>
          {' '}
          <div className='modal-header'>
            <h4 className='modal-title'>Transfer</h4>
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

          {/* @csrf */}
          <div className='form-group mt-3'>
            <label className='control-label'>From</label>
            <div className='row'>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-check form-check-inline mt-2 '>
                      <input
                        className='form-check-input'
                        type='radio'
                        onClick={handleFromBank}
                        name='from'
                      />
                      &nbsp;
                      <label
                        className='form-check-label text-success'
                        for='bank'
                      >
                        Bank
                      </label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-check form-check-inline mt-2 px-4'>
                      <input
                        className='form-check-input'
                        type='radio'
                        onClick={handleFromCash}
                        name='from'
                      />
                      <label
                        className='form-check-label text-success'
                        for='cash'
                      >
                        Cash
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {showFromOrigin && (
                <div className='col-md-6'>
                  <select className='form-control' name='exp_acc'>
                    <option value=''>Select Account</option>
                  </select>
                </div>
              )}
              {showFromBank && (
                <div className='col-md-6'>
                  <select
                    className='form-control'
                    name='exp_acc'
                    onChange={e => setFromBank(e.target.value)}
                  >
                    <option value=''>Select From Account </option>
                    {fromBankList.map(option => (<>
                      {console.log(fromBank)}
                      <option value={option._id}>{option.name}</option>
                    </>

                    ))}
                  </select>
                </div>
              )}

              {showFromCash && (
                <div className='col-md-6'>
                  <select
                    className='form-control'
                    name='exp_acc'
                    onChange={e => setFromCash(e.target.value)}
                  >
                    <option value=''>Select From Account</option>
                    {fromCashList.map(option => (
                      <option value={option._id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className='form-group mt-3'>
            <label className='control-label'>To</label>
            <div className='row'>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-check form-check-inline mt-2 '>
                      <input
                        className='form-check-input'
                        type='radio'
                        onClick={handleToBank}
                        name='to'
                      />
                      &nbsp;
                      <label
                        className='form-check-label text-success'
                        for='bank'
                      >
                        Bank
                      </label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-check form-check-inline mt-2 px-4'>
                      <input
                        className='form-check-input'
                        type='radio'
                        onClick={handleToCash}
                        name='to'
                      />
                      <label
                        className='form-check-label text-success'
                        for='cash'
                      >
                        Cash
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {showToOrigin && (
                <div className='col-md-6'>
                  <select className='form-control' name='exp_acc'>
                    <option value=''>Select To Account</option>
                  </select>
                </div>
              )}

              {showToBank && (
                <div className='col-md-6'>
                  <select
                    className='form-control'
                    name='exp_acc'
                    onChange={e => setToBank(e.target.value)}
                  >
                    <option value=''>Select To Account</option>
                    {toBankList.map(option => (
                      <>
                        {console.log(toBank)}
                        <option value={option._id}>{option.name}</option>
                      </>
                    ))}
                  </select>
                </div>
              )}

              {showToCash && (
                <div className='col-md-6'>
                  <select
                    className='form-control'
                    name='exp_acc'
                    onChange={e => setToCash(e.target.value)}
                  >
                    <option value=''>Select To Account</option>
                    {toCashList.map(option => (
                      <option value={option._id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

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
            <label className='control-label'>Amount</label>
            <input
              type='number'
              className='form-control'
              name='remark'
              onChange={e => setAmount(e.target.value)}
            />
          </div>

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
                onClick={e => {
                  props.setOpen(false)
                  postTransfer()
                }}
              >
                Submit
              </button>
              <button
                type='button'
                className='btn btn-inverse btn-dismiss'
                data-dismiss='modal'
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
