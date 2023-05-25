/* eslint-disable */
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

// import { translateRect } from '../../plugins/fullcalendar/main.d';

function MedicineSale() {
  const uri = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/'
  //const uri = 'http://localhost:9000/api/';
  const [tranList, setTranList] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [payFilterList, setPayFilterList] = useState([])
  const [show, setShow] = useState(false)
  const [origin, setOrigin] = useState(true)
  const [relatedTranList, setRelatedTranList] = useState([])

  const [accList, setAccList] = useState([])
  const [bank, setBank] = useState([])
  const [other, setOther] = useState([])

  const [cash, setCash] = useState([])
  const [status, setStatus] = useState([])
  const [credit, setCredit] = useState([])
  const [debit, setDebit] = useState([])
  const [type, setType] = useState([])
  const [showType, setShowType] = useState(false)

  const paymentFilter = event => {
    setStatus(event)
    switch (event) {
      case 'Bank': {
        handleBank()

        break
      }
      case 'Cash': {
        handleCash()

        break
      }
      case 'Other': {
        handleOther()

        break
      }
      default:
        return event
    }
  }

  const handleBank = event => {
    // const bankArray = accList.filter(
    //   el => el.relatedHeader.name === 'Cash At Bank'
    // )
    setBank(accList.filter(el => el.relatedHeader.name === 'Cash At Bank'))
  }
  const handleCash = event => {
    // const cashArray = accList.filter(
    //   el => el.relatedHeader.name === 'Cash In Hand'
    // )
    setCash(accList.filter(el => el.relatedHeader.name === 'Cash In Hand'))
  }

  const handleOther = event => {
    // const otherArray = accList
    setOther(accList)
  }

  const filter = id => {
    console.log(id, 'id')
    const getRelatedTran = async () => {
      axios.get(uri + 'transactions/related/' + id).then(response => {
        setRelatedTranList(response.data.data)
      })
    }

    getRelatedTran()
    setOrigin(false)
    setShow(true)
    setType(false)
  }

  const search = async () => {
    const result = await axios.get(uri + 'transactions')
    if (startDate && endDate) {
      setTranList(
        result.data.list.filter(
          el =>
            (el.date ? el.date.split('T')[0] : '') >= startDate &&
            (el.date ? el.date.split('T')[0] : '') <= endDate
        )
      )
      console.log(tranList, 'date filter')
      setShow(false)
      setOrigin(true)
    }
  }

  const typeFilter = event => {
    console.log(event, 'type ')
    setType(event)
    switch (event) {
      case 'Credit': {
        handleCredit()

        break
      }
      case 'Debit': {
        handleDebit()

        break
      }

      default:
        return event
    }
  }
  const handleCredit = event => {
    setCredit(tranList.filter(el => el.type === 'Credit'))
    console.log(
      tranList.filter(el => el.type === 'Credit'),
      'credit'
    )
    setOrigin(false)
    setShow(false)
    setShowType(true)
  }
  const handleDebit = event => {
    setDebit(tranList.filter(el => el.type === 'Debit'))
    setOrigin(false)
    setShow(false)
    setShowType(false)
  }

  useEffect(() => {
    const getTransaction = async () => {
      axios.get(uri + 'transactions?limit=100').then(response => {
        setTranList(response.data.list)
        console.log(response.data.list, 'tran list')
      })
    }

    const getAccList = async () => {
      axios.get(uri + 'accounting-lists').then(response => {
        setAccList(response.data.list)
      })
    }

    getAccList()
    getTransaction()
  }, [])
  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Navbar --> */}

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
                      <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                      All Transaction List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='row d-flex justify-content-between px-1'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='form-group col-md-3'>
                  <label className='px-2'>From</label>
                  <input
                    type='date'
                    name='from'
                    id='from'
                    className='form-control'
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div className='form-group col-md-3'>
                  <label className='px-2'>To</label>
                  <input
                    type='date'
                    name='to'
                    id='to'
                    className='form-control'
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
                <div className='col-md-2'>
                  <button
                    className='btn btn-sm btn-primary form-control'
                    style={{ marginTop: '33px' }}
                    onClick={search}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='row'>
                <div
                  className='
 col-md-4'
                  style={{ marginTop: '2.5em' }}
                >
                  <select
                    class='custom-select border-info'
                    name='account_type_id'
                    onChange={e => typeFilter(e.target.value)}
                  >
                    <option>Choose Type</option>
                    <option value='Credit'>Credit</option>
                    <option value='Debit'>Debit</option>
                  </select>
                </div>
                <div
                  className='
 col-md-4'
                  style={{ marginTop: '2.5em' }}
                >
                  <select
                    class='custom-select border-info'
                    name='account_type_id'
                    onChange={e => paymentFilter(e.target.value)}
                  >
                    <option>Payment Method</option>
                    <option value='Bank'>Bank</option>
                    <option value='Cash'>Cash</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                <div
                  className='
 col-md-4'
                  style={{ marginTop: '2.5em' }}
                >
                  <select
                    class='custom-select border-info'
                    name='account_type_id'
                    onChange={e => filter(e.target.value)}
                  >
                    <option>Choose Related</option>
                    {status == 'Bank' &&
                      bank.map(option => (
                        <option value={option._id}>{option.name}</option>
                      ))}
                    {status == 'Cash' &&
                      cash.map(option => (
                        <option value={option._id}>{option.name}</option>
                      ))}

                    {status == 'Other' &&
                      other.map(option => (
                        <option value={option._id}>{option.name}</option>
                      ))}

                    {/* {accList.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))} */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content --> */}
          <div className='row px-1'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-header'>
                  {/* <h3 className='card-title'>Treatment Voucher List</h3> */}
                </div>
                <div className='card-body'>
                  <table id='example1' className='table'>
                    <thead className=' bg-info'>
                      <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Account</th>
                        {/* <th>Related Treatment</th> */}
                        <th>Type</th>
                        <th>Amount</th>

                        <th>Remark</th>
                      </tr>
                    </thead>

                    {origin &&
                      tranList.map((tSale, i) => (
                        <tbody key={tSale._id}>
                          <tr>
                            <td>{++i}</td>
                            <td>
                              {tSale.date ? tSale.date.split('T')[0] : ''}
                            </td>
                            <td>
                              {tSale.relatedBank
                                ? tSale.relatedBank.name
                                : '' || tSale.relatedAccounting
                                ? tSale.relatedAccounting.name
                                : '' || tSale.relatedCash
                                ? tSale.relatedCash.name
                                : ''}
                            </td>
                            <td>{tSale.type}</td>
                            <td>{tSale.amount}</td>
                            <td>{tSale.remark}</td>
                          </tr>
                        </tbody>
                      ))}

                    {showType &&
                      (type == 'Credit'
                        ? credit.map((tSale, i) => (
                            <tbody key={tSale._id}>
                              <tr>
                                <td>{++i}</td>
                                <td>
                                  {tSale.date ? tSale.date.split('T')[0] : ''}
                                </td>

                                <td>
                                  {tSale.relatedBank
                                    ? tSale.relatedBank.name
                                    : '' || tSale.relatedAccounting
                                    ? tSale.relatedAccounting.name
                                    : '' || tSale.relatedCash
                                    ? tSale.relatedCash.name
                                    : ''}
                                </td>
                                <td>{tSale.type}</td>
                                <td>{tSale.amount}</td>
                                <td>{tSale.remark}</td>
                              </tr>
                            </tbody>
                          ))
                        : debit.map((tSale, i) => (
                            <tbody key={tSale._id}>
                              <tr>
                                <td>{++i}</td>
                                <td>
                                  {tSale.date ? tSale.date.split('T')[0] : ''}
                                </td>
                                <td>
                                  {tSale.relatedBank
                                    ? tSale.relatedBank.name
                                    : '' || tSale.relatedAccounting
                                    ? tSale.relatedAccounting.name
                                    : '' || tSale.relatedCash
                                    ? tSale.relatedCash.name
                                    : ''}
                                </td>

                                <td>{tSale.type}</td>
                                <td>{tSale.amount}</td>
                                <td>{tSale.remark}</td>
                              </tr>
                            </tbody>
                          )))}

                    {show &&
                      relatedTranList.map((tSale, i) => (
                        <tbody key={tSale._id}>
                          <tr>
                            <td>{++i}</td>
                            <td>
                              {tSale.date ? tSale.date.split('T')[0] : ''}
                            </td>
                            <td>
                              {tSale.relatedBank
                                ? tSale.relatedBank.name
                                : '' || tSale.relatedAccounting
                                ? tSale.relatedAccounting.name
                                : '' || tSale.relatedCash
                                ? tSale.relatedCash.name
                                : ''}
                            </td>

                            <td>{tSale.type}</td>
                            <td>{tSale.amount}</td>
                            <td>{tSale.remark}</td>
                          </tr>
                        </tbody>
                      ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <MedicineSaleDialog
            open={open}
            close={() => setOpen(false)}
            setOpen={setOpen}
            grand={grand}
          /> */}
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
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default MedicineSale
