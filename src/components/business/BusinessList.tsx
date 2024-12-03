import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BusinessDialog } from './BusinessDialog';
import { BusinessCard } from './BusinessCard';
import { useBusinesses } from '@/hooks/useBusinesses';

export function BusinessList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { businesses, isLoading, error } = useBusinesses();

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Businesses</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading businesses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Businesses</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Button>
        </div>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Error loading businesses: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </div>

      {businesses?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No businesses yet</h2>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first business
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses?.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}

      <BusinessDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}