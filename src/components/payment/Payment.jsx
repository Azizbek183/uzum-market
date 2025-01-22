import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import humoCard from "../../assets/humo-logo-more.png";
import masterCard from "../../assets/master-card.png";
import uzbekistan from "../../assets/icons8-узбекистан-48.png";
import russian from "../../assets/icons8-российская-федерация-48.png";
import "./payment.css";
import { Link } from "react-router-dom";

const translations = {
    ru: {
        title: "Оплата заказа",
        addCard: "Новая карта",
        cardNumberPlaceholder: "Номер карты:",
        acceptCards: "Принимаем к оплате карты:",
        secureOperation: "Безопасная операция с",
        saveCard: "Запомнить карту",
        saveCardDescription: "Вы соглашаетесь с условиями хранения информации по картам",
        pay: "Оплатить",
    },
    uz: {
        title: "Buyurtma uchun tolov",
        addCard: "Yangi karta",
        cardNumberPlaceholder: "Karta raqami:",
        acceptCards: "Tolov uchun qabul qilamiz",
        secureOperation: "Xavfsiz operatsiya",
        saveCard: "Kartani eslab qolish",
        saveCardDescription: "Kartalar mahsulotlarini saqlash shartlariga rozisiz",
        pay: "To'lov qiling",
    },
};



const Payment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // karta qo'shish modal holatini saqlash
    const [isLanguageModalOpen, setLanguageModalOpen] = useState(false); // til tanlash modali
    const [isToggled, setIsToggled] = useState(false);
    const [setLanguage, setSelectedLanguage] = useState({
        name: "РУ",
        flag: russian,
        lang: "ru",
    });

    // Til tanlashni amalga oshiradigan funksiya
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleLanguageModal = () => {
        setLanguageModalOpen(!isLanguageModalOpen);
    };

    const handleLanguageSelect = (name, flag) => {
        const lang = name === "O'zbek tili" ? "uz" : "ru"; // tilni tanlash
        setSelectedLanguage({
            name: name === "O'zbek tili" ? "O'Z" : "РУ", // tilning ko'rsatilish ko'rinishi
            flag,
            lang,
        });
        setLanguageModalOpen(false); // til tanlangandan keyin modalni yopish
    };

    const t = translations[setSelectedLanguage.lang] || translations.ru; // tilni aniqlash va default qilib rus tilini olish

    // Pereklyuchatel holatini o'zgartirish funksiyasi
    const toggleHandler = () => {
        setIsToggled(!isToggled);
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedPrice = JSON.parse(localStorage.getItem("totalPrice"));
        if (storedPrice) {
            setTotalPrice(storedPrice);
        }
    }, []);

    return (
        <div className="payment__container">
            <div className="payment__top">
                {/* sahifa bosh qismi */}
                <div className="payment__title">
                    <Link to="/placing-order">
                        <CloseIcon />
                    </Link>
                    <p>Uzum Market</p>
                    {/* til tanlash bo'limi */}
                    <div className="payment__language" onClick={toggleLanguageModal}>
                        <p>{setSelectedLanguage.name}</p>
                        <img src={setSelectedLanguage.flag} alt="language" />
                    </div>
                </div>

                {/* til tanlash modali */}
                {isLanguageModalOpen && (
                    <div className="payment__language__modal slide-up">
                        <div className="payment__language__select" onClick={() => handleLanguageSelect("РУ", russian)}>
                            <p>Русский</p>
                            <img src={russian} alt="Russian" />
                        </div>
                        <div className="payment__language__select" onClick={() => handleLanguageSelect("O'zbek tili", uzbekistan)}>
                            <p>O'zbek tili</p>
                            <img src={uzbekistan} alt="Uzbek" />
                        </div>
                    </div>
                )}

                {/* sahifa podzagolovigi */}
                <div className="payment__title">
                    <span>{t.title}</span>
                    <span>{totalPrice.toLocaleString()} So'm</span>
                </div>

                {/* yangi karta qo'shish */}
                <div className="payment__card">
                    <button onClick={toggleModal}>
                        <AddIcon />
                    </button>
                    <span>{t.addCard}</span>
                </div>

                {/* karta uchun modal */}
                {isModalOpen && (
                    <div className="payment__modal open">
                        <input type="text" placeholder={t.cardNumberPlaceholder} className="payment__modal-input" />
                        <span className="method__card">{t.acceptCards}</span>
                        <div className="payment__method-cards">
                            <img src={humoCard} alt="Humo" />
                            <img src={masterCard} alt="MasterCard" />
                        </div>
                        <span className="method__card">
                            {t.secureOperation} <b>UZUM BANK</b>
                        </span>
                    </div>
                )}
                <div className="payment__save">
                    <div className="payment__save-txt">
                        <p>{t.saveCard}</p>
                        <span>{t.saveCardDescription}</span>
                    </div>
                </div>

                {/* kartani eslab qolish bloki */}
                <div className="toggle-switch" onClick={toggleHandler}>
                    <div className={`toggle-container ${isToggled ? "active" : ""}`}>
                        <div className="toggle-circle"></div>
                    </div>
                </div>
            </div>

            {/* to'lov tugmasi */}
            <div className="payment__bottom">
                <button className="payment__btn">
                    {t.pay}
                    <span>{totalPrice.toLocaleString()} So'm</span>
                </button>
            </div>
        </div>
    );
};

export default Payment;
