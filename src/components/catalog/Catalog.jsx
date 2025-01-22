import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./catalog.css"


const Catalog = ({isModalOpen,toggleModal}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setselectedCategory] = useState([null]);

    useEffect(()=>{
        if (isModalOpen){
            axios.get('https://magazin-bot-backend.vercel.app/api/getall')
             .then((response) => {
                 setData(response.data);
                 setFilteredData(response.data);
             })
             .catch(error => console.error('Malumotlarni ishlashida xatolik', error));
        }
    }, [isModalOpen]);
    
    const handleCategoryClick= (category) => {
        setselectedCategory(category);
        if (category){ 
            setFilteredData(data.filter(item => item.titleProduct === category));
        } else {
            setFilteredData(data)
        } 
    };
  return (
    <div>
        { isModalOpen && (
            <div className="catalog__modal">

                <div className="catalog__sidebar">
                    <button onClick={()=> handleCategoryClick(null)}>Barcha kategoriyalar</button>
                    {data.map((item,index)=>(
                        
             <button 
             key={index}
             onClick={() => handleCategoryClick(item.titleProduct)} 
             className={selectedCategory === item.titleProduct ? 'active' : ''}
           >
            <img src={item.swiperuchun} alt=''/>
            {item.titleProduct}
 </button>
                    ))}
                </div>

                <ul className="modal__menu">
                    {filteredData.map((item,index) =>(
                        <li key={index}>
                            <Link to={`/product/${item._id}`} onClick={toggleModal}>
                            {item.nameproduct}
                            </Link>
                        </li>
                        
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default Catalog