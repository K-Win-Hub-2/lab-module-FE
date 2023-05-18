/* eslint-disable */
import React, { Component, useState, useEffect, useRef } from 'react'
import SideBar from './SideBar'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import { bounce } from 'react-animation'

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
  border-style: hidden;
`
const Th = styled.th`
  font-size: 15px;
`
const Td = styled.td`
  font-size: 14px;
`

const Hr = styled.hr`
  border-style: solid;
  width: 50%;
`

const TestVoucherSlip = () => {
  const [vouchers, setVouchers] = useState([])
  const [total, setTotal] = useState('')
  const [discount, setDiscount] = useState('')
  const [net, setNet] = useState('')
  const [pay, setPay] = useState('')
  const [change, setChange] = useState('')
  const [code, setCode] = useState('')
  const [creditAmount, serCreditAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [doctor, setDoctor] = useState('')

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const today = new Date(Date.now()).toISOString()

  let componentRef = useRef()
  const vouid = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/' +
            vouid
        )
        console.log(res.data.data)
        setGender(res.data.data.relatedPatient.gender)
        setPhone(res.data.data.relatedPatient.phone)
        setVouchers(res.data.data.testSelection)
        setTotal(res.data.data.totalCharge)
        setDiscount(res.data.data.discount)
        setNet(res.data.data.netDiscount)
        setPay(res.data.data.pay)
        setChange(res.data.data.change)
        setCode(res.data.data.code)
        setDate(res.data.data.date)
        setName(res.data.data.relatedPatient.name)
        setAge(res.data.data.relatedPatient.age)
        serCreditAmount(res.data.data.creditAmount)
        setDoctor(res.data.data.referDoctor)
      } catch (error) {
        Swal.fire({
          title: 'Data not found for this day',
          text: 'Something Wrong',
          icon: 'warning',
          confirmButtonText: 'CANCEL'
        })
      }
    }
    getVouchers()
  }, [])

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
                <Title>Test Voucher</Title>
              </Left>
            </Top>

            <div className='row'>
              <div className='offset-3 col-6'>
                <Div className='card' ref={el => (componentRef = el)}>
                  <Div className='card-body' id='print'>
                    <h5 style={{ textAlign: 'center' }}>Central Laboratory</h5>
                    <h6 style={{ textAlign: 'center' }}>
                      NO.51 A,Min Ye Kyaw Swar Road ,Ahlone Township
                    </h6>
                    <div className='text-center'>
                      <b>09400400650</b>
                    </div>
                    <div className='text-center'>
                      <h5>
                        <b>Invoice</b>
                      </h5>
                    </div>
                    <br></br>
                    <div className='row'>
                      <div className='col-6'>
                        <h6>
                          Name :{' '}
                          <span className='float-right'>
                            {name} / {age}yrs
                          </span>
                        </h6>
                        <h6>
                          Phone No :
                          <span className='float-right'>{phone}</span>
                        </h6>
                        <h6>
                          Age :<span className='float-right'> {age}</span>
                        </h6>
                        <h6>
                          Gender : <span className='float-right'>{gender}</span>
                        </h6>
                      </div>
                      <div className='col-6'>
                        <h6>Inv. No : <span className='float-right'>{code?code:''}</span></h6>
                        <h6>Date : <span className='float-right'>{date ? date.split('T')[0]:''}</span></h6>
                        <h6>Printed : <span className='float-right'>{today.split('T')[0]}</span></h6>
                        <h6>Doctor : <span className='float-right'>{doctor ? doctor: '-'}</span></h6>
                      </div>
                    </div>
                    {/* <br/>
                    <div className='row'>
                      <div className='col-6 text-bold'>Name</div>
                      <div className='col-2 text-bold'>Qty</div>
                      <div className='col-2 text-bold'>Price</div>
                      <div className='col-2 text-bold'>Amt</div>
                    </div>
                    <hr></hr>
                    {vouchers.map((vou, index) => (
                      <div className='row' key={vou._id}>
                        <div className='col-6'>{vou.name.name}</div>
                        <div className='col-2'>{vou.qty}</div>
                        <div className='col-2'>{vou.unitCharge}</div>
                        <div className='col-2'>{vou.subCharge}</div>
                      </div>
                    ))} */}

                    <Table className='table table-hover text-right'>
                      <Thead>
                        <Tr>
                          <Th>#</Th>
                          <Th
                            style={{ marginLeft: '50px', textAlign: 'right' }}
                          >
                            Name
                          </Th>
                          <Th
                            style={{ marginLeft: '50px', textAlign: 'right' }}
                          >
                            Qty
                          </Th>
                          <Th
                            style={{ marginLeft: '50px', textAlign: 'right' }}
                          >
                            Price
                          </Th>
                          <Th
                            style={{ marginLeft: '50px', textAlign: 'right' }}
                          >
                            Amt
                          </Th>
                        </Tr>
                      </Thead>
                      <Hr></Hr>
                      <Tbody>
                        {vouchers.map((vou, index) => (
                          <Tr key={vou._id}>
                            <Td>{++index}</Td>
                            <Td
                              style={{ marginLeft: '50px', textAlign: 'right' }}
                            >
                              {vou.name.name}
                            </Td>
                            <Td
                              style={{ marginLeft: '50px', textAlign: 'right' }}
                            >
                              {vou.qty}
                            </Td>
                            <Td
                              style={{ marginLeft: '50px', textAlign: 'right' }}
                            >
                              {vou.unitCharge}
                            </Td>
                            <Td
                              style={{ marginLeft: '50px', textAlign: 'right' }}
                            >
                              {vou.subCharge}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <tfoot>
                        <tr style={{ borderStyle: 'hidden' }}>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Total
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {total}
                          </td>
                        </tr>
                        <tr style={{ borderStyle: 'hidden' }}>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Discount
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {discount}
                          </td>
                        </tr>
                        <tr style={{ borderStyle: 'hidden' }}>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Net
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {net}
                          </td>
                        </tr>
                        <tr style={{ borderStyle: 'hidden' }}>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Pay
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {pay}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Credit Amount
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {change}
                          </td>
                        </tr>

                        {/* {creditAmount == 0 && (
                          <>
                            <tr>
                              <td colSpan={4} style={{ textAlign: 'right' }}>
                                Credit Amount
                              </td>
                              <td colSpan={4} style={{ textAlign: 'right' }}>
                                0
                              </td>
                            </tr>
                          </>
                        )} */}
                        <Hr></Hr>
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              textAlign: 'center',
                              borderStyle: 'hidden'
                            }}
                          >
                            <b>
                              အ‌‌ဖြေလာရွေးလျှင် ငွေရှင်းပြေစာ ယူဆောင်လာပေးပါရန်
                            </b>
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                    {/* {
  creditAmount == 0 && (

      <h5 style={{ textAlign: 'center' }} className='mt-3'>
        You paid your credit amount!
      </h5>

  )
} */}
                  </Div>
                </Div>
                <ReactToPrint
                  trigger={() => (
                    <button
                      className='btn btn-m btn-primary'
                      style={{ marginLeft: '240px' }}
                    >
                      Print
                    </button>
                  )}
                  content={() => componentRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestVoucherSlip
