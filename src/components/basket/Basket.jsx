import React, { useState, useEffect } from 'react';
import "./basket.css";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';

const Basket = () => { 
    const [cartItems, setCartItems] = useState([]); // "cartItems" o'zgaruvchisi - savatchadagi mahsulotlar
    const [selectedItems, setSelectedItems] = useState([]); // "selectedItems" o'zgaruvchisi - tanlangan mahsulotlar
    const [isAddOpen, setIsAddOpen] = useState(false); // Moddiy oynani ko'rsatish yoki yashirish uchun o'zgaruvchi

    // Savatdagi mahsulotlarni localStorage'dan o'qish va 'cartItems' holatiga o'rnatish
    useEffect(() => { 
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        const selected = JSON.parse(localStorage.getItem("selectedItems")) || []; // tanlangan mahsulotlarni yuklash
        setCartItems(items);
        setSelectedItems(selected);
    }, []);

    // Mahsulotni o'chirish funksiyasi
    const handleDeleteItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id); // Tanlangan mahsulotni filtrlash
        const updatedSelected = selectedItems.filter(selectedId => selectedId !== id); // Tanlangan mahsulotni ham filtrlash
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Mahsulotlarni localStorage'ga saqlash
        localStorage.setItem("selectedItems", JSON.stringify(updatedSelected)); // Tanlangan mahsulotlarni saqlash
        setCartItems(updatedCart); // 'cartItems' holatini yangilash
        setSelectedItems(updatedSelected); // 'selectedItems' holatini yangilash
    };

    // Mahsulotning miqdorini yangilash funksiyasi
    const handleUpdateQuantity = (id, change) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + change } : item // Miqdorni oshirish yoki kamaytirish
        ).filter(item => item.quantity > 0); // Miqdori nol yoki kam bo'lsa, mahsulotni olib tashlash

        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Yangilangan savatni saqlash
        setCartItems(updatedCart); // 'cartItems' holatini yangilash
    };

    // Barcha mahsulotlarni tanlash yoki tanlovni bekor qilish funksiyasi
    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]); // Barcha tanlovni bekor qilish
            localStorage.setItem("selectedItems", JSON.stringify([])); // Tanlovni localStorage'dan o'chirish
        } else {
            const allIds = cartItems.map(item => item.id);
            setSelectedItems(allIds); // Barcha mahsulotlarni tanlash
            localStorage.setItem("selectedItems", JSON.stringify(allIds)); // Barcha tanlangan mahsulotlarni saqlash
        }
    };

    // Maxsus mahsulotni tanlash funksiyasi
    const handleSelectItem = (id) => {
        const updatedSelectedItems = selectedItems.includes(id)
            ? selectedItems.filter(selectedId => selectedId !== id) // Tanlovni olib tashlash
            : [...selectedItems, id]; // Tanlovni qo'shish

        setSelectedItems(updatedSelectedItems); // 'selectedItems' holatini yangilash
        localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems)); // Yangilangan tanlovni saqlash
    };

    // Filtrlangan mahsulotlarning umumiy narxini hisoblash (faqat tanlangan mahsulotlar uchun)
    const totalOriginalPrice = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price * item.quantity, 0); // Asl narxlar     
    const totalDiscountedPrice = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + (item.price * 0.9) * item.quantity, 0); // Chegirma bilan narxlar
    const totalSavings = totalOriginalPrice - totalDiscountedPrice; // Tejangan pul

    return (
        <div className="basket__container">
            <div className="basket__left">
                <div className="basket__total-count-all">
                    <p className="basket__product-count">
                        Savatingizda, <span className='basket__title'>
                            {[...new Set(cartItems.map(item => item.id))].length} mahsulot
                        </span>
                    </p>
                </div>
                <div className="basket__card">
                    <div className="basket__checkbox-all">
                        <input
                            type="checkbox"
                            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                            onChange={handleSelectAll}
                        />
                        <p onClick={handleSelectAll}>
                            {selectedItems.length === cartItems.length ? "Hammasini tanlashni bekor qilish" : "Hammasini tanlash"}
                        </p>
                    </div>
                    {cartItems.length === 0 ? (
                        <p>Savat bo'sh</p> // Agar savat bo'sh bo'lsa
                    ) : (
                        cartItems.map(item => (
                            <div className="basket__wrapper" key={item.id}>
                                <div className="basket__product-img">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="basket__product-info">
                                    <div className="basket__product-name">
                                        <p>{item.name}</p>
                                        <button
                                            className="basket__btn-delete"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            <DeleteIcon />
                                            O'chirish
                                        </button>
                                    </div>
                                    <div className="basket__total">
                                        <Link className="basket__count-product">
                                            <button onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
                                        </Link>
                                        <div className="basket__price">
                                            <p>{item.price * item.quantity} so'm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="basket__big-right">
                <div className="basket__right">
                    <div className="basket__right-title">
                        <p>Sizning buyurtmangiz</p>
                    </div>
                    <div className="basket__right-total-price">
                        <p>Mahsulotlar</p>
                        <span>{totalOriginalPrice.toLocaleString()} so'm</span>
                    </div>
                    <div className="basket__right-total-all">
                        <p>Jami:</p>
                        <div className="basket__right-sale">
                            <p>{totalDiscountedPrice.toLocaleString()} so'm</p>
                            <span>Siz {totalSavings.toLocaleString()} so'm tejadingiz</span>
                        </div>
                    </div>
                    <Link
                        to="/placing-order"
                        className="basket__registration-btn"
                        onClick={() => {
                            const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
                            localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
                        }}
                    >
                        Buyurtma berishga o'tish
                    </Link>
                </div>
                <div className="basket__delivery-free">
                    <div className="basket__delivery-free-card">
                        <div className="basket__delivery-box">
                            <p>
                                Biz bepul yetkazib beramiz
                                {totalDiscountedPrice >= 100000 && " va kuryer orqali"}
                            </p>
                            <span>
                                {totalDiscountedPrice < 100000 ? 
                                    `Bepul yetkazib berish uchun ${Math.max(100000 - totalDiscountedPrice, 0).toLocaleString()} so'm qolgan` 
                                    : "Yetkazib berish bepul"}
                            </span>
                        </div>
                        <HelpIcon onClick={() => setIsAddOpen(true)} />

                        {/* Modal oynasi */}
                        {isAddOpen && (
                            <div className='modal'>
                                <div className="modal-content">
                                    <span className='close' onClick={() => setIsAddOpen(false)}>&times;</span>
                                    <div className="modal__window">
                                        <p>Bepul yetkazib beramiz</p>
                                        <span>2 500 so'mdan ortiq buyurtma qiling, biz uni sizga qulay nuqtada bepul yetkazib beramiz</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="basket__progress-bar">
                        <div className="basket__progress-line" style={{ width: `${Math.min((totalDiscountedPrice / 100000) * 100, 100)}%` }} />
                        <div className="basket__price-delivery">
                            <div className="basket__price-delivery-box">
                                <p>25 000 so'm</p>
                                <LocationOnIcon sx={{ color: "#01AD3B", width: 20 }} />
                            </div>
                            <div className="basket__price-delivery-ticket">
                                <span>1 000 000 so'm</span>
                                <HomeIcon sx={{ color: "gray", width: 20 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;
