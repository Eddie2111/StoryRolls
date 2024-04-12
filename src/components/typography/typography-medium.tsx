import { cn } from '@/lib/utils';

export function TypographyHeading(
    {
        text,
        className
    } : {
        text: string;
        className: string
    }
)
{
    return <p className={cn([className,"text-md font-sans"])}>{text}</p>
}