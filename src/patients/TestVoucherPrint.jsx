/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react'
import SideBar from '../components/views/SideBar'

import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { Base64 } from 'js-base64'
import ReactHtmlParser from 'react-html-parser'
import ReactToPrint from 'react-to-print'
import apiInstance from '../utils/api'
// import Printer from "@eyelly/react-printer";

const TestVoucherPrint = () => {
  const [referDoctorLists, setReferDoctorLists] = useState([])
  const [selectedPatho, setSelectedPatho] = useState("");
  const [voucherLists, setVoucherLists] = useState([])
  const [filteredVouchers, setFilteredVouchers] = useState([])

  const [patientLists, setPatientLists] = useState([])

  const [labID_VouCode, setLabID_VouCode] = useState([])
  const [headerOn, setHeaderOn] = useState(true)
  const [refOn, setRefOn] = useState(true)
  const [resOn, setResOn] = useState(true)
  // const [headerOff, setHeaderOff] = useState(false);

  let componentRef = useRef()

  const handleOnCheck = () => {
    setHeaderOn(true)
  }

  const handleOffCheck = () => {
    setHeaderOn(false)
  }
  const RefOnCheck = () => {
    setRefOn(true)
  }

  const RefOffCheck = () => {
    setRefOn(false)
  }
  const ResOnCheck = () => {
    setResOn(true)
  }

  const ResOffCheck = () => {
    setResOn(false)
  }
  function decodeBase64(data) {
    const decode = Base64.decode(data)

    return decode
  }

  const handleChange = event => {
    if (event.target.checked) {
      voucherLists.map((vou) => {
        if (vou._id === event.target.value) {
          setFilteredVouchers([...filteredVouchers, vou])
        }
      })
    } else {
      if (filteredVouchers.length > 0) {
        setFilteredVouchers(
          filteredVouchers.filter(
            vou => vou._id !== event.target.value
          )
        )
      }
    }
    //setIsSubscribed(current => !current);
  };
  // end

  // change /br to line brake format
  function formatString(data) {
    const base64String = decodeBase64(data)
    const reactElements = ReactHtmlParser(base64String)

    return reactElements
  }
  // end
  const TestVou_id = useLocation().pathname.split('/')[2]

  // var og_date = labID_VouCode.date;
  // console.log(og_date.split("T"));
  // const sampleStr = 'Hello world';
  // console.log(sampleStr.split(' '));
  // const Regdate = labID_VouCode.date;

  const handlePathoChange = (value) => {
    referDoctorLists.map((doctor, index) => {
      if (doctor._id === value) {
        setSelectedPatho(doctor);
      }
    })
  }

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await apiInstance.get(
          'voucher/' +
          TestVou_id
        )

        // console.log(vouDate);
        setVoucherLists(res.data.data.testSelection)
        //setFilteredVouchers(res.data.data.testSelection)

        setLabID_VouCode(res.data.data)

        // console.log(res.data.data.testSelection[0].name.specialComment);

        // console.log(res.data.data.testSelection[0].result);
      } catch (err) {
        alert('Error')
      }
    }

    const getPatientList = async () => {
      try {
        const res = await apiInstance.get(
          'voucher/' +
          TestVou_id
        )

        setPatientLists(res.data.data.relatedPatient)
      } catch (err) {
        alert('Error')
      }
    }

    const getReferDoctorList = async () => {
      try {
        const res = await apiInstance.get(
          "pathologists"
        )

        setReferDoctorLists(res.data.data)
        setSelectedPatho(res.data.data[0])
        console.log(res.data.data)
      } catch (err) {
        alert('Error')
      }
    }

    getReferDoctorList()
    getPatientList()
    getVoucherList()
  }, [])

  return (
    <div className='wrapper'>
      <SideBar />
      {/* <!-- Content Wrapper. Contains page content --> */}

      <div className='content-wrapper'>
        {/* <!-- Content Header (Page header) --> */}
        <div className='content-header'>
          <div className='container-fluid'>
            <div
              // calssName='card content'
              // style={{ maxWidth: "700px", marginLeft: "170px" }}
              id='print'
              ref={el => (componentRef = el)}
            >
              <div
                // calssName='card-body'
                style={{ border: '1px solid black', padding: '14px 14px' }}
              >

                <div className='row' style={{ visibility: headerOn ? 'visible' : 'hidden' }}>
                  <div className='col-3'>
                    <img src={require('../logo.png')} alt='' />
                  </div>
                  <div className='col-4'>
                    Clinic 1 - 51/A Min Ye Kyaw Swar Road, Ahlone Township,
                    <br />
                    Yangon, Myanmar.
                    <br />
                    Tel : 09 400 662 (Clinic), 09 400 400 650 (Lab)
                    <br />
                    Clinic 2 - 435, May Dawi Road, North Okkalapa Township,
                    <br />
                    Yangon, Myanamr.
                    <br />
                    Tel : 09 400 400 870 (Clinic), 09 400 200 651 (Lab)
                  </div>
                  <div className='col-3'>
                    <img
                      src={require('../logo1.png')}
                      alt=''
                      style={{ marginLeft: '120px' }}
                    />
                  </div>
                </div>


                <p style={{ textAlign: 'center' }} className='mt-5'>
                  <b>
                    <u>LABORATORY REPORT</u>
                  </b>
                </p>
                <table className='table table-hover mt-4'>
                  <thead>
                    <tr>
                      <th>Patient Name:</th>
                      <td colSpan='2'>{patientLists.name}</td>
                      <th>Laboratory Id:</th>
                      <td colSpan='2'>{labID_VouCode.code}</td>
                    </tr>
                    <tr>
                      <th>Age & Gender:</th>
                      <td colSpan='2'>
                        {patientLists.age}yrs&nbsp;/ &nbsp;
                        {patientLists.gender}
                      </td>
                      <th>Registration Date:</th>
                      <td colSpan='2'>
                        {labID_VouCode.date
                          ? labID_VouCode.date.split('T')[0]
                          : ''}
                      </td>
                    </tr>
                    <tr>
                      <th>Referring Doctor:</th>
                      <td colSpan='2'>
                        {referDoctorLists.referDoctor
                          ? referDoctorLists.referDoctor.name
                          : ''}
                      </td>
                      <th>Clinic:</th>
                      <td colSpan='2'>Central Clinic</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>

                <table className='table table-hover mt-4'>
                  <thead >
                    <tr>
                      <th>Test</th>
                      <th>Result</th>
                      <th>Reference Range</th>
                      <th>Unit</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>Vitamin D (25 – OH)</td>
                      <td></td>
                      <td>nmol /L</td>
                      <td>See Below</td>
                    </tr>
                  
                  </tbody> */}
                  <tbody >
                    {filteredVouchers.map(testSelect => (

                      <tr key={testSelect._id}>
                        <td>{testSelect.name.name}</td>
                        <td>{testSelect.result}</td>

                        <td>
                          {testSelect.name.specialComment ? (
                            "See Below"
                          ) : (
                            <div>
                              {testSelect.name.referenceRange.map(refer => (
                                <p key={refer._id}>
                                  {refer.from}-{refer.to} &nbsp;
                                </p>
                              ))}
                            </div>
                          )}
                        </td>

                        <td>
                          {testSelect.name.specialComment ? (
                            "See Below"
                          ) : (
                            <div>
                              {testSelect.name.referenceRange.map(refer => (
                                <p key={refer._id}>{refer.unit}</p>
                              ))}
                            </div>
                          )}
                        </td>

                        <td>{testSelect.remark}</td>
                      </tr>

                    ))}
                  </tbody>
                </table>



                <div className='px-3 py-2'>
                  <div className='row'>
                    {filteredVouchers.map(specDecode => (
                      <div className='col-md-6' key={specDecode._id}>
                        <h6 className='text-bold text-decoration-underline'>
                          {specDecode.name.name} Reference Range
                        </h6>
                        <p>{formatString(specDecode.name.specialComment)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='row' style={{ marginTop: '50px' }}>
                  <div className='col-6'>
                    <span>Laboratory Technician</span>
                  </div>
                  <div className='col-6' style={{ textAlign: 'right' }}>
                    {console.log(referDoctorLists)}
                    <span>
                      {
                        selectedPatho.name}
                    </span>
                    <br></br>
                    <span>
                      {selectedPatho.position
                      }
                    </span>
                    <br></br>
                    <span>
                      {selectedPatho.education
                      }
                    </span>
                    <br></br>
                    <span>Central Lab, Ahlone, Yangon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='offset-1 col-md-3 mb-4' style={{ marginTop: '2em' }}>
            <label>Pathologist</label>&nbsp;
            {/* <input
              type='radio'
              id='on'
              name='reference'
              onChange={RefOnCheck}
            />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input
              type='radio'
              id='off'
              name='reference'
              onChange={RefOffCheck}
            /> */}
            <div className='col-6' >

              <select
                className="form-control"
                name="pathologist"
                id="pathologist"
                onChange={(e) => handlePathoChange(e.target.value)}
              >
                <option value="">Select Pathologist</option>
                {referDoctorLists.map(option => (
                  <option value={option._id}>{option.name}</option>
                ))}
              </select>

            </div>
          </div>
          <div className='col-md-3 mb-4' style={{ marginTop: '2em' }}>
            <label>Tests Result</label>&nbsp;
            {/* <input type='radio' id='on' name='result' onChange={ResOnCheck} />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input type='radio' id='off' name='result' onChange={ResOffCheck} /> */}
            <div className='col-6'>
              {voucherLists.map((vou) => (
                <div>
                  <input type="checkbox" id={vou._id} name={vou.name.name} value={vou._id} onChange={handleChange} />
                  <label htmlFor={vou.name.name}>{vou.name.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className='col-md-3 mb-4' style={{ marginTop: '2em' }}>
            <label>Header On</label>&nbsp;
            <input
              type='radio'
              id='on'
              name='amoper'
              onChange={handleOnCheck}
            />
            &nbsp; &nbsp;
            <label>Off</label>&nbsp;
            <input
              type='radio'
              id='off'
              name='amoper'
              onChange={handleOffCheck}
            />
          </div>
          <div className=''>
            <ReactToPrint
              trigger={() => (
                <button className='btn btn-success mt-3 mb-4 form-control w-25' style={{ marginLeft: '350px' }}>Print</button>
              )}
              content={() => componentRef}
            />
          </div>


        </div>
      </div>

      {/* <ResultDialog open={isOpen} close={()=>setIsOpen(false)} name={pname} age={page} gender={pgender} voucher={vouId}/> */}
    </div>
  )
}

export default TestVoucherPrint
