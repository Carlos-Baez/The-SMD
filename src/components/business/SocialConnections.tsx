import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialPlatform as SocialPlatformType } from '@/types/business';
import { initializeOAuth, SocialPlatform } from '@/lib/api/oauth';
import { toast } from 'sonner';

interface SocialConnectionsProps {
  platforms: SocialPlatformType[];
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
      width="24"
      height="24"
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

export function SocialConnections({
  platforms,
  businessId,
}: SocialConnectionsProps) {
  const handleConnect = async (platform: string) => {
    try {
      await initializeOAuth(platform as SocialPlatform, businessId);
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      toast.error(`Failed to connect to ${platform}`);
    }
  };

  const handleDisconnect = async (platform: string) => {
    try {
      // TODO: Implement disconnect logic with backend
      toast.success(`Disconnected from ${platform}`);
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error);
      toast.error(`Failed to disconnect from ${platform}`);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Connected Platforms</h4>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const Icon = PLATFORM_ICONS[platform.type];
          return (
            <Button
              key={platform.type}
              variant={platform.connected ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                platform.connected
                  ? handleDisconnect(platform.type)
                  : handleConnect(platform.type)
              }
            >
              <Icon className="mr-2 h-4 w-4" />
              {platform.connected ? 'Connected' : 'Connect'}
            </Button>
          );
        })}
      </div>
    </div>
  );
}