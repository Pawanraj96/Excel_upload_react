import React, { useState } from "react";
// import uploadfile from "./uploadfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "./Data";
import * as XLSX from "xlsx";

function UploadFile() {
    const [data, setdata] = useState([]);
    const [toggle, settoggle] = useState(false)
    //handlechange function from input
    const handleChange = (e) => {
        const selectfiles = e.target.files[0];
        const filereader = new FileReader();
        filereader.readAsArrayBuffer(selectfiles);
        filereader.onload = (e) => {
            const bufferarray = e.target.result;
            const workbook = XLSX.read(bufferarray, { type: "buffer" });
            const workname = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[workname];
            const item = XLSX.utils.sheet_to_json(worksheet);
            setdata(item);
            console.log(item);
        };
    };
    return (
        <div>
            <div id="section">
                <form className="form-group" autoComplete="off">
                    <h5 align="left">Upload Excel File</h5>
                    <hr />
                    <input
                        type={"file"}
                        className="form-control"
                        // name="file"
                        accept=".xlsx"
                        // value={showData.file}
                        onChange={handleChange}
                        required
                    ></input>
                    {data === "" ? (
                        <span className="text-danger">
                            <small style={{ fontSize: '10px' }}>*Please Select a File</small>
                        </span>
                    ) : null}
                    <br />
                    <button className="btn btn-success" onClick={(e) => {
                        e.preventDefault()
                        settoggle(true)
                    }}>
                        Submit
                    </button>&nbsp;
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault()
                        settoggle(false)
                    }}>
                        Close Table
                    </button>
                </form>
            </div>
            <div id="section">
                <h5 align="left">View Excel File</h5>
                <hr />
                <div className="viewer">
                    {data === null && (
                        <>
                            <h6>No File Selected</h6>
                        </>
                    )}
                    {data !== null && (
                        <>
                            <table className="table table-dark table-striped" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>STATE</th>
                                        <th>NUMBER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toggle ? data.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{val.ID}</td>
                                                <td>{val.NAME}</td>
                                                <td>{val.STATE}</td>
                                                <td>{val.NUMBER}</td>
                                            </tr>

                                        );
                                    }) : null}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
