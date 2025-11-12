"use client"; // This component uses hooks so it remains client-side

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

//----------------------Form Validation Schema-------------------------
const ContactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

//----------------------Type Inference-------------------------
type ContactData = z.infer<typeof ContactSchema>;

//----------------------Contact Form Component-------------------------
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactData>({ resolver: zodResolver(ContactSchema) });

  // Handle form submission
  const onSubmit = async(data: ContactData) => {
    try {
      const response = await fetch("/api/contactForm", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data),
      });
      toast.success("Message sent. We will get back to you shortly")
    reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      toast.error("Failed to send message. Please try again")
    }
  };

  return (
    <div className="bg-[var(--background)] border border-theme rounded-2xl shadow-md p-8">
      {/* Section Title */}
      <h3 className="text-2xl font-bold mb-4 text-[var(--brand-gold)]">
        Send Us A Message
      </h3>
      <p className="text-sm mb-6 text-[var(--foreground)]/80">
        Provide a few details and we'll get back with a practical next step.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1 font-medium">Name</label>
           {errors.name && (
            <p className="!text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
          <input
            {...register("name")}
            type="text"
            placeholder="full name"
            className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
         
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm mb-1 font-medium">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
         {/* Submit Button */}
        <button
          disabled ={isSubmitSuccessful}
          type="submit"
          className="btn-gold px-6 py-3 rounded-md font-semibold mt-2"
        >
          {isSubmitSuccessful && submitted ? (
          <p className="text-green-600 mt-3">
            Thanks — your message was sent.
          </p>
        ):"Send Message"}
        </button>

      </form>
    </div>
  );
}
