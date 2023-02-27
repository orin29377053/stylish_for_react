import React, { useState, useEffect, Children } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../../action/todolist";

const Item = () => {
    const product = useSelector((state) => state.product);

    if (product) {
        return product.data.map((val) => (
            <Link className="product" to={`/product/${val.id}`} key={val.id}>
                <img className="product__image" src={val.main_image} />
                <div className="product__colors">
                    {Object.values(val.colors).map((c) => (
                        <div
                            key={c.code}
                            className="product__color"
                            style={{ backgroundColor: c.code }}
                        ></div>
                    ))}
                </div>
                <div className="product__title">{val.title}</div>
                <div className="product__price">{`NTD ${val.price}`}</div>
            </Link>
        ));
    } else {
        return <h3>無對應商品</h3>;
    }
};

const Content = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const { id } = useParams();

    const getCategory = (category) => {
        fetch(`/api/1.0/product/${category}`, { method: "get" })
            .then((res) => res.json())
            .then((res) => {
                dispatch(searchProduct(res));
            });
    };
    const Search = (keyword) => {
        fetch(`/api/1.0/product/search?keyword=${keyword}`, {
            method: "get",
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(searchProduct(res));
            })
            .catch((e) => {
                dispatch(searchProduct(""));
            });
    };
    useEffect(() => {
        if (id === "search" && searchParams.has("keyword")) {
            const keyword = searchParams.get("keyword");
            Search(keyword);
        } else if (id) {
            getCategory(id);
        } else {
            getCategory("all");
        }
    }, [id, searchParams]);

    return (
        <div className="products">
            <Item />
        </div>
    );
};

export default Content;
