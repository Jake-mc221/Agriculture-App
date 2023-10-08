import { Tab } from "@headlessui/react";

export default function Panel({
  key,
  children,
}: {
  key: string;
  children: React.ReactNode;
}) {
  return (
    <Tab.Panel
      className="rounded-xl shadow-xl h-[12vh] bg-white  ring-opacity-60 ring-offset-2 ring-offset-primary 
                          focus:outline-none focus:ring-2"
      key={key}
    >
      <div className="rounded-xl p-3 ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2">
        {children}
      </div>
    </Tab.Panel>
  );
}
