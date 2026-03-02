'use client';

import Hero from "@/components/Hero";
import StatsRow from "@/components/StatsRow";
import ProgressBar from "@/components/ProgressBar";
import NFTCard from "@/components/NFTCard";
import MintSection from "@/components/MintSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pb-20"
      >
        <StatsRow />
        <ProgressBar />
        <NFTCard />
        <MintSection />
      </motion.div>

      <Footer />
    </main>
  );
}
