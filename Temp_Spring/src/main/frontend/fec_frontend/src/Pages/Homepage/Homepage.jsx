import React, { useState, useEffect } from 'react';
import '../../Components/Homepage/Homepage.css'; // Import your CSS file
import Loading from '../OtherPages/Loading'; // Adjust the import path based on your project structure
import AboutProject from '../../Components/Homepage/AboutProject';
import AboutUs from '../../Components/Homepage/AboutUs';
import Hero from '../../Components/Homepage/Hero';
import Header from '../../Components/Homepage/Header';
import Footer from '../../Components/Homepage/Footer';

function Homepage() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading behavior with useEffect
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 4000); // Simulate 4 seconds of loading
    }, []);

    if (isLoading) {
        return <Loading />; // Show the loading component while loading
    }

    return (
        <div>
            <Header />
            <Hero />
            <AboutProject />
            <AboutUs />
            <Footer />
        </div>
    );
}

export default Homepage;
