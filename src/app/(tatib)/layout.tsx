'use client';
import NavbarAdmin from "@/components/Navbar/NavbarAdmin";
import MenuAdmin from "@/components/Sidebar/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { useState } from "react"; 

export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); 
  const [, setUser ] = useState(null); 

  const handleLogout = () => {
    
    setUser (null);

   
    router.push('./signin');
  };

  return (
    <div className="flex">
      <div className="w-[20%] md:w-[12%] lg:w-[17.5%] xl:w[14%] bg-white p-5">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
          <Image
            src="/logo/logogrf.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="hidden lg:block text-[#434D97] font-semibold">IZIN SISWA</span>
        </Link>
        <MenuAdmin />
        <br />
        <div className="flex items-center justify-center lg:justify-center mt-48">
          <Image
            src="/icon/logout.svg"
            alt=""
            width={15}
            height={15}
            className="mr-2"
          />
          <button onClick={handleLogout} className="flex items-center justify-center lg:justify-start gap-2">
            <span className="text-[#B0B0B0] cursor-pointer">Logout</span>
          </button>
        </div>
      </div>
      <div className="w-[86%] md:w-[92%] lg-w[84%] xl:w[86%]">
        <NavbarAdmin />
        {children}
      </div>
    </div>
  );
}