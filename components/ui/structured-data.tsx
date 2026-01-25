import Script from "next/script"

interface StructuredDataProps {
  data: Record<string, unknown>
}

/**
 * Component to add JSON-LD structured data for SEO
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Generate Organization structured data for Fountain Vitality
 */
export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fountain Vitality",
    url: "https://www.fountain.net",
    logo: "https://www.fountain.net/logo.png",
    description: "Leading provider of concierge online TRT and HRT treatments, delivering expert care directly to members' doorsteps.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2064 Park St",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32204",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.fountain.net",
    ],
  }
}

/**
 * Generate WebSite structured data
 */
export function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fountain Vitality Onboarding Portal",
    url: process.env.NEXTAUTH_URL || "https://fountainvitality.com",
    description: "Employee onboarding portal for Fountain Vitality team members",
    publisher: {
      "@type": "Organization",
      name: "Fountain Vitality",
    },
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function getBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}


