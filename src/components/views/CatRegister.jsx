/* eslint-disable */
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaCashRegister, FaFileMedical } from 'react-icons/fa'

function Category() {
  const [category, setCategory] = useState([])
  const [code, setCode] = useState('')
  const [amount, setAmount] = useState('')
  const [flag, setFlag] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateDataList, setUpdateDataList] = useState([])
  const [upCode, setUpCode] = useState('')
  const [upName, setUpName] = useState('')
  const [upDesc, setUpDesc] = useState('')
  const [upAmount, setUpAmount] = useState('')
  const [upFlag, setUpFlag] = useState('')
  const [upFlagID, setUpFlagID] = useState('')
  const [check, setCheck] = useState('')
  const [upCheck, setUpCheck] = useState('')

  const [Id, setId] = useState('')

  const handleDelete = event => {
    axios
      .delete(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/category/' +
          event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = category.filter(item => item._id !== event)
        setCategory(result)
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

  const handleUpdate = event => {
    console.log(event, 'event')
    const getCatUpdate = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/category/' +
            event
        )
        console.log(res.data.data)
        setUpCode(res.data.data.code)
        setUpName(res.data.data.name)
        setUpAmount(res.data.data.amount)
        setUpFlag(res.data.data.flag)

        setUpDesc(res.data.data.description)
      } catch (err) {}
    }
    getCatUpdate()
    setShowUpdate(true)
    setId(event)
  }

  const CategoryUpdate = () => {
    const data = {
      id: Id,
      code: upCode,
      name: upName,
      createAcc:upCheck,
      amount:upAmount,
      description: upDesc
    }

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .put(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/category',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Income Data!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        setCategory(
          category.map(category => {
            if (category._id === response.data.data._id) {
              return response.data.data
            } else {
              return category
            }
          })
        )
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Something Wrong!',
          text: 'Try again, Please.',
          icon: 'warning',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
      })
    // document.getElementById('desc').value = ''
    // document.getElementById('name').value = ''
    // document.getElementById('code').value = ''
    // document.getElementById('amount').value = ''
    // document.getElementById('flag').value = ''
  }

  const CategoryCreate = () => {
    const data = {
      code: code,
      name: name,
      amount: amount,
      flag: flag,
      createAcc:check,
      description: description
    }
alert(JSON.stringify(data));

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .post(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/category',
        data,
        config
      )
      .then(function (response) {
        alert('success')
        setCategory([...category, response.data.data])
      })
      .catch(function (err) {
        alert(err.message)
      })
    document.getElementById('desc').value = ''
    document.getElementById('name').value = ''
    document.getElementById('code').value = ''
    document.getElementById('submit').value = ''
  }
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/categories?limit=30'
        )

        setCategory(res.data.data)
      } catch (err) {}
    }
    getCategory()
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
                    <li className='breadcrumb-item active'>Category List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-9'>
                  <div className='card'>
                    <div className='card-header'>
                      {/* <h3 className="card-title">Cost Center List</h3> */}
                    </div>
                    <div className='card-body'>
                      <table id='example1' className='table'>
                        <thead className='text-center bg-info'>
                          <tr>
                            <th>No</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Flag</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        {category.map((cat, i) => (
                          <tbody className=''>
                            <tr>
                              <td>{++i}</td>
                              <td>{cat.code}</td>
                              <td>{cat.name}</td>
                              <td>{cat.amount ? cat.amount : ''}</td>
                              <td>{cat.flag}</td>
                              <td>{cat.description}</td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-sm btn-warning'
                                  onClick={e => handleUpdate(cat._id)}
                                >
                                  Update
                                </button>
                                &nbsp;
                                <button
                                  className='btn btn-sm btn-danger'
                                  onClick={e => handleDelete(cat._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>

                {showUpdate ? (
                  <div className='col-md-3'>
                    <div className='card px-3 py-3'>
                      <h5 className='card-header mb-4 fw-5 text-secondary'>
                        Update Category
                      </h5>
                      <div class='form-group'>
                        <label for='code' className='text-secondary'>
                          Code
                        </label>
                        <input
                          type='text'
                          id='code'
                          class='form-control border-info'
                          name='code'
                          defaultValue={upCode}
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setUpCode(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Name
                        </label>
                        <input
                          type='text'
                          class='form-control border-info'
                          name='name'
                          id='name'
                          defaultValue={upName}
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setUpName(e.target.value)}
                        />
                      </div>

                      <div class='row mb-2'>
                        <label className='text-secondary'>Create Account</label>
                        <div class='col-md-5 ml-1'>
                          <div class='form-check form-check-inline'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='yes_no'
                              id='yes'
                              value='true'
                              onChange={e => setUpCheck(e.target.value)}
                            />
                            <label class='form-check-label text-info' for='yes'>
                              Yes
                            </label>
                          </div>
                        </div>
                        <div class='col-md-5'>
                          <div class='form-check form-check-inline'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='yes_no'
                              id='no'
                              value='false'
                              onclick='hide_project()'
                              onChange={e => setUpCheck(e.target.value)}
                              checked
                            />
                            <label class='form-check-label text-info' for='no'>
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Amount
                        </label>
                        <input
                          type='number'
                          class='form-control border-info'
                          name='name'
                          id='name'
                          defaultValue={upAmount}
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setUpAmount(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label for='name' className='text-secondary'>
                          Flag
                        </label>
                        <select
                          className='custom-select border-info'
                          name='account_type_id'
                          id='flag'
                          onChange={e => setUpFlag(e.target.value)}
                        >
                          <option value={upFlag}>{upFlag}</option>
                          <option value='Service'>Service</option>
                          <option value='Reagent'>Reagent</option>
                        </select>
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Description
                        </label>
                        <textarea
                          className='form-control'
                          id='desc'
                          defaultValue={upDesc}
                          //   ref={(el) => (this.description = el)}
                          onChange={e => setUpDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className='btn btn-primary form-control text-center fw-5'
                        id='submit'
                        onClick={CategoryUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='col-md-3'>
                    <div className='card px-3 py-3'>
                      <h5 className='card-header mb-4 fw-5 text-secondary'>
                        Create Category
                      </h5>
                      <div class='form-group'>
                        <label for='code' className='text-secondary'>
                          Code
                        </label>
                        <input
                          type='text'
                          id='code'
                          class='form-control border-info'
                          name='code'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setCode(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Name
                        </label>
                        <input
                          type='text'
                          class='form-control border-info'
                          name='name'
                          id='name'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setName(e.target.value)}
                        />
                      </div>

                      <div class='row mb-2'>
                        <label className='text-secondary'>Create Account</label>
                        <div class='col-md-5 ml-1'>
                          <div class='form-check form-check-inline'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='yes_no'
                              id='yes'
                              value='true'
                              onChange={e => setCheck(e.target.value)}
                            />
                            <label class='form-check-label text-info' for='yes'>
                              Yes
                            </label>
                          </div>
                        </div>
                        <div class='col-md-5'>
                          <div class='form-check form-check-inline'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='yes_no'
                              id='no'
                              value='false'
                              onclick='hide_project()'
                              onChange={e => setCheck(e.target.value)}
                              checked
                            />
                            <label class='form-check-label text-info' for='no'>
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Amount
                        </label>
                        <input
                          type='number'
                          class='form-control border-info'
                          name='name'
                          id='amount'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setAmount(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label for='name' className='text-secondary'>
                          Flag
                        </label>
                        <select
                          className='custom-select border-info'
                          name='account_type_id'
                          id='flag'
                          onChange={e => setFlag(e.target.value)}
                        >
                          <option></option>
                          <option value='Service'>Service</option>
                          <option value='Reagent'>Reagent</option>
                        </select>
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Description
                        </label>
                        <textarea
                          className='form-control'
                          id='desc'
                          //   ref={(el) => (this.description = el)}
                          onChange={e => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className='btn btn-primary form-control text-center fw-5'
                        id='submit'
                        onClick={CategoryCreate}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className='main-footer mt-5'>
        <strong>
          Copyright &copy; 2017-2020{' '}
          <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      {/* <aside classNameName="control-sidebar control-sidebar-dark">
       
      </aside> */}
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default Category
