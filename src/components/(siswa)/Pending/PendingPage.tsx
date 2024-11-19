import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src={"/images/banner-pending.svg"}
          alt="Banner"
          width={10000}
          height={10000}
          className="bg-cover bg-center bg-no-repeat relative"
        />
      </div>

      <div className="container mx-auto px-8 py-[2.2rem] flex-grow">
        <Card className="max-w-[52rem] mt-20 sm:mt-20 md:mt-60 lg:mt-60 xl:mt-60 rounded-2xl mx-auto p-5 shadow-xl">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            {/* Loading Spinner */}
            <div className="relative w-36 h-36 mb-6">
              <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4554CE" />   {/* Warna biru lebih gelap */}
                    <stop offset="49.5%" stopColor="#8C95E1" /> {/* Warna gelap hingga hampir setengah */}
                    <stop offset="50.5%" stopColor="#A3ABE7" /> {/* Warna terang mulai tepat setengah */}
                    <stop offset="100%" stopColor="#CBCFF1" />  {/* Warna terang sisa setengah */}
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#spinner-gradient)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "251.2",
                    strokeDashoffset: "0",
                  }}
                />
              </svg>
            </div>

            {/* Loading Text */}
            <p className="text-base font-semibold text-black">
              Formulir anda sedang dikirim dan menunggu persetujuan
            </p>
            <p className="text-sm text-black mt-1">Harap tunggu sebentar</p>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-8 py-4">
        <hr className="w-full mx-auto border-[1px] border-[#B0B0B0] my-4" />
      </div>

      <footer className="flex items-center justify-between h-full sm:h-auto sm:w-[90%] xl:w-[90%] mx-auto text-center text-black py-4 sm:py-2">
        <Image
          src="/icons/footer.svg"
          alt="Logo"
          width={100}
          height={40}
          className="cursor-pointer"
        />
        <p className="text-[1rem] text-[#8F8F8F]">
          © Perizinan Siswa 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
