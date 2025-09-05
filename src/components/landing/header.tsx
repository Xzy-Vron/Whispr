"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface HeaderProps {
  isScrolled: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  theme: string | undefined
  setTheme: (theme: string) => void
  mounted: boolean
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
}

export function Header({  
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  theme,
  setTheme,
  mounted
}: HeaderProps) {

  const pathname = usePathname()
  const { data: session } = useSession()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
    >
      <div className="container w-full flex h-16 items-center justify-between">
        <Link href="/">
        <div className="flex items-center gap-2 ml-3 font-bold">
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
            W
          </div>
          <span>Whispr</span>
        </div>
        </Link>
        {pathname === "/" && (
          <nav className="hidden md:flex gap-20">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            {/* <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link> */}
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
        )}
        <div className="hidden md:flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <span className="cursor-pointer">
                <Sun className="size-[18px]" />
              </span>
            ) : (
              <span className="cursor-pointer">
                <Moon className="size-[18px]" />
              </span>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {session ? (
            <Button className="rounded-full cursor-pointer" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button
                  variant="ghost"
                  className="text-sm font-medium cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="rounded-full cursor-pointer">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="py-2 px-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="py-2 px-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            {/* <Link
              href="#pricing"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link> */}
            <Link
              href="#faq"
              className="py-2 px-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col px-2 gap-2 pt-2 border-t">
              {session ? (
                <Button className="rounded-full" onClick={() => signOut()}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href={"/sign-in"}>
                    <Button
                      variant="ghost"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href={"/sign-up"}>
                    <Button className="rounded-full">
                      Get Started
                      <ChevronRight className="ml-1 size-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
