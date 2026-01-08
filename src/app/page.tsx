"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { experiences } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <ThemeToggle />

      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16"
      >
        <Header />
        <ExperienceSection experiences={experiences} />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  );
}
