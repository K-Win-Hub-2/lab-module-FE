/* eslint-disable */

import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft, FaMinus } from 'react-icons/fa'
import Sidebar from './SideBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import apiInstance from '../../utils/api'

function ReagentUpdate() {
  const [stockUnitTemp, setStockUnitTemp] = useState('')
  const [stockLists, setStockLists] = useState([])
  const [supplier, setSupplier] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [tableData, setTableData] = useState([]);
  const reagID = useLocation().pathname.split('/')[2]
  const [updateCode, setUpdateCode] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [updateSupplier, setUpdateSupplier] = useState('')

  const handleAddRow = () => {
    setTableData([...tableData, { id: tableData.length + 1, stockQty: "", reorderQty: "", purchasePrice: "", unitName: "" }]);
  };

  const handleDeleteRow = (id) => {
    const filteredData = tableData.filter((data) => data.id !== id);
    setTableData(filteredData);
  };

  const handleInputChange = (event, id, field) => {
    const newData = tableData.map((data) => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value };
      }
      return data;
    });
    setTableData(newData);
  };

  const handleBox = event => {
    let newStock = {
      id: stockUnitTemp.split('.')[0],
      name: stockUnitTemp.split('.')[1],
      amount: 0
    }
    setStockLists([...stockLists, newStock])
  }

  const clearTextBox = textboxId => {
    const textbox = document.getElementById(textboxId)
    if (textbox && textbox.value) {
      textbox.value = ''
    }
  }

  const clearForm = () => {
    clearTextBox('code')
    clearTextBox('name')
    clearTextBox('supplier')
  }

  const ReagentCreate = () => {
    const data = {
      code: updateCode,
      name: updateName,
      stockUnit: tableData,
      supplier: updateSupplier,
      id: reagID
    }
    if (supplier) data.supplier = supplier
    if (name) data.name = name
    if (code) data.code = code
    // alert(JSON.stringify(data));
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    apiInstance
      .put(
        'reagent',
        data,
        config
      )
      .then(function (response) {
        console.log(response)
        setTableData([]) // clear form
        Swal.fire({
          title: 'Success',
          text: 'successfully Registered!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        clearForm()
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'CANCEL'
        })
      })
    // document.getElementById("supplier").value = "";
    // document.getElementById("name").value = "";
    // document.getElementById("code").value = "";
    // document.getElementById("flag").value = "";
  }

  useEffect(() => {
    const getReagentUpdate = async () => {
      try {
        const res = await apiInstance.get(
          'reagent/' + reagID
        )
        setUpdateCode(res.data.data.code)
        setUpdateName(res.data.data.name)
        setUpdateSupplier(res.data.data.supplier)
        let newArr = [];
        if (res.data.data.stockUnit) {
          res.data.data.stockUnit.map(function (e, i) {
            e = { ...e, id: i + 1 }
            newArr.push(e)
          })
          setTableData(newArr)
        }
        console.log(res.data.data, 'here')
      } catch (err) { }
    }
    getReagentUpdate()
  }, [])
  return (
    <div classNameName='App'>
      <div className='wrapper'>
        <Sidebar />
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-12'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/reagent'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active mt-1'>
                      Reagent Register
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='container-fluid'>
              {/* <!-- Small boxes (Stat box) --> */}
              <div class='card'>
                <div class='card-body p-b-0'>
                  <div className='form-group'>
                    <label className='control-label'>Code</label>
                    <input
                      type='text'
                      id='code'
                      className='form-control'
                      name='company_name'
                      defaultValue={updateCode}
                      onChange={e => setUpdateCode(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label className='control-label'>Name</label>
                    <input
                      type='text'
                      id='name'
                      className='form-control'
                      name='company_address'
                      defaultValue={updateName}
                      onChange={e => setUpdateName(e.target.value)}
                    />
                  </div>

                  <div className='form-group mt-3'>
                    <label className='control-label'>Supplier</label>

                    <input
                      type='text'
                      className='form-control'
                      placeholder=''
                      name='md_name'
                      id='supplier'
                      defaultValue={updateSupplier}
                      onChange={(e) => setUpdateSupplier(e.target.value)}
                    />
                  </div>
                  {/* <div className='form-group mt-3 row gap-3'>
                    <span>
                      <label className='control-label'>StockUnit</label>
                      <span> </span>
                      <button className='btn btn-sm btn-primary fa fa-plus-circle' onClick={handleAddRow}></button>
                    </span>
                    {tableData.map((data) => (

                      <div className='row mt-3'>
                        <div className='col-md-2'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Unit Name'
                            name='md_name'
                            id='purchase'
                            value={data.unitName}
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                data.id,
                                "unitName"
                              )
                            }
                          />
                        </div>
                        <div className='col-md-3'>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Stock Qty'
                            name='md_name'
                            id='stockQty'
                            value={data.stockQty}
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                data.id,
                                "stockQty"
                              )
                            }
                          />
                        </div>
                        <div className='col-md-3'>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Reorder Qty'
                            name='md_name'
                            id='reorderQty'
                            value={data.reorderQty}
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                data.id,
                                "reorderQty"
                              )
                            }
                          />
                        </div>
                        <div className='col-md-3'>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Purchase Price'
                            name='md_name'
                            id='purchase'
                            value={data.purchasePrice}
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                data.id,
                                "purchasePrice"
                              )
                            }
                          />
                        </div>
                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger rounded-circle"
                            id="removeRowFromMultiTests"
                            onClick={() =>
                              handleDeleteRow(data.id)
                            }>
                            <FaMinus />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div> */}


                  {/* <div className="form-group">
                    <label className="control-label">Purchase Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="md_name"
                    />
                  </div> */}

                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='row'>
                        <div className=' col-md-9'>
                          <button
                            type='submit'
                            onClick={ReagentCreate}
                            className='btn btn-primary'
                          >
                            Create
                          </button>
                          &nbsp;
                          <button
                            type='button'
                            className='btn btn-danger'
                            data-dismiss='modal'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- /.row (main row) --> */}

            {/*<!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
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
        <aside className='control-sidebar control-sidebar-dark'>
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
        {/* <!-- /.control-sidebar --> */}
      </div>
      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default ReagentUpdate
