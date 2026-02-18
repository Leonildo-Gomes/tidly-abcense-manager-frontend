"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Pencil, Save, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }).max( 150, {
    message: "Company name must be at most 150 characters.",
  }),
  code: z.string().min(2, {
    message: "Company code must be at least 2 characters.",
  }).max( 20, {
    message: "Company code must be at most 20 characters.",
  }),
  status: z.boolean(),
  logo: z.any().optional(), // Allow File or string
});

type CompanyFormValues = z.infer<typeof formSchema>;

interface CompanyFormProps {
  initialData?: {
    id: string;
    name: string;
    code: string;
    status: "active" | "inactive";
    logo?: string;
  } | null;
}

export default function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = initialData ? "Edit Company" : "Create Company";
  const description = initialData
    ? "Edit the company details."
    : "Add a new company/subsidiary to your organization.";
  const action = initialData ? "Save Changes" : "Create Company";

  const defaultValues: CompanyFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    status: initialData ? initialData.status === "active" : true,
    logo: initialData?.logo,
  };

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      form.setValue("logo", file, { shouldDirty: true });
    }
  };

  const onSubmit = async (data: CompanyFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log("Submitting data:", data);
    
    // Check if logo is a file and handle upload logic here (mocked)
    if (data.logo instanceof File) {
        console.log("Uploading file:", data.logo.name);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Company saved successfully!");
    
    // In a real app, you would probably revalidatePath or similar
    router.push("/organization/company");
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2"
      >
        <ArrowLeft size={16} />
        Back to Companies
      </Button>

      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Logo Upload Section */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div 
                            className="relative group cursor-pointer transition-all duration-200 hover:scale-105"
                            onClick={handleLogoClick}
                        >
                            <Avatar className="w-24 h-24 border-2 border-dashed border-gray-300 group-hover:border-primary/50 transition-colors">
                                <AvatarImage src={logoPreview || ""} className="object-cover" />
                                <AvatarFallback className="bg-gray-50 text-gray-400">
                                    <User size={32} />
                                </AvatarFallback>
                            </Avatar>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]">
                                <Pencil className="text-white w-6 h-6" />
                            </div>

                            {/* Hidden Input */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="text-center">
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={handleLogoClick}
                            >
                                <Upload className="mr-2 h-3 w-3" />
                                {logoPreview ? "Change Logo" : "Upload Logo"}
                            </Button>
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Recommended: 400x400px, Max 2MB
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="ACME-001" {...field} />
                                </FormControl>
                                <FormDescription>Unique identifier code.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                
                    <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                Active Status
                            </FormLabel>
                            <FormDescription>
                                {field.value 
                                    ? "Company is active and visible." 
                                    : "Company is inactive and hidden."}
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />

                    <div className="flex justify-end pt-4 border-t">
                        <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {action}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}