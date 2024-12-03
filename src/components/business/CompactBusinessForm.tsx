import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { BUSINESS_TYPES } from "@/lib/constants/business";
import { businessFormSchema } from "@/lib/validations/business";
import { CompactLogoUpload } from "./CompactLogoUpload";
import { CompactSocialConnections } from "./CompactSocialConnections";

export function CompactBusinessForm() {
  const form = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
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

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[30%] bg-background border-l shadow-2xl">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <h2 className="text-lg font-semibold">Register Business</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)] p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <CompactLogoUpload
                onFileSelect={(file) => form.setValue("logo", file)}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business name"
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
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
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="cursor-pointer"
                          >
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
                        className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t">
                <CompactSocialConnections
                  platforms={form.watch("connectedPlatforms")}
                  businessId="new"
                />
              </div>
            </motion.div>

            <div className="sticky bottom-0 flex justify-end gap-2 pt-4 border-t bg-background">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="transition-all hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button type="submit" className="transition-all hover:opacity-90">
                Register Business
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
