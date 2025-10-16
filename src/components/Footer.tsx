import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-gold2)] text-[var(--foreground)] border-t transition-colors duration-300">
      <div className="container mx-auto px-6 py-6 text-sm text-center">
        <p>
          © {new Date().getFullYear()} PetrusWise Limited - All rights reserved
        </p>
      </div>
    </footer>
  );
}
