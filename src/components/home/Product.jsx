import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct, takeOrder } from "../../action/todolist";

const Product = () => {  
    const [num, SetNum] = useState(1);
    const [color, SetColor] = useState();
    const [size, SetSize] = useState();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState();
    const product = useSelector((state) => state.singleProduct);

    function checkStock(color, size) {
        if (product) {

            try {
                return product.variants.find(
                    (variant) =>
                        variant.color_code === color[1] && variant.size === size
                ).stock;
            } catch {
                return -1;
            }
        } else {
            return -1;
        }
    }

    function getData() {
        fetch(`/api/1.0/product/details?id=${id}`, { method: "get" })
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                SetSize(res.data.variants[0].size);
                SetColor([res.data.colors[0].name, res.data.colors[0].code]);
                dispatch(getSingleProduct(res.data));
            });
    }
    useEffect(() => {
        getData();
    }, [id]);
    function enough() {
        const stock = checkStock(color, size);
        if (stock >= num && num !== 0) {
            const selectedProduct = {};
            const selectColor = {};
            selectColor["code"] = color[1];
            selectColor["name"] = color[0];
            selectedProduct["id"] = product.id;
            selectedProduct["name"] = product.title;
            selectedProduct["price"] = product.price;
            selectedProduct["color"] = selectColor;
            selectedProduct["size"] = size;
            selectedProduct["qty"] = num;
            

            dispatch(takeOrder(selectedProduct));
            window.alert(
                "下單成功，由於尚未結帳，因此庫存尚未調整，勿重複下單"
            );
            window.alert("購物完成後請按右上方購物車結帳");
        } else {
            window.alert("庫存不足");
        }
    }
    function showlimit() {
        return checkStock(color, size);
    }
    const limt = showlimit() > 0 ? showlimit() : 0;
    return (
        <div>
            <div className="product2">
                <img
                    className="product__main-image"
                    src={product?.main_image}
                />
                <div className="product__detail">
                    <div className="product__title">{product?.title}</div>
                    <div className="product__id">{product?.id}</div>
                    <div className="product__price">NTD {product?.price}</div>
                    <div className="product__variant">
                        <div className="product__color-title">顏色</div>
                        <div className="product__color-selector">
                            {product &&
                                Object.values(product?.colors).map((c) => (
                                    <div
                                        className={`product__color ${
                                            color && c.code == color[1]
                                                ? "product__color--selected"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: c.code }}
                                        key={c.code}
                                        onClick={() => {
                                            SetColor([c.name, c.code]);
                                        }}
                                    ></div>
                                ))}
                        </div>
                    </div>
                    <div className="product__variant">
                        <div className="product__size-title">尺寸</div>
                        <div className="product__size-selector">
                            {product &&
                                Object.values(product?.sizes).map((c) => (
                                    <div
                                        className={`product__size ${
                                            size && size == c
                                                ? "product__size--selected"
                                                : ""
                                        }`}
                                        key={c}
                                        onClick={() => SetSize(c)}
                                    >
                                        {c}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="product__variant">
                        <div className="product__quantity-title"></div>
                        <div className="product__quantity-selector">
                            <div
                                className="product__quantity-minus"
                                onClick={() => {
                                    SetNum(num > 0 ? num - 1 : 0);
                                }}
                            ></div>
                            <div className="product__quantity-value">{num}</div>
                            <div
                                className="product__quantity-add"
                                onClick={() => {
                                    SetNum(num + 1);
                                }}
                            ></div>
                        </div>
                    </div>
                    <button
                        className={`product__add-to-cart-button ${
                            limt <= 0 ? "product__add-to-cart-button_no" : ""
                        }`}
                        disabled={limt <= 0 ? true : false}
                        onClick={() => enough()}
                    >
                        {limt > 0
                            ? `請下單(尚有庫存${limt}件)`
                            : `庫存${limt}件，補貨中`}
                    </button>
                    <div className="product__note">{product?.note}</div>
                    <div className="product__texture">
                        材質：{product?.texture}
                    </div>
                    <div className="product__description">
                        {product?.description}
                    </div>
                    <div className="product__place">產地：{product?.place}</div>
                </div>
                <div className="product__story">
                    <div className="product__story-title">細部說明</div>
                    <div className="product__story-content">
                        {product?.story}
                    </div>
                </div>

                <div className="product__images2">
                    {product &&
                        Object.values(product?.images).map((c, i) => (
                            <img className="product__image" src={c} key={i} />
                        ))}
                </div>
            </div>
            {id}
        </div>
    );
};

export default Product;
