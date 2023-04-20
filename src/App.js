import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LabServiceList from './components/views/LabServiceList';
import LabServiceRegister from './components/views/LabServiceRegister';
import CatRegister from './components/views/CatRegister';
import Reagent from './components/views/Reagent';
import ReagentReg from './components/views/ReagentReg';
import DoctorClinic from './components/views/DoctorClinic';
import DoctorClinicReg from './components/views/DoctorClinicReg';
import Test from './components/views/Test';


import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'


import "./assets/dist/css/adminlte.min.css"
import "./plugins/fontawesome-free/css/all.min.css"
import "./plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
import "./plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import "./plugins/jqvmap/jqvmap.min.css"
import "./plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "./plugins/daterangepicker/daterangepicker.css";
import "./assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css"
import "./assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LabServiceList />}></Route>
        {/* <Route path='/dashboard' element={<Dashboard/>}></Route> */}
        <Route path="/lab-register" element={<LabServiceRegister />}></Route>
        <Route path="/lab-cat" element={<CatRegister />}></Route>
        <Route path="/reagent" element={<Reagent />}></Route>
        <Route path="/reagent-reg" element={<ReagentReg />}></Route>
        <Route path="/doctorClinic" element={<DoctorClinic />}></Route>
        <Route path="/doctorClinicReg" element={<DoctorClinicReg />}></Route>
        <Route path='/test' element={<Test/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
