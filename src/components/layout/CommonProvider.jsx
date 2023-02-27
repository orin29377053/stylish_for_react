import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../action/todolist";

const CommonProvider = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("/api/1.0/product/all", { method: "get" })
            .then((res) => res.json())
            .then((res) => {
                dispatch(searchProduct(res));
            });
    }, []);
    return <div>{children}</div>;
};

export default CommonProvider;
