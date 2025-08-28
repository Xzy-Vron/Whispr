import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <div className="flex flex-col justify-start items-center h-[90vh] md:h-screen container px-2 md:px-6 relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <div className="h-60 flex gap-2 flex-col items-center  p-2 mt-10  w-full">
            <div className="w-full md:flex-row">
              <div>
                <h1 className="scroll-m-20  text-start pr-30 text-6xl font-extrabold tracking-tight text-balance">
                  Share.
                </h1>
              </div>
              <div>
                <h1 className="scroll-m-20 pl-15 text-start pr-30 text-6xl font-extrabold tracking-tight text-balance">
                  Listen.
                </h1>
              </div>
              <div>
                <h1 className="scroll-m-20 text-end  text-6xl font-extrabold tracking-tight text-balance">
                  Grow.
                </h1>
              </div>
            </div>
            <div className="h-40 flex gap-2 flex-col  p-2 mt-10  w-full">
              <h3 className="scroll-m-20 text-2xl text-center font-semibold mb-20 tracking-tight">
                Your ideas, <br /> the world’s feedback
              </h3>
            </div>
            <div className="h-fit md:w-2/3 w-full p-2  ">
              <Spline className="w-400 h-400" scene="https://prod.spline.design/zobUmCxe0flwr9Ot/scene.splinecode" />
            </div>
          </div>
        </div>
        <FeaturesSection />
        <HowItWorksSection />
      </main>
    </>
  );
}
