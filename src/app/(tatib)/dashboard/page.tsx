import DashboardPage from "@/components/dashboard";

const DashPage = () => {
  return (
    <div className="py-3 px-8 gap-4  bg-[#F0F0F0]">
      <div className="w-full">
        <img src="/banner/banner.svg" className="w-full h-full" alt="" />
      </div>
      <div className="py-4 flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <div className="flex justify-between">
            <DashboardPage />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/banner/form_banner.svg" className="w-full h-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashPage;
