"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Lock, CheckCircle, Loader2 } from "lucide-react";
import { bookingFormSchema, type BookingFormData } from "@/lib/validations";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import { getIcon } from "@/lib/icon-map";
import type { PerkData } from "@/lib/admin-types";

interface BookingProps {
  perks: PerkData[];
  serviceOptions: { value: string; label: string }[];
  timeOptions: { value: string; label: string }[];
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length >= 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length >= 4) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length >= 1) {
    return `(${digits}`;
  }
  return "";
}

export function Booking({ perks, serviceOptions, timeOptions }: BookingProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-25 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
          {/* Info sidebar */}
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-amber/10 border border-border-accent rounded-full px-5 py-2 text-amber text-[0.85rem] font-medium uppercase tracking-wider mb-4">
              <CalendarCheck className="h-4 w-4" />
              Schedule Your Detail
            </span>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-text-white mb-4 leading-tight">
              Book Your <span className="text-amber">Appointment</span>
            </h2>
            <p className="text-text-muted mb-8 text-base leading-relaxed">
              Ready to give your vehicle the treatment it deserves? Fill out the
              form and we&apos;ll confirm your appointment within 2 hours.
            </p>

            <div className="flex flex-col gap-5">
              {perks.map((perk) => {
                const PerkIcon = getIcon(perk.icon);
                return (
                  <div key={perk.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber/10 border border-border-accent rounded-lg text-amber">
                      <PerkIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-text-white text-[0.95rem] font-semibold">
                        {perk.title}
                      </strong>
                      <span className="text-[0.85rem] text-text-muted">
                        {perk.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.2}>
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-10 max-sm:p-7">
              {submitted ? (
                <div className="text-center py-15">
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-5" />
                  <h3 className="text-2xl font-semibold text-text-white mb-3">
                    Appointment Request Sent!
                  </h3>
                  <p className="text-text-muted">
                    Thank you! We&apos;ll confirm your booking within 2 hours.
                    Check your email for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Full Name <span className="text-amber">*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        type="text"
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                      />
                      {errors.fullName && (
                        <span className="text-[0.8rem] text-red-500 mt-1 block">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Phone Number <span className="text-amber">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="(580) 555-0123"
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setValue("phone", formatted, {
                            shouldValidate: false,
                          });
                          e.target.value = formatted;
                        }}
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                      />
                      {errors.phone && (
                        <span className="text-[0.8rem] text-red-500 mt-1 block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                      Email Address <span className="text-amber">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                    />
                    {errors.email && (
                      <span className="text-[0.8rem] text-red-500 mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Service + Vehicle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Service Needed <span className="text-amber">*</span>
                      </label>
                      <select
                        {...register("service")}
                        defaultValue=""
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] cursor-pointer appearance-none select-dark pr-10"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviceOptions.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-bg-dark text-text-white"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="text-[0.8rem] text-red-500 mt-1 block">
                          {errors.service.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Vehicle Make &amp; Model
                      </label>
                      <input
                        {...register("vehicle")}
                        type="text"
                        placeholder="e.g., 2022 Toyota Camry"
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                      />
                    </div>
                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Preferred Date <span className="text-amber">*</span>
                      </label>
                      <input
                        {...register("date")}
                        type="date"
                        min={today}
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                      />
                      {errors.date && (
                        <span className="text-[0.8rem] text-red-500 mt-1 block">
                          {errors.date.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                        Preferred Time
                      </label>
                      <select
                        {...register("time")}
                        defaultValue=""
                        className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] cursor-pointer appearance-none select-dark pr-10"
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        {timeOptions.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-bg-dark text-text-white"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-5">
                    <label className="block text-[0.85rem] font-medium text-text-light mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      placeholder="Any special requests or details about your vehicle..."
                      className="w-full px-4 py-3 bg-bg-input border border-border-subtle rounded-lg text-text-white text-[0.9rem] placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] resize-y min-h-20"
                    />
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-[0.85rem] text-center mb-4">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] btn-gradient text-bg-dark border-2 border-amber transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-5 w-5" />
                        Request Appointment
                      </>
                    )}
                  </button>

                  <p className="text-center text-[0.8rem] text-text-muted mt-3">
                    <Lock className="inline h-3.5 w-3.5 text-amber mr-1 -mt-0.5" />
                    Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
