import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LabServiceList from './components/views/LabServiceList'
import LabServiceRegister from './components/views/LabServiceRegister'
import LabServiceUpdate from './components/views/LabServiceUpdate'
import CatRegister from './components/views/CatRegister'
import Reagent from './components/views/Reagent'
import ReagentReg from './components/views/ReagentReg'
import DoctorClinic from './components/views/DoctorClinic'
import DoctorClinicReg from './components/views/DoctorClinicReg'
import Test from './components/views/Test'
import TestVoucherSlip from './components/views/TestVoucherSlip'
import Patient from './patients/Patient'
import PatientRegister from './patients/Register'
import Member from './patients/Member'
import PatientCredit from './patients/PatientCredit'
import TestSale from './patients/TestSale'
import TestVoucherPrint from './patients/TestVoucherPrint'
import TestVoucher from './patients/TestVoucher'
import TestPackage from './components/views/TestPackage'
import TestPackageReg from './components/views/TestPackageReg'
import ReferDoctorCharge from './components/views/ReferDoctorCharge'
import Login from './components/views/Login'
import AccountList from './components/views/Finance/AccountList/AccountList'
import AccountListUpdate from './components/views/Finance/AccountList/AccListUpdate'
import Income from './components/views/Finance/Income/Income'
import Expense from './components/views/Finance/Expense/Expense'
import Bank from './components/views/Finance/Bank/Bank'
import Repay from './components/views/RePay.jsx'
import DoctorUpdate from './components/views/DoctorClinicUpdate.jsx'
import FinanceTestVouList from './components/views/Finance/FinanceTVL.jsx'
import TrialBalance from './components/views/TrialBalance'
import ReagentUpdate from './components/views/ReagentUpdate'
// import Supplier from "./components/views/Supplier.jsx";
import Transfer from './components/views/Finance/Transfer/TransferList.jsx'
import AccountHead from './components/views/Finance/Heding.jsx'
import AccountSubHead from './components/views/Finance/SubHeding.jsx'
import AccountType from './components/views/Finance/AccountType.jsx'
import Transaction from './components/views/Finance/AllTransaction.jsx'
import JournalEntry from './components/views/Finance/Journal-Entry/JournalEntryList.jsx'
import FixedAsset from './components/views/Finance/FixedAsset/FixAsset.jsx'
import AddAsset from './components/views/Finance/FixedAsset/AddAsset.jsx'
import SellEndDialog from './components/views/Finance/FixedAsset/SellEndDialog.jsx'
import BalanceSheet from './components/views/Finance/Reports/BalanceSheet.jsx'
import ProfitandLossStatement from './components/views/Finance/Reports/ProfitandLoss.jsx'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './assets/dist/css/adminlte.min.css'
import './plugins/fontawesome-free/css/all.min.css'
import './plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import './plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import './plugins/jqvmap/jqvmap.min.css'
import './plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import './plugins/daterangepicker/daterangepicker.css'
import './assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css'
import './assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
import TestVoucherList from './components/views/TestVoucherList'
import TestResultList from './components/views/TestResultList'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/lab-test' element={<LabServiceList />}></Route>
        <Route path='/reagent-update/:id' element={<ReagentUpdate />}></Route>
        <Route path='/trial-balance' element={<TrialBalance />}></Route>
        <Route path='/lab-test/:id' element={<LabServiceUpdate />}></Route>
        <Route path='/lab-register' element={<LabServiceRegister />}></Route>
        <Route path='/lab-cat' element={<CatRegister />}></Route>
        <Route path='/reagent' element={<Reagent />}></Route>
        <Route path='/reagent-reg' element={<ReagentReg />}></Route>
        <Route path='/doctorClinic' element={<DoctorClinic />}></Route>
        <Route path='/doctorClinicReg' element={<DoctorClinicReg />}></Route>
        <Route path='/test/:testVoucher_id' element={<Test />}></Route>
        <Route
          path='/testslip/:testVoucher_id'
          element={<TestVoucherSlip />}
        ></Route>
        <Route path='/patient/list' element={<Patient />} />
        <Route path='/patient/register' element={<PatientRegister />} />
        <Route path='/patient/member' element={<Member />} />
        <Route path='/patient/credit_list' element={<PatientCredit />} />
        <Route path='/test_sale/:id' element={<TestSale />} />
        <Route path='/test_voucher/:pid/:vid' element={<TestVoucherPrint />} />
        <Route path='/test_voucher/:id' element={<TestVoucher />} />
        <Route path='/package' element={<TestPackage />}></Route>
        <Route path='/packageReg' element={<TestPackageReg />}></Route>
        <Route path='/tvoucherList' element={<TestVoucherList />}></Route>
        <Route path='/tresultList' element={<TestResultList />}></Route>
        <Route path='/refDoctor/:id' element={<ReferDoctorCharge />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/account_list' element={<AccountList />}></Route>
        <Route path='/accUpdate/:id' element={<AccountListUpdate />}></Route>
        <Route path='/income' element={<Income />}></Route>
        <Route path='/expense' element={<Expense />}></Route>
        <Route path='/bank' element={<Bank />}></Route>
        <Route path='/repay/:id' element={<Repay />}></Route>
        <Route path='/ftvl' element={<FinanceTestVouList />}></Route>
        <Route path='/doctorUpdate/:id' element={<DoctorUpdate />}></Route>
        <Route path='/transfer' element={<Transfer />}></Route>
        <Route path='/account_type' element={<AccountType />}></Route>
        <Route path='/account_head' element={<AccountHead />}></Route>
        <Route path='/account_subhead' element={<AccountSubHead />}></Route>
        <Route path='/transaction' element={<Transaction />}></Route>
        <Route path='/journal' element={<JournalEntry />}></Route>
        <Route path='/fix-ass' element={<FixedAsset />}></Route>
        <Route path='/add-asset' element={<AddAsset />}></Route>;
        <Route path='/sellEnd/:id' element={<SellEndDialog />}></Route>
        <Route path='/balance_sheet' element={<BalanceSheet />}></Route>;
        <Route path='/profit_loss_statement' element={<ProfitandLossStatement />}></Route>;
      </Routes>
    </Router>
  )
}

export default App
