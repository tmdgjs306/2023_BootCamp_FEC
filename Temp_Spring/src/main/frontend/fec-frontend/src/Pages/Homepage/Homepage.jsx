// react
import React from 'react'
import './Homepage.css';
// pages
import { Header, Navbar, Hero, AboutProject, AboutUs, Footer } from "../../Components/Homepage";

function Homepage() {
    return (
        <div className='homepage'>
            <Header title="Home" />
            <Navbar />
            <Hero />
            <AboutProject />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default Homepage
