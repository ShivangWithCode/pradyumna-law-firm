/**
 * Site Configuration & Firm Metadata
 * Pradyumna Law Associates
 */
export const siteConfig = {
  firmName: "Pradyumna Law Associates",
  shortName: "PLA",
  founder: "Pradyumna Tyagi",
  tagline: "Strategic Legal Counsel. Trusted Representation.",
  jurisdiction: "Supreme Court of India | High Court of Delhi | Allahabad & Lucknow Bench",
  
  appointments: [
    "Addl. Standing Counsel, High Court of Delhi",
    "Central Govt. Counsel, Supreme Court of India",
    "Panel Counsel, NBCC (India) Limited",
    "Panel Counsel, Punjab & Sind Bank, Delhi"
  ],

  contact: {
    phone: import.meta.env.VITE_OFFICE_PHONE || "+919415000000",
    displayPhone: import.meta.env.VITE_OFFICE_PHONE_DISPLAY || "+91 (0) 94150 00000",
    email: import.meta.env.VITE_CONTACT_EMAIL || "contact@pradyumnalaw.com",
    consultationEmail: import.meta.env.VITE_CONSULTATION_EMAIL || "counsel@pradyumnalaw.com",
    whatsAppNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "919415000000",
    whatsAppDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "+91 94150 00000",
    officeAddress: {
      line1: "Law Chambers",
      locality: "Delhi & Lucknow",
      city: "New Delhi / Lucknow",
      state: "Delhi & UP",
      country: "India"
    },
    hours: "Monday – Saturday: 09:30 AM – 07:30 PM",
    googleMapsUrl: "https://maps.google.com/?q=Delhi+High+Court"
  },

  social: {
    linkedin: "https://linkedin.com/in/pradyumna-tyagi",
    twitter: "https://twitter.com/pradyumnalaw"
  },

  disclaimer: "As per the rules of the Bar Council of India, law firms in India are not permitted to solicit work or advertise in any manner. This website is solely for the purpose of providing general information about Pradyumna Law Associates and does not constitute legal advice or create an advocate-client relationship."
};
