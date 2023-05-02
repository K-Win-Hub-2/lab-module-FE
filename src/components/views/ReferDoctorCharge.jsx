import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function CatRegister() {
  const [referDoctor, setReferDoctor] = useState([]);
  const DoctorID = useLocation().pathname.split('/')[2];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState([]);

  const handleCollect = () => {

  }

  const handleSearch = (event) => {
    axios.get('http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor/' + DoctorID).then(function (response) {
      setSearch(response.data.data)
    })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        })
      })
  }

  const CollectDialog = () => {
    setOpen(true);
  }

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor/" +
          DoctorID
        );

        console.log(res.data.data.value);
        setReferDoctor(res.data.data);
      } catch (err) { }
    };
    getPackage();
  }, []);
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2 card-header py-3">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Refer Doctor Charges List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div class="row">
                  <div class="row">
                    {/* <div className="offset-10 col-md-6 mb-3">
                      <Link to="/packageReg" className="btn btn-primary">
                        <i class="fas fa-plus"></i> &nbsp;Package Register
                      </Link>
                    </div> */}
                  </div>
                  <div class="col-md-12 py-3 card mx-auto">
                    <div class="card-header">
                      <div class="row" id="trial_balance">
                        <div className="col-md-4">
                          <div className="form-group">
                            <select
                              class="custom-select border-info"
                              name="account_type_id"
                              id="flag"
                            >
                              <option>Choose Date</option>
                              <option value="Jan">January</option>
                              <option value="Feb">February</option>
                              <option value="Mar">March</option>
                              <option value="Apr">April</option>
                              <option value="May">May</option>
                              <option value="Jun">June</option>
                              <option value="Jul">July</option>
                              <option value="Aug">August</option>
                              <option value="Sep">September</option>
                              <option value="Oct">October</option>
                              <option value="Nov">November</option>
                              <option value="Dec">December</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <button
                              className="btn btn-primary "
                              type="button"
                              onClick={(e)=> handleSearch(e.target.value)}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleCollect}></form>
                    </div>
                  </div>
                </div>
              </div>

              <CollectDialog open={open} close={() => setOpen(false)} />
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className="main-footer">
        <strong>
          Copyright &copy; 2017-2020{" "}
          <a href="http://www.kwintechnologies.com">K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside classNameName="control-sidebar control-sidebar-dark">
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default CatRegister;
