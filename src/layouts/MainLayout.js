import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Book from "../pages/book/Book";
import CreateBook from "../pages/book/CreateBook";
import ChangeBookStatus from "../pages/book/ChangeBookStatus";

function MainLayout(props) {

    const logout = () => {
        props.history.push('/');
        localStorage.clear()
    };

    const createBook = () => {
        props.history.push('/book/create');

    };

    return (
        <div className="main-layout">
            <div className="main-layout-header">
                <div className="brand">
                    <img src="/images/book.svg" alt="Book image" className="img-fluid"/>
                </div>

                <div className="action">
                    <button
                        onClick={createBook}
                        className="create-btn btn btn-primary">create book
                    </button>
                    <button onClick={logout} className="logout-btn btn btn-danger ms-3">logout</button>
                </div>
            </div>
            <hr className="my-3"/>
            <div className="main-layout-content">
                <Switch>
                    <Route path="/book" exact component={Book}/>
                    <Route path="/book/create" exact component={CreateBook}/>
                    <Route path="/book/change-status/:id" exact component={ChangeBookStatus}/>
                </Switch>
            </div>
        </div>
    );
}

export default MainLayout;