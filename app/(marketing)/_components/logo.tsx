import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Image
        src="/logo-dark.png"
        alt="Logo"
        width={40}
        height={40}
        className="hidden dark:block object-contain"
      />
      <Image
        src="/logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="dark:hidden object-contain"
      />
      <div className={cn("font-semibold", poppins.className)}>Flow</div>
    </div>
  );
};
