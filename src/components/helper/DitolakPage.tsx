import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function DitolakPage() {
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
            <div className="relative w-auto h-auto pt-5 pb-6">
              <Image
              src={"/icons/ditolak.svg"}
              alt="Logo"
              width={140}
              height={140}
              className="cursor-pointer mx-auto "
              />
            </div>
            {/* Loading Text */}
            <p className="text-base font-semibold text-black">
              Formulir anda berhasil dikirim dan ditolak
            </p>
            <p className="text-sm text-black mt-2">Silahkan konfirmasi dengan guru tatib terkait.</p>
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
