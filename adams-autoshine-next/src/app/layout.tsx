import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { getContent } from "@/lib/content";
import type { SEOData, ContactData, FooterData } from "@/lib/admin-types";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getContent("seo") as SEOData;

  return {
    metadataBase: new URL("https://www.adamsautoshine.com"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Adams Autoshine" }],
    robots: "index, follow",
    alternates: {
      canonical: "https://www.adamsautoshine.com/",
    },
    openGraph: {
      type: "website",
      url: "https://www.adamsautoshine.com/",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [{ url: seo.ogImage }],
      locale: "en_US",
      siteName: "Adams Autoshine",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
    },
    icons: {
      icon: "/images/logo.png",
    },
    other: {
      "geo.region": "US-OK",
      "geo.placename": "Enid",
      "geo.position": "36.3956;-97.8783",
      ICBM: "36.3956, -97.8783",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContent("contact") as ContactData;
  const footerData = await getContent("footer") as FooterData;
  const faqs = await getContent("faqs");

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: "Adams Autoshine",
              description:
                "Professional car detailing, ceramic coating, paint correction, and auto wash services in Enid, Oklahoma.",
              url: "https://www.adamsautoshine.com",
              telephone: contact.phone,
              email: contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: contact.address,
                addressLocality: "Enid",
                addressRegion: "OK",
                postalCode: "73701",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 36.3956,
                longitude: -97.8783,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "16:00",
                },
              ],
              priceRange: "$$",
              image: "https://www.adamsautoshine.com/images/og-image.jpg",
              sameAs: [
                contact.social?.facebook,
                contact.social?.instagram,
                contact.social?.google,
              ].filter(Boolean),
              areaServed: {
                "@type": "City",
                name: "Enid",
                containedInPlace: {
                  "@type": "State",
                  name: "Oklahoma",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Car Detailing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Basic Shine Package",
                      description:
                        "Exterior hand wash, tire shine, window cleaning, and air freshener.",
                    },
                    price: "79.99",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Premium Detail Package",
                      description:
                        "Full exterior wash plus complete interior detailing, leather conditioning, and dashboard treatment.",
                    },
                    price: "149.99",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Ultimate Package",
                      description:
                        "Complete interior and exterior detailing with clay bar treatment, paint sealant, and engine bay cleaning.",
                    },
                    price: "249.99",
                    priceCurrency: "USD",
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: (Array.isArray(faqs) ? faqs : []).slice(0, 5).map(
                (faq: { question: string; answer: string }) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })
              ),
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header phone={contact.phone} phoneHref={contact.phoneHref} />
        {children}
        <Footer contactData={contact} footerData={footerData} />
        <BackToTop />
      </body>
    </html>
  );
}
