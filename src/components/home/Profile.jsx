import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getJWT } from "../../action/todolist";

// const admin = () => {
//     if newUserRole
//     return (
//         { (newUserRole=="admin")?
//             < div >
//             <button
//                 onClick={() => {
//                     window.open("http://localhost:80/admin/campaign ");
//                 }}
//             >
//                 活動登錄
//             </button>
//             <button
//                 onClick={() => {
//                     window.open("http://localhost:80/admin/product ");
//                 }}
//             >
//                 產品登錄
//             </button>
//             <button
//                 onClick={() => {
//                     window.open("http://localhost:80/admin/checkout ");
//                 }}
//             >
//                 金流測試
//             </button>
//                 </div>:<p></p>
//     }
//     );
// };

const Profile = () => {
    const [newProfile, setNewProfile] = useState("");
    const [newUserRole, setNewUserRole] = useState("");

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
    async function getPermission(jwt) {
        const result = await fetch("admin/authority", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
        });

        const user_role = await result.json();
        setNewUserRole(user_role.msg);
        console.log(user_role.msg);

        // setNewProfile(profile);

        return;
    }
    useEffect(() => {
        getProfile(jwt);
        getPermission(jwt);
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
                    <div>
                        登入方式：
                        {newProfile?.data?.provider === "native"
                            ? "官網"
                            : "Facebook"}
                    </div>
                    <div>
                        身份：{newUserRole == "user" ? "一般會員" : "管理員"}
                    </div>
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
            {newUserRole == "admin" ? (

                    <Row>
                        <Col>
                            <button
                                className="admin-button"
                                onClick={() => {
                                    window.open(
                                        "/admin/campaign "
                                    );
                                }}
                            >
                                活動登錄
                            </button>
                        </Col>
                        <Col>
                            <button
                                className="admin-button"
                                onClick={() => {
                                    window.open(
                                        "/admin/product "
                                    );
                                }}
                            >
                                產品登錄
                            </button>
                        </Col>
                        <Col>
                            <button
                                className="admin-button"
                                onClick={() => {
                                    window.open(
                                        "/admin/checkout "
                                    );
                                }}
                            >
                                金流測試
                            </button>
                        </Col>
                    </Row>
                
            ) : (
                <p></p>
            )}
        </Container>
    );
};

export default Profile;
