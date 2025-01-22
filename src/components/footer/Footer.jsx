import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
import apple from "../../assets/icons8-клиент-для-mac-50.png";
import playMarket from "../../assets/icons8-новый-магазин-google-play-50.png";
import telegram from "../../assets/icons8-телеграм-50.png";
import facebook from "../../assets/icons8-facebook-новый-50.png";
import youtube from "../../assets/icons8-youtube-50.png";
import instagram from "../../assets/icons8-instagram-50.png";

const Footer = () => {
    return (
        <footer className='footer__container'>
            <div className="footer__card">
                <div className="footer__box">
                    <h3>Biz haqimizda</h3>
                    <Link>Yetkazib berish punktlari</Link>
                    <Link>Bo'sh ish o'rinlari</Link>
                </div>
                <div className="footer__box">
                    <h3>Foydalanuvchilar uchun</h3>
                    <Link>Biz bilan bog'lanish</Link>
                    <Link>Savollar va javoblar</Link>
                </div>
                <div className="footer__box">
                    <h3>Tadbirkorlar uchun</h3>
                    <Link>Uzumda sotish</Link>
                    <Link>Sellerlar uchun kirish</Link>
                    <Link>Yetkazib berish punktini ochish</Link>
                </div>
                <div className="footer__box">
                    <h3>Ilovani yuklab olish</h3>
                    <div className="footer__play">
                        <Link className='footer__app'>
                            <img src={apple} alt="" />
                            <Link>AppStore</Link>
                        </Link>
                        <Link className='footer__app'>
                            <img src={playMarket} alt="" />
                            <Link>Google Play</Link>
                        </Link>
                    </div>
                    <div className="footer__social">
                        <div className="footer__social-title">
                            <h3>Uzum ijtimoiy tarmoqlarda</h3>
                        </div>
                        <div className="footer__social-icons">
                            <Link>
                                <img src={instagram} alt="" />
                            </Link>
                            <Link>
                                <img src={telegram} alt="" />
                            </Link>
                            <Link>
                                <img src={facebook} alt="" />
                            </Link>
                            <Link>
                                <img src={youtube} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='hr__teg' />
            <div className="footer__privacy">
                <div className="footer__privacy-txt">
                    <h3>Maxfiylik siyosati</h3>
                    <h3>Foydalanuvchi shartnomasi</h3>
                </div>
                <div className="footer__certificate">
                    <h3>«2024© ООО «UZUM MARKET». ИНН 309376127. Barcha huquqlar himoyalangan»</h3>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
