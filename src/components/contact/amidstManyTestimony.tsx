import React from "react";

export default function AmidstManyTestimony() {
  const testimonials = [
    {
      quote:
        "PetrusWise guided our ISO certification — seamless and professional.",
      author: "MD, FMCG Company",
    },
    {
      quote: "Regulatory support that actually saved our launch timetable.",
      author: "Head of R&D, Consumer Goods",
    },
  ];
  return (
    <div className="mx-16 p-4 mb-12 rounded-lg bg-[var(--background)] md:text-center border border-theme">
      <h4 className="text-sm font-semibold text-[var(--heading)] mb-3">
        Amidst Many Testimony
      </h4>
      <div className="space-y-3">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className="text-sm italic text-[var(--foreground)]/80"
          >
            “{t.quote}”{" "}
            <span className="block text-xs mt-1 text-[var(--foreground)]/60">
              — {t.author}
            </span>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
