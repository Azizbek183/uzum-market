import React, { useEffect, useState } from 'react'
import './favorite.css';
import "../product/product.css"
import FavoriteIcon from "@mui/icons-material/Favorite";




const Favorites = () => {
  const [favorites, setFavorites] = useState([]);// izbrangan mahsulotlar
  //izbrangan mahsulotlarni localstoragedan yuklash, komponent montirlanganida
  useEffect(()=>{
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites); //xolatni yangilash 
  },[]);
  //izbrangan mahsulotni ochirish funksiyasi 
  const removeFavorite=(product) =>{
    const updatedFavorites =favorites.filter((item)=>item._id !== product._id);
    //xolatni yangilash va localstoragega saqlash
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  return (
    <div className='favorites__container'>
      <div className="favorites__title">
        <p>Mening istaklarim</p> {/* sarlavha */}
      </div>
      <div className="favorites__card">
        {favorites.length > 0 ? (
          favorites.map((item) => {
            // malumotlar ustida xisoblashlar
            const discountedPrice = Math.floor(item.price * 0.9); // 10% chegirma
            const installmentPrice = Math.floor(discountedPrice / 12); // 12 oylik chegirma
            return (
              <div key={item.id} className='product__card'>
                <div className="image-container">
                  <img src={item.img[0]} alt={item.nameproduct} className='product-image' />
                  <div className="favorite__icon favorited" onClick={() => removeFavorite(item)}>
                    <FavoriteIcon sx={{ color: "#7f4dff" }} />
                  </div>
                </div>
                <div className="product__info">
                  <p>{item.nameproduct}</p>
                  <p className='product__installment-price'>
                    {installmentPrice} сум/мес
                  </p>
                  <p className='product__original-price'>{item.price}
                    som
                  </p>
                  <p className='product__discount-price'>
  {discountedPrice} som
</p>

                </div>
              </div>
            );
          })
        ) : (
          <p>Hech bir sevimli mahsulot topilmadi.</p> // Agar sevimli mahsulotlar bo'lmasa
        )}
      </div>
    </div>
  );
}  


export default Favorites