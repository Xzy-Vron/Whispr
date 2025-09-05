"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function Footer() {
  const { data: session } = useSession();

  const username = session?.user?.username;

  const pathname = usePathname();
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container  flex flex-col justifiy-center px-4 md:px-6 py-7 gap-5">
        {pathname === `/u/${username}` && (
          <div className="container  flex flex-col w-full justify-center items-center px-4 md:px-6 py-1 gap-2">
            <h1 className="text-center text-muted-foreground text-sm">Don&apos;t have an account ?</h1>
            <Link href={"/sign-up"}>
            <Button size={"sm"} className="w-18">Sign up</Button>
            </Link>
        </div>
        )}
        {pathname === "/" && (
          <>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <Link href={"/"}>
                  <div className="flex items-center gap-2 font-bold">
                    <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                      W
                    </div>
                    <span>Whispr.</span>
                  </div>
                </Link>
                <p className="text-sm mt-5 text-muted-foreground">
                  Collect anonymous feedback effortlessly. Share your link,
                  receive honest insights, and stay in control with AI-powered
                  suggestions.
                </p>
              </div>
              <div className="space-y-4 sm:text-right">
                <h4 className="text-sm font-bold">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#features"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#how-it-works"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  {/* <li>
                <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
              </li> */}
                </ul>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col items-center gap-4 border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Whispr. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Made with ♡ by{" "}
              <Link href="https://avinash-orcin.vercel.app/">
              <span className="md:text-muted-foreground md:hover:text-foreground text-foreground transition-colors cursor-pointer font-bold">
                Avinash Ganore
              </span>
              </Link>
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/avinash-ganore/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="size-5" />
                <span className="sr-only">Avinash&apos;s LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/XzyVron"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="size-5" />
                <span className="sr-only">Avinash&apos;s Twitter</span>
              </Link>
              <Link
                href="https://github.com/Xzy-Vron"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="size-5" />
                <span className="sr-only">Avinash&apos;s GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
