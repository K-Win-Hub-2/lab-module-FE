import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AccTypeUpdate(props) {
  const [accountType, setAccountType] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [upName, setUpName] = useState("");
  const [upDesc, setUpDesc] = useState("");

  const AccountTypeUpdate = () => {
    const data = {
      id: props.id,
      name: name,
      code: code,
      description: description,
    };
    // alert(JSON.stringify(data));
    console.log(data);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .put(
        "http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type",
        data,
        config
      )
      .then(function (response) {
        alert("success");
        props.setAccountType([...props.accountType, response.data.data]);
      })
      .catch(function (err) {
        alert(err.message);
      });

    props.setUpdateDialog(false);
  };

  useEffect(() => {
    const getAccountType = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/account-type/" +
            props.id
        );

        setUpName(res.data.data.name);
        setUpDesc(res.data.data.description);
      } catch (err) {}
    };

    getAccountType();
  }, []);

  return (
    <div>
      <Dialog open={props.updateDialog} onClose={props.close}>
        <DialogTitle>
          <div className="modal-header bg-info">
            <h4 className="modal-title">Update Account Type</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <form action="" method="post">
            <div className="">
              <div className="card px-3 py-3">
                <div class="form-group">
                  <label for="name" className="text-secondary">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control border-info"
                    name="balance"
                    defaultValue={upName}
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
                    id="description"
                    placeholder={upDesc}
                    //   ref={(el) => (this.description = el)}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <Button
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={props.close}>
                Close
              </Button>
              <Button class="btn btn-primary" onClick={AccountTypeUpdate}>
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// phyo
//maymyat
