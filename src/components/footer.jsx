import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-accent via-orange-500 to-accent text-white mt-10">
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">

                    {/* Branding */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-3xl font-extrabold tracking-wide">
                            Crystal Beauty Clear
                        </h2>
                        <p className="text-sm text-white/80 mt-2 max-w-xs">
                            Premium skincare & beauty products crafted for radiant confidence.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 text-sm font-medium">
                        {["products", "about", "contact"].map((item) => (
                            <a
                                key={item}
                                href={`/${item}`}
                                className="relative group"
                            >
                                <span className="transition-colors group-hover:text-secondary">
                                    {item}
                                </span>
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur
                                       flex items-center justify-center
                                       hover:bg-secondary hover:text-accent
                                       transition-all duration-300 hover:-translate-y-1"
                        >
                            <FaInstagram size={18} />
                        </a>

                        <a
                            href="#"
                            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur
                                       flex items-center justify-center
                                       hover:bg-secondary hover:text-accent
                                       transition-all duration-300 hover:-translate-y-1"
                        >
                            <FaFacebookF size={16} />
                        </a>

                        <a
                            href="#"
                            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur
                                       flex items-center justify-center
                                       hover:bg-secondary hover:text-accent
                                       transition-all duration-300 hover:-translate-y-1"
                        >
                            <FaTwitter size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center text-white/70 text-sm py-4 border-t border-white/20 backdrop-blur">
                © {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
            </div>
        </footer>
    );
}
