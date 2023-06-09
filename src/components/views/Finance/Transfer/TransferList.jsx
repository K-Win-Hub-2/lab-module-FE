/* eslint-disable */

import { useEffect, useState } from 'react'
import TransferModal from '../Transfer/TransferModal'
import axios from 'axios'
import Swal from 'sweetalert2'
import SideBar from '../../SideBar'
const uri = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/'
//const uri = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api/';
export default function TransferList() {
  const [transferList, setTransferList] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [open, setOpen] = useState(false)
  const [bankList, setBankList] = useState([])
  const [cashList, setCashList] = useState([])

  const handleModalBox = event => {
    setOpen(true)
  }

  const filter = event => {
    let data = {
      start: startDate,
      end: endDate
    }
    axios
      .get(uri + 'logs/filter', { params: data })
      .then(response => {
        // setTodayList([])
        setTransferList(response.data.data)
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
    const getBankList = async () => {
      axios
        .get(uri + 'accounting-lists')
        .then(response => {
          console.log('response', response.data.list)
          const filteredArray = response.data.list.filter(
            obj => obj.relatedHeader.name === 'Cash At Bank'
          )
          setBankList(filteredArray)
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

    const getCashList = async () => {
      axios
        .get(uri + 'accounting-lists')
        .then(response => {
          const filteredArray = response.data.list.filter(
            obj => obj.relatedHeader.name === 'Cash In Hand'
          )
          console.log(filteredArray, 'cash')
          setCashList(filteredArray)
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

    const getTransferList = async () => {
      axios
        .get(uri + 'transfers?limit=50')
        .then(response => {
          console.log(response.data.data, 'transfer list')
          setTransferList(response.data.data)
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

    getBankList()
    getCashList()
    getTransferList()
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
                      <a href='/'>Home</a>
                    </li>
                    <li className='breadcrumb-item active'>Transfer List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                <div className='form-group col-md-3 ml-1'>
                  <label>From</label>
                  <input
                    type='date'
                    name='from'
                    id='from'
                    className='form-control'
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div className='form-group col-md-3'>
                  <label>To</label>
                  <input
                    type='date'
                    name='to'
                    id='to'
                    className='form-control'
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
                <div className='form-group col-md-2'>
                  <button
                    className='btn btn-sm btn-primary form-control'
                    style={{ marginTop: '33px' }}
                    onClick={filter}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content --> */}
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-header'>
                  <div className='row d-flex justify-content-between'>
                    <div className='form-group col-md-2'>
                      <h2 className='card-title mt-3'>
                        <b>Transfer List</b>
                      </h2>
                    </div>
                    <div className='form-group col-md-1 mt-2'>
                      <button
                        className='btn btn-sm btn-success'
                        onClick={handleModalBox}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
                <div className='card-body px-3'>
                  <table id='example1' className='table'>
                    <thead className=' bg-info'>
                      <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>From Acc</th>
                        {/* <th>Related Treatment</th> */}
                        <th>To Acc</th>
                        <th>Remark</th>

                        <th>Amount</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>
                    <>
                      {transferList.map((e, i) => (
                        <tbody key={e._id}>
                          <tr>
                            <td>{++i}</td>
                            <td>{e.date ? e.date.split('T')[0] : ''}</td>
                            <td>{e.fromAcc?.name}</td>
                            <td>{e.toAcc?.name}</td>
                            <td>{e.remark ? e.remark : ''}</td>
                            <td>{e.amount ? e.amount : ''}</td>
                            <td className='text-center'>
                              <button class='btn btn-primary btn-sm'>
                                Related
                              </button>
                            </td>
                          </tr>

                          <tr
                            className='bg-gradient-light'
                            id={'toggle' + e._id}
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
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <TransferModal
            open={open}
            close={() => setOpen(false)}
            setOpen={setOpen}
            setTransferList={setTransferList}
            transferList={transferList}
            bankList={bankList}
            cashList={cashList}
          />
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
