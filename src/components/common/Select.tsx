import { VariantProps, cva } from "class-variance-authority";
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";
import { BsChevronDown } from "react-icons/bs";
import { forwardRef } from "react";

const selectStyles = cva(
  "border rounded p-2 bg-transparent shadow-lg text-black min-w-[10rem] border-black/20 relative flex items-center focus-within:bg-primary/20",
  {
    variants: {},
  },
);

export const Select = forwardRef(function Select(
  {
    children,
    label,
    className,
    ...selectProps
  }: { label: string; className?: string } & PropsWithChildren &
    ComponentPropsWithoutRef<"select"> &
    VariantProps<typeof selectStyles>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <label className="flex flex-col">
      <h3>{label}</h3>
      <div
        className={twMerge(
          selectStyles(selectProps as VariantProps<typeof selectStyles>),
          className,
        )}
      >
        <select
          {...(selectProps as ComponentPropsWithoutRef<"select">)}
          ref={ref}
          className="w-full h-full outline-none border-none bg-transparent"
        >
          {children}
        </select>
        <BsChevronDown
          aria-hidden
          className="absolute right-2 pointer-events-none"
        />
      </div>
    </label>
  );
});
