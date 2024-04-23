import { cn } from "@/lib/utils";

export function TypographyTitle({ text, className }: { text: string; className?: string }) {
    return <h1 className={cn([className, "text-4xl font-sans"])}>{text}</h1>;
}
