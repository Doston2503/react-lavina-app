import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import React from "react";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import ProtectedPath from "./components/ProtectedPath";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <ProtectedPath>
                        <Route path="/book" component={MainLayout}/>
                    </ProtectedPath>

                </Switch>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
