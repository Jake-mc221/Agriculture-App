import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex justify-end py-10 px-10 w-full sm:w-[30rem]">
      {children}
    </div>
  );
}
