import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CommonProvider from "./components/layout/CommonProvider";

import Product from "./components/home/Product";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Header from "./components/layout/Header";
import Content from "./components/home/Content";
import Campaign from "./components/home/Campaign";
import Footer from "./components/layout/Footer";
import Login from "./components/home/Login";
import Profile from "./components/home/Profile";
import QTapPay from "./components/home/QTapPay";
import Thankyou from "./components/home/Thankyou";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Provider store={store}>
            <CommonProvider>
                <Router>
                    <ScrollToTop />
                    <Header />
                    <Switch>
                        <Route path="/product/:id">
                            <Product />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/checkout">
                            <QTapPay />
                        </Route>
                        <Route path="/thankyou">
                            <Thankyou/>
                        </Route>
                        <Route path="/">
                            <Campaign />
                            <Content />
                        </Route>
                    </Switch>
                </Router>
                <Footer />
            </CommonProvider>
        </Provider>
    );
}

export default App;
