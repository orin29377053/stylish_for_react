import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../../action/todolist";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../App.css";

const Header = () => {
    const [newKeyword, setKeyword] = useState("");
    const product = useSelector((state) => state.product);
    const order = useSelector((state) => state.order);
    const jwt = useSelector((state) => state.jwt);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    function checkout() {
        if (!jwt) {
            window.alert("請先登入或註冊");
            history.push("/login");
        } else {
            history.push("/checkout");
        }
    }
    function goToProfile() {
        if (!jwt) {
            window.alert("請先登入或註冊");
            history.push("/login");
        } else {
            history.push("/profile");
        }
    }

    const Gogo = (category) => {
        let cat;
        if (category.length > 0) {
            cat = category;
        } else {
            cat = "all";
        }
        if (location.pathname !== "/") {
            history.push("/");
        }
        fetch(`/api/1.0/product/${cat}`, { method: "get" })
            .then((res) => res.json())
            .then((res) => {
                dispatch(searchProduct(res));
                history.push(`?category=${cat}`);
            });
    };
    const Search = (keyword) => {
        if (location.pathname !== "/") {
            history.push("/");
        }
        fetch(`/api/1.0/product/search?keyword=${keyword}`, {
            method: "get",
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(searchProduct(res));
            });
    };

    return (
        <div className="header">
            <Link
                className="header__logo"
                to="/"
                onClick={() => Gogo("")}
            ></Link>

            <div className="header__categories">
                <Link
                    variant="contained"
                    className="header__category"
                    to="/"
                    onClick={() => Gogo("women")}
                >
                    女裝
                </Link>
                <Link
                    variant="contained"
                    className="header__category"
                    to="/"
                    onClick={() => Gogo("men")}
                >
                    男裝
                </Link>
                <Link
                    variant="contained"
                    className="header__category"
                    to="/"
                    onClick={() => Gogo("accessories")}
                >
                    配件
                </Link>
            </div>
            <input
                value={newKeyword}
                className="header__search-input"
                onChange={(e) => {
                    console.log("new", e.target.value);
                    Search(e.target.value);
                    history.push(`?keyword=${e.target.value}`);
                    setKeyword(e.target.value);
                }}
                onClick={() => {
                    history.push("/");
                }}
            ></input>
            <div className="header__links">
                <a className="header__link">
                    <div
                        className="header__link-icon-cart"
                        onClick={() => {
                            checkout();
                        }}
                    >
                        <div className="header__link-icon-cart-number">
                            {order.length}
                        </div>
                        <div className="header__link-text"></div>
                    </div>
                </a>
                <a className="header__link">
                    <div
                        className="header__link-icon-profile"
                        onClick={() => {
                            goToProfile();
                        }}
                    ></div>
                </a>
                <a></a>
            </div>
        </div>
    );
};

export default Header;
