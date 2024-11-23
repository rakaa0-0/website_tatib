"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "./supabaseClient";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import Banner from "../Banner/Banner";
import Image from "next/image";

export default function FormPage() {
  // State untuk setiap input
  const [fullName, setFullName] = useState<string>("");
  const [selectedIzin, setSelectedIzin] = useState<string>("");
  const [selectedKelas, setSelectedKelas] = useState<string>("");
  const [selectedJurusan, setSelectedJurusan] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");
  const [jamKeluar, setJamKeluar] = useState<string>("");
  const [jamKembali, setJamKembali] = useState<string>("");
  const [selectedKodeKelas, setSelectedKodeKelas] = useState<string>("");
  const [mataPelajaran, setMataPelajaran] = useState<string>("");
  const [alasan, setAlasan] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGuru, setSelectedGuru] = useState<string>("");
  const [selectedTatib, setSelectedTatib] = useState<string>("");

  // State untuk daftar guru
  const [guru, setGuru] = useState<{ nama_lengkap: string }[]>([]); // Menyimpan daftar guru

  // Fetching daftar guru dari Supabase
  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const { data, error } = await supabase
          .from("guru") // Ganti "gurus" dengan nama tabel Anda
          .select("nama_lengkap"); // Ganti "name" dengan nama kolom yang berisi nama guru

        if (error) {
          throw error;
        }

        setGuru(data || []); // Menyimpan data guru ke state
      } catch (error) {
        console.error("Error fetching guru:", error);
      }
    };

    fetchGuru();
  }, []); // Dependency array kosong, agar hanya dijalankan sekali setelah komponen mount

  // Handle unggah file
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
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
          upsert: false,
        });

      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        setFileName(file.name);
        console.log("File uploaded successfully!");
      }
    } else {
      console.error("No file selected.");
    }
  };

  // Fungsi untuk submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      nama_lengkap: fullName,
      izin: selectedIzin,
      kelas: selectedKelas,
      jurusan: selectedJurusan,
      tanggal,
      jam_keluar: jamKeluar,
      jam_kembali: jamKembali,
      kode_kelas: selectedKodeKelas,
      mata_pelajaran: mataPelajaran,
      alasan,
      unggah_bukti: fileName,
      guru_bidang_diklat: selectedGuru,
      petugas_tatib: selectedTatib,
    };

    if (
      !fullName ||
      !selectedIzin ||
      !tanggal ||
      !selectedGuru ||
      !selectedTatib
    ) {
      setErrorMessage(
        "Beberapa data wajib diisi. Pastikan nama lengkap, izin, tanggal, guru, dan petugas tatib terisi."
      );
      setShowErrorPopup(true);
      return;
    }

    try {
      const response = await fetch("./api/formsubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        // Do not redirect here, just show the success popup
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Terjadi kesalahan. Coba lagi nanti.");
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 -z-10">
        <Banner />
      </div>

      <div className="container mx-auto px-8 py-[2.2rem]">
        <Card className="max-w-[52rem] mt-20 sm:mt-20 md:mt-60 lg:mt-60 xl:mt-60 rounded-2xl mx-auto p-5 shadow-xl">
          <CardContent className="p-6 ">
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2 ">
                <div className="space-y-2">
                  <Label className="text-label" htmlFor="fullName">
                    Nama Lengkap
                  </Label>
                  <Input
                    className="text-label-input text-[#8F8F8F] leading-tight focus:outline-none focus:shadow-outline"
                    id="fullName"
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-label" htmlFor="izin">
                    Izin
                  </Label>
                  <Select onValueChange={setSelectedIzin}>
                    <SelectTrigger>
                      <SelectValue
                        className="text-label-input "
                        placeholder="Pilih salah satu"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masuk">Masuk</SelectItem>
                      <SelectItem value="keluar">Keluar</SelectItem>
                      <SelectItem value="pulang">Pulang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-label" htmlFor="class">
                    Kelas
                  </Label>
                  <Select onValueChange={setSelectedKelas}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">X</SelectItem>
                      <SelectItem value="11">XI</SelectItem>
                      <SelectItem value="12">XII</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    type="date"
                    id="date"
                    className=" block w-full"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-label" htmlFor="department">
                    Jurusan
                  </Label>
                  <Select onValueChange={setSelectedJurusan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rekayasa Perangkat Lunak">
                        Rekayasa Perangkat Lunak
                      </SelectItem>
                      <SelectItem value="Desain Komunikasi Visual">
                        Desain Komunikasi Visual
                      </SelectItem>
                      <SelectItem value="Perhotelan">Perhotelan</SelectItem>
                      <SelectItem value="Teknik Komputer dan Jaringan">
                        Teknik Komputer dan Jaringan
                      </SelectItem>
                      <SelectItem value="Animasi">Animasi</SelectItem>
                      <SelectItem value="Teknik Grafika">
                        Teknik Grafika
                      </SelectItem>
                      <SelectItem value="Mekatronika">Mekatronika</SelectItem>
                      <SelectItem value="Teknik Logistik">
                        Teknik Logistik
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-label">Jam Ke</Label>
                  <div className="grid grid-cols-3">
                    <Select onValueChange={setJamKeluar}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 (07.00-07.45)">
                          1 (07.00-07.45)
                        </SelectItem>
                        <SelectItem value="2 (07.45-08.30)">
                          2 (07.45-08.30)
                        </SelectItem>
                        <SelectItem value="3 (08.30-09.15)">
                          3 (08.30-09.15)
                        </SelectItem>
                        <SelectItem value="4 (09.15-10.00)">
                          4 (09.15-10.00)
                        </SelectItem>
                        <SelectItem value="5 (10.15-11.00)">
                          5 (10.15-11.00)
                        </SelectItem>
                        <SelectItem value="6 (11.00-11.45)">
                          6 (11.00-11.45)
                        </SelectItem>
                        <SelectItem value="7 (12.15-13.00)">
                          7 (12.15-13.00)
                        </SelectItem>
                        <SelectItem value="8 (13.00-13.45)">
                          8 (13.00-13.45)
                        </SelectItem>
                        <SelectItem value="9 (13.45-14.30)">
                          9 (13.45-14.30)
                        </SelectItem>
                        <SelectItem value="10 (14.30-15.15)">
                          10 (14.30-15.15)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center justify-center">
                      s/d
                    </span>
                    <Select onValueChange={setJamKembali}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 (07.00-07.45)">
                          1 (07.00-07.45)
                        </SelectItem>
                        <SelectItem value="2 (07.45-08.30)">
                          2 (07.45-08.30)
                        </SelectItem>
                        <SelectItem value="3 (08.30-09.15)">
                          3 (08.30-09.15)
                        </SelectItem>
                        <SelectItem value="4 (09.15-10.00)">
                          4 (09.15-10.00)
                        </SelectItem>
                        <SelectItem value="5 (10.15-11.00)">
                          5 (10.15-11.00)
                        </SelectItem>
                        <SelectItem value="6 (11.00-11.45)">
                          6 (11.00-11.45)
                        </SelectItem>
                        <SelectItem value="7 (12.15-13.00)">
                          7 (12.15-13.00)
                        </SelectItem>
                        <SelectItem value="8 (13.00-13.45)">
                          8 (13.00-13.45)
                        </SelectItem>
                        <SelectItem value="9 (13.45-14.30)">
                          9 (13.45-14.30)
                        </SelectItem>
                        <SelectItem value="10 (14.30-15.15)">
                          10 (14.30-15.15)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-label" htmlFor="kodekelas">
                    Kode Kelas
                  </Label>
                  <Select onValueChange={setSelectedKodeKelas}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="H">H</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-label" htmlFor="subject">
                    Mata pelajaran
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Mata Pelajaran"
                    onChange={(e) => setMataPelajaran(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-label" htmlFor="reason">
                  Alasan
                </Label>
                <Input
                  id="classCode"
                  placeholder="Berikan Alasan"
                  onChange={(e) => setAlasan(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-label" htmlFor="proof">
                  Unggah Bukti
                </Label>
                <div className="bg-slate-50 p-4 rounded-lg text-center border-2 border-dashed relative">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer bg-[#EFF0FB]"
                    onChange={handleUpload}
                  />
                  <p className="text-sm text-[#5662C2] ">
                    {fileName
                      ? fileName
                      : "Seret file atau klik tombol dibawah"}
                  </p>

                  <Button
                    variant="secondary"
                    className="mt-3 bg-[#434D97] text-white hover:bg-white border-2 border-[#434D97] hover:text-[#434D97] px-10 rounded-lg"
                    size={"sm"}
                  >
                    Unggah
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 bg-[#EFF0FB] p-5 rounded-lg ">
                <div className="space-y-2">
                  <Label className="text-label" htmlFor="teacher">
                    Guru Bidang Diklat
                  </Label>
                  <Select onValueChange={setSelectedGuru}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      {guru.length > 0 ? (
                        guru.map((guru, index) => (
                          <SelectItem key={index} value={guru.nama_lengkap}>
                            {guru.nama_lengkap}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="no-guru">Tidak ada guru</SelectItem> // Ini menyebabkan error
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-label" htmlFor="teacher">
                    Petugas Tatib / Piket
                  </Label>
                  <Select onValueChange={setSelectedTatib}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sulaimah, S.PdI">
                        Sulaimah, S.PdI
                      </SelectItem>
                      <SelectItem value="Ach. Cholis M. M.PdI">
                        Ach. Cholis M. M.PdI
                      </SelectItem>
                      <SelectItem value="Salwa Erisa, S.Pd">
                        Salwa Erisa, S.Pd
                      </SelectItem>
                      <SelectItem value="Yogi Dian Arinugroho, M.Pd.">
                        Yogi Dian Arinugroho, M.Pd.
                      </SelectItem>
                      <SelectItem value="Fathur Rozi, S.Pd.">
                        Fathur Rozi, S.Pd.
                      </SelectItem>
                      <SelectItem value="M. Rizki Fadillah, S.Kom">
                        M. Rizki Fadillah, S.Kom
                      </SelectItem>
                      <SelectItem value="Nadzifa Kamilia Nada, S.Pd.">
                        Nadzifa Kamilia Nada, S.Pd.
                      </SelectItem>
                      <SelectItem value="Yoga Nugraha, S.Pd">
                        Yoga Nugraha, S.Pd
                      </SelectItem>
                      <SelectItem value="Haryo Guntoro Wicaksono, M.Pd.">
                        Haryo Guntoro Wicaksono, M.Pd.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="bg-[#434D97] text-white hover:bg-white border-2 border-[#434D97] hover:text-[#434D97] px-10 flex mx-auto"
                size="sm"
              >
                Kirim
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="p-4 mt-10">
          <hr className="w-full mx-auto border-[1px] border-[#B0B0B0] my-4" />
        </div>
        <footer className="flex items-center justify-between h-full w-100% sm:w-[90%] xl:w-[90%] mx-auto text-center text-black">
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
      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-600 flex items-center justify-center">
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Sukses!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <DialogDescription className="text-lg">
              Data berhasil disimpan!
            </DialogDescription>
          </div>
          <div className="mt-4  flex justify-center">
            <Button
              className="px-10 flex mx-auto bg-[#E6F6EF] hover:bg-[#00A25E] text-[#00A25E] hover:text-[#E6F6EF]"
              onClick={() => {
                setShowSuccessPopup(false);
                window.location.href = "/PerizinanSiswa/Pending";
              }}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Popup */}
      <Dialog open={showErrorPopup} onOpenChange={setShowErrorPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-red-600 flex items-center justify-center">
              <AlertCircle className="mr-2 h-6 w-6" />
              Error!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <DialogDescription className="text-lg">
              {errorMessage}
            </DialogDescription>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setShowErrorPopup(false)}
              variant="destructive"
              className="px-10 flex mx-auto bg-[#FDE8EA] hover:bg-[#E71D31] text-[#E71D31] hover:text-[#FDE8EA]"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
