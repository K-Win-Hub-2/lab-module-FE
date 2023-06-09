/* eslint-disable */
import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Swal from "sweetalert2";
import axios from "axios";

//const url = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api'
const url = 'http://localhost:9000/api'

export default function TrialBalance() {
    const [accountLists, setAccountLists] = useState([]);
    const[transactionLists,setTransactionLists] = useState([]);
    const [trailAccs, setTrailAccs] = useState([]);
    const [start, setStart] = useState("");
    const [isShow, setIsShow] = useState(false)

    const handleRelatedShow = (id) => {
    
        if (isShow) {
          document.getElementById('toggle' + id).removeAttribute('hidden')
        } else {
          document.getElementById('toggle' + id).setAttribute('hidden', 'hidden')
        }
        setIsShow(!isShow)
      }

    const fetchTrialAndBalance = async (event) => {
        console.log(event.target.value)
        try {
            Swal.fire({
                title: 'Loading',
                text: 'Please wait...',
                allowOutsideClick: false,
            });
            await axios.get(url + `/transactions/trial-balance`, {params:{start:start, end:event.target.value}}).then((res) => {
                setAccountLists(res.data.data)
                setTransactionLists(res.data.transaction)
                console.log(res.data.data)
               console.log(res.data.transaction)
            }).catch((error)=> {
                console.log('error',error)
            })
            Swal.close();

            // Process the response data
            //console.log(data);
        } catch (error) {
            Swal.close();
            console.error('Error occurred while fetching data.', error);
        }
    }

    useEffect(() => {
    }, [])

    return (

        <>
            <div className="wrapper">
                {/* <!-- Content Wrapper. Contains page content --> */}
                <Sidebar />
                <div className="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Trial Balance
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Main content --> */}

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title font-weight-bold offset-4 ph-3 py-3 center-text">Trail Balnace as at End of the 2022</h1>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <label htmlFor=''>From:</label>
                                                    <input
                                                        type='date'
                                                        placeholder='Search...'
                                                        className='form-control'
                                                        onChange={e => setStart(e.target.value)}
                                                    />
                                                </div>
                                                <div className='col-4'>
                                                    <label htmlFor=''>To:</label>
                                                    <input
                                                        type='date'
                                                        placeholder='Search...'
                                                        className='form-control'
                                                        onChange={e => fetchTrialAndBalance(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-body">

                                                <table id="example1" className="table">
                                                    <thead className="text-center bg-info">
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Type</th>
                                                            <th>Account Name</th>
                                                            <th>Debit(MMK)</th>
                                                            <th>Credit(MMK)</th>
                                                            <th>Transaction</th>
                                                        </tr>
                                                    </thead>
                                                   
                                                        {console.log(accountLists)}
                                                        {accountLists.map((element, index) => (
                                                             <tbody className="text-center">
                                                            <tr key={element._id}>
                                                                <td>{++index}</td>
                                                                <td>{element.type.name ? element.type.name : ""}</td>
                                                                <td>{element.accName ? element.accName : ""}</td>
                                                                <td>{element.netType === "Debit" ? element.netAmount : ""}</td>
                                                                <td>{element.netType === "Credit" ? element.netAmount : ""}</td>
                                                                <td className='text-center'>
                                      <button
                                        type='button'
                                        className='btn btn-sm btn-primary ml-2'
                                        onClick={() =>
                                          handleRelatedShow(
                                           element.relatedAccountingId
                                          )
                                        }
                                      >
                                        Transaction
                                      </button>
                                    </td>
                                                            </tr>
                                                        <tr
                                                        className='bg-light'
                                                        id={'toggle' + element.relatedAccountingId}
                                                        hidden
                                                      >
                                                        <td colspan='12'>
                                                          <div>
                                                            <div class='row'>
                                                              {/* <div class='col-md-1'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  No
                                                                </label>
                                                              </div> */}
                                                              {/* <div class='col-md-3'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  Account
                                                                </label>
                                                              </div> */}
                                                              <div class='col-md-2'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  Type
                                                                </label>
                                                              </div>
                                                              <div class='col-md-3'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  Date
                                                                </label>
                                                              </div>
                                                              <div class='col-md-3'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  Amount
                                                                </label>
                                                              </div>
                                                              <div class='col-md-3'>
                                                                <label
                                                                  style={{ fontSize: '15px' }}
                                                                  class='text-dark'
                                                                >
                                                                  Remark
                                                                </label>
                                                              </div>
                                                            </div>
                    
                                                           {transactionLists.map((tList, i) => (
                                                                (tList.relatedAccounting === element.relatedAccountingId) ?(
                                                                    <div class='row'>
                                                                    {/* <div class='col-md-1'>
                                                                      <label
                                                                        style={{ fontSize: '14px' }}
                                                                        
                                                                      >
                                                                        {++i}
                                                                      </label>
                                                                    </div> */}
                                                                    {/* <div class='col-md-3'>
                                                                      <label
                                                                        style={{ fontSize: '15px' }}
                                                                        class='text-dark'
                                                                      >
                                                                        Account
                                                                      </label>
                                                                    </div> */}
                                                                    <div class='col-md-2'>
                                                                      <label
                                                                        style={{ fontSize: '14px' }}
                                                                        
                                                                      >
                                                                       {tList.type}
                                                                      </label>
                                                                    </div>
                                                                    <div class='col-md-3'>
                                                                      <label
                                                                        style={{ fontSize: '14px' }}
                                                                        
                                                                      >
                                                                        {tList.date.split('T')[0]}
                                                                      </label>
                                                                    </div>
                                                                    <div class='col-md-3'>
                                                                      <label
                                                                        style={{ fontSize: '14px' }}
                                                                        
                                                                      >
                                                                        {tList.amount}
                                                                      </label>
                                                                    </div>
                                                                    <div class='col-md-3'>
                                                                      <label
                                                                        style={{ fontSize: '14px' }}
                                                                        
                                                                      >
                                                                        {tList.remark}
                                                                      </label>
                                                                    </div>
                                                                  </div>

                                                                  ): ("")
                                                                ))
                                                                    }
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      </tbody>

                                                        ))}
                                                   
                                                </table>
                                                <br /><a href="balancesheet_acc_list" className="float-left">Balance Sheet</a>;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<!-- /.container-fluid --> */}
                    </section>
                </div>
            </div>

            {/* <!-- /.content-wrapper --> */}
            <footer className="main-footer">
                <strong>
                    Copyright &copy; 2017-2020{" "}
                    <a href="http://www.kwintechnologies.com">K-win Technology</a>.
                </strong>
                All rights reserved.
            </footer>

            {/* <!-- Control Sidebar --> */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* <!-- Control sidebar content goes here --> */}
            </aside>
            {/* <!-- /.control-sidebar --> */}

            {/* <!-- ./wrapper --> */}
        </>
    )
}