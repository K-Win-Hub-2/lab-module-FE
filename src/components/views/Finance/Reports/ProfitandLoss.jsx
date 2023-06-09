/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Sidebar from '../../SideBar'
import Swal from 'sweetalert2'
import axios from 'axios'
import { set } from '../../../../assets/plugins/moment/src/lib/moment/get-set'

const url = 'http://centralclinicbackend.kwintechnologykw11.com:3000/api'
//const url = 'http://localhost:9000/api'

export default function ProfitandLossStatement() {
  const [accountLists, setAccountLists] = useState([])
  // const[transactionLists,setTransactionLists] = useState([]);
  const [trailAccs, setTrailAccs] = useState([])
  const [start, setStart] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [autoimmuneRevenue, setAutoImmuneRevenue] = useState(0)
  const [autoimmuneCOGS, setAutoImmuneCOGS] = useState(0)
  const [autoimmuneGP, setAutoImmuneGP] = useState(0)
  const [biochemRevenue, setBioChemRevenue] = useState(0)
  const [biochemCOGS, setBioChemCOGS] = useState(0)
  const [biochemGP, setBioChemGP] = useState(0)
  const [haemaRevenue, setHaemaRevenue] = useState(0)
  const [haemaCOGS, setHaemaCOGS] = useState(0)
  const [haemaGP, setHaemaGP] = useState(0)
  const [histoRevenue, setHistoRevenue] = useState(0)
  const [histoCOGS, sethistoCOGS] = useState(0)
  const [histoGP, setHistoGP] = useState(0)
  const [totalGP, setTotalGP] = useState(0)

  const [immuRevenue, setImmuRevenue] = useState(0)
  const [immuCOGS, setImmuCOGS] = useState(0)
  const [immuGP, setImmuGP] = useState(0)

  const [microRevenue, setMicroRevenue] = useState(0)
  const [microCOGS, setMicroCOGS] = useState(0)
  const [microGP, setMicroGP] = useState(0)

  const [moleRevenue, setMoleRevenue] = useState(0)
  const [moleCOGS, setMoleCOGS] = useState(0)
  const [moleGP, setMoleGP] = useState(0)

  const [otherIncomeTotal, setOtherIncomeTotal] = useState(0)
  const [otherExpenseTotal, setOtherExpenseTotal] = useState(0)
  const [netProfit, setnetProfit] = useState(0)
  const [incomeTotal, setIncomeTotal] = useState(0)

  const handleRelatedShow = id => {
    if (isShow) {
      document.getElementById('toggle' + id).removeAttribute('hidden')
    } else {
      document.getElementById('toggle' + id).setAttribute('hidden', 'hidden')
    }
    setIsShow(!isShow)
  }

  const fetchTrialAndBalance = async () => {
    try {
      Swal.fire({
        title: 'Loading',
        text: 'Please wait...',
        allowOutsideClick: false
      })
      await axios
        .get(url + `transactions/trial-balance`, {
          params: { start: '2023-01-01', end: '2023-12-31' }
        })
        .then(res => {
          console.log(res.data.data)
          var aigp = 0
          var bcgp = 0
          var hmgp = 0
          var hsgp = 0
          var imgp = 0
          var mlgp = 0
          var migp = 0
          var othinc = 0
          var othexp = 0
          var inctotal = 0
          var tgp = 0
          var np = 0
          res.data.data.map(element => {
            if (element.accName === 'Autoimmune Diagnosis-Income') {
              setAutoImmuneRevenue(Math.abs(element.netAmount))
              setAutoImmuneCOGS(Math.abs(element.netAmount) * 0.8)
              aigp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setAutoImmuneGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (element.accName === 'Biochemistry-Income') {
              setBioChemRevenue(Math.abs(element.netAmount))
              setBioChemCOGS(Math.abs(element.netAmount) * 0.8)
              bcgp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setBioChemGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
              console.log(bcgp, 'Biochem')
            }

            if (element.accName === 'Haematology-Income') {
              setHaemaRevenue(Math.abs(element.netAmount))
              setHaemaCOGS(Math.abs(element.netAmount) * 0.8)
              hmgp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setHaemaGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (element.accName === 'Histopathology income') {
              setHistoRevenue(Math.abs(element.netAmount))
              sethistoCOGS(Math.abs(element.netAmount) * 0.8)
              hsgp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setHistoGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (element.accName === 'Immunology-Income') {
              setImmuRevenue(Math.abs(element.netAmount))
              setImmuCOGS(Math.abs(element.netAmount) * 0.8)
              imgp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setImmuGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (element.accName === 'Microbiology-Income') {
              setMicroRevenue(Math.abs(element.netAmount))
              setMicroCOGS(Math.abs(element.netAmount) * 0.8)
              migp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setMicroGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (element.accName === 'Molecular Diagnosis-Income	') {
              setMoleRevenue(Math.abs(element.netAmount))
              setMoleCOGS(Math.abs(element.netAmount) * 0.8)
              mlgp =
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              setMoleGP(
                Math.abs(element.netAmount) - Math.abs(element.netAmount) * 0.8
              )
            }

            if (
              element.type.name === 'Income' &&
              element.header === 'Other Income'
            ) {
              othinc += Math.abs(element.netAmount)
            }

            if (
              element.type.name === 'Expenses' &&
              element.header === 'Other Expense'
            ) {
              othexp += Math.abs(element.netAmount)
            }
          })
          tgp = aigp + bcgp + hmgp + hsgp + imgp + mlgp + migp
          inctotal = tgp + othinc
          np = inctotal - othexp

          setTotalGP(tgp)
          setIncomeTotal(inctotal)
          setOtherIncomeTotal(othinc)
          setOtherExpenseTotal(othexp)

          setAccountLists(res.data.data)
          //setTransactionLists(res.data.transaction)
          console.log(res.data.data)
          console.log(res.data.transaction)
        })
        .catch(error => {
          console.log('error', error)
        })

      // try {
      //   const res = await axios.get(
      //   //  'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
      //   'http://centralclinicbackend.kwintechnologykw11.com:3000/api/accounting-lists'
      //   )

      //   setAccountLists(res.data.list)
      //   let fixedassettotal = 0;
      //   let bankAccTotal = 0;
      //   let cashAccTotal = 0;
      //   let invAccTotal = 0;
      //   let reagentTotal = 0;
      //   let testkitTotal = 0;
      //   let recevTotal = 0;
      //   let prepTotal = 0;
      //   let culaTotal = 0;
      //   let ltlaTotal = 0;
      //   let capTotal = 0;
      //   let resrvTotal =0;

      //   res.data.list.map(account =>
      //     {
      //       if(account.name === "Furniture and Fitting"){
      //         setffamount(account.amount)
      //         fixedassettotal += account.amount
      //       }
      //       if(account.name === "Furniture and Fitting Accumulated Depreciation"){
      //         setffdamount(account.amount)
      //         fixedassettotal -= account.amount;
      //       }

      //       if(account.name === "Machinery"){
      //         setmamount(account.amount)
      //         fixedassettotal += account.amount
      //       }
      //       if(account.name === "Machinery Accumulated Depreciation"){
      //         setmdamount(account.amount)
      //         fixedassettotal -= account.amount;
      //       }

      //       if(account.name === "Office Equipment"){
      //         setoeamount(account.amount)
      //         fixedassettotal += account.amount
      //       }
      //       if(account.name === "Office Equipment Accumulated Depreciation"){
      //         setoedamount(account.amount)
      //         fixedassettotal -= account.amount;
      //       }

      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Bank"){
      //         bankAccTotal += account.amount
      //       }
      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Cash"){
      //         cashAccTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Inventory"){
      //         invAccTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Reagent"){
      //         reagentTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Test Kit"){
      //         testkitTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Receivable"){
      //         recevTotal += account.amount
      //       }
      //       if(account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Prepaid"){
      //         prepTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Liabilities" && account.relatedHeader.name === "Current Liabilities" && account.relatedSubHeader.name === "Current Liabilities"){
      //         culaTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Liabilities" && account.relatedHeader.name === "Long Term Liabilities" && account.relatedSubHeader.name === "Long Term Liabilities"){
      //         ltlaTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Equity" && account.relatedHeader.name === "Capital" && account.relatedSubHeader.name === "Capital"){
      //         capTotal += account.amount
      //       }

      //       if(account.relatedType.name === "Equity" && account.relatedHeader.name === "Reserve" && account.relatedSubHeader.name === "Reserve"){
      //         resrvTotal += account.amount
      //       }
      //     })
      //     setBankTotal(bankAccTotal)
      //     setCashTotal(cashAccTotal)
      //     setInventoryTotal(invAccTotal)
      //     setReagentTotal(reagentTotal)
      //     setTestkitTotal(testkitTotal)
      //     setReceivableTotal(recevTotal)
      //     setPrepaidTotal(prepTotal)
      //     setcatotal(bankAccTotal + cashAccTotal + invAccTotal + reagentTotal + testkitTotal + recevTotal + prepTotal)
      //     setfatotal(fixedassettotal)
      //     setAssetTotal(bankAccTotal + cashAccTotal + invAccTotal + reagentTotal + testkitTotal + recevTotal + prepTotal + fixedassettotal)

      //     setcltotal(culaTotal)
      //     setlltotal(ltlaTotal)
      //     setLiabilitiesTotal(culaTotal+ltlaTotal)

      //     setCapitaltotal(capTotal)
      //     setReservetotal(resrvTotal)
      //     setEquitytotal(capTotal + resrvTotal)
      //   // dispatch(setList("success"));
      //    console.log(res.data.list);
      // } catch (err) {}

      Swal.close()

      // Process the response data
      //console.log(data);
    } catch (error) {
      Swal.close()
      console.error('Error occurred while fetching data.', error)
    }
  }

  useEffect(() => {
    fetchTrialAndBalance()
  }, [])

  return (
    <>
      <div className='wrapper'>
        {/* <!-- Content Wrapper. Contains page content --> */}
        <Sidebar />
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
                    <li className='breadcrumb-item active'>Income Statement</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='card'>
                    <div className='card-header'>
                      <h1 className='card-title font-weight-bold px-3 py-3'>
                        Statement of Profit and Loss for the period ended at
                        31st December 2023
                      </h1>

                      {/* {{-- <button id="" class="btn btn-primary float-right" data-toggle="modal" data-target="#new_account" onclick="hide_proj()"> <i class="fa fa-plus"></i> Create Accounting</button> --}} */}
                      {/* {{-- <div class="modal fade" id="new_account" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header bg-info">
                            <h5 class="modal-title" id="exampleModalLabel">Add New Accounting</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="{{route('store_accounting')}}" method="post">
                            @csrf
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Account Code</label>
                                <input type="text" class="form-control border border-info" name="acc_code" id="acc_code" placeholder="eg. 123456">
                            </div>
                            <div class="form-group">
                                <label for="name">Account Name</label>
                                <input type="text" class="form-control border-info" name="acc_name" id="acc_name" placeholder="eg. Revenue Account">
                            </div>
                            <div class="form-group">
                                <label for="name">Account Type</label>
                                <select class="custom-select border-info" name="account_type_id">
                                <option>Choose Account Type</option>
                                    @foreach($account_type as $acc_type)
                                    <option value="{{$acc_type->id}}">{{$acc_type->type_name}}</option>
                                   @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="name">Cost Center</label>
                                <select class="custom-select border-info" name="cost_center">
                                <option>Choose Cost Center Name</option>
                                    @foreach($cost_center as $cc)
                                    <option value="{{$cc->id}}">{{$cc->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="name">Balance</label>
                                <input type="text" class="form-control border-info" name="balance">
                            </div>
                            <div class="form-group">
                                <label for="name">Currency</label>
                                <select class="custom-select border-info" name="currency">

                                <option>Choose Currency</option>

                                    @foreach($currency as $cc)
                                    <option value="{{$cc->id}}">{{$cc->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="name">Projected Related</label>
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="yes_no" id="yes" value="1" onclick="show_project()">
                                        <label class="form-check-label text-info" for="bank">Yes</label>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-check form-check-inline">

                                        <input class="form-check-input" type="radio" name="yes_no" id="no" value="2" onclick="hide_project()">
                                        <label class="form-check-label text-info" for="cash">No</label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" id="proj">
                                <label for="name">Project</label>
                                <select class="custom-select border-info" name="project_id">
                                <option value="0">Choose Project Name</option>
                                    @foreach($saleproject as $salepro)
                                    <option value="{{$salepro->id}}">{{$salepro->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                        </form>
                        </div>
                    </div>
                </div> --}} */}
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class='card-body'>
                      <table id='example1' class='table'>
                        <thead class='text-center bg-info'>
                          <tr>
                            <th>Account Name</th>
                            <th>Amount(Kyat)</th>
                            <th>Total Amount(Kyat)</th>
                          </tr>
                        </thead>

                        <tbody class='text-center'>
                          <tr>
                            <td>
                              <u>Autoimmune Diagnosis</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{autoimmuneRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{autoimmuneCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{autoimmuneGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Biochemistry</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{biochemRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{biochemCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{biochemGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Haematology</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{haemaRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{haemaCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{haemaGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Histopathology</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{histoRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{histoCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{histoGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Immunology</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{immuRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{immuCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{immuGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Microbiology</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{microRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{microCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{microGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Molecular Diagnosis</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Revenue</td>
                            <td>{moleRevenue}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>COGS</td>
                            <td>{moleCOGS}</td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>
                              <b>Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{moleGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <b>Total Gross Profit</b>
                            </td>
                            <td></td>
                            <td>{totalGP}</td>
                          </tr>

                          <tr>
                            <td>
                              <u>Other Income</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account =>
                            account.type.name === 'Income' &&
                            account.header === 'Other Income' ? (
                              <tr>
                                <td>{account.accName}</td>
                                <td>{Math.abs(account.netAmount)}</td>
                                <td></td>
                              </tr>
                            ) : (
                              ''
                            )
                          )}

                          <tr>
                            <td>
                              <u>Other Expenses</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account =>
                            account.type.name === 'Expenses' &&
                            account.header === 'Other Expense' ? (
                              <tr>
                                <td>{account.accName}</td>
                                <td>{Math.abs(account.netAmount)}</td>
                                <td></td>
                              </tr>
                            ) : (
                              ''
                            )
                          )}

                          {/* <tr>
                            <td></td>
                            <td>Machinery - at Cost</td>
                           <td>{mamount}</td>
                            <td></td>
                            
                          </tr>
                          <tr>
                            <td></td>
                            <td>Machinery - Accumulated Depreciation</td>
                           <td>{mdamount}</td>
                            <td></td>
                            
                            
                          </tr> */}

                          {/* 
                          <tr>
                            <td></td>
                            <td>Office Equipment - at Cost</td>
                           <td>{oeamount}</td>
                            <td></td>
                            
                          </tr>
                          <tr>
                            <td></td>
                            <td>Office Equipment - Accumulated Depreciation</td>
                           <td>{oedamount}</td>
                            <td></td>
                            
                            
                          </tr>

                          


                        

                          <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{fatotal}</td>
                            
                          </tr>

                         
                          <tr>
                            <td>1.2</td>
                            <td>
                              <u>Current Assets</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td></td>
                            <td>
                              <u>Bank</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Bank") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }
                          <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{bankTotal}</td>
                            
                          </tr>

<tr>
                            <td></td>
                            <td>
                              <u>Cash</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Cash") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }
                           <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{cashTotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td>
                              <u>Inventory</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Inventory") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{inventoryTotal}</td>
                            
                          </tr>

<tr>
                            <td></td>
                            <td>
                              <u>Reagent</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Reagent") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{reagentTotal}</td>
                            
                          </tr>

<tr>
                            <td></td>
                            <td>
                              <u>Test Kit</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Test Kit") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{testkitTotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td>
                              <u>Receivable</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Receivable") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{receivableTotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td>
                              <u>Prepaid</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Assets" && account.relatedHeader.name === "Current Asset" && account.relatedSubHeader.name === "Prepaid") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{prepaidTotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{assetTotal}</td>
                            
                          </tr>

                          <tr>
                            <td>2</td>
                            <td>
                              <u>Liabilities</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>2.1</td>
                            <td>
                              <u>Current Liabilities</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Liabilities" && account.relatedHeader.name === "Current Liabilities" && account.relatedSubHeader.name === "Current Liabilities") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{cltotal}</td>
                            
                          </tr>

                          <tr>
                            <td>2.2</td>
                            <td>
                              <u>Long Term Liabilities</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Liabilities" && account.relatedHeader.name === "Long Term Liabilities" && account.relatedSubHeader.name === "Long Term Liabilities") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{lltotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{liabilitiesTotal}</td>
                            
                          </tr>


                          <tr>
                            <td>3</td>
                            <td>
                              <u>Equity</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>3.1</td>
                            <td>
                              <u>Capital</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Equity" && account.relatedHeader.name === "Capital" && account.relatedSubHeader.name === "Capital") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{captialtotal}</td>
                            
                          </tr>


                          <tr>
                            <td>3.2</td>
                            <td>
                              <u>Reserve</u>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>

                          {accountLists.map(account => (
                            (account.relatedType.name === "Equity" && account.relatedHeader.name === "Reserve" && account.relatedSubHeader.name === "Reserve") ? 
<tr>
                            <td></td>
                            <td>
                              {account.name}
                            </td>
                            <td>{account.amount}</td>
                            <td></td>
                          </tr>
                             : ""))
                          }

<tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{reservetotal}</td>
                            
                          </tr>

                          <tr>
                            <td></td>
                            <td></td>
                           <td></td>
                            <td>{equitytotal}</td>
                            
                          </tr> */}

                          {/* <?php
                         $tot_amt += $acc->amount;
                    ?>

                    @endforeach */}
                        </tbody>
                      </table>
                      {/* <?php

              echo '<br /><a href="profit_loss_acc_list" class="float-left">Profit & Loss</a>
                          <a href="trial_balance" class="float-right">Trial Balance</a>
                           ';

                ?> */}
                      <a href='/profit_loss' class='float-left mt-3'>
                        Profit & Loss
                      </a>
                      <a href='/balance_sheet' class='float-right mt-3'>
                        Trial Balance
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
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
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </>
  )
}
