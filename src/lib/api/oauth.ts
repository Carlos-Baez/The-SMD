import { toast } from 'sonner';

const OAUTH_CONFIG = {
  facebook: {
    clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
    scope: 'pages_show_list,pages_read_engagement,pages_manage_posts',
    redirectUri: `${window.location.origin}/auth/callback/facebook`,
  },
  twitter: {
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
    scope: 'tweet.read,tweet.write,users.read',
    redirectUri: `${window.location.origin}/auth/callback/twitter`,
  },
  instagram: {
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
    scope: 'instagram_basic,instagram_content_publish',
    redirectUri: `${window.location.origin}/auth/callback/instagram`,
  },
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    scope: 'r_organization_social,w_organization_social',
    redirectUri: `${window.location.origin}/auth/callback/linkedin`,
  },
  youtube: {
    clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/youtube.upload',
    redirectUri: `${window.location.origin}/auth/callback/youtube`,
  },
  tiktok: {
    clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID,
    scope: 'user.info.basic,video.list,video.upload',
    redirectUri: `${window.location.origin}/auth/callback/tiktok`,
  },
};

export type SocialPlatform = keyof typeof OAUTH_CONFIG;

export async function initializeOAuth(platform: SocialPlatform, businessId: string) {
  try {
    const config = OAUTH_CONFIG[platform];
    if (!config.clientId) {
      throw new Error(`${platform} client ID not configured`);
    }

    // Store state for validation
    const state = btoa(JSON.stringify({ businessId, platform }));
    sessionStorage.setItem('oauth_state', state);

    // Construct OAuth URL
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      response_type: 'code',
      state,
    });

    // Redirect to OAuth provider
    window.location.href = `${getProviderUrl(platform)}/oauth/authorize?${params}`;
  } catch (error) {
    console.error('OAuth initialization error:', error);
    toast.error(`Failed to connect to ${platform}`);
  }
}

function getProviderUrl(platform: SocialPlatform): string {
  switch (platform) {
    case 'facebook':
      return 'https://www.facebook.com/v18.0/dialog';
    case 'twitter':
      return 'https://twitter.com/i/oauth2';
    case 'instagram':
      return 'https://api.instagram.com/oauth';
    case 'linkedin':
      return 'https://www.linkedin.com/oauth/v2';
    case 'youtube':
      return 'https://accounts.google.com/o/oauth2/v2/auth';
    case 'tiktok':
      return 'https://www.tiktok.com/auth';
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}