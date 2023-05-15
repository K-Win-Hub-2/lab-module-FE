/* eslint-disable */
import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import { AiFillInfoCircle } from 'react-icons/ai'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom'

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

const Btn = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  margin-left: 13px;
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

const Badge = styled.span`
  background: blue;
  padding: 1px 5px;
  color: white;
  border: none;
  border-radius: 4px;
`

const TestResultList = () => {
  const customStyles = {
    tabsPen: {
      border: '1px solid red' // Change this value to the desired color
    },
    tabsPro: {
      border: '1px solid yellow'
    },
    tabsFin: {
      border: '1px solid green'
    }
  }
  const [vouchers, setVouchers] = useState([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [name, setName] = useState('')

 useEffect(() => {
  const getVouchers = async () => {
    try {
      const res = await axios.get(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/today'
      )
      console.log(res.data.data)
      setVouchers(res.data.data)

      // res.data.data.map((el, i) => {
      //   const obj = {
      //     No: ++i,
      //     'Voucher Date': el.date.split('T')[0],
      //     'Voucher Code': el.code,
      //     'Patient Name': el.relatedPatient.name,
      //     'Test Qty': el.testSelection.length,
      //     Amount: el.totalCharge
      //   }
      //   setArray(array => [...array, obj])
      // })
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


  const search = async () => {
    const result = await axios.get(
      'http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers'
    )
    if (name == '') {
      setVouchers(
        result.data.data.filter(
          el => el.date >= from && el.date.split('T')[0] <= to
        )
      )
    } else {
      setVouchers(
        result.data.data.filter(
          el =>
            el.date >= from &&
            el.date.split('T')[0] <= to &&
            el.relatedPatient.name == name
        )
      )
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
                <Title>Test Result List</Title>
              </Left>
            </Top>
            <Div className='card'>
              <Div className='card-body'>
                <Top>
                  <Left>
                    <div className='row'>
                      <div className='col-2'>
                        <label htmlFor=''>From:</label>
                        <input
                          type='date'
                          placeholder='Search...'
                          className='form-control'
                          onChange={e => setFrom(e.target.value)}
                        />
                      </div>
                      <div className='col-2'>
                        <label htmlFor=''>To:</label>
                        <input
                          type='date'
                          placeholder='Search...'
                          className='form-control'
                          onChange={e => setTo(e.target.value)}
                        />
                      </div>
                      {/* <div className='col-2'>
                    <label htmlFor="">Status:</label>
                    <select className='form-control' onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">Choose Status</option>
                        <option value='Pending'>Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div> */}
                      <div className='offset-2 col-6 '>
                        <div className='row float-right'>
                          <div className='col-6 ' style={{ marginTop: '35px' }}>
                            {/* <label htmlFor="">Patient Name:</label> */}
                            <input
                              type='text'
                              placeholder='Enter Patient Name...'
                              className='form-control'
                              onChange={e => setName(e.target.value)}
                            />
                          </div>
                          <div className='col-6' style={{ marginTop: '35px' }}>
                            <button
                              className='btn btn-sm btn-primary'
                              onClick={search}
                            >
                              Search
                            </button>
                            <button className='btn btn-sm btn-primary ml-3'>
                              Export
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-5'>
                      <Tabs>
                        <TabList>
                          <Tab style={customStyles.tabsPen}>Pending</Tab>
                          <Tab style={customStyles.tabsPro}>In Progess</Tab>
                          <Tab style={customStyles.tabsFin}>Finished</Tab>
                        </TabList>

                        <TabPanel>
                          <Table className='table table-hover mt-3'>
                            <Thead>
                              <Tr>
                                <Th>#</Th>
                                <Th>Date</Th>
                                <Th>Code</Th>
                                <Th>Patient Name</Th>
                                <Th>Total Test</Th>
                                <Th>Finished Test</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {vouchers.map(
                                (vou, index) =>
                                  vou.status == 'Pending' && (
                                    <Tr key={vou._id}>
                                      <Td>{++index}</Td>
                                      <Td>
                                        {vou.date !== null
                                          ? vou.date.split('T')[0]
                                          : ''}
                                      </Td>
                                      <Td>{vou.code}</Td>
                                      <Td>{vou.relatedPatient.name}</Td>
                                      <Td>{vou.testSelection.length}</Td>
                                      <Td>
                                        {vou.testSelection.map((test, i) =>
                                          test.result != null ? ++i : i
                                        )}
                                      </Td>
                                      <Td>
                                        <Badge>{vou.status}</Badge>
                                      </Td>
                                      <Td>
                                        {vou.status == 'Finished' && (
                                          <Btn className='btn btn-sm btn-info'>
                                            Finished
                                            <AiFillInfoCircle
                                              style={{ marginLeft: '7px' }}
                                            />
                                          </Btn>
                                        )}
                                        <Link
                                          to={'/test/' + vou._id}
                                          className='btn btn-sm btn-primary ml-3'
                                        >
                                          Test Result
                                        </Link>
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </TabPanel>
                        <TabPanel>
                          <Table className='table table-hover mt-3'>
                            <Thead>
                              <Tr>
                                <Th>#</Th>
                                <Th>Date</Th>
                                <Th>Code</Th>
                                <Th>Patient Name</Th>
                                <Th>Total Test</Th>
                                <Th>Finished Test</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {vouchers.map(
                                (vou, index) =>
                                  vou.status == 'In Progress' && (
                                    <Tr key={vou._id}>
                                      <Td>{++index}</Td>
                                      <Td>
                                        {vou.date !== null
                                          ? vou.date.split('T')[0]
                                          : ''}
                                      </Td>
                                      <Td>{vou.code}</Td>
                                      <Td>{vou.relatedPatient.name}</Td>
                                      <Td>{vou.testSelection.length}</Td>
                                      <Td>
                                        {vou.testSelection.map((test, i) =>
                                          test.result != null ? ++i : i
                                        )}
                                      </Td>
                                      <Td>
                                        <div className='badge badge-primary px-3 py-2'>
                                          {vou.status}
                                        </div>
                                      </Td>
                                      <Td>
                                        <Link
                                          to={'/test/' + vou._id}
                                          className='btn btn-sm btn-primary ml-3'
                                        >
                                          Test Result
                                        </Link>
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </TabPanel>
                        <TabPanel>
                          <Table className='table table-hover mt-3'>
                            <Thead>
                              <Tr>
                                <Th>#</Th>
                                <Th>Date</Th>
                                <Th>Code</Th>
                                <Th>Patient Name</Th>
                                <Th>Total Test</Th>
                                <Th>Finished Test</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {vouchers.map(
                                (vou, index) =>
                                  vou.status == 'Finished' && (
                                    <Tr key={vou._id}>
                                      <Td>{++index}</Td>
                                      <Td>
                                        {vou.date !== null
                                          ? vou.date.split('T')[0]
                                          : ''}
                                      </Td>
                                      <Td>{vou.code}</Td>
                                      <Td>{vou.relatedPatient.name}</Td>
                                      <Td>{vou.testSelection.length}</Td>
                                      <Td>
                                        {vou.testSelection.map((test, i) =>
                                          test.result != null
                                            ? (i = parseInt(i) + 1)
                                            : i
                                        )}
                                      </Td>
                                      <Td>
                                        <Badge>{vou.status}</Badge>
                                      </Td>
                                      <Td>
                                        <Link to={'/test/' + vou._id}>
                                          <Btn className='btn btn-sm btn-primary '>
                                            Detail
                                            <AiFillInfoCircle
                                              style={{ marginLeft: '7px' }}
                                            />
                                          </Btn>
                                        </Link>
                                      </Td>
                                    </Tr>
                                  )
                              )}
                            </Tbody>
                          </Table>
                        </TabPanel>
                      </Tabs>
                    </div>
                  </Left>
                </Top>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestResultList
