import GreetingScreen from "@/components/GreetingScreen/GreetingScreen";
import Hero from "@/components/Hero/Hero";

export default function Page() {
  return (
    <>
      {/* The hero renders underneath from the first paint, so the greeting
          lifting away reveals a page that is already there. */}
      <Hero />
      <GreetingScreen />
    </>
  );
}
