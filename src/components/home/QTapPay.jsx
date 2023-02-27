import React from "react";
import { useEffect, useState } from "react";
import { useTapPay } from "react-native-tappay";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Row, Col, Table } from "react-bootstrap";

const QTapPay = () => {
    const dispatch = useDispatch();

    const jwt = useSelector((state) => state.jwt);
    const history = useHistory();
    if (!jwt) {
        history.push("/login");
    }
    const appId = 12348;
    const appKey =
        "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF";
    const env = "sandbox";
    const [isLoadedSuccess, TapPay] = useTapPay({
        appId: appId,
        appKey: appKey,
        env: env,
    });
    const [hasNumberError, setHasNumberError] = useState(false);
    const [hasExpirationDateError, setHasExpirationDateError] = useState(false);
    const [hasCCVError, setHasCCVError] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const order = useSelector((state) => state.order);

    function subPrice(order) {
        const price = order.reduce((acc, curr) => {
            return acc + curr.qty * curr.price;
        }, 0);
        return price;
    }

    function OrderTable() {
        return (
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>商品名稱</th>
                        <th>顏色</th>
                        <th>尺寸</th>
                        <th>價格</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(order).map((c, i) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.color.name}</td>
                            <td>{c.size}</td>
                            <td>{c.price}</td>
                            <td>{c.qty}</td>
                            <td>{c.qty * c.price}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={6}>運費</td>
                        <td>{orderInfo.freight}</td>
                    </tr>
                    <tr>
                        <td colSpan={6}>總計</td>
                        <td>{subPrice(order) + orderInfo.freight}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    const CARD_FIELD_ID = {
        number: "card-number",
        expirationDate: "card-expiration-date",
        ccv: "card-ccv",
    };
    const cardFields = {
        number: {
            element: `#${CARD_FIELD_ID.number}`,
            placeholder: "Card Number",
        },
        expirationDate: {
            element: `#${CARD_FIELD_ID.expirationDate}`,
            placeholder: "MM / YY",
        },
        ccv: {
            element: `#${CARD_FIELD_ID.ccv}`,
            placeholder: "CVV / CVC",
        },
    };
    const cardSetupConfig = {
        fields: cardFields,
        styles: {
            input: {
                color: "#888B94",
            },
            "input.ccv": {
                "font-size": "16px",
            },
            "input.expiration-date": {
                "font-size": "16px",
            },
            "input.card-number": {
                "font-size": "16px",
            },
            ":focus": {
                color: "#33384D",
            },
            ".valid": {
                color: "#33384D",
            },
            ".invalid": {
                color: "#33384D",
            },
        },
    };
    async function go() {
        const prime = await TapPay.getDirectPayPrime()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.error(error);
            });

        const checkout_order = {};
        checkout_order["prime"] = prime.prime;
        checkout_order["order"] = orderInfo;
        checkout_order["list"] = order;
        fetch("/api/1.0/order/checkout", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(checkout_order),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.data) {
                    const msg = res.data.number;
                    alert(msg);
                    history.push("/thankyou");
                } else {
                    const msg = res.data ? res.data.number : res["msg"];
                    alert(msg);
                }
            });
    }
    const orderInfo = {
        shipping: "delivery",
        payment: "credit_card",
        subtotal: subPrice(order),
        freight: 14,
        total: subPrice(order) + 14,
        recipient: {
            name: "Luke",
            phone: "0987654321",
            email: "luke@gmail.com",
            address: "市政府站",
            time: "morning",
        },
    };

    useEffect(() => {
        if (!isLoadedSuccess) {
            return;
        }

        TapPay.cardSetup(cardSetupConfig);
        TapPay.onCardUpdate((update) => {
            const { canGetPrime, status } = update;

            setHasNumberError(status.number === 2);
            setHasExpirationDateError(status.expiry === 2);
            setHasCCVError(status.ccv === 2);
            setIsValidated(canGetPrime);
        });
    }, [isLoadedSuccess, TapPay]);

    return (
        <div className="product2" style={{ display: "block" }}>
            <Row>
                <h4 className="text-center my-2">購買清單</h4>
                <Col className="my-2">
                    <OrderTable />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="my-2 order-buyer" md={4}>
                    <h4 className="text-center my-2">收件人</h4>
                    <ul style={{ "padding-left": "10px" }}>
                        <li>姓名：{orderInfo.recipient.name}</li>
                        <li>Email：{orderInfo.recipient.email}</li>
                        <li>地址：{orderInfo.recipient.address}</li>
                        <li>電話：{orderInfo.recipient.phone}</li>
                        <li>配送時間：{orderInfo.recipient.time}</li>
                        <li>配送方式：{orderInfo.shipping}</li>
                        <li>付款方式：{orderInfo.payment}</li>
                        <li>小計：{orderInfo.subtotal}</li>
                        <li>運費：{orderInfo.freight}</li>
                        <li>總計：{orderInfo.total}</li>
                    </ul>
                </Col>

                <Col md={8} style={{ padding: "10px" }}>
                    <h4 className="text-center my-2">付款資訊</h4>
                    <div className="container ">
                        <div className="col ">
                            <div>Card number</div>
                            <div className="tpfield " id="card-number"></div>
                        </div>
                        <div className="col ">
                            <div>Card expiration</div>
                            <div
                                className="tpfield"
                                id="card-expiration-date"
                            ></div>
                        </div>
                        <div className="col ">
                            <div>ccv</div>
                            <div className="tpfield" id="card-ccv"></div>
                        </div>
                        <div className="col ">
                            <button
                                className={
                                    order.length <= 0
                                        ? "product__add-to-cart-button_no"
                                        : "product__add-to-cart-button "
                                }
                                id="submit"
                                type="submit"
                                disabled={order.length <= 0 ? true : false}
                                onClick={() => {
                                    go();
                                }}
                            >
                                {order.length > 0 ? `付款` : `請先買東西`}
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default QTapPay;
const styles = {
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#E1E3E6",
        marginBottom: 5,
    },
    inputWithError: {
        borderColor: "#FC6068",
    },
};
