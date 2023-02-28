import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJWT } from "../../action/todolist";

const CommonProvider = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("JWT")) {
            dispatch(getJWT(localStorage.getItem("JWT")));
        }
    }, []);
    return <div>{children}</div>;
};

export default CommonProvider;
