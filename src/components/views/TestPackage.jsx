import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CatRegister() {
  const [testPackage, setTestPackage] = useState([]);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/packages"
        );
        console.log(res.data.data);
        setTestPackage(res.data.data);
      } catch (err) {}
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
                      <a href="/lab-test">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Test Package List
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
                    <div className="offset-10 col-md-6 mb-3">
                      <Link to="/packageReg" className="btn btn-primary">
                        <i class="fas fa-plus"></i> &nbsp;Package Register
                      </Link>
                    </div>
                  </div>
                  <div class="col-md-12 py-3 card">
                    <div class="card-header">
                      <div class="row" id="trial_balance"></div>
                    </div>
                    <div class="table-responsive text-black" id="slimtest2">
                      <table class="table table-hover px-3" id="filter_date">
                        <thead class="bg-info text-white">
                          <tr>
                            <th>No.</th>
                            <th>Package Name</th>

                            <th>Test Included</th>
                            <th>Description</th>
                            <th>Total Charges</th>

                            <th className="text-center">Status</th>
                          </tr>
                        </thead>

                        {testPackage && testPackage.map((pack, i) => (
                          <tbody className="">
                            <tr>
                              <td>{++i}</td>
                              <td>{pack.name}</td>
                              <td>Test</td>
                              <td>{pack.description}</td>

                              <td>{pack.totalCharges}</td>

                              <td className="text-center">
                                <div className="badge badge-sm badge-success">
                                  Active
                                </div>
                                {/* <div className="badge badge-sm badge-info">
                                  Pending
                                </div> */}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <div className="card px-3 py-3">
                      <h5 className="card-header mb-4 text-secondary">
                        Create Reagent
                      </h5>

                      <div class="form-group">
                        <label for="code" className="text-secondary">
                          Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          class="form-control border-info"
                          name="code"
                          //   ref={(el) => (this.name = el)}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control border-info"
                          name="name"
                          id="name"
                          //   ref={(el) => (this.name = el)}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="desc"
                          //   ref={(el) => (this.description = el)}
                          onChange={(e) =>
                            setDescription(e.target.value)
                          }></textarea>
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Flag
                        </label>
                        <select
                          class="custom-select border-info"
                          name="account_type_id"
                          id="flag"
                          onChange={(e) => setFlag(e.target.value)}>
                          <option></option>
                          <option value="Service">Service</option>
                          <option value="Reagent">Reagent</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-primary form-control text-center fw-5"
                        type="submit"
                        onClick={CategoryCreate}>
                        Save
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* <ExpenseDialog
                open={open}
                close={() => setOpen(false)}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
              /> */}
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
