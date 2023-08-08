import React from 'react';
import md5 from "md5";
import axios from "axios";
import {PATH_NAME} from "../../utils/utils";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField/TextField";
import {sendRequest} from "../server/sendRequest";

function ChangeBookStatus(props) {
    const id = props.match.params.id;

    const changeBookStatus = async (e) => {

        e.preventDefault();

        const method = "PATCH";
        const url = `books/${id}`;
        const userSecret = localStorage.getItem('key');
        const data = {
            status: +e.target.status.value
        };

        try {
            const response = await sendRequest(method,url, data, userSecret);

            if (response?.isOk) {
                props.history.push('/book');
                toast.success('change status')
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error')
        }
    };

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-xl-4 offset-4">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>Change status</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={changeBookStatus}>
                                <TextField className="w-100 mt-2" label="Enter name" variant="outlined" name="status"
                                           type='text'/>

                                <button type="submit" className="btn btn-primary w-100 mt-3">Change status</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChangeBookStatus;