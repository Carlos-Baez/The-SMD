import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Button
            key={item.name}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              isActive && "bg-muted font-medium hover:bg-muted",
            )}
            asChild
          >
            <Link to={item.href}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
