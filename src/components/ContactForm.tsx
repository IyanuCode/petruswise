"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const ContactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactData = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = (data: ContactData) => {
    console.log("Form submitted:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label className="block text-sm mb-1 font-medium">Name</label>
        <input
          {...register("name")}
          type="text"
          className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold px-6 py-3 rounded-md font-semibold mt-2"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {sent && <p className="text-green-600 mt-3">Message sent successfully.</p>}
    </form>
  );
}
