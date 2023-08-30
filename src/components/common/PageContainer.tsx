import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col py-10 mx-10 w-80">{children}</div>
  );
}
