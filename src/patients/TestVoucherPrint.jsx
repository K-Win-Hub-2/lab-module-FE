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

const TestVoucherPrint = (props) => {
  const voucher_id = useLocation().pathname.split('/')[3]; 
  const patient_id = useLocation().pathname.split('/')[2]; 
  const [pname,setPname] = useState('');
  const [page,setPage] = useState('');
  const [pgender,setPgender] = useState('');
  const [amount,setAmount] = useState('')
  const [date,setDate] = useState('')
  const [description,setDescription] = useState('')
  const [vouchers,setVouchers] = useState([]);
  const [isShow,setIsShow] = useState(true);
  
 useEffect(()=>{
    const getVoucher = async () =>{
        try{
          const res = await axios.get('http://localhost:9000/api/voucher/'+voucher_id);
          console.log(res.data.data);
          setVouchers(res.data.data.testResultList);
        }catch(err){}
        }
        const getPatient = async () =>{
            try{
              const res = await axios.get('http://localhost:9000/api/patient/'+patient_id);
              setPname(res.data.data.name);
              setPage(res.data.data.age);
              setPgender(res.data.data.gender)
            }catch(err){}
          }
          getVoucher();
          getPatient();
 },[])


  const print = () => {
    var print_div = document.getElementById("print");
    var print_area = window.open();
    print_area.document.write(print_div.innerHTML);
    print_area.document.close();
    print_area.focus();
    print_area.print();
    print_area.close();
  }

  return (
    <div className="wrapper">
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
            <div calssName="card" style={{maxWidth:'700px',marginLeft:'170px'}} id='print'>
            <div calssName="card-body" style={{border:'1px solid black',padding:'14px 14px'}}>
            <div className='row'>
                <div className='col-12'>
                    <img src={require('../logo.png')} alt="" />
                {/* </div>
                <div className='col-2'> */}
                    <img src={require('../logo1.png')} alt="" style={{marginLeft:'300px'}}/>
                </div>
            </div>
            <h5 style={{textAlign:'center'}}><u>LABORATORY REPORT</u></h5>
        <table className='table table-hover mt-4'>
            <thead>
            <tr>
              <th>Name:</th>
              <th colSpan='2'>{pname}</th>
              <th>Age:</th>
              <th colSpan='2'>{page}</th>
              <th>Sex</th>
              <th colSpan='2'>{pgender}</th>
            </tr>
            <tr>
              <th>Referred from:</th>
              <th colSpan='2'></th>
              <th>Lab:Reg:No</th>
              <th colSpan='2'></th>
              <th>Date of Report</th>
              <th colSpan='2'></th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <table className='table table-hover mt-5'>
            <thead className='bg-secondary'>
            <tr>
              <th>Test</th>
              <th>Result</th>
              <th>Reference Range</th>
              <th>Remark</th>
            </tr>
            </thead>
            <tbody>
                <tr>
            <td>Vitamin D (25 – OH)</td>
              <td></td>
              <td>nmol /L</td>
              <td>See Below</td>
              </tr>
              {/* {vouchers.map((voucher,index)=>(<tr>
              <td>{voucher.name}</td>
              <td>{voucher.result}</td>
              <td>{voucher.unit}</td>
              <td></td>
            </tr>))} */}
            </tbody>
        </table>
        <h5 className='mt-4'><u>Reference Ranges For 25-OH Vitamin D</u></h5>
        <table className='table table-hover mt-2'>
            <tbody>
            <tr>
              <td>Level</td>
              <td>Clinical</td>
            </tr>
            <tr>
              <td>30 nmol/L</td>
              <td>Severe Vitamin D deficiency. Suggest high dose supplementation.</td>
            </tr>
            <tr>
              <td>30 – 50 nmol/L</td>
              <td>Vitamin D insufficiency, if bone health an issue, suggest standard-dose
supplementation. No repeat vitamin D measurement required.</td>
            </tr>
            <tr>
              <td>50 – 125 nmol/L</td>
              <td>Adequate. No action required</td>
            </tr>
            <tr>
              <td>350 nmol/L</td>
              <td>Toxicity. Very rare</td>
            </tr>
            </tbody>
        </table>
        <div className='row' style={{marginTop:'90px'}}>
        <div className='col-6'>
         <span>Laboratory Technician</span>
        </div>
        <div className='col-6' style={{textAlign:'right'}}>
          <span>Dr. Khine Min Htet</span><br></br>
          <span>SpecialistPathologist</span><br></br>
          <span>M.B.,B.S (Ygn), M.Med.Sc (Pathology)</span><br></br>
          <span>Central Lab, Ahlone, Yangon</span>
        </div>
        </div>
    </div>
   
    </div>
         </div>
         </div>
         <button className='btn btn-sm btn-success mt-4' style={{marginLeft:'500px'}} onClick={print}>Print</button>
         </div>
         {/* <ResultDialog open={isOpen} close={()=>setIsOpen(false)} name={pname} age={page} gender={pgender} voucher={vouId}/> */}
    </div>
  )
}

export default TestVoucherPrint