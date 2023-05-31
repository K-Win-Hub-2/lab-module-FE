/* eslint-disable */
import React, { useState } from 'react'
import BankTran from '../../../views/Finance/Bank/BankTran'
import BankReg from '../../../views/Finance/Bank/BankReg'
import axios from 'axios'
import { useEffect } from 'react'
import SideBar from '../../SideBar'
import useCollapse from 'react-collapsed'
import {
  FaCashRegister,
  FaFileMedical,
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa'
import Swal from "sweetalert2";

import BankList from './Bank'
import { Link } from 'react-router-dom'

function Bank() {
  const [id, setId] = useState('')
  const [name, setBankName] = useState('')
  const [open, setOpen] = useState(false)
  const [bankRegOpen, setBankRegOpen] = useState(false)

  const [isShow, setIsShow] = useState(false)

  const [bankLists, setBankLists] = useState([])
  const [transferlist, setTransferLists] = useState([])

  const showDialog = val => {
    setOpen(true)
    setId(val)
    const getRelated = async () => {
      console.log(val)
      const res = await axios.get(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/bank/' +
          val
      )

      console.log(res.data.data)
      setBankName(res.data.data[0].accountName)
      console.log(res.data.data[0].accountName)
    }

    getRelated()
  }
  // const bankTransferDialog = () => setBankOpen(true);

  const bankRegDialog = () => {
    setBankRegOpen(true)
  }

  const handleTransationChange = val => {
    const getTransactionList = async () => {
      try {
        console.log(val)
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/transfer'
        )

        console.log(res)
        setTransferLists(res.data.data)
      } catch (err) {}
    }

    getTransactionList()

    if (isShow) {
      document.getElementById('toggle' + val).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + val).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  const handleDelete =(e) => {
    axios
      .delete(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/bank/' +
          e
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = bankLists.filter(item => item._id !== e)
        setBankLists(result)
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'CANCEL'
        })
      })
  }

  useEffect(() => {
    const getBankLists = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/banks?limit=50'
        )

        setBankLists(res.data.list)
        console.log(res.data.list,'list')
      } catch (err) {}
    }

    // const getTransactionList = async () => {
    //   try {
    //     const res = await axios.get(
    //       "http://centralclinicbackend.kwintechnologykw11.com:3000/api/transactions/related/"+bankLists._id
    //     );

    //     setTransactionLists(res.data.list);

    //   } catch (err) {}
    // };
    getBankLists()
  }, [])

  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Main Sidebar Container --> */}
        <SideBar />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-12'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <a href='/'>Home</a>
                    </li>
                    <li className='breadcrumb-item active'>Bank List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='container-fluid'>
              <div className='card'>
                <div className='card-body p-b-0'>
                  {/* <label className="text-success">Bank List</label> */}
                  <button
                    className='float-right btn btn-primary mb-3'
                    data-toggle='modal'
                    data-target='#bank_register'
                    onClick={bankRegDialog}
                  >
                    Bank Register
                  </button>

                  <div className='table-responsive'>
                    <table className='table table-hover'>
                      <thead className='bg-info text-center'>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Acc No.</th>
                          <th>Bank</th>

                          <th>Acc Name</th>
                          <th>Holder Name</th>

                          <th>Balance</th>

                          <th className=''>Action</th>
                        </tr>
                      </thead>

                      {bankLists.map((bankList, i) => (
                        <tbody className=''>
                          <tr className='px-3'>
                            <td>{++i}</td>
                            <td>{bankList.openingDate.split('T')[0]}</td>
                            <td>{bankList.accountNumber}</td>
                            <td>{bankList.bankName}</td>

                            <td>{bankList.accountName}</td>
                            <td>{bankList.accountHolderName}</td>

                            <td>
                              {
                                bankList.relatedAccounting.amount
                                // .toLocaleString(undefined, {
                                // maximumFractionDigits: 2,
                                // minimumFractionDigits: 2,
                                // })
                              }
                            </td>
                            <td className='text-center'>
                              <button
                                type='button'
                                className='btn btn-sm btn-warning ml-2'
                                onClick={() =>
                                  handleTransationChange(bankList._id)
                                }
                              >
                                <FaRegEdit />
                              </button>
                              <button
                                type='button'
                                className='btn btn-sm btn-danger ml-2'
                                onClick={(e)=>handleDelete(bankList._id)}
                              >
                                <FaRegTrashAlt />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <BankReg
                bankRegOpen={bankRegOpen}
                close={() => setBankRegOpen(false)}
                setBankRegOpen={setBankRegOpen}
                bankLists={bankLists}
                setBankLists={setBankLists}
              />
              <BankTran
                open={open}
                close={() => setOpen(false)}
                id={id}
                name={name}
              />
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>

        {/* <!-- /.content-wrapper --> */}
        <footer className='main-footer'>
          <strong>
            Copyright &copy; 2017-2020{' '}
            <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
          </strong>
          All rights reserved.
        </footer>

        {/* <!-- Control Sidebar --> */}
        <aside classNameName='control-sidebar control-sidebar-dark'>
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
        {/* <!-- /.control-sidebar --> */}
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Bank
