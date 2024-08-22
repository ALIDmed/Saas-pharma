import { Wrapper, Container, Icons } from "@/components";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/ui/section-badge";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { features, perks } from "@/constants";
import { LampContainer } from "@/components/ui/lamp";

const HomePage = () => {
  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-4">
      {/* hero */}
      <Wrapper>
        <Container>
          <div className="flex flex-col items-center justify-center py-20 h-full">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-blue-700 transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
              <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                <Image
                  src="/icons/sparkles-dark.svg"
                  alt="✨"
                  width={24}
                  height={24}
                  className="w-4 h-4"
                />
                Introducing To All Parma Trends
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>

            <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
              <h1 className="text-3xl md:text-5xl lg:text-6xl lg:w-[1000px] md:!leading-snug text-center text-black font-extrabold">
                Enhance Pharma Strategy Insights with Leveraged Trend Analytics
              </h1>
              <p className="text-base md:text-lg text-muted mt-6 text-center">
                Get trends on more than 50 000 drugs <br /> and pharmaceutical
                companies at a glance
              </p>
              <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
                <Link
                  href="#"
                  className="flex items-center justify-center w-max rounded-full border-blue-900 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 select-none"
                >
                  <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
                    ✨ {"  "} Get access to demo dashboard
                  </p>
                  <Button
                    size="sm"
                    className="rounded-full hidden lg:flex border border-foreground/20"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center py-10 md:py-20 w-full">
              <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
              <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                <Image
                  src="/assets/dashboard.png"
                  alt="banner image"
                  width={1200}
                  height={1200}
                  quality={100}
                  className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
                />

                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* benefits */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <Container>
          <div
            className="max-w-md mx-auto text-start md:text-center"
            id="benefits"
          >
            <SectionBadge title="The Benefits" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Three steps to build your dream website
            </h2>
            <p className="text-muted-foreground mt-6">
              Turn your vision into reality in just 3 simple steps
            </p>
          </div>
        </Container>
        <Container>
          <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4 border border-neutral-400/50 rounded-lg"
                >
                  {/* <div className="flex items-center justify-center">
                    <perk.icon className="w-8 h-8" />
                  </div> */}
                  <h3 className="text-xl font-medium">{perk.title}</h3>
                  <p className="text-muted-foreground text-[16px] mt-2 text-start lg:text-start">
                    {perk.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* features */}
      <Wrapper className="flex flex-col items-center justify-center pt-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10"></div>
        <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Features" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Discover our powerful features
            </h2>
            {/* <p className="text-muted-foreground mt-6">
              Astra offers a range of features to help you build a stunning
              website in no time
            </p> */}
          </div>
        </Container>
        {/* <Container>
          <div className="flex items-center justify-center mx-auto mt-8">
            <Icons.feature className="w-auto h-80" />
          </div>
        </Container> */}
        <Container>
          <div
            className="flex flex-col items-center justify-center py-10 md:py-20 w-full"
            id="features"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start lg:items-start border border-neutral-400/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-center">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {feature.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* lamp */}
      <Wrapper className="flex flex-col items-center justify-center relative">
        <Container>
          <LampContainer>
            <div className="flex flex-col items-center justify-center relative w-full text-center">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl lg:!leading-snug font-semibold mt-8">
                Ready to discover Trends
                <br />
                on Pharma industry ?
              </h2>
              <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                Elevate Your Pharma Strategy with Cutting-Edge Trend Monitoring
              </p>
              <Button variant="default" className="mt-6" asChild>
                <Link href="/sign-in">
                  Get started for free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </LampContainer>
        </Container>
        {/* <Container className="relative z-[999999]">
                    <div className="flex items-center justify-center w-full -mt-40">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
                            <div className="flex flex-col items-start gap-4 w-full">
                                <h4 className="text-xl md:text-2xl font-semibold">
                                    Join our newsletter
                                </h4>
                                <p className="text-base text-muted-foreground">
                                    Be up to date with everything about AI builder
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
                                <form action="#" className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs">
                                    <Input
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                                    />
                                    <Button type="submit" size="sm" variant="secondary" className="w-full md:w-max">
                                        Subscribe
                                    </Button>
                                </form>
                                <p className="text-xs text-muted-foreground">
                                    By subscribing you agree with our{" "}
                                    <Link href="#">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Container> */}
      </Wrapper>
    </section>
  );
};

export default HomePage;
