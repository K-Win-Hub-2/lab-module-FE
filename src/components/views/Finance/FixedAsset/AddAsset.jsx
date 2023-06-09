/* eslint-disable */
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from '../../SideBar'
import { Link } from 'react-router-dom'
import { FaCashRegister, FaFileMedical, FaArrowLeft } from 'react-icons/fa'

function AddAsset() {
  const [fixedAccountLists, setFixedAccountLists] = useState([])
  const [depreAccountLists, setDepreAccountLists] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [relatedAssetAccount, setRelatedAssetAccount] = useState('')
  const [relatedDepreAccount, setRelatedDepreAccount] = useState('')
  const [existingAsset, setExistingAsset] = useState(false)
  const [initialPrice, setInitialPrice] = useState('')
  const [usedYear, setUsedYear] = useState('')
  const [salvageValue, setSalvageValue] = useState('')
  const [depriciationTotal, setDepriciationTotal] = useState('')
  const [useLife, setUseLife] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [yearDepriciation, setYearDepriciation] = useState('')
  const [startDate, setStartDate] = useState('')

  const [showYes, setShowYes] = useState(false)
  const [showNo, setShowNo] = useState(false)
  const [origin, setOrigin] = useState(true)

  const handleYesChange = () => {
    setShowYes(true)
    setShowNo(false)
    setOrigin(false)
  }

  const handleNoChange = () => {
    setShowYes(false)
    setOrigin(false)
    setShowNo(true)
  }

  const handleCalculation = event => {
    if (initialPrice && salvageValue) {
      let sub = initialPrice - salvageValue
      let ans = sub / event
      console.log(ans)
      setYearDepriciation(ans.toFixed(2))
    }

    setUseLife(event)
  }

  const handleYesCalculation = event => {
    if (existingAsset == '1') {
      let multi = event * yearDepriciation
      let subFinal = initialPrice - multi
      setCurrentPrice(subFinal.toFixed(2))
      setDepriciationTotal(multi)
    }

    setUsedYear(event)
  }

  const handleNoCalculation = event => {
    console.log(event)
    if (existingAsset == '2') {
      setCurrentPrice(initialPrice)
      console.log(currentPrice)
    }
    setInitialPrice(event)
  }

  const FixedAssetCreate = () => {
    const data = {
      name: name,
      description: description,
      relatedAssetAccount: relatedAssetAccount,
      relatedDepreciationAccount: relatedDepreAccount,
      existingAsset: existingAsset,
      initialPrice: initialPrice,
      salvageValue: salvageValue,
      useLife: useLife,
      yearDepriciation: yearDepriciation,
      currentPrice: initialPrice,
      startDate: startDate
    }

    if (existingAsset == '1') {
      data.usedYear = usedYear
      data.depriciationTotal = depriciationTotal
      data.currentPrice = currentPrice
      data.startDate = startDate
    }

    if (existingAsset == '2') {
      data.currentPrice = initialPrice
      data.startDate = startDate
    }

    // if (existingAsset == null) {
    //    data.currentPrice = initialPrice;
    //    data.startDate = startDate;
    //  }

    alert(JSON.stringify(data))
    console.log(data)
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    // alert(JSON.stringify(data));
    axios
      .post(
        // "http://centralclinicbackend.kwintechnologykw11.com:3000/api/fixed-asset",
        'http://centralclinicbackend.kwintechnologykw11.com:3000/api/fixed-asset',
        data,
        config
      )
      .then(function (response) {
        alert('success')
        // props.setFixedAssetLists([
        //   ...props.fixedAssetLists,
        //   response.data.data,
        // ]);
      })
      .catch(function (err) {
        alert(err.message)
      })
    //     props.setOpen(false);
  }

  useEffect(() => {
    const getAccountingList = async () => {
      try {
        const res = await axios.get(
          // "http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists"
          'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
        )
        const fixedAccounts = res.data.list.filter(
          el =>
            el.relatedSubHeader.name == 'Fixed Assets' &&
            el.relatedHeader.name == 'Non Current Asset' &&
            el.relatedType.name === 'Assets'
        )
        setFixedAccountLists(fixedAccounts)
        const depreAccounts = res.data.list.filter(
          el =>
            el.relatedSubHeader.name == 'Fixed Assets Depreciation' &&
            el.relatedHeader.name == 'Non Current Asset' &&
            el.relatedType.name === 'Assets'
        )
        setDepreAccountLists(depreAccounts)
      } catch (err) {}
    }

    getAccountingList()
  }, [])

  return (
    <div classNameName='App'>
      <div className='wrapper'>
        {/* <!-- Navbar --> */}

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
                      <Link to='/fix-ass'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li
                      className='breadcrumb-item active'
                      style={{ marginTop: '0.15em' }}
                    >
                      Back
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}
          <section class='content'>
            <div class='container-fluid'>
              <div className='container'>
                <div className='card'>
                  <div className='card-header bg-info'>
                    <h3
                      className='card-title text-white py-2'
                      id='exampleModalLabel'
                    >
                      New Asset Registration
                    </h3>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className=''>
                          <div className='form-group'>
                            <label className='text-secondary'>Name</label>
                            <input
                              type='text'
                              className='form-control'
                              name='asset_name'
                              placeholder='Enter Asset Name'
                              onChange={e => setName(e.target.value)}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>
                              Description
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='asset_description'
                              placeholder='Enter Asset Description'
                              onChange={e => setDescription(e.target.value)}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>Type</label>
                            <select
                              id='asset_type'
                              name='type'
                              className='form-control'
                            >
                              <option value='0'>Select Asset Type</option>
                              {/* <option value="">Choose Account</option> */}
                              <option value='1'>Computer & IT Equipment</option>
                              <option value='2'>Plant & Machinery</option>
                              <option value='3'>Furniture & Fitting</option>
                              <option value='4'>Office Equipment</option>
                              <option value='5'>Motor Vehicle</option>
                              <option value='6'>Medical Machinery</option>
                              <option value='7'>Medical Equipment</option>
                              <option value='8'>Air Con</option>
                              <option value='9'>Surgery Equipment</option>
                            </select>
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>
                              Purchase Initial Price
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='purchase_initial_price'
                              id='initial_price'
                              placeholder='Enter Purchase Initial Price'
                              onChange={e =>
                                handleNoCalculation(e.target.value)
                              }
                            />
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>
                              Salvage Value
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='salvage_value'
                              id='salvage'
                              placeholder='Enter Salvage Value'
                              onChange={e => setSalvageValue(e.target.value)}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>Use Life</label>
                            <input
                              type='text'
                              className='form-control'
                              name='use_life'
                              id='uselife'
                              placeholder='Enter Use Life'
                              onChange={e => handleCalculation(e.target.value)}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='text-secondary'>
                              Year Depriciation
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='year_depriciation'
                              id='year_dep'
                              defaultValue={yearDepriciation}
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label className='control-label'>
                            Control Asset Account
                          </label>

                          <select
                            name='acc'
                            id=''
                            className='form-control mt-1'
                            onChange={e =>
                              setRelatedAssetAccount(e.target.value)
                            }
                          >
                            <option value=''>Choose Account</option>

                            {fixedAccountLists.map(option => (
                              <option value={option._id}>{option.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className='form-group'>
                          <label className='control-label'>
                            Control Depreciation Account
                          </label>

                          <select
                            name='acc'
                            id=''
                            className='form-control mt-1'
                            onChange={e =>
                              setRelatedDepreAccount(e.target.value)
                            }
                          >
                            <option value=''>Choose Account</option>

                            {depreAccountLists.map(option => (
                              <option value={option._id}>{option.name}</option>
                            ))}
                          </select>
                        </div>
                        {/* <div className="form-group">
                          <label className="text-secondary">Account Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="account_name"
                            onChange={(e) => setRelatedAccount(e.target.value)}
                          />
                        </div> */}
                        <div className='form-group'>
                          <label className='text-secondary'>
                            Existing Asset
                          </label>
                          <div
                            className='form-check form-check-inline ml-5'
                            style={{ marginTop: '40px' }}
                          >
                            <input
                              className='form-check-input'
                              type='radio'
                              name='exist_asset'
                              id='inlineRadio1'
                              value='1'
                              onClick={handleYesChange}
                              onChange={e => setExistingAsset(true)}
                            />
                            <label
                              className='form-check-label text-secondary'
                              for='inlineRadio1'
                            >
                              Yes
                            </label>
                          </div>
                          <div className='form-check form-check-inline'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='exist_asset'
                              id='inlineRadio2'
                              value='2'
                              onChange={e => setExistingAsset(false)}
                              onClick={handleNoChange}
                            />
                            <label
                              className='form-check-label text-secondary'
                              for='inlineRadio2'
                            >
                              No
                            </label>
                          </div>
                        </div>
                        {showYes && (
                          <div className='mt-3'>
                            <div className='form-group' id='used_year'>
                              <label className='text-secondary'>
                                Used Year
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='used_year'
                                id='use_year'
                                placeholder='Enter Used Year'
                                onChange={e =>
                                  handleYesCalculation(e.target.value)
                                }
                              />
                            </div>
                            <div className='form-group' id='dept_tot'>
                              <label className='text-secondary'>
                                Depriciation Total
                              </label>
                              <input
                                type='text'
                                defaultValue={depriciationTotal}
                                className='form-control'
                                name='depriciation_total'
                                id='dep_total'
                                placeholder='Enter Depriciation Total'
                                readonly
                              />
                            </div>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Current Price
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='current_value'
                                id='current_price'
                                placeholder='Enter Current Value'
                                defaultValue={currentPrice}
                                readonly
                              />
                            </div>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Start Date
                              </label>
                              <input
                                type='date'
                                className='form-control'
                                name='start_date'
                                onChange={e => setStartDate(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {showNo && (
                          <div className='mt-3'>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Current Price
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='current_value'
                                id='current_price'
                                placeholder='Enter Current Value'
                                defaultValue={initialPrice}
                                readonly
                              />
                            </div>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Start Date
                              </label>
                              <input
                                type='date'
                                className='form-control'
                                name='start_date'
                                onChange={e => setStartDate(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        {origin && (
                          <div>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Current Price
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='current_value'
                                id='current_price'
                                placeholder='Enter Current Value'
                                defaultValue={initialPrice}
                                readonly
                              />
                            </div>
                            <div className='form-group'>
                              <label className='text-secondary'>
                                Start Date
                              </label>
                              <input
                                type='date'
                                className='form-control'
                                name='start_date'
                                onChange={e => setStartDate(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='card-footer'>
                    <button
                      onClick={FixedAssetCreate}
                      className='btn btn-primary float-right'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

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
  )
}
export default AddAsset
