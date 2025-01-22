import React from "react";
import { Navbar, Home,Footer ,InfoProduct, Basket, PlacingOrder,Payment,Favorites,Cabinet } from '../components/'
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return (
        <>
        <Navbar/>
        <div className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<InfoProduct/>} />
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/placing-order" element={<PlacingOrder/>} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/favorites" element={<Favorites/>} />
                <Route path="/cabinet" element={<Cabinet/>} />
            </Routes>
            <Footer />
        </div>
        </>
    )
}

export default AppRoutes