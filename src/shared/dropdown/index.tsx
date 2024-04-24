import { forwardRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  options: {
    id: number;
    name: string;
    action: () => void;
  }[];
}

const Dropdown = forwardRef<HTMLDivElement, Props>(({ children, className, options }, ref) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <Listbox.Button className="text-sm font-semibold text-blue-ct7 hover:text-green-ct5">{children}</Listbox.Button>
        <Listbox.Options className={cn("bg-white w-48 shadow-lg z-50 sm:left-0", className)}>
          {options.map((option) => (
            <Listbox.Option
              className={`hover:bg-green-ct5 hover:text-white cursor-pointer text-center text-blue-ct7 text-sm p-3 ${
                selectedOption.name === option.name ? "bg-green-ct5 text-white" : ""
              }`}
              key={option.id}
              value={option}
              onClick={option.action}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
