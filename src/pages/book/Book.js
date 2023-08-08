import React, {useEffect, useState} from 'react';
import md5 from "md5";
import axios from "axios";
import {PATH_NAME} from "../../utils/utils";
import {toast} from "react-toastify";
import {sendRequest} from "../server/sendRequest";

function Book(props) {

    const [books, setBooks] = useState([]);

    const getBook = async () => {
        const method = "GET";
        const url = `books`;

        const userSecret = localStorage.getItem('key');


        try {
            const response = await sendRequest(method, url, null, userSecret);


            if (response?.isOk) {
                setBooks(response.data)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getBook()

    }, []);

    const deleteBook=async (id)=>{
        const method = "DELETE";
        const url = `books/${id}`;
        const userSecret = localStorage.getItem('key');

        try {
            const response = await sendRequest(method, url, null, userSecret);

            if (response?.isOk) {
                toast.success('deleted book');
                getBook()
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className="book-list">
            <div className="container">
                <div className="row">
                    {books?.map((item, index) => (
                        <div key={item?.book?.id} className="col-xl-4 my-3">
                            <div className="card h-100">
                                <div className="card-header text-center">
                                    <img className="img-fluid" src={item?.book?.cover} alt="book image"/>
                                    <button className={
                                        item?.status===0 ? "book-status book-status-new":
                                        item?.status===1 ? "book-status book-status-reading":
                                            "book-status book-status-finish"
                                    }>
                                        {item?.status === 0 ? 'New' :
                                            item?.status === 1 ? 'Reading' : 'Finished'
                                        }
                                    </button>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item?.book?.title}</h5>
                                    <h6 className="card-title">Author: {item?.book?.author}</h6>
                                    <div className="d-flex">
                                        <div>Published: {item?.book?.published}</div>
                                        <div className="ms-5">Page: {item?.book?.pages}</div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between">
                                        <button onClick={()=>props.history.push(`/book/change-status/${item?.book?.id}`)} className="btn btn-warning w-50">edit</button>
                                        <button onClick={()=>deleteBook(item?.book?.id)} className="btn btn-danger w-50 ms-3">delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Book;