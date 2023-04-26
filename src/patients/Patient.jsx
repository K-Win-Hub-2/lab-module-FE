import React,{useState,useEffect} from 'react'
import SideBar from "../components/views/SideBar";
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import { Link } from 'react-router-dom';

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

const Patient = () => {
  const [patientsOld,setPatients] = useState([]);
  const [allpatientsOld,setAllPatients] = useState([]);
  const [patientsNew,setPatientsNew] = useState([]);
  const [allpatientsNew,setAllPatientsNew] = useState([]);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(()=> {
    const getPatients = async () =>{
      try{
        const res = await axios.get('http://centralclinicbackend.kwintechnologykw11.com:3000/api/patients');
        setPatients(res.data.list.filter((el)=>el.patientStatus == 'Old'));
        setAllPatients(res.data.list.filter((el)=>el.patientStatus == 'Old'));
        setPatientsNew(res.data.list.filter((el)=>el.patientStatus == 'New'));
        setAllPatientsNew(res.data.list.filter((el)=>el.patientStatus == 'New'));
      }catch(err){}
    };
    getPatients();
  },[]);

  const genderfilter = (val) => {
      if(val == 1){
        setPatients(allpatientsOld.filter((el)=>el.gender==='Male'));
      }
      if(val == 2){
        setPatients(allpatientsOld.filter((el)=>el.gender==='Female'));
      }
  }
  const genderfilterNew = (val) => {
    if(val == 1){
      setPatientsNew(allpatientsNew.filter((el)=>el.gender==='Male'));
    }
    if(val == 2){
      setPatientsNew(allpatientsNew.filter((el)=>el.gender==='Female'));
    }
}

  const show = () => setIsOpen(!isOpen);

  return (
    <div className="wrapper">
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <Top>
              <Left>
                <Title>Patient List</Title>
              </Left>
              <Right>
                <Link to="/patient/register">
                  <Button>
                    <AiOutlinePlus style={{ marginRight: "7px" }} />
                    Patient Register
                  </Button>
                </Link>
              </Right>
            </Top>
            <Div className="card">
              <Div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Old</Tab>
                    <Tab>New</Tab>
                  </TabList>

                  <TabPanel>
                    <Top className="mt-4">
                      <Left>
                        <Input type="text" placeholder="Search..." />
                      </Left>
                      <Right>
                        {isOpen && (
                          <Select
                            onChange={(e) => genderfilter(e.target.value)}>
                            <Option>Gender</Option>
                            <Option value="1">Male</Option>
                            <Option value="2">Female</Option>
                          </Select>
                        )}
                        <Btn className="btn btn-outline-primary">
                          <AiTwotoneFilter onClick={show} />
                        </Btn>
                        <Btn className="btn btn-outline-success">
                          <FaFileExport />
                        </Btn>
                      </Right>
                    </Top>
                    <Table className="table table-hover mt-4">
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
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {patientsOld.map((patient, i) => (
                          <Tr>
                            <Td>{++i}</Td>
                            <Td>{patient.patientID}</Td>
                            <Td>{patient.name}</Td>
                            <Td>{patient.age}</Td>
                            <Td>{patient.phone}</Td>
                            <Td>{patient.dateOfBirth.split("T")[0]}</Td>
                            <Td>{patient.gender}</Td>
                            <Td>{patient.address}</Td>
                            {/* <Td><Link to={'/test_sale/'+patient._id} class="btn btn-primary">Test Voucher</Link></Td> */}
                            <Td>
                              <Link
                                to={"/test_voucher/" + patient._id}
                                class="btn btn-sm btn-primary">
                                Test Voucher
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel>
                    <Top className="mt-4">
                      <Left>
                        <Input type="text" placeholder="Search..." />
                      </Left>
                      <Right>
                        {isOpen && (
                          <Select
                            onChange={(e) => genderfilterNew(e.target.value)}>
                            <Option>Gender</Option>
                            <Option value="1">Male</Option>
                            <Option value="2">Female</Option>
                          </Select>
                        )}
                        <Btn className="btn btn-outline-primary">
                          <AiTwotoneFilter onClick={show} />
                        </Btn>
                        <Btn className="btn btn-outline-success">
                          <FaFileExport />
                        </Btn>
                      </Right>
                    </Top>
                    <Table className="table table-hover mt-4">
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
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {patientsNew.map((patient, i) => (
                          <Tr>
                            <Td>{++i}</Td>
                            <Td>{patient.patientID}</Td>
                            <Td>{patient.name}</Td>
                            <Td>{patient.age}</Td>
                            <Td>{patient.phone}</Td>
                            <Td>{patient.dateOfBirth.split("T")[0]}</Td>
                            <Td>{patient.gender}</Td>
                            <Td>{patient.address}</Td>
                            <Td>
                              <Link
                                to={"/test_voucher/" + patient._id}
                                class="btn btn-sm btn-primary">
                                Test Voucher
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>
                </Tabs>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient