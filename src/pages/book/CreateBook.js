import React from 'react';
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField/TextField";
import {sendRequest} from "../server/sendRequest";

function CreateBook(props) {

    const addBook = async (e) => {
        e.preventDefault();
        const method = "POST";
        const url = `books`;
        const userSecret = localStorage.getItem('key');
        const data = {
            isbn: e.target.isbn.value
        };

        try {
            const response = await sendRequest(method,url, data, userSecret);
            if (response?.isOk){
                props.history.push('/book');
                toast.success('Added')
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
                            <h4>Create article</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addBook}>

                                <TextField className="w-100 mt-2" label="Enter isbn" variant="outlined" name="isbn"
                                           type='text'/>


                                <button type="submit" className="btn btn-primary w-100 mt-3"
                                        data-bs-dismiss="modal">Create
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreateBook;