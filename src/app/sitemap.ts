import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://storyrolls.vercel.app",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://storyrolls.vercel.app/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://storyrolls.vercel.app/blogs",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        {
            url: "https://storyrolls.vercel.app/questions",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
    ];
}
