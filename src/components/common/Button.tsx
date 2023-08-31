import { VariantProps, cva } from "class-variance-authority";
import {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva("transition-transform motion-safe:active:scale-95", {
  variants: {
    intent: {
      unstyled: "",
      primary:
        "bg-primary text-white min-w-[10rem] rounded-l-full rounded-r-full p-2 hover:bg-primary-hover flex items-center justify-center",
      secondary:
        "bg-white text-primary min-w-[10rem] rounded-l-full rounded-r-full p-2 border-2 border-primary hover:bg-gray-200 flex items-center justify-center",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export function Button<T extends ElementType>({
  component,
  children,
  className,
  ...buttonProps
}: { component?: T; className?: string } & PropsWithChildren &
  ComponentPropsWithoutRef<T> &
  VariantProps<typeof buttonStyles>) {
  const Component: ElementType = component || "button";

  return (
    <Component
      {...(buttonProps as ComponentPropsWithoutRef<T>)}
      className={twMerge(
        buttonStyles(buttonProps as VariantProps<typeof buttonStyles>),
        className,
      )}
    >
      {children}
    </Component>
  );
}
