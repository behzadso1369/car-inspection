"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update URL with full path including blog ID
      window.history.pushState(null, "", `${pathname}#${id}`);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        "sticky top-24 bg-white rounded-lg border border-[#DFDFDF] p-4 max-h-[calc(100vh-8rem)] overflow-y-auto",
        className
      )}
      dir="rtl"
    >
      <h3 className="text-lg font-bold text-[#101117] mb-4">فهرست مطالب</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={cn(
                "text-sm text-[#55565A] hover:text-[#3456bb] transition-colors flex items-start gap-2",
                activeId === item.id && "text-[#3456bb] font-medium"
              )}
            >
              <ChevronLeft className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

