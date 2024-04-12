"use client";

import React from 'react';

import { motion } from 'framer-motion';

import { AuroraBackground } from '@/components/ui/aurora-background';

export default function HeroSection() {
    return (
        <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <section>
            <main >
                <section className="w-full py-8 md:py-12 lg:py-16">
                    <div className="container px-4 md:px-3">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Welcome to Story Rolls
                            </h1>
                            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                A place where stories come to life.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </section>
        </motion.div>
    </AuroraBackground>
    );
}
