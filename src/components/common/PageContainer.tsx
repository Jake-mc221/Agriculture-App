import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col h-screen w-full">
      {children}
    </div>
  );
}
