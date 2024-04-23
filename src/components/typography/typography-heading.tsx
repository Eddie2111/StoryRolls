import { cn } from "@/lib/utils";

export function TypographyHeading({ text, className }: { text: string; className: string }) {
    return <p className={cn([className, "text-6xl font-sans"])}>{text}</p>;
}
