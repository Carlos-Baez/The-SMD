import * as z from "zod";

const socialPlatformSchema = z.object({
  id: z.string(),
  type: z.enum([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "tiktok",
    "youtube",
  ]),
  connected: z.boolean(),
  accountName: z.string().optional(),
  lastSync: z.date().optional(),
});

export const businessFormSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  businessType: z.enum([
    "retail",
    "restaurant",
    "ecommerce",
    "professional",
    "health",
    "technology",
    "creative",
    "nonprofit",
    "education",
    "entertainment",
    "other",
  ]),
  logo: z.any().optional(),
  connectedPlatforms: z.array(socialPlatformSchema),
});
