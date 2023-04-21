import React,{useState,useEffect} from 'react'
import SideBar from "../components/views/SideBar";
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'
import ResultDialog from './ResultDialog';
import { useLocation,Link } from 'react-router-dom';

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
background: #007bff;
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

const TestVoucher = () => {
  const [vouchers,setVouchers] = useState([]);
  const [isOpen,setIsOpen] = useState(false);
  const [pname,setPname] = useState('');
  const [vouId,setVouId] = useState('');
  const [page,setPage] = useState('');
  const [pgender,setPgender] = useState('');
  const patient_id = useLocation().pathname.split('/')[2]; 

  useEffect(()=> {
    const getVouchers = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/vouchers');
        setVouchers(res.data.data.filter((el)=>el.relatedPatient._id == patient_id));
      }catch(err){}
    };
    const getPatient = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/patient/'+patient_id);
        setPname(res.data.data.name);
        setPage(res.data.data.age);
        setPgender(res.data.data.gender)
      }catch(err){}
    }
    getVouchers();
    getPatient();
  },[]);

  const show = (id) => {
    setVouId(id);
    setIsOpen(!isOpen)
  };

  return (
    <div className="wrapper">
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
        <Top>
          <Left><Title>Tab Voucher List</Title></Left>
          <Right><Link to={'/test_sale/'+patient_id}><Button><AiOutlinePlus style={{marginRight:'7px'}}/>Create Test</Button></Link></Right>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Table className='table table-hover mt-4'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Code</Th>
              <Th>Date</Th>
              <Th>Discount</Th>
              <Th>Total Charges</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {vouchers.map((vou,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{vou.code}</Td>
              <Td>{vou.date}</Td>
              <Td>{vou.discount}</Td>
              <Td>{vou.totalCharge}</Td>
              <Td>
                <button className='btn btn-sm btn-success'  onClick={()=>show(vou._id)}>Print</button>
                <Link className="btn btn-sm btn-primary ml-3">Test Result</Link>
              </Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </Div>
         </Div>
         </div>
         </div>
         </div>
         <ResultDialog open={isOpen} close={()=>setIsOpen(false)} name={pname} age={page} gender={pgender} voucher={vouId}/>
    </div>
  )
}

export default TestVoucher