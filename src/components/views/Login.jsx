
import { lightBlue } from "@mui/material/colors";
import React from "react";


function Login() {

  const styles = {
    card: {
      borderRadius: '15px',
    },
    head: {
      backgroundColor: "white",
      boxShadow: "3px 1px 8px gray",
    },
    body: {
      backgroundColor: "white",
      boxShadow: "3px 1px 8px gray",
    },
    input: {
      backgroundColor: "white",
      boxShadow: "3px 2px 8px gray",
        border:'none',
      borderBottom: '1px solid blue',
      
    
    },
    btn: {
      
      boxShadow: "3px 3px 12px gray",
    },
  };

  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
     

        <section className="content">
          <div className="container" style={{ marginTop: "8em" }}>
            <div className="row">
              <div className="offset-3 col-md-6">
          
                <div className="card" style={styles.card}>
                  <div
                    className="card-header head text-center py-3"
                    style={styles.head}>
                    <img src={require("../../logo.png")} alt="" />
                  </div>
                  <div className="card-body body py-5" style={styles.body}>
                    <div className="row">
                      <div className="offset-3 col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="eg: 123@gmail.com"
                            style={styles.input}></input>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="offset-3 col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            style={styles.input}
                            type="password"
                            autoFocus
                            className="form-control"
                            placeholder="*****"></input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="offset-3 col-md-6">
                        <input
                          type="submit"
                          value="Login"
                          className="btn btn-primary mt-3"
                          style={styles.btn}></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- /.container-fluid --> */}
        </section>
      </div>

      {/* <!-- /.content-wrapper --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default Login;
