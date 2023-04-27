import React, { useState, useEffect } from 'react'
import SideBar from "./SideBar";
import styled from 'styled-components'
import { AiOutlinePlus, AiTwotoneFilter, AiFillInfoCircle } from 'react-icons/ai'
import { FaFileExport } from "react-icons/fa"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

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

const Right = styled.div`
font-weight : normal;
flex: 1;
display : flex;
justify-content: flex-end;
`;


const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: flex-end;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Btn = styled.button`
padding: 4px 8px;
border-radius:5px;
margin-left : 13px;
`

const Div = styled.div`
`
const Input = styled.input`
width:165px;
border:1px solid grey;
border-radius:12px;
padding:3px;
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
font-size:14px;
`
const Select = styled.select`
padding:0px 7px;
border-radius: 5px;
`
const Option = styled.option`
`
const Badge = styled.span`
background:blue;
padding:1px 5px;
color:white;
border:none;
border-radius:4px;
`

const TestResultList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const res = await axios.get('http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers/today');
        setVouchers(res.data.data);
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    getVouchers();
  }, [])

  const search = async () => {
    const result = await axios.get('http://centralclinicbackend.kwintechnologykw11.com:3000/api/vouchers');
    if (name == '') {
      setVouchers(result.data.data.filter((el) => el.date.split('T')[0] >= from &&
        el.date.split('T')[0] <= to))
    }
    else {
      setVouchers(result.data.data.filter((el) => el.date.split('T')[0] >= from &&
        el.date.split('T')[0] <= to && el.relatedPatient.name == name))
    }
  }

  return (
    <div className="wrapper">
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <Top>
              <Left><Title>Test Result List</Title></Left>
            </Top>
            <Div className='card'>
              <Div className='card-body'>
                <Top>
                  <Left>
                    <div className='row'>
                      <div className='col-2'>
                        <label htmlFor="">From:</label>
                        <input type="date" placeholder="Search..." className='form-control' onChange={(e) => setFrom(e.target.value)} />
                      </div>
                      <div className='col-2'>
                        <label htmlFor="">To:</label>
                        <input type="date" placeholder="Search..." className='form-control' onChange={(e) => setTo(e.target.value)} />
                      </div>
                      <div className='col-2'>
                        <label htmlFor="">Status:</label>
                        <select className='form-control'>
                          <option value="">Choose Status</option>
                          <option value='pending'>Pending</option>
                          <option value="inprogress">In Progress</option>
                          <option value="finished">Finished</option>
                        </select>
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-6'>
                            <label htmlFor="">Patient Name:</label>
                            <input type="text" placeholder="Search..." className='form-control' onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className='col-6' style={{ marginTop: '35px' }}>
                            <button className='btn btn-sm btn-primary' onClick={search}>Search</button>
                            <button className='btn btn-sm btn-primary ml-3'>Export</button>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='mt-3'>
                      <Tabs>
                        <TabList>
                          <Tab>Pending</Tab>
                          <Tab>In Progess</Tab>
                          <Tab>Finished</Tab>
                        </TabList>

                        <TabPanel>

                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                      </Tabs>
                    </div>

                  </Left>
                </Top>
                <Table className='table table-hover'>
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
                    {vouchers.map((vou, index) => (

                      <Tr>
                        <Td>{++index}</Td>
                        <Td>{vou.date.split('T')[0]}</Td>
                        <Td>{vou.code}</Td>
                        <Td>{vou.relatedPatient.name}</Td>
                        <Td>{vou.testSelection.length}</Td>
                        <Td>
                          {
                            vou.testSelection.map((test, i) => (
                              test.result != null ?
                                ++i : i
                            ))
                          }
                        </Td>
                        <Td><Badge>Pending</Badge></Td>
                        <Td><Btn className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{ marginLeft: '7px' }} /></Btn></Td>
                      </Tr>))}
                  </Tbody>
                </Table>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestResultList