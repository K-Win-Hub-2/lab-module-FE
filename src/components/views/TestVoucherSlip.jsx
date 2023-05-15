import React, { useState, useEffect, useRef } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import axios from 'axios';
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print'



const Top = styled.div`
display : flex;
  justify-content: space-between;
margin : 10px 0;
`;

const Left = styled.div`
font-weight : normal;
  flex: 1;
`;

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
`





const Div = styled.div`
`

const Table = styled.table`
`
const Thead = styled.thead`
`
const Tbody = styled.tbody`
`
const Tr = styled.tr`
text-align:center;
`
const Th = styled.th`
font-size:15px;
`
const Td = styled.td`
  font-size: 14px;
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

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

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
                      NO.51 A,Min Ye Kyaw Swar Road{' '}
                    </h6>
                    <p style={{ textAlign: 'center' }}>Ahlone Township</p>
                    <h6 className='mt-2'>Voucher Code : {code}</h6>
                    <h6>Voucher Date : {date}</h6>
                    <h6>Name : {name}</h6>
                    <h6>Age : {age}</h6>
                    <Table className='table table-hover'>
                      <Thead>
                        <Tr>
                          <Th>#</Th>
                          <Th style={{ marginLeft: '50px' }}>Name</Th>
                          <Th style={{ marginLeft: '50px' }}>Qty</Th>
                          <Th style={{ marginLeft: '50px' }}>Unit Charges</Th>
                          <Th style={{ marginLeft: '50px' }}>Sub Total</Th>
                        </Tr>
                      </Thead>
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
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Total
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {total}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Discount
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {discount}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            Net
                          </td>
                          <td colSpan={4} style={{ textAlign: 'right' }}>
                            {net}
                          </td>
                        </tr>
                        <tr>
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
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center' }}>
                            ***Thank You***
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                    {
  creditAmount == 0 && (

      <h5 style={{ textAlign: 'center' }} className='mt-3'>
        You paid your credit amount!
      </h5>

  )
}

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
