"use client"

// animation modules
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

// animations
import convertIdeas from '@/app/animations/convert-ideas';
import manThinking from '@/app/animations/man-thinking';
// typographies
import { TypographyLarge } from '@/components/typography/Typography-large';
import { TypographyTitle } from '@/components/typography/Typography-title';

export default function BlogSection() {
    return (
        <div className="flex flex-col md:flex-row">
            <SideSection_1/>
            <SideSection_2/>
        </div>
    )
}

function SideSection_1():JSX.Element{
    return (
        <motion.div 
            initial={{ opacity: 0.0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
            }}
            className="flex flex-col gap-2 mx-16 p-2">
            <TypographyTitle text="Convert your ideas" />
            <Lottie animationData={manThinking} />;
            <TypographyLarge text="Turn your ideas into text, rearrange your thinking" />
        </motion.div>
    )
}

function SideSection_2():JSX.Element{
    return (
        <motion.div 
            initial={{ opacity: 0.0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
            }}
            className="flex flex-col gap-2 mx-16 p-2">
            <TypographyLarge text="Writing arranges thinkings like magic" />
            <Lottie animationData={convertIdeas} />;
            <TypographyTitle text="Reshape your ideas into a plan" />
        </motion.div>
    )
}