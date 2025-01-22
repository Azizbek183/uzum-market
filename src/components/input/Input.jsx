import React, { useState } from 'react'
import axios from 'axios';
import "./input.css"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Key } from '@mui/icons-material';

function Input() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
  
    const handleInputChange = async (e) => {
      const value = e.target.value;
      setSearchTerm(value);
  
      // Agar foydalanuvchi hech narsa kiritmasa, natijalarni tozalash
      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }
  
      try {
        // API chaqiruvini amalga oshirish
        const response = await axios.get(`https://magazin-bot-backend.vercel.app/api/getall`);
  
        // Ma'lumotlarni filtrlagan holda olish
        const filteredData = response.data.filter((item) =>
          item.nameproduct.toLowerCase().includes(value.toLowerCase())
        );
  
        // Filtrlangan natijalarni o'rnatish
        setSearchResults(filteredData);
  
      } catch (error) {
        console.error("Ma'lumotlarni olishda xato", error);
      }
    };
    const handleProductSelect=(product)=>{
        navigate(`/product/${product._id}`);
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className="input__wrapper">
        <div className="input__container">
            <input type="text"
             placeholder='Искать товары и категории' 
             value={searchTerm}
             onChange={handleInputChange}
             />
            <button>
               <SearchIcon sx ={{fontSize:27}} />
            </button>
        </div>
        {searchResults.length > 0 &&(
            <div className="search-results">
                {searchResults.map((item)=>(
                    <div
                    key={item._id}
                    className='search-result-item'
                    onClick={()=>handleProductSelect(item)}
                    >
                        <p className='product-name'>{item.nameproduct}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}

export default Input