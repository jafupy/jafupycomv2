import Card from "./root.astro";
import Content from "./content.astro";
import Header from "./header.astro";
import Footer from "./footer.astro";

export const C = {
	Header,
	Content,
	Footer,
	H: {
		iconStyle: "h-4 w-4 group-hover:-rotate-12 text-old-rose",
	},
};

export default Card;
