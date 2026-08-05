import Hero from '../components/home/Hero';
import Statistics from '../components/home/Statistics';
// import TrustedBy from '../components/home/TrustedBy';
import Services from '../components/home/Services';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Portfolio from '../components/home/Portfolio';
import Process from '../components/home/Process';
import Technologies from '../components/home/Technologies';
import Pricing from '../components/home/Pricing';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
// import Blog from '../components/home/Blog';
import ContactSection from '../components/contact/ContactSection';

const HomePage = () => {
    return (
        <>
            <Hero />
            <Statistics />
            {/* <TrustedBy /> */}
            <Services />
            <WhyChooseUs />
            <Portfolio />
            <Process />
            <Technologies />
            <Pricing />
            <Testimonials />
            <FAQ />
            {/* <Blog /> */}
            <ContactSection />
        </>
    );
};

export default HomePage;