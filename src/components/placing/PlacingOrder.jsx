// React va boshqa zarur modullarni import qilish
import React, { useState, useEffect } from "react";
import "./placing-order.css"; // CSS stilini import qilish
import Select from "react-select"; // Quymadan tanlov komponentasini qo'shish
import CheckIcon from "@mui/icons-material/Check"; // Ikonalar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// Tasvirlar va yo'naltiruv kitobxonalarini import qilish
import uzumBank from "../../assets/uzum_bank_logo.webp";
import humoCard from "../../assets/humo-logo-more.png";
import uzCard from "../../assets/Uzcard_Logo_-3.png";
import masterCard from "../../assets/master-card.png";
import { Link } from "react-router-dom";

// Asosiy komponent – PlacingOrder
const PlacingOrder = ({ selectedProducts: initialSelectedProducts }) => {
     // State – hozirgi holatni boshqarish uchun
     const [selectedCity, setSelectedCity] = useState(null); // Tanlangan shahar
     const [storedProducts, setStoredProducts] = useState(initialSelectedProducts || []); // Saqlangan mahsulotlar
     const [isModalOpen, setIsModalOpen] = useState(false); // Modal oyna holati

     // Shahar tanlash uchun variantlar
     const citiesOptions = [
          { value: "namangan", label: "Namangan" },
          { value: "andijan", label: "Andijon" },
          { value: "fergana", label: "Farg'ona" },
          { value: "tashkent", label: "Toshkent" },
     ];

     // Shaharni o'zgartirish funksiyasi
     const handleChange = (selectedOption) => {
          setSelectedCity(selectedOption); // Tanlangan shaharga o'rnatish
          console.log("Tanlangan shahar:", selectedOption);
     };

     // LocalStorage orqali mahsulotlarni yuklash
     useEffect(() => {
          const storedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
          setStoredProducts(storedProducts); // Ma'lumotlarni hozirgi holatga qo'shish
     }, []);

     // Modal oyna holatini o'zgartirish
     const toggleModal = () => {
          setIsModalOpen(!isModalOpen); // Yopish/ochish
     };

     // Yana bir modal oyna uchun state
     const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);         

     // Promokod modal oynasini ochish/yopish
     const togglePromoModal = () => {
          setIsPromoModalOpen(!isPromoModalOpen);
     };

     // Natijalarni hisoblash
     const totalItems = storedProducts.reduce((total, product) => total + product.quantity, 0);
     const totalPrice = storedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

     // Saqlangan totalPrice ni localStorage ga joylash
     useEffect(() => {
          localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
     }, [totalPrice]);


     return (
      <div className="placing__order-container">
           <div className="placing__order-title">
                <p>Buyurtmani rasmiylashtirish</p>
           </div>
           <div className="placing__order-card">
                <div className="placing__order-left">
                     <div className="placing__order-address">
                          <p className="placing__recipient-title">Olish usuli va yetkazib berish manzili:</p>
                          <label htmlFor="city-select">Yetkazib berish shahri</label>
                          <Select
                               id="city-select"
                               options={citiesOptions}
                               value={selectedCity}
                               onChange={handleChange}
                               placeholder="Shaharni tanlang"
                               styles={{
                                    control: (base) => ({
                                         ...base,
                                         width: 400,
                                         borderRadius: "8px",
                                         border: "1px solid #ccc",
                                         padding: "2px",
                                         boxShadow: "none",
                                         "&:hover": {
                                              border: "1px solid #aaa",
                                         },
                                         backgroundColor: "#F5F7FA",
                                    }),
                                    menu: (base) => ({
                                         ...base,
                                         borderRadius: "8px",
                                    }),
                                    option: (base, { isFocused, isSelected }) => ({
                                         ...base,
                                         backgroundColor: isSelected
                                              ? "transparent"
                                              : isFocused
                                                   ? "#F5F7FA"
                                                   : "white",
                                         color: isFocused || isSelected ? "#333" : "#000",
                                         "&:active": {
                                              backgroundColor: "#F5F7FA",
                                         },
                                    }),
                               }}
                          />

                          <label>Olish usuli</label>
                              <div className="placing__order-address-box">
                                   <input type="radio" name="delivery-method" id="radio1" className="styled-radio" />
                                   <label htmlFor="radio1">
                                        <div className="placing__order-address-box-title">
                                             <p>Uzumning yetkazib berish punkti</p>
                                             <span>11-dekabrda yetkazamiz, <b>bepul</b></span>
                                             <div className="check__box">
                                                  {[ 
                                                       "Buyurtma saqlash muddati – 5 kun",
                                                       "Tezda qaytarish",
                                                       "Maxsulotni qaytarish oson va muammosiz"
                                                  ].map((text, index) => (
                                                       <div className="placing__check" key={index}>
                                                            <CheckIcon sx={{ color: "#00AD65", fontSize: "20px" }} />
                                                            <span>{text}</span>
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>
                                   </label>
                              </div>

                              <div className="placing__order-address-box">
                                   <input type="radio" name="delivery-method" id="radio2" className="styled-radio" />
                                   <label htmlFor="radio2">
                                        <div className="placing__order-address-box-title">
                                             <p>Kur'er bilan eshikka yetkazib berish</p>
                                             <span>10-dekabrda yetkazamiz, 30 000 so'm</span>
                                             <b>Kur'er buyurtmangizni olib kelib, yetkazib berish vaqti haqida telefon qilib xabar beradi</b>
                                        </div>
                                   </label>
                              </div>

                              <div className="placing__home">
                                   <div className="placing__home-title">
                                        <HomeOutlinedIcon />
                                        <div className="placing__home-txt">
                                             <p>Manzilingizga kur'er bilan yetkazib berish</p>
                                             <span>Yetkazib berish manzilini xarita orqali ko'rsatib bering</span>
                                        </div>
                                   </div>
                                   <button>Tanlash</button>
                              </div>
                         </div>

                         <div className="placing__recipient-container">
                              <p className="placing__recipient-title">Buyurtmani olish:</p>
                              <div className="placing__recipient-form">
                                   {["Familiya", "Ism", "Telefon raqami"].map((field, index) => (
                                        <div className="placing__recipient-inp" key={index}>
                                             <label>{field}</label>
                                             <input type="text" />
                                        </div>
                                   ))}
                              </div>
                              <span>
                                   Biz buyurtma holatini telefon raqamingizga yuboramiz.
                                   <br />
                                   Kur'er siz bilan telefon orqali bog'lanib, yetkazib berish vaqtini aniqlaydi.
                              </span>
                              <div className="placing__recipient-check">
                                   <input type="checkbox" id="custom-checkbox" />
                                   <label htmlFor="custom-checkbox"></label>
                                   <span>
                                        Yangi yangiliklar va aksiyalarga obuna bo'lish. Siz yangiliklar, aksiyalar va chegirmalar haqida birinchi bo'lib bilib olasiz.
                                   </span>
                              </div>
                         </div>

                         <div className="deleviry__basket-product">
                              <div className="deleviry__product-title" onClick={toggleModal}>
                                   <p className="placing__recipient-title">Yetkazib beramiz:</p>
                                   {isModalOpen ? (
                                        <KeyboardArrowUpOutlinedIcon />
                                   ) : (
                                        <KeyboardArrowDownOutlinedIcon />
                                   )}
                              </div>
                              {isModalOpen && (
                                   storedProducts.length > 0 ? (
                                        storedProducts.map(product => (
                                             <div className="deleviry__product-box" key={product.id}>
                                                  <img src={product.img} alt={product.name} />
                                                  <div className="deleviry-product-info">
                                                       <p>{product.name}</p>
                                                       <div className="deveviry-product-price">
                                                            <span>Son: {product.quantity}</span>
                                                            <span>Narx: {product.price * product.quantity} so'm</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        ))
                                   ) : (
                                        <p>Hech qanday mahsulot tanlanmagan.</p>
                                   )
                              )}
                         </div>

                         <div className="deleviry__payment-method">
                              <p className="placing__recipient-title">Buyurtma to'lovi:</p>
                              <div className="deleviry__payment-method-box">
                                   <input type="radio" name="" id="" />
                                   <div className="deleviry__payment-method-ticket">
                                        <div className="deleviry__payment-method-ticket-title">
                                             <img src={uzumBank} alt="" />
                                             <p>Uzum bank</p>
                                        </div>
                                        <span>
                                             Uzum Bank ilovasiga yo'naltiramiz, u yerda buyurtmani to'lash imkonini beradi.
                                        </span>
                                   </div>
                              </div>

                              <div className="deleviry__payment-method-box">
                                   <input type="radio" name="" id="" />
                                   <div className="deleviry__payment-method-ticket">
                                        <div className="deleviry__payment-method-ticket-title">
                                             <img src={uzumBank} alt="" />
                                             <span> Uzum kartasi bilan</span>
                                        </div>
                                        <span>
                                             Hozirgi paytda Uzum Bank ilovasida kartangizni olish va buyurtmani to'lash mumkin
                                        </span>
                                   </div>
                              </div>

                              <div className="deleviry__payment-method-box">
                                   <input type="radio" name="" id="" />
                                   <div className="deleviry__payment-method-ticket">
                                        <div className="deleviry__payment-method-ticket-title">
                                             <span>Onlayn kartalar bilan to'lash</span>
                                        </div>
                                        <span>
                                             UZCARD, HUMO, Visa, MasterCard
                                        </span>
                                        <div className="deleviry__paymnet-method-card">
                                             <img src={uzumBank} alt="" />
                                             <img src={humoCard} alt="" />
                                             <img src={uzCard} alt="" />
                                             <img src={masterCard} alt="" />
                                        </div>
                                   </div>
                              </div>

                              <div className="deleviry__payment-method-box">
                                   <LockOutlinedIcon />   
                                   <div className="deleviry__payment-method-ticket">
                                        <div className="deleviry__payment-method-ticket-title">
                                             <span>Uzum Nasiya orqali to'lash</span>
                                        </div>
                                        <b>
                                             Hozirda nasiya mavjud emas – sizning verifikatsiyangizni tasdiqlash kerak
                                        </b>
                                   </div>
                              </div>
                              
                              <div className="deleviry__payment-method-box">
                                   <LockOutlinedIcon />   
                                   <div className="deleviry__payment-method-ticket">
                                        <div className="deleviry__payment-method-ticket-title">
                                             <span>Yetkazib olishda to'lash</span>
                                        </div>
                                        <pre>
                                             Ba'zi mahsulotlar uchun ushbu to'lov usuli ishlamaydi – boshqa usulni tanlang
                                        </pre>
                                        <div className="deleviry__paymnet-method-card">
                                             <span>Qo'shimcha ma'lumot</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                       </div>
                       <div className="placing__order-right">
                            <div className="placing__order-title">
                                 <p className="placing__recipient-title">Sizning buyurtmangiz</p>
                                 <Link>Savatchaga o'tish</Link>
                            </div>
                            <div className="placing__order-goods">
                                 <span>Mahsulotlar ({totalItems} dona)</span>
                                 <span>{totalPrice.toLocaleString()} so'm</span>
                            </div>
                            <div className="placing__order-goods">
                                 <span>Yetkazib berish:</span>
                                 <span>bepul</span>
                            </div>
                            <div className="placing__order-goods">
                                 <span>Jami:</span>
                                 <p>{totalPrice.toLocaleString()} so'm</p>
                            </div>
                            <div className="placing__order-promotional-code">
                                 <button onClick={togglePromoModal}>Promokodni kiriting</button>
                            </div>
                            {isPromoModalOpen && (
                                 <div className="placing__order-promotional-code-box">
                                      <input type="text" placeholder="Promokod" />
                                      <button>Qo'llash</button>
                                 </div>
                            )}
                            <div className="placing__order-btn">
                                 <button>Buyurtmani tasdiqlash</button>
                            </div>
                       </div>
                  </div>
              </div>
         );
}

export default PlacingOrder;
