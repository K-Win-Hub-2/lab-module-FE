import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'

function CatRegister() {
  const [referDoctor, setReferDoctor] = useState([]);
  const DoctorID = useLocation().pathname.split('/')[2];
  const [open, setOpen] = useState(false);

  const CollectDialog = () => {
    setOpen(true);
  }

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(
          "localhost:9000/api/refer-commissions/doctor/" +
          DoctorID
        )
        setReferDoctor(res.data.data);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "CANCEL",
        })
      }
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
                  <div class="col-md-12 py-3 card">
                    <div class="card-header">
                      <div class="row" id="trial_balance"></div>
                    </div>
                    <div class="table-responsive text-black" id="slimtest2">
                      <table class="table table-hover px-3" id="filter_date">
                        <thead class="bg-info text-white">
                          <tr>
                            <th>Index</th>
                            <th>Month</th>

                            <th>Refer Amount</th>
                            <th>Status</th>
                            <th>Collect Date</th>

                            <th>Remark</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="">
                          <tr>
                            <td>1</td>
                            <td>January</td>
                            <td>{referDoctor.value}</td>
                            <td>
                              <div className="badge badge-sm badge-info">
                                Collect
                              </div>
                            </td>
                            <td>2023-04-27</td>
                            <td>test</td>
                            <td className="text-center">
                              <Link
                                to=""
                                className="btn btn-sm btn-primary rounded">
                                Details
                              </Link>
                              &nbsp;
                              <button
                                onClick={CollectDialog}
                                className="btn btn-sm btn-primary">
                                Collect
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>February</td>
                            <td>{referDoctor.value}</td>
                            <td>
                              <div className="badge badge-sm badge-info">
                                Collect
                              </div>
                            </td>
                            <td>2023-04-27</td>
                            <td>test</td>
                            <td className="text-center">
                              <Link
                                to=""
                                className="btn btn-sm btn-primary rounded">
                                Details
                              </Link>
                              &nbsp;
                              <button
                                onClick={CollectDialog}
                                className="btn btn-sm btn-primary">
                                Collect
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
