import React, { useState, useEffect } from "react";
import SideBar from "../components/views/SideBar";
import styled from "styled-components";
import {
  AiOutlinePlus,
  
} from "react-icons/ai";
import axios from "axios";

import { useLocation, Link } from "react-router-dom";


const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Left = styled.div`
  font-weight: normal;
  flex: 1;
`;

const Title = styled.h5`
  font-weight: bold;
  margin-top: 10px;
`;

const Right = styled.div`
  font-weight: normal;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  justify-content: flex-end;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
`;



const Div = styled.div``;

const Table = styled.table``;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  text-align: center;
`;
const Th = styled.th`
  font-size: 15px;
`;
const Td = styled.td`
  font-size: 14px;
`;


const TestVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
 
 
  const patient_id = useLocation().pathname.split("/")[2];
  console.log(patient_id, "patient_id");

  useEffect(() => {
  
    const getVouchers = async () => {
      try {
        let data = {
          relatedPatient: patient_id,
        };

        const res = await axios.post(
          "http://localhost:9000/api/vouchers/related-vouchers",
          data
        );
        console.log(data, "data");
        setVouchers(res.data.data);
      } catch (err) {
        alert('error');
      }
    };
    // getPatient();
    getVouchers();
  }, []);

 

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
                <Title>Test Voucher List</Title>
              </Left>
              <Right>
                <Link to={"/test_sale/" + patient_id}>
                  <Button>
                    <AiOutlinePlus style={{ marginRight: "7px" }} />
                    Create Voucher
                  </Button>
                </Link>
              </Right>
            </Top>
            <Div className="card">
              <Div className="card-body">
                <Table className="table table-hover mt-4">
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
                  {vouchers.map((vou, i) => (
                    <Tbody key={vou._id}>
                      <Tr>
                        <Td>{++i}</Td>
                        <Td>{vou.code ? vou.code : ""}</Td>
                        <Td>{vou.date ? vou.date.split("T")[0] : ""}</Td>
                        {/* <Td>{vou.netDiscount}</Td> */}
                        <Td>{vou.discount ? vou.discount : ""}</Td>
                        <Td>{vou.totalCharge ? vou.totalCharge : ""}</Td>
                        <Td>
                          {/* <Link
                            to={"/test_voucher/" + patient_id + "/" + vou._id}
                            name={pname}
                            age={page}
                            gender={pgender}>
                            <button className="btn btn-sm btn-success">
                              Print
                            </button>
                          </Link> */}
                          <Link
                            to={"/test/" + vou._id}
                            className="btn btn-sm btn-primary ml-3">
                            Refer Doctor
                          </Link>
                          <Link
                            to={"/test/" + vou._id}
                            className="btn btn-sm btn-primary ml-3">
                            Test Result
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </Div>
            </Div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVoucher;
