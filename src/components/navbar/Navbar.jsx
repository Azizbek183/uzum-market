import React, { useState } from 'react';
import "./navbar.css";
import logoUzum from "../../assets/Uzum-01.png";
import catalogIcon from "../../assets/icons8-документы-24.png";
import { Link, useLocation } from 'react-router-dom';
import { Input, Catalog,Login } from "../";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LockIcon from '@mui/icons-material/Lock';

const Navbar = () => {
  // Модал ойна очиқ ёки ёпиқлигини сақлаш учун ҳолат (state)  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false)
  // Модал ойна ҳолатини ўзгартириш функцияси 
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Ҳозирги йўлни (URL) олиш учун хук
  const location = useLocation();

  // Ҳозирги йўлни текшириб, `/placing-order` йўлида эканлигини аниқлаймиз
  const isPlacingOrderPage = location.pathname === '/placing-order';
 
  const handleAddClick = () => {
    setIsAddOpen(true)
  }

  const handleCloseAdd = () => {
    setIsAddOpen(false)
  }



  return (
    <div className="navbar__wrapper">
      <nav className="navbar__container">
        <div className="logo__project">
          {/* Ҳом йўлга ўтиш учун ссылка */}
          <Link to={"/"}>
            <img src={logoUzum} alt="Logo" />
          </Link>
        </div>

        {/* Бу блокни `/placing-order` йўлида кўрсатмаймиз */}
        {!isPlacingOrderPage && (
          <div className="nav__catalog-input">
            <div className="nav__catalog" onClick={toggleModal}>
              <img src={catalogIcon} alt="Catalog" />
              <span>Каталог</span>
            </div>
            <Input />
          </div>
        )}

        {/* Бу блокни `/placing-order` йўлида кўрсатмаймиз */}
        {!isPlacingOrderPage && (
          <div className="a__links">
            <Link className="a__link" onClick={handleAddClick}>
              <PersonOutlineOutlinedIcon />
              <span>Войти</span>
            </Link>
            {isAddOpen && <Login onClose={handleCloseAdd} />}

            <Link className="a__link" to={"/favorites"}>
              <FavoriteBorderOutlinedIcon />
              <span>Избранное</span>
            </Link>

            <Link className="a__link" to={"/basket"}>
              <LocalMallOutlinedIcon />
              <span>Корзина</span> 
            </Link>

          </div>
        )}


        {/* Бу блокни фақатгина `/placing-order` йўлида кўрсатамиз */}
        {isPlacingOrderPage && (
          <div className="navbar__placing">
            <Link>
              <LockIcon />
              Соединение защищено
            </Link>
            <Link>Правила возврата</Link>
            <Link>Служба поддержки</Link>
          </div>
        )}
      </nav>

      {/* Каталог компонент */}
      <Catalog isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Navbar;
