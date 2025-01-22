import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./info-product.css";
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import uzumBank from "../../assets/uzum_bank_logo.webp";
import humoCard from "../../assets/humo-logo-more.png";
import uzCard from "../../assets/Uzcard_Logo_-3.png";
import masterCard from "../../assets/master-card.png";

const InfoProduct = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get(`https://magazin-bot-backend.vercel.app/api/getall`)
      .then((response) => {
        const foundProduct = response.data.find((item) => item._id === id);
        setProduct(foundProduct);
      })
      .catch((error) => {
        console.error("Malumotlar yuklanishida xatolik:", error);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log("Product Images:", product.img);
    }
  }, [product]);

  const handleClick = () => {
    if (!isFavorited) {
      toast("Mahsulot savatga qoshildi");
    } else {
      toast("Mahsulot savatdan o'chirildi");
    }
    setIsFavorited(!isFavorited);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const newCartItem = {
      id: product._id,
      title: product.nameProduct,
      price: product.price,
      img: product.img[0],
      quantity: 1,
    };
    
    const isItemInCart = cartItems.some(item => item.id === product._id);
    if (!isItemInCart) {
      cartItems.push(newCartItem);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      toast("Mahsulot savatga qoshildi");
    } else {
         navigate("/basket");
    }
    setIsInCart(true);
  };

  return (
    <div className="product-page">
      {product ? (
        <div className="product-container">
          <div className="product__left">
            <h1 className="product-title">{product.nameProduct}</h1>
            <div className="product-image">
              <Swiper spaceBetween={10} slidesPerView={1}>
                {Array.isArray(product.img) ? (
                  product.img.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <img src={imageUrl} alt={product.nameProduct} />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img src={product.img} alt={product.nameProduct} />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <button className='btn__product-info'>
              Izoh
            </button>
            <li className="product-description">{product.productinfo}</li>
          </div>
          <div className="product__right">
            <div className="product__buy">
              <div className="product-prices">
                <p className='product-discount-price'>
                  Agar karta bilan to'lov qilinsa, Uzum:
                </p>
                <span className='product-discount-price-value'>
                  {Math.floor(product.price * 0.9)} Som
                </span>
                <p className='product-original-price'>{product.price}Som</p>
              </div>
              <div className="product-actions">
                <div className="btn__buy">
                  <button className='product-buy-now'>1 bosishda sotib olish</button>
                  <button className='btn__favorites' onClick={handleClick}>
                    {isFavorited ? (
                      <FavoriteBorderIcon sx={{fontSize: 27, color: "#7000ff"}} />
                    ) : (
                      <FavoriteBorderIcon sx={{fontSize: 27}} />
                    )}
                    <ToastContainer
                      position='bottom-right'
                      autoClose={3000}
                      hideProgressBar
                      closeOnClick
                      pauseOnHover
                      draggable
                      theme='dark'
                      closeButton={false}
                    />
                  </button>
                </div>
                <button className='product-add-to-cart' onClick={handleAddToCart}>
                  {isInCart ? "Savatchaga otish" : "Savatchaga qoshish"}
                </button>
              </div>
              <div className="stock__card">
                <button className="stock__btn">
                  <CheckIcon sx={{width: 20, color: "green"}} />
                </button>
                <p className='product-stock'>
                  Bor: {product.nechtaQolgani} donasi.
                </p>
              </div>
            </div>
            <div className="product__delivery">
              <div className="product__delivery-box">
                <p>Bir kunda yetkazib berish</p>
                <span>Uzum nuqtasi yoki kurer orqali olish</span>
              </div>
              <div className="product__delivery-box">
                <p>Xavfsiz tolov</p>
                <span>Karta, naqd pul yoki bo'lib-bo'lib to'lash orqali to'lov qiling</span>
                <div className="product__delivery-card">
                  <img src={uzumBank} alt="Uzum Bank" />
                  <img src={humoCard} alt="Humo Card" />
                  <img src={uzCard} alt="UzCard" />
                  <img src={masterCard} alt="MasterCard" />
                </div>
              </div>
              <div className="product__delivery-box">
                <p>Oddiy va tezkor qaytarish</p>
                <span>Mahsulotlarni 10 kun ichida qabul qilamiz va darhol pulni qaytaramiz. Batafsil</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Mahsulot topilmadi</p>
      )}
    </div>
  );
};

export default InfoProduct;
