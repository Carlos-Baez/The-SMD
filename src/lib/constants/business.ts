import { BusinessType } from "@/types/business";

export const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "retail", label: "Retail" },
  { value: "restaurant", label: "Restaurant/Cafe" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "professional", label: "Professional Services" },
  { value: "health", label: "Health & Wellness" },
  { value: "technology", label: "Technology/Software" },
  { value: "creative", label: "Creative Agency" },
  { value: "nonprofit", label: "Nonprofit/Charity" },
  { value: "education", label: "Education/Training" },
  { value: "entertainment", label: "Entertainment/Media" },
  { value: "other", label: "Other" },
];
