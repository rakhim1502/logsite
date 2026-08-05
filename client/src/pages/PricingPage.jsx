import Pricing from '../components/home/Pricing';
import SEO from '../components/SEO';

const PricingPage = () => {
    return (
        <>
            <SEO
                title="Narxlar - Log.Site"
                description="Starter, Business, Premium va Enterprise paketlari. Shaffof narxlar, yashirin to'lovlar yo'q."
                url="https://log.site/pricing"
            />

            <div className="pt-20">
                <Pricing />
            </div>
        </>
    );
};

export default PricingPage;