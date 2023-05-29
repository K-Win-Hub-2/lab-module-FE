/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react'
import SideBar from '../components/views/SideBar'

import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'

import { Base64 } from 'js-base64'
import ReactHtmlParser from 'react-html-parser'
import ReactToPrint from 'react-to-print'
import styled, { keyframes } from 'styled-components'
// import Printer from "@eyelly/react-printer";

const TestVoucherPrint = () => {
  const [referDoctorLists, setReferDoctorLists] = useState([])
  const [selectedPatho, setSelectedPatho] = useState('')
  const [voucherLists, setVoucherLists] = useState([])
  const [filteredVouchers, setFilteredVouchers] = useState([])

  const [patientLists, setPatientLists] = useState([])

  const [labID_VouCode, setLabID_VouCode] = useState([])
  const [headerOn, setHeaderOn] = useState(true)
  const [refOn, setRefOn] = useState(true)
  const [resOn, setResOn] = useState(true)
  const [textArea, settextArea] = useState('')
  const [showBottom, setShowBottom] = useState(true)
  const [subTest, setSubTest] = useState([])
  // const [headerOff, setHeaderOff] = useState(false);

  const TR = styled.tr`
    font-size: 22px;
    margin-top: 20px;
    border-style: hidden;
  `
  const TH1 = styled.th`
    font-size: 19px;
  `
  const TD1 = styled.td`
    font-size: 19px;
  `

  const SPAN = styled.span`
    font-size: 19px;
  `
  const P = styled.p`
    color: white;
  `
  let componentRef = useRef()

  // const getContentSize = () => {
  //   const contentElement = componentRef.current;
  //   const contentRect = contentElement.getBoundingClientRect();
  //   const { width, height } = contentRect;
  //   return { width, height };
  // };

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

  const handleBottomChange = event => {
    setShowBottom(false);
    const interval = setInterval(() => {
      let printContents = document.getElementById('print').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents; 
    }, 500);  
    clearInterval(interval);
    window.close();
  }

  const handleChange = event => {
    if (event.target.checked) {
      voucherLists.map(vou => {
        if (vou._id === event.target.value) {
          setFilteredVouchers([...filteredVouchers, vou])
        }
      })
    } else {
      if (filteredVouchers.length > 0) {
        setFilteredVouchers(
          filteredVouchers.filter(vou => vou._id !== event.target.value)
        )
      }
    }
    //setIsSubscribed(current => !current);
  }
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

  const handlePathoChange = value => {
    referDoctorLists.map((doctor, index) => {
      if (doctor._id === value) {
        setSelectedPatho(doctor)
      }
    })
  }

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/' +
            // 'http://localhost:9000/api/voucher/' +
            TestVou_id
        )

        // console.log(vouDate);
        setVoucherLists(res.data.data.testSelection)
        //setFilteredVouchers(res.data.data.testSelection)
        settextArea(res.data.data.comment)
        setLabID_VouCode(res.data.data)
        console.log(res.data.data, 'resultPrint')

        // console.log(res.data.data.testSelection[0].name.specialComment);

        // console.log(res.data.data.testSelection[0].result);
      } catch (err) {
        alert('Error')
      }
    }

    const getPatientList = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/voucher/' +
            TestVou_id
        )

        setPatientLists(res.data.data.relatedPatient)
      } catch (err) {
        alert('Error')
      }
    }

    const getReferDoctorList = async () => {
      try {
        const res = await axios.get(
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/pathologists'
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
            >
              <div className='card' id='print' ref={el => (componentRef = el)}>
                <div
                  calssName='card-body shadow vh-200'
                  // style={{ border: '1px solid black', padding: '14px 14px' }}
                >
                  <div
                    className='row'
                    style={{
                      height: '200px',
                      visibility: headerOn ? 'visible' : 'hidden'
                    }}
                  >
                    <div className='col-3'>
                      <img src={require('../logo.png')} alt='' />
                    </div>
                    <div className='offset-1 col-md-5'>
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
                    <div className='col-md-3'>
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
                        <TH1>Patient Name:</TH1>
                        <TD1 colSpan='2'>{patientLists.name}</TD1>
                        <TH1>Laboratory Id:</TH1>
                        <TD1 colSpan='2'>{labID_VouCode.code}</TD1>
                      </tr>
                      <tr>
                        <TH1>Age & Gender:</TH1>
                        <TD1 colSpan='2'>
                          {patientLists.age}yrs&nbsp;/ &nbsp;
                          {patientLists.gender}
                        </TD1>
                        <TH1>Registration Date:</TH1>
                        <TD1 colSpan='2'>
                          {labID_VouCode.date
                            ? labID_VouCode.date.split('T')[0]
                            : ''}
                        </TD1>
                      </tr>
                      <tr>
                        <TH1>Referring Doctor:</TH1>
                        <TD1 colSpan='2'>
                          {referDoctorLists.referDoctor
                            ? referDoctorLists.referDoctor.name
                            : ''}
                        </TD1>
                        <TH1>Clinic:</TH1>
                        <TD1 colSpan='2'>Central Clinic</TD1>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>

                  <table className='table table-hover mt-4'>
                    <thead>
                      <tr>
                        <TH1>Test</TH1>
                        <TH1>Result</TH1>
                        <TH1>Reference Range</TH1>
                        <TH1>Unit</TH1>
                        <TH1>Remark</TH1>
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

                    {filteredVouchers.map(testSelect => (
                      <tbody>
                        {testSelect.name.subTestFlag ? (
                          <tr>
                            <TD1>
                              <div className='col-md-12 border-0'>
                                <p>
                                  <u>
                                    <b>
                                      {testSelect.name.name.includes('NS')
                                        ? testSelect.name.name.replace('NS', '')
                                        : testSelect.name.name}
                                    </b>
                                  </u>
                                </p>
                                {/* {
                                testSelect.name.subTest.map((test) => (
                                  <p>{test.name}</p>
                                ))
                              } */}
                                {testSelect.subTest.map(test => (
                                  <span>
                                    {test !== null ? (
                                      test.type === 'underline' ? (
                                        <p>
                                          <u>
                                            <b>{test.name}</b>
                                          </u>
                                        </p>
                                      ) : test.type === 'highlight' ? (
                                        <p style={{ color: 'red' }}>
                                          <b>{test.name}</b>
                                        </p>
                                      ) : test.type === 'both' ? (
                                        <p style={{ color: 'red' }}>
                                          <u>
                                            <b>{test.name}</b>
                                          </u>
                                        </p>
                                      ) : (
                                        <p>{test.name}</p>
                                      )
                                    ) : (
                                      <p>{test.name}</p>
                                    )}{' '}
                                  </span>
                                  // <p>{(test.type === "underline") ? <u> : ""}{test.name}{(test.type === "underline") ? </u> : ""}</p>
                                ))}
                              </div>
                            </TD1>

                            <TD1>
                              <div className='col-md-12 border-0'>
                                <div style={{ height: '40px' }}></div>
                                {testSelect.subTest.map(test => (
                                  // <p
                                  //   style={{ marginBottom: '6px' }}
                                  // >{(test.result !== null) ? test.result : ""}</p>
                                  <span>
                                    {' '}
                                    {test !== null ? (
                                      test.type === 'underline' ||
                                      test.type === 'highlight' ||
                                      test.type === 'both' ? (
                                        <p style={{ color: 'white' }}>""</p>
                                      ) : (
                                        <p>
                                          {' '}
                                          {test.result !== '' ? (
                                            test.result
                                          ) : test.defaultResult !== '' ? (
                                            test.defaultResult
                                          ) : (
                                            <P>-</P>
                                          )}
                                        </p>
                                      )
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                ))}
                              </div>
                            </TD1>
                            <TD1>
                              <div className='col-md-12 border-0'>
                                <p style={{ height: '24px' }}></p>
                                {/* <div style={{ height: '40px' }}></div> */}
                                {testSelect.subTest.map(test => (
                                  // <p style={{ marginTop: '22px' }}>{test.referenceRange}</p>
                                  <span>
                                    {' '}
                                    {test !== null ? (
                                      test.type === 'underline' ||
                                      test.type === 'highlight' ||
                                      test.type === 'both' ? (
                                        <p style={{ color: 'white' }}>""</p>
                                      ) : (
                                        <p>
                                          {/* <input
                                            className='border-0'
                                            type='text'
                                            id='subRefRange'
                                            defaultValue={formatString(test.referenceRange)}
                                            style={{ height: '24px' }}
                                          /> */}
                                          {formatString(test.referenceRange)}
                                        </p>
                                      )
                                    ) : (
                                      <P>-</P>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </TD1>

                            <TD1>
                              <div className='col-md-12 border-0'>
                                <div style={{ height: '40px' }}></div>
                                {testSelect.subTest.map(test => (
                                  // <p style={{ marginTop: '18px' }}>{test.unit}</p>
                                  <span>
                                    {' '}
                                    {test !== null ? (
                                      test.type === 'underline' ||
                                      test.type === 'highlight' ||
                                      test.type === 'both' ? (
                                        <p style={{ color: 'white' }}>""</p>
                                      ) : (
                                        <p>
                                          {test.unit === '' ? (
                                            <P>-</P>
                                          ) : (
                                            test.unit
                                          )}
                                        </p>
                                      )
                                    ) : (
                                      <P>-</P>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </TD1>

                            <TD1>
                              <div className='col-md-12 border-0'>
                                <div style={{ height: '40px' }}></div>
                                {testSelect.subTest.map(test => (
                                  // <p
                                  //   style={{ marginBottom: '6px' }}
                                  // >{(test.remark !== null) ? test.remark : ""}</p>
                                  <span>
                                    {' '}
                                    {test !== null ? (
                                      test.type === 'underline' ||
                                      test.type === 'highlight' ||
                                      test.type === 'both' ? (
                                        <p style={{ color: 'white' }}>""</p>
                                      ) : (
                                        <p>
                                          {test.remark === '' ? (
                                            <P>-</P>
                                          ) : (
                                            test.remark
                                          )}
                                        </p>
                                      )
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                ))}
                              </div>
                            </TD1>
                          </tr>
                        ) : (
                          <tr key={testSelect._id}>
                            <TD1>
                              {testSelect.name.name.includes('NS')
                                ? testSelect.name.name.replace('NS', '')
                                : testSelect.name.name}
                            </TD1>
                            <TD1>{testSelect.result}</TD1>

                            <TD1>
                              {testSelect.name.specialComment ? (
                                'See Below'
                              ) : (
                                <div>
                                  {testSelect.name.referenceRange.map(refer => (
                                    <p key={refer._id}>
                                      {/* {refer.gender} &nbsp;
                                    {refer.from}-{refer.to} &nbsp; */}
                                      {/* {refer.refRange} */}
                                      <input
                                        type='text'
                                        id='refRange'
                                        name='refRange'
                                        defaultValue={refer.refRange}
                                        style={{ borderStyle: 'hidden' }}
                                      />
                                    </p>
                                  ))}
                                </div>
                              )}
                            </TD1>

                            <TD1>
                              {testSelect.name.specialComment ? (
                                'See Below'
                              ) : (
                                <div>
                                  {testSelect.name.referenceRange.map(refer => (
                                    <p key={refer._id}>{refer.unit}</p>
                                  ))}
                                </div>
                              )}
                            </TD1>

                            <TD1>{testSelect.remark}</TD1>
                          </tr>
                        )}
                      </tbody>
                    ))}
                  </table>
                  {textArea ? (
                    <div className='row'>
                      <label>Comment</label>
                      <p>{textArea}</p>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className='px-3 py-2'>
                    <div className='row'>
                      {filteredVouchers.map(specDecode => (
                        <div className='col-md-6' key={specDecode._id}>
                          <h6 className='text-bold text-decoration-underline'>
                            {specDecode.name.specialFlag
                              ? `${specDecode.name.name} Reference Range`
                              : ''}
                          </h6>
                          <p>{formatString(specDecode.name.specialComment)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {showBottom ? (
                    <div className='row' style={{ margin: '50px' }}>
                      <div class='fixed-bottom' className='col-6'>
                        <SPAN>Laboratory Technician</SPAN>
                      </div>
                      <div
                        class='fixed-bottom'
                        className='col-6'
                        style={{ textAlign: 'right' }}
                      >
                        <SPAN>{selectedPatho.name}</SPAN>
                        <br></br>
                        <SPAN>{selectedPatho.position}</SPAN>
                        <br></br>
                        <SPAN>{selectedPatho.education}</SPAN>
                        <br></br>
                        <SPAN>Central Lab, Ahlone, Yangon</SPAN>
                      </div>
                    </div>
                  ) : (
                    <div className='row' style={{ marginTop: '800px' }}>
                      <div className='col-6'>
                        <SPAN>Laboratory Technician</SPAN>
                      </div>
                      <div className='col-6' style={{ textAlign: 'right' }}>
                        <SPAN>{selectedPatho.name}</SPAN>
                        <br></br>
                        <SPAN>{selectedPatho.position}</SPAN>
                        <br></br>
                        <SPAN>{selectedPatho.education}</SPAN>
                        <br></br>
                        <SPAN>Central Lab, Ahlone, Yangon</SPAN>
                      </div>
                    </div>
                  )}
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
            <div className='col-6'>
              <select
                className='form-control'
                name='pathologist'
                id='pathologist'
                onChange={e => handlePathoChange(e.target.value)}
              >
                <option value=''>Select Pathologist</option>
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
              {voucherLists.map(vou => (
                <div>
                  <input
                    type='checkbox'
                    id={vou._id}
                    name={vou.name.name}
                    value={vou._id}
                    onChange={handleChange}
                  />
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
          <div className='d-flex justify-content-center'>
            {/* <ReactToPrint
              trigger={() => ( */}
                <button
                  className='btn btn-success mt-3 mb-4'
                  onClick={handleBottomChange}
                >
                  Print
                </button>
              {/* )}
              content={() => componentRef}
              // pageStyle={`@page { size: ${getContentSize().width}px ${getContentSize().height}px; }`}
            /> */}
          </div>
        </div>
      </div>

      {/* <ResultDialog open={isOpen} close={()=>setIsOpen(false)} name={pname} age={page} gender={pgender} voucher={vouId}/> */}
    </div>
  )
}

export default TestVoucherPrint
