import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
