/**
 * Site Configuration & Firm Metadata
 * Pradyumna Law Associates
 */
export const siteConfig = {
  firmName: "Pradyumna Law Associates",
  shortName: "PLA",
  founder: "Advocate Pradyumna Tyagi",
  tagline: "Strategic Courtroom Advocacy. Institutional Legal Counsel.",
  jurisdiction: "Supreme Court of India | High Court of Delhi | NCLT / NCLAT | Appellate Tribunals",
  
  appointments: [
    "Central Govt. Counsel (Panel), Supreme Court of India",
    "Addl. Standing Counsel, High Court of Delhi",
    "Panel Counsel, Municipal Corporation of Delhi (MCD)",
    "Panel Counsel, NBCC (India) Limited (Navratna CPSE)",
    "Panel Counsel, Punjab & Sind Bank"
  ],

  education: [
    "Master of Laws (LL.M.) – Indian Law Institute (ILI), New Delhi",
    "Bachelor of Laws (LL.B.) – Campus Law Centre (CLC), University of Delhi",
    "B.Com – Shaheed Bhagat Singh College (SBSC), University of Delhi"
  ],

  experience: "10+ Years of Courtroom Litigation & Strategic Counsel",

  contact: {
    phone: import.meta.env.VITE_OFFICE_PHONE || "+919415000000",
    displayPhone: import.meta.env.VITE_OFFICE_PHONE_DISPLAY || "+91 (0) 94150 00000",
    email: "pradyumna.ptlo@gmail.com",
    secondaryEmail: "contact@pradyumnalaw.com",
    consultationEmail: "counsel@pradyumnalaw.com",
    whatsAppNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "919415000000",
    whatsAppDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "+91 94150 00000",
    officeAddress: {
      line1: "50, First Floor, Todarmal Road",
      locality: "Bengali Market, Connaught Place",
      city: "New Delhi",
      pincode: "110001",
      country: "India"
    },
    hours: "Monday – Saturday: 09:30 AM – 07:30 PM",
    googleMapsUrl: "https://maps.google.com/?q=Bengali+Market+New+Delhi"
  },

  social: {
    linkedin: "https://www.linkedin.com/in/pradyumna-tyagi-001010111/",
    twitter: "https://twitter.com/pradyumnalaw"
  },

  disclaimer: "As per the rules of the Bar Council of India, law firms in India are not permitted to solicit work or advertise in any manner. This website is solely for the purpose of providing general information about Pradyumna Law Associates and does not constitute legal advice or create an advocate-client relationship."
};
