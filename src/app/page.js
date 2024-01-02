import Carousel from "./components/Carousel";
import { Navigation, NavigationMobile } from "./components/Navigation";

const homepageData = {
  title: "4 simple steps to enjoy",
  description: "From sign-up to first withdrawal, it's this simple",
  navigation: ["discover", "withdraw", "ongoing", "bonus"],
  sliderData: [
    {
      id: "Mascot1",
      title: "Sign up for a 500 coin bonus",
      body: "Gain access to wonderful free games and apps to explore, play and win coins.",
    },
    {
      id: "Mascot2",
      title: "Choose your favorite app or game",
      body: 'Browse “Discovery” page, select the app or game you love, tap "Get Started" to begin playing and reach 1000 coins on Scrambly.',
    },
    {
      id: "Mascot3",
      title: "Secure your account",
      body: "Complete our super-simple, lightning-fast ID verification to secure your account and earnings - it takes 4 minutes most.",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <Navigation links={homepageData.navigation} />
      <div className="container mx-auto">
        <div className="h-56 grid grid-cols-1 gap-4 content-center">
          <h2 className="main__title">{homepageData.title}</h2>
          <p className="main__body">{homepageData.description}</p>
        </div>
      </div>
      <Carousel data={homepageData.sliderData} />
      <NavigationMobile links={homepageData.navigation} />
    </main>
  );
}
