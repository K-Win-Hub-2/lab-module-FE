import React,{useEffect,useState} from 'react'
import SideBar from "../components/views/SideBar";
import styled from 'styled-components'
import axios from 'axios';
import {RxCross2} from 'react-icons/rx'
import {MdDiscount} from 'react-icons/md'
import { useLocation } from 'react-router-dom';


const Top = styled.div`
display : flex;
justify-content: center;
margin: 10px 0;
`;

const Button = styled.button`
background: #007bff;
color: white; 
justify-content: center;
padding: 5px 30px;
border:none;
border-radius:10px;
`
const Div = styled.div`
`
const Textarea = styled.textarea`
margin-top:20px;
width:100%;
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
const Select  = styled.select`
width:100%;
padding:6px 5px;
border-radius: 7px;
`
const Input = styled.input`
width:100%;
margin-top:20px;
`
const Label = styled.label`
`

const Option = styled.option``

const TestSale = () => {
  const [pname,setPname] = useState('');
  const [pcode,setPcode] = useState('');
  const [servs,setServs] = useState('');
  const [isDoctor,setIsDoctor] = useState(false);
  const [isEmail,setIsEmail] = useState(false);
  const patient_id = useLocation().pathname.split('/')[2];  
  
  useEffect(()=> {
    const getPatient = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/patient/'+patient_id);
        setPname(res.data.data.name);
        setPcode(res.data.data.patientID);
      }catch(err){}
    }
    const getServs = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/services');
        setServs(res.data.data);
      }catch(err){}
    }
    getPatient();
    getServs();
  },[]);


  return (
    <div className="wrapper">
    <SideBar />
    {/* <!-- Content Wrapper. Contains page content --> */}

    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <div className="content-header">
        <div className="container-fluid">
      <Top>
        {/* <Right><Button>Refresh</Button></Right> */}
        <h5 className='text-center'>Lab Test Voucher</h5>
      </Top>
      <Div className='card'>
        <Div className='card-body row'>
            <Div className='row'>
              <div className='col-6'>
              <label htmlFor="">Voucher Date</label>
              <input type="date" className='form-control'/>
              </div>
              <div className='col-6'>
              <label htmlFor="">Voucher Code</label>
              <input type="text" className='form-control'/>
              </div>
              <div className='col-6 mt-2'>
              <label htmlFor="">Patient Name</label>
              <input type="text" className='form-control' value={pname}/>
              </div>
              <div className='col-6 mt-2'>
              <label htmlFor="">Patient Code</label>
              <input type="text" className='form-control' value={pcode}/>
              </div>
              <div className='col-6 mt-4'>
              <label htmlFor="">Refer Doctor</label>
              <input className='ml-4'  type="radio" name="doctordata" id='male' onClick={()=>setIsDoctor(true)}/> Yes
              <input className='ml-4' type="radio" name="doctordata" id='male' onClick={()=>setIsDoctor(false)} checked/> No
              </div>
              {isDoctor && <div className='col-6 mt-2'>
              <label htmlFor="">Select Doctor</label>
              <select className='form-control'>
                <option>Choose Doctor</option>
              </select>
              </div>}
              <div className='col-6 mt-4'>
              <label htmlFor="">Collect Or Email</label>
              <input className='ml-4'  type="radio" name="data" id='male' onClick={()=>setIsEmail(false)} checked/> Collect
              <input className='ml-4' type="radio" name="data" id='male' onClick={()=>setIsEmail(true)}/> Email
              </div>
              {isEmail && <div className='col-6 mt-2'>
              <label htmlFor="">Email</label>
              <input type="email" className='form-control'/>
              </div>}
              <Div className='col-10 mt-5'>
                <Select>
                  <Option>Select Service</Option>
                 
                </Select>
              </Div>
              <Div className='col-2 mt-5'>
                  <Button>Add</Button>
              </Div>
            </Div>
            <Table className='table table-hover mt-4'>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Qty</Th>
                  <Th>Unit Charge</Th>
                  <Th>Sub Charge</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Test1</Td>
                  <Td>3</Td>
                  <Td>3000</Td>
                  <Td>9000</Td>
                  <Td><RxCross2/></Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Test2</Td>
                  <Td>4</Td>
                  <Td>3000</Td>
                  <Td>12000</Td>
                  <Td><RxCross2/></Td>
                </Tr>
              </Tbody>
              <tfoot>
                <Tr>
                  <Td colSpan='5' className='text-right'>Total Charge</Td>
                  <Td>300000</Td>
                </Tr>
                <Tr>
                  <Td colSpan='5' className='text-right'>Discount</Td>
                  <Td>54000</Td>
                </Tr>
                <Tr>
                  <Td colSpan='5' className='text-right'>Net Charge</Td>
                  <Td>340000</Td>
                </Tr>
                <Tr>
                  <Td colSpan='5' className='text-right'>Pay</Td>
                  <Td>230000</Td>
                </Tr>
                <Tr>
                  <Td colSpan='5' className='text-right'>Change</Td>
                  <Td>120000</Td>
                </Tr>
              </tfoot>
            </Table>
            <div className='row mt-5'>
                <div className='offset-5 col-4'>
                <button className='btn btn-sm btn-success'>Save</button>&nbsp;&nbsp;&nbsp;
                <button className='btn btn-sm btn-primary'>Print</button>
                </div>
            </div>
        </Div>
      </Div>
    </div>
    </div>
    </div>
    </div>

  )
}

export default TestSale