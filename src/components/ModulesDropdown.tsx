"use client";

import { useState, useRef, useEffect } from "react";
import { Layers, ChevronDown, ChevronRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

interface ModuleItem {
  id: string;
  name: string;
  description: string;
}

const MODULES_LIST: ModuleItem[] = [
  {
    id: "commons",
    name: "Commons",
    description: "System administration & master data definition",
  },
  {
    id: "accounts",
    name: "Accounts",
    description: "General ledger, receivables, payables & compliance",
  },
  {
    id: "distribution",
    name: "Distribution",
    description: "Omnichannel inventory, warehouse & shipping",
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    description: "Procurement, vendor SLAs & freight logistics",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customer pipeline, opportunities & support tickets",
  },
  {
    id: "human-resources",
    name: "Human Resources",
    description: "Employee directory, automated payroll & attendance",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Bills of materials, production routing & shop orders",
  },
];

export default function ModulesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Explore Modules Trigger Button (No Hash URL Navigation) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="px-4 py-2 text-sm font-medium text-white hover:text-white/90 hover:bg-white/10 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#93032E]/40"
      >
        <Layers className="w-4 h-4 text-blue-300" />
        <span>Explore Modules</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-300 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Modules Dropdown Menu (Full view, no vertical scrollbar) */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#181818] border border-white/15 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="space-y-1">
            {MODULES_LIST.map((mod) => (
              <SignInButton key={mod.id} mode="modal">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3 cursor-pointer group"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-white group-hover:text-[#93032E] transition-colors truncate block">
                      {mod.name}
                    </span>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {mod.description}
                    </p>
                  </div>
                </button>
              </SignInButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
