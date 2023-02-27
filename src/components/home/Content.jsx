import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
        return <p></p>;
    }
};

const Content = () => {
    return (
        <div className="products">
            <Item />
        </div>
    );
};

export default Content;
