import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialPlatform } from "@/types/business";
import { initializeOAuth } from "@/lib/api/oauth";

interface CompactSocialConnectionsProps {
  platforms: SocialPlatform[];
  businessId: string;
}

const PLATFORM_ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
};

export function CompactSocialConnections({
  platforms,
  businessId,
}: CompactSocialConnectionsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Connect Platforms</h4>
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform, index) => {
          const Icon = PLATFORM_ICONS[platform.type];
          return (
            <motion.div
              key={platform.type}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={platform.connected ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() =>
                  !platform.connected &&
                  initializeOAuth(platform.type, businessId)
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span className="text-xs">
                  {platform.connected
                    ? "Connected"
                    : `Connect ${platform.type}`}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
