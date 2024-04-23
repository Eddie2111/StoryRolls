"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";

import { TypographyLarge } from "@/components/typography/typography-large";
import { TypographyTitle } from "@/components/typography/typography-title";
import convertIdeas from "@/animations/convert-ideas.json";
import manThinking from "@/animations/man-thinking.json";

export default function BlogSection() {
    return (
        <div className="flex flex-col md:flex-row gap-6 justify-between bg-gradient-to-r from-indigo-200 to-yellow-100">
            <SideSection_1 />
            <SideSection_2 />
        </div>
    );
}

function SideSection_1(): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0.0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="flex flex-col gap-2 mx-8 md:mx-24 p-2 w-2/6"
        >
            <TypographyTitle text="Convert your ideas" />
            <Lottie animationData={manThinking} height="1200px" width="1200px" />
            <TypographyLarge text="Turn your ideas into text, rearrange your thinking" />
        </motion.div>
    );
}

function SideSection_2(): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0.0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="flex flex-col mx-16 p-2 w-3/6 md:mt-64"
        >
            <TypographyLarge text="Writing arranges thinkings like magic" className="font-italic" />
            <Lottie animationData={convertIdeas} height="400px" width="400px" />
            <TypographyTitle text="Reshape your ideas into a plan" />
        </motion.div>
    );
}
