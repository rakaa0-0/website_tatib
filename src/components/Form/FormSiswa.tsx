"use client";

import DaftarGuruTatib from "./daftartatib";
import { useState } from "react";
import { supabase } from "./supabaseClient"; 
import WaktuMatpel from "../Helper/waktumatpel";

const SiswaPage = () => {
  const [izin, setIzin] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [kodeKelas, setKodeKelas] = useState("");
  const [jamKeAwal, setJamKeAwal] = useState("");
  const [jamKeAkhir, setJamKeAkhir] = useState("");
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [alasan, setAlasan] = useState("");
  const [uploadBukti, setUploadBukti] = useState<string | null>(null);
  const [guruBidangDiklat, setGuruBidangDiklat] = useState("");
  const [petugasTatib, setPetugasTatib] = useState("");
  const createdAt = new Date().toISOString();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size);

      const { error } = await supabase.storage
        .from("file_alasan")
        .upload(`alasan/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        setUploadBukti(file.name);
        console.log("File uploaded successfully!");
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const { error } = await supabase.from("izin").insert([
        {
          izin,
          nama_lengkap: namaLengkap,
          kelas,
          jurusan,
          kode_kelas: kodeKelas,
          JamKeluar: jamKeAwal,
          JamKembali: jamKeAkhir,
          mata_pelajaran: mataPelajaran,
          alasan,
          upload_bukti: uploadBukti,
          guru_bidang_diklat: guruBidangDiklat,
          petugas_tatib_piket: petugasTatib,
          created_at: createdAt,
        },
      ]);

      if (error) {
        console.error("Error submitting form:", error.message || error);
      } else {
        console.log("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 flex-1">
      <div className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-6 py-4 my-4 md:px-4 rounded-lg bg-[#5F6CD5]">
        Surat Izin Siswa
      </div>

      <form onSubmit={handleSubmit} className="md:px-4 mx-auto">
        <div className="mt-4">
          <label htmlFor="izin" className="block text-gray-700 font-bold px-2">
            Izin
          </label>
          <select
            required
            id="izin"
            value={izin}
            onChange={(e) => setIzin(e.target.value)}
            className="rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline focus:bg-[#EFF0FB]"
          >
            <option value="" label="Pilih Salah Satu"></option>
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
            <option value="pulang">Pulang</option>
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="namaLengkap"
            className="block text-gray-700 font-bold px-2"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="namaLengkap"
            required
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            placeholder="Nama Lengkap"
            className="appearance-none rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="kelas" className="block text-gray-700 font-bold px-2">
            Kelas
          </label>
          <select
            id="kelas"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" label="Pilih Salah Satu"></option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
            <option value="XIII">XIII</option>
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="jurusan"
            className="block text-gray-700 font-bold px-2"
          >
            Jurusan
          </label>
          <select
            id="jur usan"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            className="rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" label="Pilih Salah Satu"></option>
            <option value="Rekayasa Perangkat Lunak">
              Rekayasa Perangkat Lunak
            </option>
            <option value="Desain Komunikasi Visual">
              Desain Komunikasi Visual
            </option>
            <option value="Perhotelan">Perhotelan</option>
            <option value="Teknik Komputer dan Jaringan">
              Teknik Komputer dan Jaringan
            </option>
            <option value="Animasi">Animasi</option>
            <option value="Teknik Grafika">Teknik Grafika</option>
            <option value="Mekatronika">Mekatronika</option>
            <option value="Teknik Logistik">Teknik Logistik</option>
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="kodeKelas"
            className="block text-gray-700 font-bold px-2"
          >
            Kode Kelas
          </label>
          <select
            id="kodeKelas"
            value={kodeKelas}
            onChange={(e) => setKodeKelas(e.target.value)}
            className="rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" label="Pilih Salah Satu"></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="mt-4">
          <WaktuMatpel
            OnAwalChange={setJamKeAwal}
            OnAkhirChange={setJamKeAkhir}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="mataPelajaran"
            className="block text-gray-700 font-bold px-2"
          >
            Mata Pelajaran
          </label>
          <input
            type="text"
            id="mataPelajaran"
            value={mataPelajaran}
            onChange={(e) => setMataPelajaran(e.target.value)}
            placeholder="Mata Pelajaran"
            className="appearance-none rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="alasan"
            className="block text-gray-700 font-bold px-2"
          >
            Alasan
          </label>
          <input
            type="text"
            id="alasan"
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Alasan"
            className="appearance-none rounded-lg w-full py-3 pl-4 text-[#8F8F8F] bg-[#F0F0F0] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="uploadBukti"
            className="block text-gray-700 font-bold px-2"
          >
            Upload bukti (opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            placeholder="Upload Bukti"
            id="file-upload"
            onChange={handleUpload}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span className="text-sm">Upload</span>
          </label>
        </div>
        <div className="rounded-xl mt-10 p-4 bg-[#EFF0FB]">
          <DaftarGuruTatib
            onGuruChange={setGuruBidangDiklat}
            onTatibChange={setPetugasTatib}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="mt-4 flex justify-center py-2 px-10 border border-transparent rounded-xl text-sm font-medium text-white bg-[#5662C2] hover:bg-[#434D97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5662C2] delay-150 transition-all duration-150" 
          >
            Kirim
          </button>
        </div>
      </form>

    </div>
  );
};

export default SiswaPage;
