/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  Search,
  Check,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChevronClick = () => {
    setIsModalOpen(!isModalOpen);
  };
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <Sidebar className="fixed top-0 left-0 h-full w-64 border-r bg-white">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 hidden lg:block">
              <Image
                src="/icons/sidebar.svg"
                alt="Logo"
                width={1000}
                height={1000}
              />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <Image
              src="/icons/sidebar-info.svg"
              alt="Logo"
              width={1000}
              height={1000}
              className="p-5"
            />
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 bg-[#F0F0F0]">
          {/* Top Navigation */}
          <header className="bg-transparent mt-2">
            <div className="flex items-center justify-between px-6 pt-3">
              <div className="relative flex-1 max-w-[790px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-10 outline-none border-none bg-gray-50 rounded-3xl"
                  placeholder="Search"
                  type="search"
                />
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="p-1">
                  <AvatarImage alt="User" src="/icons/profile.svg" />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <div className="">
                  <div className="text-[10px] font-medium text-[#343B75]">
                    Tatib
                  </div>
                  <div className=" text-[8px] text-gray-500">
                    SMK Negeri 4 Malang
                  </div>
                </div>
                <ChevronDown
                  className="h-4 w-4 text-gray-500 cursor-pointer"
                  onClick={handleChevronClick}
                />
                {isModalOpen && (
                  <div className="absolute right-2 mt-24 w-48 bg-white rounded-xl shadow-lg z-10">
                    <div className="flex items-center p-2 cursor-pointer">
                      <Link href="/signin" className="flex items-center">
                        <LogOut className="mr-2 h-6 w-4 text-[#737373]" />
                        <span className="text-sm font-medium text-[#737373]">
                          Keluar
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Hero Banner */}
          <div className="relative h-[240px]  flex items-center justify-center text-white">
            <div className="absolute p-6">
              <Image
                src="/images/banner-dashboard.svg"
                alt="Logo"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            <div className=" gap-6">
              {/* Permission Table */}
              <div className="lg:col-span-3">
                <div className="container mx-auto px-8 py-[2.2rem]">
                  <Card className="max-w-[52rem] mt-20 sm:mt-20 md:mt-60 lg:mt-60 xl:mt-60 rounded-2xl mx-auto p-5 shadow-xl">
                    <CardContent className="p-6 ">
                      <form className="space-y-6 ">
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
                                <SelectItem value="Perhotelan">
                                  Perhotelan
                                </SelectItem>
                                <SelectItem value="Teknik Komputer dan Jaringan">
                                  Teknik Komputer dan Jaringan
                                </SelectItem>
                                <SelectItem value="Animasi">Animasi</SelectItem>
                                <SelectItem value="Teknik Grafika">
                                  Teknik Grafika
                                </SelectItem>
                                <SelectItem value="Mekatronika">
                                  Mekatronika
                                </SelectItem>
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
                                <SelectItem value="Yogi Dian Arinugroho, M.Pd.">
                                  Yogi Dian Arinugroho, M.Pd.
                                </SelectItem>
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
              </div>

              {/* Permission Stats */}
              <div>
                {/* first */}
                <Card className="mb-6 bg-transparent border-none shadow-none"></Card>
                {/* end */}
                <Card className="mb-6 border-none shadow-none"></Card>
                {/* second */}
                <Card className="mb-6 border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium"></CardTitle>
                    <div className="text-left mb-6">
                      <div className="text-[11px] flex justify-between font-semibold text-[#5F6CD5] left-0"></div>
                    </div>
                  </CardHeader>
                </Card>
                {/* end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
    </SidebarProvider>
  );
}
