import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Ambil data dari body request
    const {
      nama_lengkap,
      izin,
      kelas,
      jurusan,
      tanggal,
      jam_keluar,
      jam_kembali,
      kode_kelas,
      mata_pelajaran,
      alasan,
      unggah_bukti,
      guru_bidang_diklat,
      petugas_tatib,
    } = req.body;

    // Validasi input data
    if (!nama_lengkap || !izin || !tanggal || !guru_bidang_diklat || !petugas_tatib) {
      return res.status(400).json({
        message: "Beberapa data wajib tidak lengkap. Pastikan nama lengkap, izin, tanggal, guru, dan petugas tatib terisi.",
      });
    }

    try {
      // Jika ada unggah bukti, proses file
      let fileUrl = null;
      if (unggah_bukti && unggah_bukti.name) {
        // Proses upload file ke Supabase Storage (pastikan bucket sudah ada)
        const { data, error: uploadError } = await supabase.storage
          .from("bukti_storage")  // Gantilah dengan nama bucket yang sesuai
          .upload(`bukti/${Date.now()}_${unggah_bukti.name}`, unggah_bukti);

        if (uploadError) {
          throw new Error("File upload failed: " + uploadError.message);
        }

        fileUrl = `https://your-project-id.supabase.co/storage/v1/object/public/bukti_storage/${data.path}`;
      }

      // Masukkan data ke dalam tabel `perizinan_siswa`
      const { data, error } = await supabase
        .from("perizinan_siswa")
        .insert([
          {
            nama_lengkap,
            izin,
            kelas,
            jurusan,
            tanggal,
            jam_keluar,
            jam_kembali,
            kode_kelas,
            mata_pelajaran,
            alasan,
            unggah_bukti: fileUrl,  // Menyimpan URL file yang di-upload
            guru_bidang_diklat,
            petugas_tatib,
          },
        ]);

      if (error) {
        throw error;
      }

      res.status(200).json({
        message: "Data berhasil disimpan",
        data,
      });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({
        message: "Terjadi kesalahan saat menyimpan data",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
