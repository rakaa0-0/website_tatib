/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "./supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/router";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChevronClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<Permissions[]>([]);
  const [monthlyCount, setMonthlyCount] = useState(0);
 // Tambahkan state untuk loading


 useEffect(() => {
  const fetchPermissions = async () => {
    setLoading(true); // Mulai loading
    try {
      const { data, error } = await supabase
        .from("perizinan_siswa") // Ganti dengan nama tabel yang sesuai
        .select("*");

      if (error) throw error;

      setPermissions(data); // Set data ke state permissions

      // Menghitung jumlah izin yang diajukan pada bulan ini
      const currentMonth = new Date().getMonth(); // Mendapatkan bulan sekarang (0-11)
      const currentYear = new Date().getFullYear(); // Mendapatkan tahun sekarang

      const filteredPermissions = data.filter((permission: Permissions) => {
        const permissionDate = new Date(permission.tanggal); // Mengubah tanggal izin menjadi objek Date
        return (
          permissionDate.getMonth() === currentMonth &&
          permissionDate.getFullYear() === currentYear
        );
      });

      setMonthlyCount(filteredPermissions.length); // Set jumlah izin bulan ini
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false); // Hentikan loading setelah selesai
    }
  };

  fetchPermissions();
}, []);

  // Dalam useEffect
  interface Permissions {
    id: number;
    nama_lengkap: string; // Nama lengkap siswa
    izin: string; // Jenis izin atau status izin
    alasan: string;
    tanggal: string // Alasan pengajuan izin
    act: string; // Status (misal: disetujui, ditolak)
  }

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true); // Mulai loading
      try {
        const response = await fetch("/api/permissions");
        const data = await response.json();
        setPermissions(data); // Set data ke state permissions
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false); // Hentikan loading setelah selesai
      }
    };

    fetchPermissions();
  }, []);

  const handleApproveClick = (studentId: number) => {
    setSelectedStudent(studentId);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (studentId: number) => {
    setSelectedStudent(studentId);
    setIsRejectModalOpen(true);
  };

  const handleApprove = () => {
    // Add your approval logic here
    setIsApproveModalOpen(false);
    setSelectedStudent(null);
  };

  const handleReject = async () => {
    if (selectedStudent !== null) { // Pastikan selectedStudent berisi ID
      try {
        const { data, error } = await supabase
          .from('perizinan_siswa') // Nama tabel di Supabase
          .delete()
          .eq('id', selectedStudent); // Menghapus berdasarkan ID siswa (pastikan selectedStudent adalah number)
  
        if (error) throw error;
  
        // Perbarui daftar permissions di state setelah penghapusan
        setPermissions((prevPermissions) =>
          prevPermissions.filter((permission) => permission.id !== selectedStudent) // Menghapus berdasarkan ID
        );
  
        console.log('Data berhasil dihapus:', data);
      } catch (error) {
        console.error('Error menghapus data:', error);
      }
    }
  
    // Tutup modal dan reset state
    setIsRejectModalOpen(false);
    setSelectedStudent(null); // Reset selectedStudent setelah penghapusan
  };
  

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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Permission Table */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto rounded-xl p-1">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50">
                          <tr className="text-sm text-[#7F89DD]">
                            <th className="py-3 px-4 text-left font-medium">
                              No
                            </th>
                            <th className="py-3 px-4 text-left font-medium">
                              Nama Lengkap
                            </th>
                            <th className="py-3 px-4 text-left font-medium">
                              Izin
                            </th>
                            <th className="py-3 px-4 text-left font-medium">
                              Alasan
                            </th>
                            <th className="py-3 px-4 text-left font-medium">
                              Detail
                            </th>
                            <th className="py-3 px-4 text-left font-medium">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {loading ? (
                            <tr>
                              <td colSpan={6} className="text-center">
                                Loading...
                              </td>
                            </tr>
                          ) : permissions.length > 0 ? (
                            permissions.map((permission, index) => (
                              <tr key={permission.id} className="text-sm">
                                <td className="py-3 px-4 text-[#434D97]">
                                  {index + 1}
                                </td>
                                <td className="py-3 px-4 font-semibold text-[#434D97]">
                                  {permission.nama_lengkap}
                                </td>
                                <td className="py-3 px-4 text-[#737373]">
                                  {permission.izin}
                                </td>
                                <td className="py-3 px-4 text-[#737373]">
                                  {permission.alasan}
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="link"
                                    className="text-[#5F6CD5]"
                                  >
                                    Lihat
                                  </Button>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="h-7 w-7 p-0 rounded-full bg-[#E6F6EF] hover:bg-[#E6F6EF]"
                                      onClick={() =>
                                        handleApproveClick(permission.id)
                                      }
                                    >
                                      <Check className="h-4 w-4 text-[#00A25E]" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="h-7 w-7 p-0 rounded-full bg-[#FDE8EA] hover:bg-[#FDE8EA]"
                                      onClick={() =>
                                        handleRejectClick(permission.id)
                                      }
                                    >
                                      <X className="h-4 w-4 text-[#E71D31]" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="text-[#434D97] font-semibold text-center">
                                Data tidak tersedia
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Permission Stats */}
              <div>
                {/* first */}
                <Card className="mb-6 bg-transparent border-none shadow-none">
                  <div className="">
                    <h1 className="text-base font-semibold">Jumlah Izin</h1>
                    <p className="text-[11px] text-[#737373]">
                      Izin siswa setiap bulan ditampilkan disini.
                    </p>
                  </div>
                </Card>
                {/* end */}
                <Card className="mb-6 border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-[#8F8F8F]">
                      Sebanyak
                    </CardTitle>
                    <div className="text-left mb-6">
                      <div className="text-2xl font-medium">{loading ? "Loading..." : monthlyCount} siswa</div>
                      <div className="text-[11px] flex justify-between font-semibold text-[#5F6CD5]">
                        Melakukan izin bulan ini
                        <Link href={"https://docs.google.com/spreadsheets/d/1ZtdQOiuWgbJg4tFYW6J-6kVBL7VvWNGXFy_XIGsSrmE/edit?hl=id&gid=0#gid=0"}>
                          <ChevronRight className="w-4 h-4 ml-1 bg-[#5F6CD5] rounded-full text-white" />
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                {/* second */}
                <Card className="mb-6 border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      <div className="">
                        <h1 className="text-base font-semibold">Izin Siswa</h1>
                        <p className="text-[10px] font-normal text-[#737373]">
                          Tetap pantau dengan presentase siswa
                        </p>
                      </div>
                    </CardTitle>
                    <div className="text-left mb-6">
                      <div className="text-[11px] flex justify-between font-semibold text-[#5F6CD5] left-0">
                        <svg className="w-[40%] h-[50%]" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="#818CF8" />
                          <path
                            d="M50 10 A40 40 0 0 1 90 50 L50 50 Z"
                            fill="#34D399"
                          />
                          <path
                            d="M90 50 A40 40 0 0 1 50 90 L50 50 Z"
                            fill="#F87171"
                          />
                        </svg>
                        <div className="bottom-0 right-0 text-[8px] space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#818CF8] rounded-full" />
                            <span className="text-black font-medium">
                              Disetujui:
                            </span>
                            <span>3 izin</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#34D399] rounded-full" />
                            <span className="text-black font-medium">
                              Menunggu persetujuan:
                            </span>
                          </div>
                          <span className="ml-2">3 izin</span>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#F87171] rounded-full" />
                            <span className="text-black font-medium">
                              Ditolak Bulan Ini:
                            </span>
                            <span>3 izin</span>
                          </div>
                        </div>
                      </div>
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
      {/* MODAL APPROVE */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-[250px] flex flex-col justify-center items-center mx-auto">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center text-[19px] font-bold">
              Setujui izin siswa?
            </DialogTitle>
            <DialogDescription className="text-center text-black">
              Apakah anda yakin
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-2">
            <Button
              type="button"
              className="bg-[#FAF3EC] text-[#CE863D] hover:bg-[#FAF3EC] hover:text-[#CE863D] outline-none border-none "
              onClick={() => setIsApproveModalOpen(false)}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              className="bg-[#E6F6EF]  text-[#00A25E] hover:bg-[#E6F6EF] hover:text-[#00A25E]"
              onClick={handleApprove}
            >
              Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* MODAL REJECT */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-[250px] flex flex-col justify-center items-center mx-auto">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center text-[19px] font-bold">
              Tolak izin siswa?
            </DialogTitle>
            <DialogDescription className="text-center text-black">
              Apakah anda yakin
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-2">
            <Button
              type="button"
              className="bg-[#FAF3EC] text-[#CE863D] hover:bg-[#FAF3EC] hover:text-[#CE863D] outline-none border-none "
              onClick={() => setIsRejectModalOpen(false)}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              className="bg-[#FDE8EA]  text-[#E71D31] hover:bg-[#FDE8EA] hover:text-[#E71D31]"
              onClick={handleReject}
            >
              Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
