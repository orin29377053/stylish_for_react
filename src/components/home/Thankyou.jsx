import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkOut } from "../../action/todolist";

const Thankyou = () => {
    const jwt = useSelector((state) => state.jwt);

    const history = useHistory();
    if (!jwt) {
        history.push("/login");
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkOut());
    }, []);

    return (
        <div className="product2">
            <h1>感謝您的購買！</h1>
        </div>
    );
};

export default Thankyou;
