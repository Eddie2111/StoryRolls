import dynamic from 'next/dynamic';

import HeroSection from '@/app/home/hero-section';

const BlogSection = dynamic(() => import("@/app/home/blog-section"), { ssr: false })

export default function Home() {
    return (
        <>
            <HeroSection/>
            <BlogSection/>
        </>
    );
}
