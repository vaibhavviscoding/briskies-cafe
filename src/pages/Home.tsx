import Hero from '../components/Hero';
import ChefCombos from '../components/ChefCombos';
import MenuExplorer from '../components/MenuExplorer';
import Features from '../components/Features';
import OpeningHours from '../components/OpeningHours';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ChefCombos />
      <MenuExplorer />
      <Features />
      <OpeningHours />
    </div>
  );
}
