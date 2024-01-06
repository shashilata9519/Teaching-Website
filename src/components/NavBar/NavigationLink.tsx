import Link from "next/link";
import '../NavBar/Navbar.module.css'

function NavigationLink({ href, text, router,className }:any) {

	return (
		<Link className={className}  href={href === "/home" ? "/" : href} passHref>
			{text}
		</Link>
	);
}

export default NavigationLink


