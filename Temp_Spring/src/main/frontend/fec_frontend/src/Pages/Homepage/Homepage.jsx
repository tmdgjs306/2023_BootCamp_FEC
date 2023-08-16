
import '../../Components/Homepage/Homepage.css';

import AboutProject from '../../Components/Homepage/AboutProject';
import AboutUs from '../../Components/Homepage/AboutUs';
import Hero from '../../Components/Homepage/Hero';
import Header from '../../Components/Homepage/Header';
import Footer from '../../Components/Homepage/Footer';


function Homepage() {
    return (
        <div>
            <Header />
            <Hero />
            <AboutProject />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default Homepage
