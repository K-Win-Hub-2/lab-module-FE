/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaMinus } from 'react-icons/fa'
import Sidebar from './SideBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Base64 } from 'js-base64'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import apiInstance from '../../utils/api'

function LabServiceUpdate() {
  const [category, setCategory] = useState([])
  const [reagentArray, setReagentArray] = useState([])
  // const [referDoctor, setReferDoctor] = useState([]);
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [leadTime, setLeadTime] = useState('')
  const [relatedCategory, setRelatedCategory] = useState('')
  const [updateCategory, setUpdateCategory] = useState('')
  // const [doctor, setDoctor] = useState("");
  const [charges, setCharges] = useState('')
  const [cost, setCost] = useState('')
  const [reagentItems, setReagentItems] = useState([])
  const [description, setDescription] = useState('')
  const [tempReagent, setTempReagent] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [gender, setGender] = useState('')
  const [unit, setUnit] = useState('')
  const [mfrom, setmFrom] = useState(0)
  const [mto, setmTo] = useState(0)
  const [mgender, setmGender] = useState('')
  const [munit, setmUnit] = useState('')
  const [ffrom, setfFrom] = useState(0)
  const [fto, setfTo] = useState(0)
  const [fgender, setfGender] = useState('')
  const [funit, setfUnit] = useState('')
  const [specialComment, setSpecialComment] = useState('')
  const [showNextRef, setShowNextRef] = useState(false)
  const [refArray, setRefArray] = useState([])
  const [specialFlag, setSpecialFlag] = useState('')
  const [showSpecialCmt, setShowSpecialCmt] = useState(false)
  const [referAmount, setReferAmount] = useState('')
  const [showRefForm, setShowRefForm] = useState(false)
  const [showMultiTest, setShowMultiTest] = useState(false)
  const [subTest, setSubTest] = useState([])
  const [showSpecialRange, setShowSpecialRange] = useState(false)
  const [tableData, setTableData] = useState([])
  const [refData, setRefData] = useState([]);
  const labid = useLocation().pathname.split('/')[2]
  const navigate = useNavigate()

  function decodeBase64(data) {
    const decode = Base64.decode(data)

    return decode
  }
  // end

  // change /br to line brake format
  //  function formatString(data) {
  //    const base64String = decodeBase64(data);
  //    const reactElements = ReactHtmlParser(base64String);

  //    return reactElements;
  //  }

  const handleAddRefRow = () => {
    setRefData([...refData, { id: refData.length + 1, refRange: "", unit: "" }]);
  };

  const handleDeleteRefRow = (id) => {
    const filteredData = refData.filter((data) => data.id !== id);
    setRefData(filteredData);
  };

  const handleRefInputChange = (event, id, field) => {

    const newData = refData.map((data) => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value };
      }
      return data;
    });
    console.log(newData);
    setRefData(newData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { id: tableData.length + 1, name: '', result: '', defaultResult: "", referenceRange: '', unit: '', type: "", remark: '' }
    ])
  }

  const handleDeleteRow = id => {
    const filteredData = tableData.filter(data => data.id !== id)
    setTableData(filteredData)
  }

  const handleInputChange = (event, id, field) => {
    // let value = "";
    // if(field === "referenceRange"){
    //   value = Base64.encode(event.target.value);
    //   console.log(value)
    // }else{
    //   value = event.target.value;
    // }

    const newData = tableData.map(data => {
      if (data.id === id) {
        if (field === "referenceRange" && data.type === "multiline") {
          return { ...data, [field]: Base64.encode(event.target.value) }
        } else {
          return { ...data, [field]: event.target.value }
        }
      }
      return data
    })
    console.log(newData);
    setTableData(newData)
  }

  const handleYesChange = () => {
    setShowSpecialCmt(true)
    setShowRefForm(false)
  }

  const handleNoChange = () => {
    setShowSpecialCmt(false)
    setShowRefForm(true)
  }

  const handleBox = event => {
    let newReagent = {
      id: tempReagent.split('.')[0],
      name: tempReagent.split('.')[1],
      amount: 0
    }
    setReagentArray([...reagentArray, newReagent])
  }

  const handleRefRange = event => {

    if (event == 0) {

      var newRef = {
        from: mfrom,
        to: mto,
        gender: mgender,
        unit: munit
      }



    } else if (event == 1) {
      var newRef = {
        from: ffrom,
        to: fto,
        gender: fgender,
        unit: funit
      }


    }

    setRefArray([...refArray, newRef])
  }

  const handleAlert = () => {
    Swal.fire({
      title: 'Success',
      text: 'successfully Registered!',
      icon: 'success',
      confirmButtonText: 'OK'
    })
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
    clearTextBox('desc')
    clearTextBox('lead')
    clearTextBox('noVal')
    clearTextBox('flag')
    clearTextBox('charge')
    clearTextBox('cost')
    clearTextBox('referamo')
    clearTextBox('cat')
    clearTextBox('textArea')
    clearTextBox('subTestName')
    clearTextBox('subTestRR')
    clearTextBox('subTestUnit')
  }

  const ServiceCreate = event => {
    event.preventDefault()
    const specialCommentEncode = specialComment.replace(/\n/g, '<br />')

    const myString = specialCommentEncode
    const encodedString = Base64.encode(myString)

    let data = {
      id: labid,
      code: code,
      name: name,
      referAmount: referAmount,
      leadTime: leadTime,
      charges: charges,
      cost: cost,
      relatedCategories: relatedCategory,
      reagentItems: reagentArray,
      referenceRange: refData,
      description: description,
      specialFlag: showSpecialCmt,
      specialComment: encodedString,
      subTestFlag: showMultiTest,
      subTest: tableData
    }

    // alert(JSON.stringify.data);

    // if (doctor) data= {...data, referDoctor:doctor}
    if (relatedCategory) data = { ...data, relatedCategory: relatedCategory }

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    apiInstance
      .put(
        'service',
        // 'http://localhost:9000/api/service',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Success',
          text: 'successfully Updated!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        clearForm()
        // props.setReagent([...props.category, response.data.data]);
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

  const getCategory = async () => {
    try {
      const res = await apiInstance.get(
        'categories?limit=30'
      )

      setCategory(res.data.data)
    } catch (err) { }
  }

  const getReagent = async () => {
    try {
      const res = await apiInstance.get(
        'reagents?limit=30'
      )
      setReagentItems(res.data.data)
    } catch (err) { }
  }

  const getUpdate = async () => {
    const res = await apiInstance.get(
      'service/' +
      // 'http://localhost:9000/api/service/' +
      labid
    )
    //console.log("success");
    console.log(res.data.data)
    setCode(res.data.data.code)
    setName(res.data.data.name)
    setDescription(res.data.data.description)
    setCharges(res.data.data.charges)
    setCost(res.data.data.cost)
    //setRefArray(res.data.data.referenceRange)
    setUpdateCategory((res.data.data.relatedCategory !== undefined) ? res.data.data.relatedCategory._id : '')
    setReagentArray(res.data.data.reagentItems)
    //  console.log(res.data.data.referenceRange);
    //setFrom(res.data.data.referenceRange.from);
    setReferAmount(res.data.data.referAmount)
    setCharges(res.data.data.charges)
    //setShowMultiTest(res.data.data.subTestFlag);
    //setShowMultiTest(res.data.data.subTestFlag);
    if (res.data.data.subTestFlag) {
      setShowMultiTest(true)
      let newArr = []
      res.data.data.subTest.map(function (e, i) {
        // e = {...e, id:i+1, referenceRange: (e.type === "multiline") ? decodeBase64(e.referenceRange) : e.referenceRange}
        e = { ...e, id: i + 1 }
        newArr.push(e)
      })
      setTableData(newArr)
      setShowSpecialRange(false)
      setShowNextRef(false)
    } else {
      setShowMultiTest(false)
      setShowSpecialRange(true)
      if (res.data.data.specialFlag) {
        setSpecialFlag(true)
        setShowSpecialCmt(true)
        setSpecialComment(decodeBase64(res.data.data.specialComment))
        setShowRefForm(false)
      } else {
        setSpecialFlag(false)
        setShowSpecialCmt(false)
        setShowRefForm(true)
        // if (refArray !== null && refArray.length > 0) {
        //   setmFrom(refArray[0].from)
        //   setmTo(refArray[0].to)
        //   setmGender(refArray[0].gender)
        //   console.log(mgender)
        //   setmUnit(refArray[0].unit)

        //   if (refArray.length > 1) {
        //     setShowNextRef(true)
        //     setfFrom(refArray[1].from)
        //     setfTo(refArray[1].to)
        //     setfGender(refArray[1].gender)
        //     console.log(fgender)
        //     setfUnit(refArray[1].unit)
        //   }

        // }
        if (res.data.data.referenceRange !== undefined) {

          let newArray = []
          res.data.data.referenceRange.map(function (e, i) {
            e = { ...e, id: i + 1 }
            newArray.push(e)
          })
          setRefData(newArray)
          if (res.data.data.referenceRange.length > 1) {
            setShowNextRef(true);
          }
        }

      }
    }
  }

  useEffect(() => {
    getCategory()
    getReagent()
    getUpdate()
    //getReagent();
    // getReferDoctor();
    //getCategory();
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
                      <Link to='/lab-test'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active mt-1'>
                      Lab Service Register
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='container-fluid'>
              <div class='card'>
                <div class='card-body p-b-0'>
                  <form onSubmit={ServiceCreate}>
                    {/* @csrf */}
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Code</label>
                            <input
                              type='text'
                              className='form-control'
                              name='company_name'
                              id='code'
                              value={code}
                              onChange={e => setCode(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Name</label>
                            <input
                              type='text'
                              className='form-control'
                              name='company_address'
                              id='name'
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Description</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder=''
                              id='desc'
                              name='company_contact'
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Lead Time</label>
                            <input
                              type='date'
                              className='form-control'
                              placeholder=''
                              id='lead'
                              name='company_email'
                              onChange={e => setLeadTime(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Category</label>

                            <select
                              name='currency'
                              id='cat'
                              className='form-control'
                              onchange='convert(this.value)'
                              onChange={e => setRelatedCategory(e.target.value)}
                            >
                              <option>Choose Category</option>
                              {category.map(option => (
                                <option
                                  value={option._id}
                                  selected={
                                    option._id === updateCategory ? true : false
                                  }
                                >
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Charges</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder=''
                              name='capital'
                              id='charge'
                              value={charges}
                              onChange={e => setCharges(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>Cost</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder=''
                              id='cost'
                              name='md_name'
                              value={cost}
                              onChange={e => setCost(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label'>
                              Refer Amount
                            </label>
                            <input
                              type='number'
                              className='form-control'
                              placeholder=''
                              id='referamo'
                              value={referAmount}
                              name='md_name'
                              onChange={e => setReferAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <label className='control-label'>Add Reagent</label>
                          <div className='row'>
                            <div className='col-md-10'>
                              <select
                                class='custom-select border-info'
                                name='account_type_id'
                                id='flag'
                                onChange={e => {
                                  setTempReagent(e.target.value)
                                }}
                              >
                                <option value=''>Choose Reagent</option>
                                {reagentItems.map(option => (
                                  <option
                                    value={option._id + '.' + option.name}
                                  >
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className='col-md-2'>
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={e => handleBox(e.target.value)}
                              >
                                <i class='fa fa-plus'></i>
                              </button>
                            </div>
                          </div>
                          {reagentArray ? (
                            <div>
                              {reagentArray.map(regArr => (
                                <div className='row mt-3'>
                                  <div className='col-md-5'>
                                    <input
                                      type='text'
                                      value={regArr.name}
                                      className='form-control'
                                    />
                                  </div>
                                  <div className='col-md-5'>
                                    <input
                                      type='text'
                                      value={regArr.amount}
                                      // defaultValue={0}
                                      className='form-control'
                                    />
                                  </div>
                                  <div className='col-md-2'>
                                    <button className='btn btn-sm btn-danger rounded-circle opacity-75'>
                                      <FaMinus />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='row pt-3'>
                          <div className='col-md-4'>
                            <label>Multiple Tests</label>
                          </div>

                          <div className='col-md-4'>
                            <label>Yes</label>&nbsp;
                            <input
                              type='radio'
                              id='yes'
                              name='amoper'
                              checked={showMultiTest}
                              onChange={e => {
                                setShowMultiTest(true)
                                setShowSpecialRange(false)
                                setShowNextRef(false)
                              }}
                            />
                          </div>
                          <div className='col-md-4'>
                            <label>No</label>&nbsp;
                            <input
                              type='radio'
                              id='no'
                              name='amoper'
                              checked={!showMultiTest}
                              onChange={e => {
                                setShowSpecialRange(true)
                                setShowNextRef(false)
                                setShowMultiTest(false)
                              }}
                            />
                          </div>

                          {showMultiTest ? (
                            <div className='row pt-3'>
                              <div className='col-md-8'>
                                <label className='control-label'>
                                  Add Multiple Tests
                                </label>
                                <button
                                  className='btn btn-primary ml-3'
                                  type='button'
                                  onClick={handleAddRow}
                                >
                                  Add
                                </button>
                                {tableData.map(data => (
                                  <div className='row mt-3'>
                                    <div className='col-md-2'>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Name'
                                        id='subTestName'
                                        name='subTestName'
                                        value={data.name}
                                        onChange={event =>
                                          handleInputChange(
                                            event,
                                            data.id,
                                            'name'
                                          )
                                        }
                                      />
                                    </div>

                                    <div className='col-md-2'>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Default Result'
                                        id='subTestDresult'
                                        name='subTestDresult'
                                        value={data.defaultResult}
                                        onChange={event =>
                                          handleInputChange(
                                            event,
                                            data.id,
                                            'defaultResult'
                                          )
                                        }
                                      />
                                    </div>

                                    <div className='col-md-2'>
                                      <textarea
                                        rows="2"
                                        cols="20"
                                        className="form-control"
                                        id="subTestRR"
                                        name="subTestRR"
                                        defaultValue={(data.type === "multiline") ? decodeBase64(data.referenceRange) : data.referenceRange}
                                        //defaultValue={data.referenceRange}
                                        onChange={(event) =>
                                          handleInputChange(
                                            event,
                                            data.id,
                                            "referenceRange"
                                          )
                                        }></textarea>
                                      {/* <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Reference Range'
                                        id='subTestRR'
                                        name='subTestRR'
                                        value={data.referenceRange}
                                        onChange={event =>
                                          handleInputChange(
                                            event,
                                            data.id,
                                            'referenceRange'
                                          )
                                        }
                                      /> */}
                                    </div>
                                    <div className='col-md-2'>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Unit'
                                        id='subTestUnit'
                                        name='subTestUnit'
                                        value={data.unit}
                                        onChange={event =>
                                          handleInputChange(
                                            event,
                                            data.id,
                                            'unit'
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="col-md-2">
                                      <select
                                        name="type"
                                        id="type"
                                        className="form-control"
                                        //  onchange="convert(this.value)"
                                        onChange={(event) =>
                                          handleInputChange(event, data.id, "type")

                                        }>
                                        <option value="none">Choose Type</option>

                                        <option value="underline" selected={data.type === "underline" ? true : false}>
                                          Underline
                                        </option>
                                        <option value="highlight" selected={data.type === "highlight" ? true : false}>
                                          Highlight
                                        </option>
                                        <option value="both" selected={data.type === "both" ? true : false}>
                                          Underline and Highlight
                                        </option>
                                        <option value="multiline" selected={data.type === "multiline" ? true : false}>
                                          Multiple Line
                                        </option>

                                      </select>
                                    </div>

                                    <div className='col-md-1'>
                                      <button
                                        type='button'
                                        className='btn btn-sm btn-danger rounded-circle'
                                        id='removeRowFromMultiTests'
                                        onClick={() => handleDeleteRow(data.id)}
                                      >
                                        <FaMinus />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ''
                          )}

                          {showSpecialRange ? (
                            <div className='row'>
                              <div className='col-md-4'>
                                <label>Special Reference Range</label>
                              </div>

                              <div className='col-md-4'>
                                <label>Yes</label>&nbsp;
                                <input
                                  type='radio'
                                  id='yes'
                                  name='ref'
                                  checked={specialFlag}
                                  onChange={e => {
                                    setSpecialFlag(true)
                                    handleYesChange()
                                  }}
                                />
                              </div>
                              <div className='col-md-4'>
                                <label>No</label>&nbsp;
                                <input
                                  type='radio'
                                  id='no'
                                  name='ref'
                                  checked={!specialFlag}
                                  onChange={e => {
                                    setSpecialFlag(false)
                                    handleNoChange()
                                  }}
                                />
                              </div>

                              {showSpecialCmt && (
                                <div className='row mt-5'>
                                  <div className='col-md-12'>
                                    <label>Write Comment</label>
                                    <textarea
                                      rows='10'
                                      cols='40'
                                      className='form-control'
                                      id='textArea'
                                      value={specialComment}
                                      onChange={e =>
                                        setSpecialComment(e.target.value)
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              )}

                              {showRefForm && (
                                <div className="row mt-3">
                                  <div className="row">
                                    <div className="col-1">
                                      <label>Reference Range</label>
                                    </div>
                                    <div className="col-1">
                                      <button
                                        className="btn btn-primary ml-3"
                                        type="button"
                                        onClick={handleAddRefRow}>
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                  {refData.map((data) => (
                                    <div className='row'>
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          placeholder="From"
                                          className="form-control"
                                          step={0.01}
                                          value={data.refRange}
                                          onChange={(event) =>
                                            handleRefInputChange(
                                              event,
                                              data.id,
                                              "refRange"
                                            )
                                          }
                                        />
                                      </div>
                                      {/* <div className="col-md-2">
                                      <input
                                        type="number"
                                        placeholder="To"
                                        step={0.01}
                                        className="form-control"
                                        value={data.to}
                                        onChange={(event) =>
                                          handleRefInputChange(
                                            event,
                                            data.id,
                                            "to"
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-md-3">
                                    <input
                                        type="text"
                                        placeholder="Gender"
                                        step={0.01}
                                        className="form-control"
                                        value={data.gender}
                                        onChange={(event) =>
                                          handleRefInputChange(
                                            event,
                                            data.id,
                                            "gender"
                                          )
                                        }
                                      />
                                    </div> */}

                                      <div className="col-md-2">
                                        <input
                                          type="text"
                                          placeholder="Unit"
                                          className="form-control"
                                          value={data.unit}
                                          onChange={(event) =>
                                            handleRefInputChange(
                                              event,
                                              data.id,
                                              "unit"
                                            )
                                          }
                                        />
                                      </div>
                                      {/* Action button for add data to refArr */}
                                      <div className="col-md-2">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-danger rounded-circle"
                                          id="removeRowFromMultiTests"
                                          onClick={() =>
                                            handleDeleteRefRow(data.id)
                                          }>
                                          <FaMinus />
                                        </button>
                                      </div>
                                      {/* End */}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                          {/* Action to add data in text box  */}
                          {/* {showNextRef ? (
                            <div>
                              <div className='row mt-3'>
                                <div className='col-md-2'>
                                  <input
                                    type='number'
                                    placeholder='From'
                                    className='form-control'
                                    step={0.01}
                                    defaultValue={(refArray !== undefined && refArray.length > 1) ? refArray[1].from : 0}
                                    onChange={e => setfFrom(e.target.value)}
                                  />
                                </div>
                                <div className='col-md-2'>
                                  <input
                                    type='number'
                                    placeholder='To'
                                    step={0.01}
                                    className='form-control'
                                    defaultValue={(refArray !== undefined && refArray.length > 1) ? refArray[1].to : 0}
                                    onChange={e => setfTo(e.target.value)}
                                  />
                                </div>
                                <div className='col-md-3'>
                                  <select
                                    class='custom-select border-info'
                                    name='account_type_id'
                                    id='flag'
                                    onChange={e => setfGender(e.target.value)}
                                  >
                                    <option>Gender</option>

                                    <option
                                      value='Male'
                                      selected={
                                        (refArray !== undefined && refArray.length > 1 && refArray[0].gender === 'Male') ? true : false
                                      }
                                    >
                                      Male
                                    </option>
                                    <option
                                      value='Female'
                                      selected={
                                        (refArray !== undefined && refArray.length > 1 && refArray[0].gender === 'Female') ? true : false
                                      }
                                    >
                                      Female
                                    </option>
                                  </select>
                                </div>

                                <div className='col-md-2'>
                                  <input
                                    type='text'
                                    placeholder='Unit'
                                    className='form-control'
                                    defaultValue={(refArray !== undefined && refArray.length > 1) ? refArray[1].unit : 0}
                                    onChange={e => setfUnit(e.target.value)}
                                  />
                                </div>
                                <div className='col-md-2'>
                                  <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={e => {
                                      handleRefRange(1)
                                      handleAlert()
                                    }}
                                  >
                                    <i class='fa fa-save'></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )} */}
                          {/* End */}

                          <div className='form-actions mt-3'>
                            <div className='row'>
                              <div className='col-md-6'>
                                <div className='row'>
                                  <div className=' col-md-9'>
                                    <button
                                      type='submit'
                                      className='btn btn-primary'
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
                      </div>
                      {/* <!-- /.row (main row) --> */}
                    </div>
                  </form>
                  {/*<!-- /.container-fluid --> */}
                </div>
              </div>
            </div>
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
export default LabServiceUpdate
