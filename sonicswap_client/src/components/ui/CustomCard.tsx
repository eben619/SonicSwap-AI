
import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ className, gradient = false, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border p-4",
          gradient ? "glass-card" : "bg-card text-card-foreground",
          hover && "hover-scale",
          className
        )}
        {...props}
      />
    );
  }
);
CustomCard.displayName = "CustomCard";

interface CustomCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CustomCardHeader = React.forwardRef<HTMLDivElement, CustomCardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      />
    );
  }
);
CustomCardHeader.displayName = "CustomCardHeader";

interface CustomCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CustomCardTitle = React.forwardRef<HTMLParagraphElement, CustomCardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
);
CustomCardTitle.displayName = "CustomCardTitle";

interface CustomCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CustomCardDescription = React.forwardRef<HTMLParagraphElement, CustomCardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
CustomCardDescription.displayName = "CustomCardDescription";

interface CustomCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CustomCardContent = React.forwardRef<HTMLDivElement, CustomCardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pt-0", className)} {...props} />
    );
  }
);
CustomCardContent.displayName = "CustomCardContent";

interface CustomCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CustomCardFooter = React.forwardRef<HTMLDivElement, CustomCardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      />
    );
  }
);
CustomCardFooter.displayName = "CustomCardFooter";

export {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
  CustomCardContent,
  CustomCardFooter,
};
