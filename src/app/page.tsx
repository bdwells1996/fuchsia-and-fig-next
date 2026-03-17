import Nav from "@/components/Nav";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Nav />
			<HeroSection />
		</div>
	);
}
