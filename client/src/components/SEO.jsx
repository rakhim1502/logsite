import { useEffect } from 'react';

const SEO = ({
    title = 'Log.Site - Professional Web Agency',
    description = 'Biznesingiz uchun professional web-saytlar. Landing page, corporate website, e-commerce va boshqa xizmatlar.',
    keywords = 'web agency, website, landing page, e-commerce, SEO, O\'zbekiston, Toshkent',
    image = '/og-image.jpg',
    url = '',
    type = 'website'
}) => {
    useEffect(() => {
        // Title
        document.title = title;

        // Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'description';
            newMeta.content = description;
            document.head.appendChild(newMeta);
        }

        // Meta Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords);
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'keywords';
            newMeta.content = keywords;
            document.head.appendChild(newMeta);
        }

        // Open Graph
        const ogTags = {
            'og:title': title,
            'og:description': description,
            'og:image': image,
            'og:url': url || window.location.href,
            'og:type': type,
            'og:site_name': 'Log.Site'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            const meta = document.querySelector(`meta[property="${property}"]`);
            if (meta) {
                meta.setAttribute('content', content);
            } else {
                const newMeta = document.createElement('meta');
                newMeta.setAttribute('property', property);
                newMeta.setAttribute('content', content);
                document.head.appendChild(newMeta);
            }
        });

        // Twitter Card
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': title,
            'twitter:description': description,
            'twitter:image': image
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            const meta = document.querySelector(`meta[name="${name}"]`);
            if (meta) {
                meta.setAttribute('content', content);
            } else {
                const newMeta = document.createElement('meta');
                newMeta.setAttribute('name', name);
                newMeta.setAttribute('content', content);
                document.head.appendChild(newMeta);
            }
        });

        // Canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', url || window.location.href);
        } else {
            const newLink = document.createElement('link');
            newLink.rel = 'canonical';
            newLink.href = url || window.location.href;
            document.head.appendChild(newLink);
        }

        // Schema.org JSON-LD
        const schema = {
            '@context': 'https://schema.org',
            '@type': type === 'website' ? 'WebSite' : 'WebPage',
            'name': 'Log.Site',
            'description': description,
            'url': url || window.location.href,
            'logo': 'https://log.site/logo.png',
            'sameAs': [
                'https://t.me/logsite',
                'https://instagram.com/logsite',
                'https://facebook.com/logsite'
            ]
        };

        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            existingSchema.remove();
        }

        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.text = JSON.stringify(schema);
        document.head.appendChild(schemaScript);

    }, [title, description, keywords, image, url, type]);

    return null;
};

export default SEO;