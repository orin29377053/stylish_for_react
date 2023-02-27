import React from "react";
import { getCampaign } from "../../action/todolist";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";
import { Link } from "react-router-dom";
const FirstCampaing = () => {
    const cam = useSelector((state) => state.campaign);
    if (cam) {
        const img = { backgroundImage: `url("${cam.data[0].picture}")` };

        return (
            <Link
                className="carousel__campaign"
                style={img}
                to={`/product/${cam.data[0].product_id}`}
            >
                <div className="carousel__campaign-story">
                    <div className="carousel__campaign-story-content">
                        {cam.data[0].story}
                    </div>
                </div>
            </Link>
        );
    } else {
        return <p></p>;
    }
};

const Campaign = () => {
    const dispatch = useDispatch();
    const Campaign_list = async () => {
        await fetch("/api/1.0/marketing/campaigns", { method: "get" })
            .then((res) => res.json())
            .then((res) => {
                dispatch(getCampaign(res));
            });
    };
    Campaign_list();

    return (
        <div className="carousel">
            <FirstCampaing />
        </div>
    );
};

export default Campaign;
