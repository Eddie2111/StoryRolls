import { cn } from '@/lib/utils';

export function TypographyLarge(
    {
        text,
        className
    } : {
        text: string;
        className?: string
    }
)
{
    return <p className={cn([className,"text-2xl font-sans"])}>{text}</p>
}