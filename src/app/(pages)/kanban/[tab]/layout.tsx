import {ReactNode} from "react";
import {Navbar} from "@/app/_components/nav";
import {ChevronDown, ChevronRight, Folder} from "lucide-react";


type Props = {
	children: ReactNode;
	params: Promise<{tab: string}>
}
export default async function Layout({ children, params }: Props) {
	const {tab} = await params;
	return (
		<section className="flex flex-col h-[100vh]">
			<Navbar tab={tab} />
			{children}
		</section>
	)
}



