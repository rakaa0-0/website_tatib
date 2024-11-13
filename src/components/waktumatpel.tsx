const WaktuMatpel = () => {
    return (
        <div>
            <label htmlFor="izin" className="block text-gray-700 font-bold px-2">
            Jam Ke
          </label>
          <div className=" flex block">
            <select
              id=""
              name=""
              className="rounded-lg w-full py-3 pl-4 mr-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">1 (07.00-07.45)</option>
              <option value="">2 (07.45-08.30)</option>
              <option value="">3 (08.30-09.15)</option>
              <option value="">4 (09.15-10.00)</option>
              <option value="">5 (10.15-11.00)</option>
              <option value="">6 (11.00-11.45)</option>
              <option value="">7 (12.15-13.00)</option>
              <option value="">8 (13.00-13.45)</option>
              <option value="">9 (13.45-14.30)</option>
              <option value="">10 (14.30-15.15)</option>
            </select>
            <div className="flex items-center text-[#8F8F8F] ">
              <p>s/d</p>
            </div>
            <select
              id=""
              name=""
              className="rounded-lg w-full py-3 pl-4 ml-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">1 (07.00-07.45)</option>
              <option value="">2 (07.45-08.30)</option>
              <option value="">3 (08.30-09.15)</option>
              <option value="">4 (09.15-10.00)</option>
              <option value="">5 (10.15-11.00)</option>
              <option value="">6 (11.00-11.45)</option>
              <option value="">7 (12.15-13.00)</option>
              <option value="">8 (13.00-13.45)</option>
              <option value="">9 (13.45-14.30)</option>
              <option value="">10 (14.30-15.15)</option>
            </select>
          </div>
        </div>
      );
}

export default WaktuMatpel;