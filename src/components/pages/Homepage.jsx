import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiSpeakerSlash } from "react-icons/pi";
import { A11y, Navigation } from "swiper/modules";
import Button from "../atoms/Button";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import MovieCard from "../molecules/MovieCard";
import MovieListPortrait from "../templates/MovieListPortrait";
import {
  getTrending, addTrending, updateTrending, deleteTrending,
  getRilsBaru, addRilsBaru, updateRilsBaru, deleteRilsBaru,
} from "../../services/api/movieApi";

const movies = [
  { id: 1, title: "Don't Look Up", image: "/img/poster/landscape/landscape10.png", rating: "4.5/5" },
  { id: 2, title: "The Batman", image: "/img/poster/landscape/landscape9.png", rating: "4.2/5" },
  { id: 3, title: "A Man Called Otto", image: "/img/poster/landscape/landscape8.png", rating: "4.6/5" },
  { id: 4, title: "Blue Lock", image: "/img/poster/landscape/landscape4.png", rating: "4.4/5" },
  { id: 5, title: "Shazam!", image: "/img/poster/landscape/landscape1.png", rating: "4.5/5" },
];

const MovieTopToday = [
  { id: 1, title: "Don't Look Up", image: "/img/poster/portrait/p1.png", rating: "4.5/5" },
  { id: 2, title: "The Batman", image: "/img/poster/portrait/p2.png", rating: "4.2/5" },
  { id: 3, title: "Blue Lock", image: "/img/poster/portrait/p3.png", rating: "4.6/5" },
  { id: 4, title: "A Man Called Otto", image: "/img/poster/portrait/p4.png", rating: "4.4/5" },
  { id: 5, title: "Shazam!", image: "/img/poster/portrait/p5.png", rating: "4.5/5" },
];

const Homepage = () => {
  const [filmTrending, setFilmTrending] = useState([]);
  const [rilsBaru, setRilsBaru] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [form, setForm] = useState({ title: "", image: "", rating: "" });
  const [konfirmasiOpen, setKonfirmasiOpen] = useState(false);
  const [filmYangAkanDihapus, setFilmYangAkanDihapus] = useState(null);
  const [sectionHapus, setSectionHapus] = useState("");
  const [toast, setToast] = useState({ show: false, pesan: "", tipe: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, rils] = await Promise.all([
          getTrending(),
          getRilsBaru(),
        ]);
        setFilmTrending(trending);
        setRilsBaru(rils);
      } catch (err) {
        tampilkanToast("Gagal memuat data!", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tampilkanToast = (pesan, tipe = "sukses") => {
    setToast({ show: true, pesan, tipe });
    setTimeout(() => setToast({ show: false, pesan: "", tipe: "" }), 3000);
  };

  const bukaModalTambah = (section) => {
    setIsEdit(false);
    setActiveSection(section);
    setForm({ title: "", image: "", rating: "" });
    setModalOpen(true);
  };

  const bukaModalEdit = (film, section) => {
    setIsEdit(true);
    setActiveSection(section);
    setSelectedFilm(film);
    setForm({ title: film.title, image: film.image, rating: film.rating });
    setModalOpen(true);
  };

  const tutupModal = () => {
    setModalOpen(false);
    setIsEdit(false);
    setSelectedFilm(null);
    setForm({ title: "", image: "", rating: "" });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const tambahFilm = async () => {
    try {
      const filmBaru = { title: form.title, image: form.image, rating: form.rating };
      if (activeSection === "trending") {
        const result = await addTrending(filmBaru);
        setFilmTrending((prev) => [...prev, result]);
      } else {
        const result = await addRilsBaru(filmBaru);
        setRilsBaru((prev) => [...prev, result]);
      }
      tutupModal();
      tampilkanToast(`"${form.title}" berhasil ditambahkan!`, "sukses");
    } catch {
      tampilkanToast("Gagal menambahkan film!", "error");
    }
  };

  const editFilm = async () => {
    try {
      const judulLama = selectedFilm.title;
      const updated = { title: form.title, image: form.image, rating: form.rating };
      if (activeSection === "trending") {
        const result = await updateTrending(selectedFilm.id, updated);
        setFilmTrending((prev) => prev.map((f) => (f.id === selectedFilm.id ? result : f)));
      } else {
        const result = await updateRilsBaru(selectedFilm.id, updated);
        setRilsBaru((prev) => prev.map((f) => (f.id === selectedFilm.id ? result : f)));
      }
      tutupModal();
      tampilkanToast(`"${judulLama}" berhasil diperbarui!`, "sukses");
    } catch {
      tampilkanToast("Gagal mengupdate film!", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.image || !form.rating) {
      tampilkanToast("Semua field harus diisi!", "error");
      return;
    }
    if (isEdit) {
      editFilm();
    } else {
      tambahFilm();
    }
  };

  const bukaKonfirmasiHapus = (film, section) => {
    setFilmYangAkanDihapus(film);
    setSectionHapus(section);
    setKonfirmasiOpen(true);
  };

  const tutupKonfirmasi = () => {
    setKonfirmasiOpen(false);
    setFilmYangAkanDihapus(null);
    setSectionHapus("");
  };

  const hapusFilm = async () => {
    try {
      const judul = filmYangAkanDihapus.title;
      if (sectionHapus === "trending") {
        await deleteTrending(filmYangAkanDihapus.id);
        setFilmTrending((prev) => prev.filter((f) => f.id !== filmYangAkanDihapus.id));
      } else {
        await deleteRilsBaru(filmYangAkanDihapus.id);
        setRilsBaru((prev) => prev.filter((f) => f.id !== filmYangAkanDihapus.id));
      }
      tutupKonfirmasi();
      tampilkanToast(`"${judul}" berhasil dihapus!`, "hapus");
    } catch {
      tampilkanToast("Gagal menghapus film!", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#181A1C]">
        <p className="text-white text-xl">Memuat data...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-[#181A1C] gap-15">

      {toast.show && (
        <div className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${
          toast.tipe === "sukses" ? "bg-green-700" :
          toast.tipe === "hapus" ? "bg-orange-700" :
          "bg-red-700"
        }`}>
          {toast.pesan}
        </div>
      )}

      <section className="w-full h-[360px] lg:h-[587px] flex justify-center relative">
        <img className="w-full object-cover" src="/img/poster/landscape/hero.png" alt="" />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-[#181A1C] z-10"></div>
        <div className="text-white absolute top-8 left-0 bottom-0 z-20 w-full h-full flex flex-col justify-center items-start gap-6 px-5 py-2 lg:px-[80px] lg:py-[25px]">
          <div className="flex flex-col gap-[12px] lg:gap-[20px]">
            <h1 className="text-[24px] lg:text-[48px] font-bold">Duty After School</h1>
            <p className="text-[12px] lg:text-[18px] font-medium line-clamp-3 lg:w-4xl">
              Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
              Departemen Pertahanan mulai merekrut lebih banyak tentara,
              termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang
              garis depan dalam perang.
            </p>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-row gap-2">
              <Button type="button" variant="primary">Mulai</Button>
              <Button type="button" variant="secondary" iconLeft={<IoMdInformationCircleOutline />}>Selengkapnya</Button>
              <Button type="button" variant="outlined">18+</Button>
            </div>
            <div>
              <Button type="button" variant="outlined" className="rounded-full">
                <PiSpeakerSlash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col gap-10 overflow-hidden">

        <section className="w-full pl-5 pr-0 lg:px-[80px] relative">
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">Melanjutkan Tonton Film</h2>
          <Swiper
            modules={[Navigation, A11y]}
            loop={true}
            grabCursor={true}
            navigation={{ nextEl: ".next-lanjut", prevEl: ".prev-lanjut" }}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {movies.map((film) => (
              <SwiperSlide key={film.id}>
                <MovieCard image={film.image} title={film.title} rating={film.rating} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="prev-lanjut hidden lg:flex items-center justify-center bg-[#2F3334] hover:bg-black text-white rounded-full w-10 h-10 cursor-pointer absolute top-[55%] left-15 -translate-y-1/2 z-10">
            <FaArrowLeft />
          </div>
          <div className="next-lanjut hidden lg:flex items-center justify-center bg-[#2F3334] hover:bg-black text-white rounded-full w-10 h-10 cursor-pointer absolute top-[55%] right-15 -translate-y-1/2 z-10">
            <FaArrowRight />
          </div>
        </section>

        <section className="w-full pl-5 pr-0 lg:px-[80px] relative">
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">Top Rating Film dan Series Hari ini</h2>
          <Swiper
            modules={[Navigation, A11y]}
            loop={true}
            grabCursor={true}
            navigation={{ nextEl: ".next-top", prevEl: ".prev-top" }}
            breakpoints={{
              320: { slidesPerView: 3.2, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {MovieTopToday.map((film) => (
              <SwiperSlide key={film.id}>
                <MovieCard image={film.image} title={film.title} rating={film.rating} isPortrait={true} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="prev-top hidden lg:flex items-center justify-center bg-[#2F3334] hover:bg-black text-white rounded-full w-10 h-10 cursor-pointer absolute top-[55%] left-15 -translate-y-1/2 z-10">
            <FaArrowLeft />
          </div>
          <div className="next-top hidden lg:flex items-center justify-center bg-[#2F3334] hover:bg-black text-white rounded-full w-10 h-10 cursor-pointer absolute top-[55%] right-15 -translate-y-1/2 z-10">
            <FaArrowRight />
          </div>
        </section>

        <MovieListPortrait
          sectionTitle="Film Trending"
          films={filmTrending}
          section="trending"
          onTambah={() => bukaModalTambah("trending")}
          onEdit={(film) => bukaModalEdit(film, "trending")}
          onHapus={(film) => bukaKonfirmasiHapus(film, "trending")}
          showCRUD={true}
        />

        <MovieListPortrait
          sectionTitle="Rilis Baru"
          films={rilsBaru}
          section="rilis"
          onTambah={() => bukaModalTambah("rilis")}
          onEdit={(film) => bukaModalEdit(film, "rilis")}
          onHapus={(film) => bukaKonfirmasiHapus(film, "rilis")}
          showCRUD={true}
        />

      </section>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4">
          <div className="bg-[#2F3334] rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-white text-lg font-bold">
                {isEdit ? "Edit Film" : "Tambah Film"}
              </h2>
              <button onClick={tutupModal} className="text-gray-400 hover:text-white text-xl font-bold">x</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-300 text-sm">Judul Film</label>
                <input type="text" name="title" value={form.title} onChange={handleInput}
                  placeholder="Contoh: Avatar 2"
                  className="w-full px-4 py-2 rounded-lg bg-[#181A1C] text-white border border-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-300 text-sm">URL Gambar</label>
                <input type="text" name="image" value={form.image} onChange={handleInput}
                  placeholder="Contoh: /img/poster/portrait/p1.png"
                  className="w-full px-4 py-2 rounded-lg bg-[#181A1C] text-white border border-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-300 text-sm">Rating</label>
                <input type="text" name="rating" value={form.rating} onChange={handleInput}
                  placeholder="Contoh: 4.5/5"
                  className="w-full px-4 py-2 rounded-lg bg-[#181A1C] text-white border border-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="submit"
                  className="flex-1 bg-[#09147A] hover:bg-[#192DB7] text-white py-2 rounded-2xl font-semibold">
                  {isEdit ? "Simpan Perubahan" : "Tambah Film"}
                </button>
                <button type="button" onClick={tutupModal}
                  className="flex-1 bg-[#3D4142] hover:bg-[#2F3334] text-white py-2 rounded-2xl font-semibold">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {konfirmasiOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4">
          <div className="bg-[#2F3334] rounded-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-white text-lg font-bold mb-2">Hapus Film?</h2>
            <p className="text-gray-400 text-sm mb-6">
              Kamu yakin ingin menghapus{" "}
              <span className="text-white font-semibold">"{filmYangAkanDihapus?.title}"</span>?
              <br />Film yang dihapus tidak bisa dikembalikan.
            </p>
            <div className="flex gap-3">
              <button onClick={hapusFilm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-2xl font-semibold">
                Ya, Hapus
              </button>
              <button onClick={tutupKonfirmasi}
                className="flex-1 bg-[#3D4142] hover:bg-[#2F3334] text-white py-2 rounded-2xl font-semibold">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default Homepage;