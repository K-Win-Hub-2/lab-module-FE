/* eslint-disable */

import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Sidebar from './SideBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import apiInstance from '../../utils/api'

function LabServiceRegister() {
  const [name, setName] = useState('')
  const [selection, setSelection] = useState('')
  const [value, setValue] = useState('')
  const [valueType, setValueType] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [education, setEducation] = useState('')
  const [position, setPosition] = useState('')
  const [selectionName, setSelectionName] = useState('')
  const [selectionID, setSelectionID] = useState('')
  const [showRelatedDoc, setShowRelatedDoc] = useState(false)
  const [showPytho, setShowPytho] = useState(false)
  const [doctorLists, setDoctorLists] = useState([])
  const DoctorID = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const getDoctor = async () => {
      console.log(DoctorID)
      const res = await apiInstance.get(
        'doctor/' + DoctorID

      )
      console.log(res.data.data)

      setName(res.data.data.name)
      setPhone(res.data.data.phone)
      setEmail(res.data.data.email)
      setEducation(res.data.data.education)
      setPosition(res.data.data.position)
      setSelectionName(res.data.data.selection)
    }
    getDoctor()
  }, [])

  const DoctorUpdate = event => {
    const data = {
      id: DoctorID,

      name: name,
      // selection: selection,
      education: education,
      position: position,

      phone: phone,
      email: email
    }
    if (selectionName) {
      data.selection = selectionName
    } else {
      data.selection = selection
    }
    // alert(JSON.stringify(data));
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .put(
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor',
        data,
        config
      )
      .then(function (response) {
        setDoctorLists([...doctorLists, response.data.data])
        Swal.fire({
          title: 'Success',
          text: 'successfully Registered!',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        document.getElementById('name').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('edu').value = ''
        document.getElementById('pos').value = ''
        document.getElementById('email').value = ''
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'CANCEL'
        })
      })
  }

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
                      <Link to='/doctorClinic'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active mt-1'>
                      Doctor / Clinic Update
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
                  {/* @if($com == null) */}

                  {/* @csrf */}

                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <label>Select</label>&nbsp;
                        <select
                          className='form-control'
                          onChange={e => {
                            setSelection(e.target.value);
                            setSelectionName(e.target.value)
                          }}
                        >
                          <option value={selectionName}>{selectionName}</option>
                          <option value='ReferDoctor'>Refer Doctor</option>
                          <option value='Pathologist'>Pathologist</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='form-group'>
                      <label className='control-label'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        name='company_address'
                        id='name'
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>

                    <div className='form-group'>
                      <label className='control-label'>Phone</label>
                      <input
                        type='text'
                        className='form-control'
                        id='phone'
                        name='company_contact'
                        defaultValue={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>

                    <div className='form-group'>
                      <label className='control-label'>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='company_email'
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className='form-group'>
                        <label className='control-label'>Education</label>

                        <input
                          type='text'
                          className='form-control'
                          id='edu'
                          defaultValue={education}
                          onChange={e => setEducation(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label className='control-label'>Position</label>

                        <input
                          type='text'
                          className='form-control'
                          id='pos'
                          defaultValue={position}
                          onChange={e => setPosition(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <br />

                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='row'>
                        <div className=' col-md-9'>
                          <button
                            type='submit'
                            className='btn btn-primary'
                            onClick={DoctorUpdate}
                          >
                            Update
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

              {/* <!-- /.row (main row) --> */}
            </div>
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
export default LabServiceRegister
