"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/tidly_icone.png";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Tidly" width={50} height={50} className="rounded-full" />
            Tidly
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-primary transition-colors">
            Testimonials
          </a>
        </div>
        <a href="/login" className="bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all text-sm">
          Login
        </a>
      </div>
    </nav>
  );
}