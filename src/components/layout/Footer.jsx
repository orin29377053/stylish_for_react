import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../../App.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__links"></div>
                    <div className="footer__link">關於 Stylish</div>
                    <div className="footer__link">服務條款</div>
                    <div className="footer__link">隱私政策</div>
                    <div className="footer__link">聯絡我們</div>
                    <div className="footer__link">FAQ</div>
                <div className="footer__social-media">
                    <div className="footer__social-media-line"></div>
                    <div className="footer__social-media-twitter"></div>
                    <div className="footer__social-media-facebook"></div>
                </div>
                <div className="footer__copyright">© 2022. All rights reserved.</div>
            </div>
        </div>
    );
};

export default Footer;
