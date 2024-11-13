
import HariIniPage from "@/components/IzinHariIni";
import Image from "next/image";

const IzinHariIniPage = () => {
    return (
    <div className="py-3 px-8 gap-4  bg-[#F0F0F0]">
          <Image src="/banner/banner.svg" alt="Logo" width={1000} height={1000} />
        <div className="py-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full md:w-2/3">
            {/* FORM */}
            <div className="flex justify-between">
                <HariIniPage />
            </div>
            </div>
            {/* RIGHT */}
            <div className="w-full md:w-1/2">
            <Image src="/banner/form_banner.svg" alt="Logo" width={1000} height={1000} />
            </div>
        </div>
    </div>
    )
}

export default IzinHariIniPage;