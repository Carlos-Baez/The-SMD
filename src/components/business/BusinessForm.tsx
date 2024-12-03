import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BUSINESS_TYPES } from "@/lib/constants/business";
import { businessFormSchema } from "@/lib/validations/business";
import { LogoUpload } from "./LogoUpload";
import { SocialConnections } from "./SocialConnections";

interface BusinessFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
}

export function BusinessForm({
  onSubmit,
  onCancel,
  defaultValues,
}: BusinessFormProps) {
  const form = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      businessType: "retail",
      connectedPlatforms: [
        { id: "1", type: "facebook", connected: false },
        { id: "2", type: "twitter", connected: false },
        { id: "3", type: "instagram", connected: false },
        { id: "4", type: "linkedin", connected: false },
        { id: "5", type: "tiktok", connected: false },
        { id: "6", type: "youtube", connected: false },
      ],
    },
  });

  const handleLogoUpload = (file: File) => {
    form.setValue("logo", file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <LogoUpload
            onFileSelect={handleLogoUpload}
            defaultImage={defaultValues?.logoUrl}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Briefly describe your business and its main activities
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-6" />

          <FormField
            control={form.control}
            name="connectedPlatforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Platforms</FormLabel>
                <FormDescription>
                  Connect your business to social media platforms
                </FormDescription>
                <FormControl>
                  <SocialConnections
                    platforms={field.value}
                    businessId={defaultValues?.id || "new"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Business</Button>
        </div>
      </form>
    </Form>
  );
}
