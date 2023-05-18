/* eslint-disable */

import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function CatRegister() {
  const [referDoctor, setReferDoctor] = useState([]);
  const DoctorID = useLocation().pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState([]);

  const handleCollect = () => {};

  const handleSearch = (event) => {
    axios
      .get(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor/" +
          DoctorID
      )
      .then(function (response) {
        setSearch(response.data.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        });
      });
  };

  const CollectDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/doctor/" +
            DoctorID
        );

        console.log(res.data.data.value);
        setReferDoctor(res.data.data);
      } catch (err) {}
    };

    const search = async () => {
      try {
        const response = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/refer-commissions/doctor/64423be1b42471d6f4aa20a1?id=64423be1b42471d6f4aa20a1&date=Jan"
        );
        console.log("night");
        console.log(response.data.data);
      } catch (err) {}
    };
    search();
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
                      <Link to="/doctorClinic">Back</Link>
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
                  <div class="col-md-12 py-3">
                    <div class="row" id="trial_balance">
                      <div className="offset-3 col-6  card">
                        <div class="card-body">
                          <div className="row form-group">
                            <div className="col-6">
                              <label htmlFor="">Monthly Name</label>
                              <select name="" id="" className="form-control">
                                <option value="">Choose Month</option>
                                <option value="Jan">Janaury</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="July">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                              </select>
                            </div>
                            <div className="col-4">
                              <button
                                className="btn btn-m btn-info"
                                style={{ marginTop: "32px" }}
                                onClick={search}>
                                Search
                              </button>
                            </div>
                            <div className="col-6 mt-3">
                              <label htmlFor="">Collect Amount</label>
                            </div>
                            <div className="col-6 mt-3">
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                              <label htmlFor="">Status</label>
                            </div>
                            <div className="col-6 mt-3">
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                              <label htmlFor="">Collect Date</label>
                            </div>
                            <div className="col-6 mt-3">
                              <input type="date" className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                              <label htmlFor="">Remark</label>
                            </div>
                            <div className="col-6 mt-3">
                              <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="3"
                                className="form-control"></textarea>
                            </div>
                            <div className="offset-4 mt-5">
                              <button className="btn btn-sm btn-success">
                                Collect
                              </button>
                              <button className="btn btn-sm btn-info ml-3">
                                Detail
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
