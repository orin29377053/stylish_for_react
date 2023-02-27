import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getJWT } from "../../action/todolist";

const Profile = () => {
    const [newProfile, setNewProfile] = useState("");
    const dispatch = useDispatch();

    const jwt = useSelector((state) => state.jwt);
    const history = useHistory();
    if (!jwt) {
        history.push("/login");
    }

    async function getProfile(jwt) {
        const result = await fetch("api/1.0/user/profile", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
        });

        const profile = await result.json();
        setNewProfile(profile);

        return;
    }
    useEffect(() => {
        getProfile(jwt);
    }, []);
    function logout() {
        dispatch(getJWT(""));
    }
    function checkout() {
        history.push("/checkout");
    }

    return (
        <Container className="profile">
            <Row className="user-information justify-content-center mx-0">
                <Col md={11}>
                    <div>姓名：{newProfile?.data?.name ?? "-"}</div>
                    <div>E-mail：{newProfile?.data?.email ?? "-"}</div>
                    <div>登入方式：{newProfile?.data?.provider==="native" ? "官網":"Facebook"}</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button
                        className="product__add-to-cart-button"
                        onClick={() => {
                            checkout();
                        }}
                    >
                        結帳
                    </button>
                </Col>
                <Col>
                    <button
                        className="product__add-to-cart-button"
                        onClick={() => {
                            logout();
                        }}
                    >
                        登出
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
