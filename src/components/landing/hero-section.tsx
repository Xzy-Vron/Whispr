import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col justify-start items-center h-[90vh] md:h-screen container px-2 md:px-6 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="h-60 flex gap-2 flex-col items-center p-2 mt-10 w-full">
        <div className=" md:flex w-full md:flex-row md:justify-center md:my-15  md:gap-15 mb-10">
          <div>
            <h1 className="scroll-m-20  text-start pr-30 text-6xl md:p-0  md:text-9xl font-extrabold tracking-tight text-balance">
              Share.
            </h1>
          </div>
          <div>
            <h1 className="scroll-m-20 pl-15 text-start pr-30 md:p-0  text-6xl md:text-9xl font-extrabold tracking-tight text-balance">
              Listen.
            </h1>
          </div>
          <div>
            <h1 className="scroll-m-20 text-end  text-6xl md:p-0  font-extrabold md:text-9xl tracking-tight text-balance">
              Grow.
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:mt-10 sm:flex-row gap-12 w-full justify-center">
          <Button size="lg" className="rounded-full h-15 px-16 text-lg">
            <Link href="/sign-up">
            Get Started
            </Link>
            <ArrowRight className="ml-2 size-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-15 px-16 text-base bg-transparent"
          >
            <Link href="/sign-in">
            Login
            </Link>
          </Button>
        </div>
        <div className="h-40 flex gap-2 flex-col  p-2 mt-10  w-full">
          <h3 className="scroll-m-20 text-2xl text-center font-semibold mb-5 tracking-tight md:text-5xl">
            Your ideas, <br />
            <span className="lg:hidden">the world’s feedback</span>
          </h3>
        </div>
        <div className="lg:flex items-center justify-center h-fit w-full p-2">
          <div className="lg:flex items-center h-full w-md hidden justify-end">
            <h3 className="scroll-m-20 text-7xl hidden lg:inline text-end font-semibold tracking-tight text-balance">
              World’s
            </h3>
          </div>
          <Spline
            className="w-400 h-400 rounded-lg lg:rounded-full"
            scene="https://prod.spline.design/zobUmCxe0flwr9Ot/scene.splinecode"
          />
          <div className="lg:flex items-center h-full w-md jusitfy-start hidden ">
            <h3 className="scroll-m-20 text-7xl hidden  lg:inline font-semibold tracking-tight text-balance">
              Feedback
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
