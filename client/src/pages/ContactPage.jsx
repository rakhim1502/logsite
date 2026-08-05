import ContactSection from '../components/contact/ContactSection';
import SEO from '../components/SEO';

const ContactPage = () => {
    return (
        <>
            <SEO
                title="Kontakt - Log.Site"
                description="Biz bilan bog'laning. Bepul konsultatsiya oling. Telefon: +998 90 123 45 67, Email: info@log.site"
                url="https://log.site/contact"
            />

            <div className="pt-20">
                <ContactSection />
            </div>
        </>
    );
};

export default ContactPage;