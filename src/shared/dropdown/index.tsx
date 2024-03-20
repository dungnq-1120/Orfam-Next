import { useState } from "react";
import { Listbox } from "@headlessui/react";

interface Props {
  options: {
    id: number;
    name: string;
  }[];
}

export default function Dropdown({ options }: Props) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <Listbox.Button className="text-sm font-semibold text-blue-ct7 hover:text-green-ct5">{selectedOption.name}</Listbox.Button>
        <Listbox.Options className="absolute bg-white top-10 w-48 -left-14 shadow-lg z-50 sm:left-0">
          {options.map((option) => (
            <Listbox.Option
              className={`hover:bg-green-ct5 hover:text-white cursor-pointer text-blue-ct7 text-sm p-3 ${
                selectedOption.name === option.name ? "bg-green-ct5 text-white" : ""
              }`}
              key={option.id}
              value={option}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
