import React, { useState } from "react";
import { Button, Container, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getJWT } from "../../action/todolist";
import { useHistory } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [signInEmail, setSignInEmail] = useState("");
    const [signInpwd, setSignInPwd] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPwd, setSignUpPwd] = useState("");
    const [singUpname, setSignUpName] = useState("");
    const jwt = useSelector((state) => state.jwt);
    if (jwt) {
        history.push("/profile");
    }

    async function signIn() {
        const signin = {};
        signin["provider"] = "native";
        signin["email"] = signInEmail;
        signin["password"] = signInpwd;

        const result = await fetch("api/1.0/user/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signin),
        });

        const resultjson = await result.json();

        if (!resultjson.data) {
            window.alert(resultjson.msg);
        } else {
            window.alert("登入成功");
            dispatch(getJWT(resultjson.data.access_token));
            history.push("/profile");
        }
    }

    async function signUp() {
        const signup = {};
        signup["name"] = singUpname;
        signup["email"] = signUpEmail;
        signup["password"] = signUpPwd;

        const result = await fetch("api/1.0/user/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signup),
        });

        const resultjson = await result.json();

        if (!resultjson.data) {
            window.alert(resultjson.msg);
        } else {
            window.alert("註冊成功");
            dispatch(getJWT(resultjson.data.access_token));
            history.push("/profile");
        }
    }

    return (
        <Container className="product2">
            <Col>
                <h1>登入</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="請輸入Email"
                            onChange={(e) => {
                                setSignInEmail(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>密碼</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="請輸入密碼"
                            onChange={(e) => {
                                setSignInPwd(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="dark"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        登入
                    </Button>
                </Form>
            </Col>
            <Col xs="2"></Col>
            <Col>
                <h1>註冊</h1>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="請輸入姓名"
                            onChange={(e) => {
                                setSignUpName(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="請輸入Email"
                            onChange={(e) => {
                                setSignUpEmail(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>密碼</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="請輸入密碼"
                            onChange={(e) => {
                                setSignUpPwd(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Button
                        variant="dark"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                    >
                        註冊
                    </Button>
                </Form>
            </Col>
        </Container>
    );
};

export default Login;
