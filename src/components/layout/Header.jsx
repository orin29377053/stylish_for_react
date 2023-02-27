import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";

const Header = () => {
    const [newKeyword, setKeyword] = useState("");
    const order = useSelector((state) => state.order);
    const jwt = useSelector((state) => state.jwt);

    const dispatch = useDispatch();
    const history = useHistory();

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


    return (
        <div className="header">
            <Link
                className="header__logo"
                to={{
                    pathname: "/index/",
                }}
            ></Link>

            <div className="header__categories">
                <Link
                    variant="contained"
                    className="header__category"
                    to={{
                        pathname: "/index/women",
                    }}
                >
                    女裝
                </Link>
                <Link
                    variant="contained"
                    className="header__category"
                    to={{
                        pathname: "/index/men",
                    }}
                >
                    男裝
                </Link>
                <Link
                    variant="contained"
                    className="header__category"
                    to={{
                        pathname: "/index/accessories",
                    }}
                >
                    配件
                </Link>
            </div>
            <input
                value={newKeyword}
                className="header__search-input"
                placeholder="按Enter查詢"
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        history.push(`/index/search?keyword=${newKeyword}`);
                    }
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
