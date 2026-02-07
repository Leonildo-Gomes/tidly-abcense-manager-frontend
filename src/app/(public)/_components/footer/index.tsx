"use client"
export default function Footer() {
  return (
    <footer className="py-12 text-center text-gray-400 text-sm">
      <p>&copy; {new Date().getFullYear()} Tidly. All rights reserved.</p>
    </footer>
  );
}