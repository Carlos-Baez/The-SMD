import { useQuery } from '@tanstack/react-query';
import { Business } from '@/types/business';

// TODO: Replace with actual API call
const fetchBusinesses = async (): Promise<Business[]> => {
  // Simulated API call
  return Promise.resolve([
    {
      id: '1',
      name: 'Sample Business',
      description: 'A sample business description',
      businessType: 'retail',
      createdAt: new Date(),
      updatedAt: new Date(),
      connectedPlatforms: [
        { id: '1', type: 'facebook', connected: false },
        { id: '2', type: 'twitter', connected: false },
        { id: '3', type: 'instagram', connected: false },
        { id: '4', type: 'linkedin', connected: false },
        { id: '5', type: 'tiktok', connected: false },
        { id: '6', type: 'youtube', connected: false },
      ],
    },
  ]);
};

export function useBusinesses() {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: fetchBusinesses,
  });
}