import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LabServiceList from './components/views/LabServiceList';
import LabServiceRegister from './components/views/LabServiceRegister';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'


import "./assets/dist/css/adminlte.min.css"
import "./plugins/fontawesome-free/css/all.min.css"
import "./plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
import "./plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import "./plugins/jqvmap/jqvmap.min.css"
import "./plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "./plugins/daterangepicker/daterangepicker.css"
import "./plugins/summernote/summernote-bs4.css"
import "./plugins/select2/css/select2.min.css"
import "./file.css"
import "./plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
import "./assets/plugins/multiselect/css/multi-select.css"
import "./plugins/datatables-bs4/css/dataTables.bootstrap4.css"
import "./assets/plugins/dropify/dist/css/dropify.min.css"
import "./assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css"
import "./assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css"

function App() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<LabServiceList/>}></Route>
        {/* <Route path='/dashboard' element={<Dashboard/>}></Route> */}
        <Route path='/lab-register' element={<LabServiceRegister/>}></Route>
      </Routes>
    </Router>
  
    

  );
}

export default App;
