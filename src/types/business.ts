export type BusinessType =
  | "retail"
  | "restaurant"
  | "ecommerce"
  | "professional"
  | "health"
  | "technology"
  | "creative"
  | "nonprofit"
  | "education"
  | "entertainment"
  | "other";

export interface Business {
  id: string;
  name: string;
  description: string;
  businessType: BusinessType;
  logoUrl?: string; // URL for the logo if stored remotely
  logo?: File | null; // Add 'logo' for form usage (File type for uploads)
  createdAt: Date;
  updatedAt: Date;
  connectedPlatforms: SocialPlatform[];
}

export type SocialPlatform = {
  id: string;
  type:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "tiktok"
    | "youtube";
  connected: boolean;
  accountName?: string;
  lastSync?: Date;
};
