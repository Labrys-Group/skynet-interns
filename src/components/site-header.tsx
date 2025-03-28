"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { SiteHeaderLogo } from "@/components/site-header-logo"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/workers",
      label: "Workers",
      active: pathname === "/workers" || pathname.startsWith("/workers/"),
    },
    {
      href: "/projects",
      label: "Projects",
      active: pathname === "/projects" || pathname.startsWith("/projects/"),
    },
    {
      href: "/assignments",
      label: "Assignments",
      active: pathname === "/assignments",
    },
    {
      href: "/skill-gaps",
      label: "Skill Gaps",
      active: pathname === "/skill-gaps",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-labrys-lightgray bg-labrys-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <SiteHeaderLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-labrys-green",
                route.active ? "text-labrys-green" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-labrys-lightgray bg-labrys-black/95 backdrop-blur-sm">
          <nav className="flex flex-col p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "py-3 text-sm font-medium transition-colors hover:text-labrys-green",
                  route.active ? "text-labrys-green" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

