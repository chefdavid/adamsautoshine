import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  phone: z
    .string()
    .min(1, "Please enter your phone number")
    .refine(
      (val) => val.replace(/[\s\-().]/g, "").length >= 10,
      "Please enter a valid phone number"
    ),
  email: z
    .string()
    .min(1, "Please enter a valid email address")
    .email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  vehicle: z.string().optional(),
  date: z
    .string()
    .min(1, "Please select a preferred date")
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Date must be today or later"),
  time: z.string().optional(),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
