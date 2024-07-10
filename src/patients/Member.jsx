/* eslint-disable */

import React from 'react'
import SideBar from "../components/views/SideBar";
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"

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
const Tr= styled.tr`
text-align:center;
`
const Th=styled.th`
font-size:15px;
`
const Td=styled.td`
font-size:14px;
`
const Select = styled.select`
padding:0px 7px;
border-radius: 5px;
`
const Option = styled.option`
`
const Badge = styled.span`
background:lightgreen;
padding:1px 5px;
color:white;
border:none;
border-radius:4px;
`

const Member = () => {
  return (
    <div className="wrapper">
    <SideBar />
    {/* <!-- Content Wrapper. Contains page content --> */}

    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <div className="content-header">
        <div className="container-fluid">
        <Top>
          <Left><Title>Member List</Title></Left>
         </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Top>
          <Left><Input type="text" placeholder="Search..."/></Left>
         </Top>
          <Table className='table table-hover'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Patient Id</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Phone</Th>
              <Th>Date of Birth</Th>
              <Th>Gender</Th>
              <Th>Address</Th>
              <Th>Member Status</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Patient Id</Td>
              <Td>Name</Td>
              <Td>Age</Td>
              <Td>Phone</Td>
              <Td>Date of BirTd</Td>
              <Td>Gender</Td>
              <Td>Address</Td>
              <Td><Badge>Premium</Badge></Td>
              <Td><Btn className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{marginLeft:'7px'}}/></Btn></Td>
            </Tr>
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

export default Member