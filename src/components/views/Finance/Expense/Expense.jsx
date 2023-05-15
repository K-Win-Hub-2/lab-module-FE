/* eslint-disable */
import React, { useState } from 'react'
import ExpenseDialog from '../../../views/Finance/Expense/ExpenseDialog'
import { useEffect } from 'react'
import SideBar from '../../SideBar'
import axios from 'axios'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { Link } from 'react-router-dom'
import { FaCashRegister, FaFileMedical, FaFileExcel } from 'react-icons/fa'

const Expense = () => {
  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)
  const [expenseLists, setExpenseLists] = useState([])
  const [relatedLists, setRelatedLists] = useState([])
  const [isShow, setIsShow] = useState(false)

  const showDialog = () => setOpen(true)
  const _export = React.useRef(null)

  const excelExport = () => {
    if (_export.current !== null) {
      console.log(_export.current.props.data)
      _export.current.props.data.map(function (element, index) {
        element.date = element.date.split('T')[0]
      })
    }
  }
  const handleRelatedShow = id => {
    const getRelated = async () => {
      //try {
      // console.log(val2);
      //  const jsonData = {
      //   account : val1,
      //   bankorcash: val2
      //  }
      //  const config = {
      //   headers: { "Content-Type": "application/json" },
      // };
      // await axios.post(
      //"http://centralclinicbackend.kwintechnologykw11.com:3000/api/transactions/related",
      //  "http://localhost:9000/api/transactions/relatedtransactions",
      //    jsonData,
      //    config
      await axios
        .get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/transactions/relatedExpense/' +
            id
        )
        .then(function (response) {
          console.log(response.data.data)
          setRelatedLists(response.data.data)
        })
        .catch(function (err) {})

      //console.log(res.data.data);

      //  } catch (err) {}
    }

    getRelated()

    if (isShow) {
      document.getElementById('toggle' + id).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + id).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  useEffect(() => {
    const getExpenseLists = async () => {
      const res = await axios.get(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/expenses'
      )
      // alert("success");
      // console.log(res.data.list);
      setExpenseLists(res.data.list)
    }
    getExpenseLists()
  }, [])
  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Navbar --> */}

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
                    <li className='breadcrumb-item active'>Expense List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='form-group col-md-5'>
                      <label>From</label>
                      <input
                        type='date'
                        name='from'
                        id='from'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-5'>
                      <label>To</label>
                      <input
                        type='date'
                        name='to'
                        id='to'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-2'>
                      <button
                        className='btn btn-sm btn-primary form-control'
                        style={{ marginTop: '31px' }}
                        onclick='date_filter()'
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className='offset-2 col-md-4'>
                  <div className='input-group' style={{ marginTop: '35px' }}>
                    <input
                      type='search'
                      className='form-control rounded'
                      id='search_code'
                      placeholder='Enter Account Code'
                    />
                    <button
                      type='button'
                      className='btn btn-outline-primary ml-3'
                      style={{ height: '0.97cm' }}
                      onclick='acc_code_search()'
                    >
                      search
                    </button>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12'>
                  <div class='card'>
                    <div class='card-header'>
                      <div class='row justify-content-between'>
                        <label class=''>
                          {/* Expense Transaction List */}
                          <span class='float-right'>
                            {' '}
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#add_incomes'
                              class='btn btn-sm btn-primary'
                              onclick='hide_bank_acc()'
                              onClick={showDialog}
                            >
                              <i class='fas fa-plus'></i> Add Expense
                            </button>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}
                            <button
                              type='button'
                              className='btn btn-sm btn-success'
                              onClick={excelExport}
                            >
                              <FaFileExcel />&nbsp;
                              Export
                            </button>
                          </span>
                        </label>
                      </div>
                      <div class='row' id='trial_balance'></div>
                    </div>

                    <div class='card-body'>
                      {/* Export data in Excel */}
                      <ExcelExport data={expenseLists} ref={_export}>
                        <ExcelExportColumn
                          field=''
                          title='No'
                          locked={true}
                          width={30}
                        />
                        <ExcelExportColumn
                          field='date'
                          title='Date'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={200}
                        />

                        <ExcelExportColumn
                          field='relatedBankAccount.name'
                          title='Bank Account'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field='relatedCashAccount.name'
                          title='Cash Account'
                          headerCellOptions={{
                            textAlign: 'center'
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field='relatedAccounting.name'
                          title='Account'
                          width={150}
                        />
                        <ExcelExportColumn
                          field='remark'
                          title='Remark'
                          width={150}
                        />
                      </ExcelExport>
                      {/* Export Data in Excel end */}
                      <div class='row'>
                        <div class='col-md-12'>
                          <div
                            class='table-responsive text-black'
                            id='slimtest2'
                          >
                            <table class='table table-hover' id='filter_date'>
                              <thead class='bg-info text-white'>
                                <tr>
                                  <th>#</th>
                                  <th class='text-center'>Date</th>
                                  <th class='text-center'>
                                    Bank / Cash Account
                                  </th>
                                  <th class='text-center'>Account</th>

                                  <th class='text-center'>Balance</th>
                                  <th class='text-center'>Currency</th>
                                  <th class='text-center'>Remark</th>
                                  <th class='text-center'>Action</th>
                                </tr>
                              </thead>

                              {expenseLists.map((expenseList, i) => (
                                <tbody className=''>
                                  <tr>
                                    <td>{++i}</td>
                                    <td>{expenseList.date.split('T')[0]}</td>
                                    <td>
                                      {expenseList.relatedBankAccount
                                        ? expenseList.relatedBankAccount.name
                                        : expenseList.relatedCashAccount.name}
                                    </td>
                                    <td>
                                      {expenseList.relatedAccounting
                                        ? expenseList.relatedAccounting.name
                                        : 'No'}
                                    </td>

                                    <td>
                                      {expenseList.finalAmount.toLocaleString(
                                        undefined,
                                        {
                                          maximumFractionDigits: 2,
                                          minimumFractionDigits: 2
                                        }
                                      )}
                                    </td>
                                    <td>{expenseList.finalCurrency}</td>
                                    <td>{expenseList.remark}</td>

                                    <td className='text-center'>
                                      <button
                                        type='button'
                                        className='btn btn-sm btn-primary ml-2'
                                        onClick={() =>
                                          handleRelatedShow(
                                            expenseList._id
                                            // expenseList.relatedAccounting._id,
                                            //expenseList.relatedBankAccount._id,
                                          )
                                        }
                                      >
                                        Transaction
                                      </button>
                                    </td>
                                  </tr>

                                  <tr
                                    className='bg-light'
                                    id={'toggle' + expenseList._id}
                                    hidden
                                  >
                                    <td colspan='12'>
                                      <div>
                                        <div class='row'>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              No
                                            </label>
                                          </div>
                                          <div class='col-md-3'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Account
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Type
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Date
                                            </label>
                                          </div>
                                          <div class='col-md-2'>
                                            <label
                                              style={{ fontSize: '15px' }}
                                              class='text-dark'
                                            >
                                              Amount
                                            </label>
                                          </div>
                                        </div>

                                        {relatedLists
                                          ? relatedLists.map((reList, i) => (
                                              <div class='row'>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {++i}
                                                  </div>
                                                </div>
                                                <div class='col-md-3'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {
                                                      reList.relatedAccounting
                                                        .name
                                                    }
                                                  </div>
                                                </div>
                                                <div class='col-md-2'>
                                                  {reList.type}
                                                </div>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {reList.date.split('T')[0]}
                                                  </div>
                                                </div>
                                                <div class='col-md-2'>
                                                  <div
                                                    style={{
                                                      fontSize: '15px'
                                                    }}
                                                  >
                                                    {reList.amount}
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          : ''}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ExpenseDialog
                open={open}
                close={() => setOpen(false)}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
              />
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
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

      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default Expense
