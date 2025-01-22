import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast, ToastContainer } from 'react-toastify';

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // Izlangan mahsulotlar

  // Komponent birinchi marta yuklanganida izlangan mahsulotlarni localStorage'dan olish
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);  
  }, []);

  // Mahsulotlar ro'yxatini olish
  useEffect(() => {
    axios.get('https://magazin-bot-backend.vercel.app/api/getall')
      .then((response) => {
        setProducts(response.data); // Javobni mahsulotlar ro'yxatiga saqlash
        setLoading(false); // Yuklash holatini yopish
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi", error);
        setLoading(false);
      });
  }, []);

  // Mahsulotni izlanganlarga qo'shish yoki olib tashlash
  const toggleFavorite = (product) => {
    let updatedFavorites = [...favorites]; // Mavjud izlanganlarni nusxalash
    const isAlreadyFavorite = updatedFavorites.some((item) => item._id === product._id); // Mahsulot izlanganlarda bor-yo'qligini tekshirish
    if (isAlreadyFavorite) {
      updatedFavorites = updatedFavorites.filter((item) => item._id !== product._id); // Agar bor bo'lsa, olib tashlash
    } else {
      updatedFavorites.push(product); // Agar yo'q bo'lsa, qo'shish
    }
    // Holatni va localStorage'ni yangilash
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // Izlangan mahsulotlar ro'yxatini yangilash
  };

  // Mahsulot izlanganmi yoki yo'qligini tekshirish
  const isFavorite = (productId) => favorites.some((item) => item._id === productId);

  const handleAddCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCartItem = {
      id: product._id,
      name: product.nameproduct,
      price: product.price,
      img: product.img[0],
      quantity: 1,
    };
    const isItemCart = cartItems.some(item => item.id === product._id);

    if (!isItemCart) {
      cartItems.push(newCartItem);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      toast.success("Mahsulot savatga qo'shildi");
    } else {
      toast.info('Mahsulot allaqachon savatda');
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="product__container">
      {loading ? ( // Agar mahsulotlar yuklanayotgan bo'lsa
        <p>Yuklanmoqda...</p>
      ) : (
        products.map((item) => {
          // Chegirma va oylik to'lovni hisoblash
          const discountedPrice = Math.floor(item.price * 0.9); // 10% chegirma
          const installmentPrice = Math.floor(discountedPrice / 12); // 12 oylik to'lov

          return (
            <div key={item._id} className="product__card" onClick={() => handleProductClick(item)}>
              {item.img && item.img.length > 0 ? (
                <div className="image-container">
                  <img src={item.img[0]} alt={item.nameproduct} className="product-image" />
                  <div 
                    className={`favorites__icon ${isFavorite(item._id) ? "favorited" : ""}`} 
                    onClick={(e) => {
                      e.stopPropagation(); // Boshqa hodisalarni to'xtatish
                      toggleFavorite(item); // Mahsulotni qo'shish yoki olib tashlash
                    }}
                  >
                    <FavoriteIcon sx={{ color: isFavorite(item._id) ? "#7000ff" : "gray" }} />
                  </div>
                </div>
              ) : (
                <p>Rasm mavjud emas</p>
              )}

              <div className="product__info">
                <p>{item.nameproduct}</p>
                <p className="product__installment-price">{installmentPrice} so'm/oy</p>
                <span className="product__original-price">{item.price}</span>

                <div className="product__basket">
                  <span className="product__discounted-price">
                    {discountedPrice} so'm
                  </span>
                  <button className='add-to-basket' onClick={(e) => {
                    e.stopPropagation();
                    handleAddCart(item);
                  }}>
                    <ShoppingBagOutlinedIcon sx={{ color: "black" }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
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
    </div>
  );
};

export default Product;
