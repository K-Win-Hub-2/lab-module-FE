/* eslint-disable */
import {
  FaCashRegister,
  FaFileMedical,
  FaFileExcel,
  FaAngleDown,
  FaAngleUp,
  FaList,
  FaRegUser,
  FaClipboardCheck,
  FaPowerOff
} from 'react-icons/fa'


import React, { useState, useEffect } from 'react'
import SideBar from '../SideBar'
import styled from 'styled-components'
import { AiFillInfoCircle } from 'react-icons/ai'
import axios from 'axios'
import ExportVoucher from '../ExportVoucher'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
// import RePayDialog from '../../components/views/RePayDialog';


const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`

const Left = styled.div`
  font-weight: normal;
  flex: 1;
`


const Title = styled.h5`
  font-weight: bold;
  margin-top: 10px;
`





const Div = styled.div``

const Table = styled.table``
const Thead = styled.thead``
const Tbody = styled.tbody``
const Tr = styled.tr`
  text-align: center;
`
const Th = styled.th`
  font-size: 15px;
`
const Td = styled.td`
  font-size: 14px;
`


const TestVoucherList = () => {
  const [vouchers, setVouchers] = useState([])
  const[filteredVouchers,setFilteredVouchers] = useState([]);
  const [medRelated, setMedRelated] = useState([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [name, setName] = useState('')
  const [array, setArray] = useState([])
  const [isShow, setIsShow] = useState([])
  const [vouCode, setVouCode] = useState('')
  const [voucherType,setVoucherType] = useState('');
  const[totalVoucher,setTotalVoucher] = useState(0);
  const[totalCashDown,setTotalCashDown] = useState(0);
  const[totalCredit,setTotalCredit] = useState(0);

  const handleRelated = val => {
    const getRelated = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/' +
            val
        )

        console.log(res.data.data, 'related')
        setMedRelated(res.data.data.relatedTransaction)
        setVouCode(res.data.data);
      } catch (err) {
        alert(err.message)
      }
    }


    getRelated()

    if (isShow) {
      document.getElementById('toggle' + val).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + val).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/today'
        )
        console.log(res.data.data)
        setVouchers(res.data.data)
        setFilteredVouchers(res.data.data)
        
      } catch (error) {
        Swal.fire({
          title: 'Data not found for this day',
          text: error,
          icon: 'warning',
          confirmButtonText: 'CANCEL'
        })
      }
    }
    getVouchers()
  }, [])

  useEffect(()=>{
    setTotalVoucher(0)
    setTotalCashDown(0)
    setTotalCredit(0)
    filteredVouchers.map((vou,index)=>{
      console.log(vou.totalCharge)
      setTotalVoucher(totalVoucher + vou.totalCharge);
      setTotalCredit(totalCredit + (vou.creditAmount * (-1)))
      setTotalCashDown(totalVoucher-totalCredit)
    })
  },filteredVouchers);

  const search = async () => {
    const result = await axios.get(
      'http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers'
    )
    console.log(result.data.data)
    if (name == '') {
      setVouchers(
        result.data.data.filter(
          el => el.date >= from && el.date.split('T')[0] <= to
        )
      )
      setFilteredVouchers(
        result.data.data.filter(
          el => el.date >= from && el.date.split('T')[0] <= to
        )
      )

    }
    else {
      
      setVouchers(
        result.data.data.filter(
          el =>
            el.date >= from &&
            el.date.split('T')[0] <= to &&
            el.relatedPatient.name == name
        )
      )
      setFilteredVouchers(
        result.data.data.filter(
          el =>
            el.date >= from &&
            el.date.split('T')[0] <= to &&
            el.relatedPatient.name == name
        )
      )
    }
    vouchers.map((el, i) => {
      const obj = {
        No: ++i,
        'Voucher Date': el.date.split('T')[0],
        'Voucher Code': el.code,
        'Patient Name': el.relatedPatient.name,
        'Test Qty': el.testSelection.length,
        Amount: el.totalCharge
      }
      setArray(array => [...array, obj])
    })
  }

  const handleTypeSearch = (value)=>{
    setVoucherType(value);
    if(value == "cashdown"){
      setFilteredVouchers(
        vouchers.filter(
          el =>
            el.creditAmount == 0
        )
      )
    }else if(value == "credit"){
      setFilteredVouchers(
        vouchers.filter(
          el =>
            el.creditAmount < 0
        )
      )
    }else{
      setFilteredVouchers(vouchers);
    }
  }
  return (
    <div className='wrapper'>
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className='content-wrapper'>
        {/* <!-- Content Header (Page header) --> */}
        <div className='content-header'>
          <div className='container-fluid'>
            <Top>
              <Left>
                <Title>Test Voucher List</Title>
              </Left>
            </Top>
            <Div className='card'>
              <Div className='card-body'>
                <Top>
                  <Left>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='row'>
                          <div className='col-4'>
                            <label htmlFor=''>From:</label>
                            <input
                              type='date'
                              placeholder='Search...'
                              className='form-control'
                              onChange={e => setFrom(e.target.value)}
                            />
                          </div>
                          <div className='col-4'>
                            <label htmlFor=''>To:</label>
                            <input
                              type='date'
                              placeholder='Search...'
                              className='form-control'
                              onChange={e => setTo(e.target.value)}
                            />
                          </div>

                          <div className='col-4' style={{ marginTop: "7vh" }}>
                          
                          <select
                className="form-control"
                name="vou_type"
                id="vou_type"
                onChange={(e) => handleTypeSearch(e.target.value)}>
                <option value="">Select Type</option>
                  <option value="all">All</option>
                  <option value="cashdown">Cash Down</option>
                  <option value="credit">Credit</option>
              </select>
                          
                          </div>
                          {/* <div
                            className="col-md-2"
                            style={{ marginTop: "35px" }}>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={DateFilter}>
                              Filter
                            </button>
                          </div> */}
                        </div>
                      </div>

                      <div className='col-6'>
                        <div className='row'>
                          <div className='offset-3 col-5'>
                            {/* <label htmlFor=''>Patient Name:</label> */}
                            <input
                              type='text'
                              placeholder='Search by patient name...'
                              style={{ marginTop: "31px" }}
                              className='form-control'
                              onChange={e => setName(e.target.value)}
                            />
                          </div>

                          

                          
                          <div className='col-4' style={{ marginTop: '35px' }}>
                            <button
                              className='btn btn-sm btn-primary'
                              onClick={search}
                            >
                              Search
                            </button>
                            
                            <ExportVoucher
                              excelData={array}
                              
                              fileName={'Excel Export'}
                            />
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </Left>
                </Top>
                <Table className='table table-hover mt-5'>
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Voucher Date</Th>
                      <Th>Voucher Code</Th>
                      <Th>Refer Doctor</Th>
                      <Th>Patient Name</Th>
                      <Th>Test Qty</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th className=''>Action</Th>
                    </Tr>
                  </Thead>

                  {filteredVouchers.map((vou, index) => (
                    <Tbody key={vou._id}>
                      <Tr>
                        <Td>{++index}</Td>
                        <Td>{vou.date ? vou.date.split('T')[0] : ''}</Td>
                        <Td>{vou.code}</Td>
                        <Td>{vou.referDoctor ? vou.referDoctor.name : ''}</Td>
                        <Td>
                          {vou.relatedPatient ? vou.relatedPatient.name : ''}
                        </Td>
                        <Td>{vou.testSelection.length}</Td>
                        <Td>{vou.totalCharge}</Td>
                        <Td>
                          {vou.creditAmount ? (
                            <div className='badge badge-warning px-3 py-2'>
                              Credit
                            </div>
                          ) : (
                            <div className='badge badge-success px-3 py-2'>
                              Paid
                            </div>
                          )}
                        </Td>
                        {/* <Td><Link to={'/test/'+vou._id} className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{ marginLeft: '7px' }} /></Link></Td> */}
                        <Td>
                          <Link
                            to={'/testslip/' + vou._id}
                            className='btn btn-sm btn-primary float-left'
                          >
                            Detail
                            <AiFillInfoCircle style={{ marginLeft: '7px' }} />
                          </Link>
                          &nbsp;
                          <button
                            type='button'
                            className='btn btn-sm btn-primary'
                            onClick={() => handleRelated(vou._id)}
                          >
                            Related
                          </button>
                        </Td>
                      </Tr>
                      <Tr
                        className='bg-gradient-light'
                        id={'toggle' + vou._id}
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

                            {medRelated ? (
                              medRelated.map((tran, i) => (
                                <div class='row'>
                                  <div class='col-md-2'>
                                    <div style={{ fontSize: '15px' }}>
                                      {++i}
                                    </div>
                                  </div>
                                  <div class='col-md-3'>
                                    <div style={{ fontSize: '15px' }}>
                                      {tran.type === 'Credit' && (
                                        <div>
                                        {vouCode.relatedTransaction ? vouCode.relatedTransaction.code : ''
}
                                        </div>
                                      
)}

                                      {tran.type === 'Debit' &&
                                        (tran.relatedBank ? 'Bank' : 'Cash')}
                                    </div>
                                  </div>
                                  <div class='col-md-2'>{tran.type}</div>
                                  <div class='col-md-2'>
                                    <div style={{ fontSize: '15px' }}>
                                      {tran.date ? tran.date.split('T')[0]
 : ''}
                                    </div>
                                  </div>
                                  <div class='col-md-2'>
                                    <div style={{ fontSize: '15px' }}>
                                      {tran.amount}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className='row'>
                                <div className='col-md-12'>
                                  'No Record found!'
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>

                <Top>
                  <Left>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='row'>
                          <div className='col-4'>
                            <label htmlFor=''>Total Voucher:</label>
                            {/* <input
                              type='number'
                              placeholder='Search...'
                              disabled
                              className='form-control'
                              value={totalVoucher}
                            /> */}
                            <lable htmlFor='' style={{ fontSize: '17px',marginLeft: '3px' }}>{totalVoucher}</lable>
                          </div>
                          <div className='col-4'>
                            <label htmlFor=''>Total Cash Down:</label>
                            {/* <label 
                              type='number'
                              placeholder='Search...'
                              disabled
                              className='form-control'
                              value={totalCashDown}
                            /> */}
                            <lable htmlFor='' style={{ fontSize: '17px',marginLeft: '3px' }}>{totalCashDown}</lable>
                          </div>
                
                          <div className='col-4'>
                            <label htmlFor=''>Total Credit:</label>
                            {/* <input
                              type='number'
                              placeholder='Search...'
                              disabled
                              className='form-control'
                              value={totalCredit}
                            /> */}
                            <lable htmlFor='' style={{ fontSize: '17px',marginLeft: '3px' }}>{totalCredit}</lable>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Left>
                </Top>
              </Div>
            </Div>
          </div>
          {/* <RePayDialog
            open={open}
            close={() => setOpen(false)}
            id={id}
            setOpen={setOpen}
            setVouchers={setVouchers}
            vouchers={vouchers}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default TestVoucherList