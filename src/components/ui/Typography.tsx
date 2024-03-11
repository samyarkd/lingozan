import { ReactNode } from "react";
import { cn } from "~/lib/utils";

type HeadingProps = { children: ReactNode; className?: string };

export const Heading = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-2xl font-semibold", className)}>{children}</h1>
);
