/* eslint-disable */
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SideBar from '../SideBar'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import apiInstance from '../../../utils/api'

function Heading() {
  const [heading, setHeading] = useState([])
  const [accType, setAccType] = useState('')
  const [accTypeList, setAccTypeList] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [upAccType, setUpAccType] = useState('')
  const [upName, setUpName] = useState('')
  const [upDesc, setUpDesc] = useState('')
  const [id, setId] = useState("");
  const [showUpdate, setShowUpdate] = useState(false)
  const handleDelete = event => {
    apiInstance
      .delete(
        'account-header/' +
        event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = heading.filter(item => item._id !== event)
        setHeading(result)
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
    const getHeadingUpdate = async () => {
      try {
        const res = await apiInstance.get(
          'account-header/' +
          event
        )
        console.log(res.data)

        setUpName(res.data.data[0].name)
        setUpDesc(res.data.data[0].description)
        setUpAccType(res.data.data[0].relatedAccountType._id)
      } catch (err) { }
    }
    getHeadingUpdate()
    setShowUpdate(true)
    setId(event)
  }

  const HeadingUpdate = () => {
    const data = {
      id: id,
      relatedAccountType: upAccType,
      name: upName,
      description: upDesc
    }

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    apiInstance
      .put(
        'account-header',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully Updated',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })

        setHeading(
          heading.map(head => {
            if (head._id === response.data.data._id) {
              return response.data.data
            } else {
              return head
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
    document.getElementById('upacc_type').value = ''
    document.getElementById('updesc').value = ''
    document.getElementById('upname').value = ''
    setShowUpdate(false)
  }

  const HeadingCreate = () => {
    const data = {
      relatedAccountType: accType,
      name: name,
      description: description
    }
    // alert(JSON.stringify(data));
    // console.log(data);
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    apiInstance
      .post(
        'account-header',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully Created!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })

        window.location.reload()

      })
      .catch(function (err) {
        alert(err.message)
      })
    document.getElementById('desc').value = ''
    document.getElementById('name').value = ''
    document.getElementById('acc_type').value = ''
    //      props.setOpen(false);
  }
  useEffect(() => {
    const getHeading = async () => {
      try {
        const res = await apiInstance.get(
          'account-headers?limit=50'
        )

        setHeading(res.data.list)
      } catch (err) { }
    }
    const getAccountingType = async () => {
      try {
        const res = await apiInstance.get(
          'account-types'
        )
        setAccTypeList(res.data.list)
      } catch (err) { }
    }

    getHeading()
    getAccountingType()
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
                    {/* <li className='breadcrumb-item'>
                      <Link to='/account_head'>Home</Link>
                    </li> */}
                    <li className='breadcrumb-item active'>Heading List</li>
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
                            <th>Account Type</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        {heading.map((head, i) => (
                          <tbody className=''>
                            <tr>
                              <td>{++i}</td>
                              <td>{head.relatedAccountType ? head.relatedAccountType.name
                                : ''}</td>
                              <td>{head.name}</td>
                              <td>{head.description}</td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-sm btn-warning'
                                  onClick={e => handleUpdate(head._id)}
                                >
                                  <FaRegEdit />
                                </button>
                                &nbsp;
                                <button
                                  className='btn btn-sm btn-danger'
                                  onClick={e => handleDelete(head._id)}
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

                {showUpdate ? (<div className='col-md-3'>
                  <div className='card px-3 py-3'>
                    <h5 className='card-header mb-4 fw-5 text-secondary'>
                      Update Heading
                    </h5>

                    <div class='form-group'>
                      <label for='name'>Account Type</label>
                      <select
                        class='custom-select border-info'
                        name='account_type_id'
                        id='upacc_type'
                        onChange={e => setUpAccType(e.target.value)}
                      >
                        <option>Choose Account Type</option>
                        {accTypeList.map(option => (
                          <option value={option._id} selected={option._id === upAccType}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    <div class='form-group'>
                      <label for='name' className='text-secondary'>
                        Name
                      </label>
                      <input
                        type='text'
                        class='form-control border-info'
                        name='name'
                        id='upname'
                        defaultValue={upName}
                        //   ref={(el) => (this.name = el)}
                        onChange={e => setUpName(e.target.value)}
                      />
                    </div>
                    <div class='form-group'>
                      <label for='name' className='text-secondary'>
                        Description
                      </label>
                      <textarea
                        className='form-control'
                        id='updesc'
                        defaultValue={upDesc}
                        //   ref={(el) => (this.description = el)}
                        onChange={e => setUpDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className='btn btn-primary form-control text-center fw-5'
                      onClick={HeadingUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>) : (<div className='col-md-3'>
                  <div className='card px-3 py-3'>
                    <h5 className='card-header mb-4 fw-5 text-secondary'>
                      Create Heading
                    </h5>

                    <div class='form-group'>
                      <label for='name'>Account Type</label>
                      <select
                        class='custom-select border-info'
                        name='account_type_id'
                        id='acc_type'
                        onChange={e => setAccType(e.target.value)}
                      >
                        <option>Choose Account Type</option>
                        {accTypeList.map(option => (
                          <option value={option._id}>{option.name}</option>
                        ))}
                      </select>
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
                      onClick={HeadingCreate}
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
export default Heading
