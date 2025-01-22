import React from 'react'
import { SimpleSlider, Product, Category, Footer } from '..'
import "./home.css"

function Home() {
  return (
    <div className="home__container">
      <SimpleSlider />
      <Category />
      <Product />
    </div>
  )
}

export default Home