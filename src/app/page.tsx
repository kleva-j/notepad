import Header from "@/layout/header";
import Footer from "@/layout/footer";

export default function RootPage() {
	return (
		<section className="flex w-screen flex-col">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
			<Header variant="centered" sticky />
			<Footer />
		</section>
	);
}
