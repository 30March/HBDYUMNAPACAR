from dataclasses import dataclass
from typing import List


@dataclass
class UserPreference:
    jam_lapar: int  # Format 24 jam (0 - 23)
    max_harga: int
    riwayat_favorit: List[str]
    lokasi_radius_km: float


@dataclass
class RestoMenu:
    nama_resto: str
    kategori_makanan: List[str]
    harga_rata_rata: int
    jarak_km: float


class AIFoodDeliveryRecommender:

    def __init__(self, database_resto: List[RestoMenu]):
        self.database_resto = database_resto

    def _hitung_skor(self, resto: RestoMenu, pref: UserPreference) -> float:
        """Menghitung skor kecocokan berdasarkan preferensi user."""
        skor = 0.0

        # 1. Bonus Efisiensi Harga (Semakin di bawah budget, semakin tinggi poinnya)
        selisih_harga = pref.max_harga - resto.harga_rata_rata
        if selisih_harga >= 0:
            skor += 40 + (selisih_harga / pref.max_harga) * 10

        # 2. Skor Jarak (Semakin dekat semakin tinggi poinnya)
        if resto.jarak_km <= pref.lokasi_radius_km:
            skor += 30 * (1 - (resto.jarak_km / pref.lokasi_radius_km))

        # 3. Penyesuaian Jam Lapar
        if 11 <= pref.jam_lapar <= 14 and any(
            k in ["Nasi", "Fast Food", "Bakso", "Mie Ayam", "Mie"]
            for k in resto.kategori_makanan
        ):
            skor += 15
        elif 18 <= pref.jam_lapar <= 21 and any(
            k in ["Sate", "Martabak", "Cafe", "Nasi Goreng", "Steak", "Seafood"]
            for k in resto.kategori_makanan
        ):
            skor += 15

        return skor

    def rekomendasikan(self, pref: UserPreference) -> List[tuple]:
        """Mencari dan memfilter daftar resto yang 100% sesuai dengan input user (Budget, Jarak, & Kategori)."""
        list_rekomendasi = []

        for resto in self.database_resto:
            # 1. Filter Ketat Budget & Jarak
            if (
                resto.harga_rata_rata > pref.max_harga
                or resto.jarak_km > pref.lokasi_radius_km
            ):
                continue

            # 2. Filter Ketat Kategori / Makanan Favorit (Wajib Cocok!)
            if pref.riwayat_favorit:
                cocok_favorit = False
                for fav in pref.riwayat_favorit:
                    for kategori in resto.kategori_makanan:
                        # Pencocokan fleksibel (mengandung kata yang sama)
                        if (
                            fav.strip().lower() in kategori.lower()
                            or kategori.lower() in fav.strip().lower()
                        ):
                            cocok_favorit = True
                            break
                    if cocok_favorit:
                        break

                # Jika sama sekali tidak ada yang cocok dengan favorit user, abaikan resto ini
                if not cocok_favorit:
                    continue

            # Jika lolos semua filter, hitung skor dan masukkan ke daftar
            skor = self._hitung_skor(resto, pref)
            list_rekomendasi.append((resto, skor))

        # Urutkan berdasarkan skor tertinggi ke terendah
        list_rekomendasi.sort(key=lambda x: x[1], reverse=True)

        return list_rekomendasi


def get_user_input() -> UserPreference:
    print("\n--- SILAKAN MASUKKAN PREFERENSI ANDA ---")

    while True:
        try:
            jam = int(
                input(
                    "Jam lapar saat ini (Format 24 Jam, contoh: 12 atau 19): "
                )
            )
            if 0 <= jam <= 23:
                break
            print("❌ Masukkan angka jam antara 0 sampai 23.")
        except ValueError:
            print("❌ Masukkan angka yang valid!")

    while True:
        try:
            budget = int(
                input("Batas maksimal harga makanan (Contoh: 40000): ")
            )
            if budget > 0:
                break
            print("❌ Budget harus lebih besar dari 0.")
        except ValueError:
            print("❌ Masukkan angka yang valid!")

    raw_riwayat = input(
        "Makanan/Kategori favorit (pisahkan dengan koma, contoh: Mie Ayam, Nasi Goreng): "
    )
    riwayat_favorit = [item.strip() for item in raw_riwayat.split(",") if item]

    while True:
        try:
            radius = float(
                input(
                    "Maksimal radius jarak resto dalam km (Contoh: 3.0): "
                )
            )
            if radius > 0:
                break
            print("❌ Radius harus lebih besar dari 0.")
        except ValueError:
            print("❌ Masukkan angka desimal atau bulat yang valid!")

    return UserPreference(
        jam_lapar=jam,
        max_harga=budget,
        riwayat_favorit=riwayat_favorit,
        lokasi_radius_km=radius,
    )


# ==========================================
# EKSEKUSI UTAMA PROGRAM
# ==========================================
if __name__ == "__main__":
    # Database Resto yang Diperbanyak & Bervariasi
    dummy_database = [
        RestoMenu(
            nama_resto="Nasi Goreng Mantap Pak Haji",
            kategori_makanan=["Nasi Goreng", "Nasi"],
            harga_rata_rata=25000,
            jarak_km=1.2,
        ),
        RestoMenu(
            nama_resto="Sushi Kenangan Senja",
            kategori_makanan=["Sushi", "Jepang", "Seafood"],
            harga_rata_rata=65000,
            jarak_km=2.5,
        ),
        RestoMenu(
            nama_resto="Bakso & Mie Ayam Semar",
            kategori_makanan=["Bakso", "Mie Ayam"],
            harga_rata_rata=20000,
            jarak_km=0.8,
        ),
        RestoMenu(
            nama_resto="Mie Ayam Bangka Asli",
            kategori_makanan=["Mie Ayam", "Mie"],
            harga_rata_rata=19000,
            jarak_km=1.0,
        ),
        RestoMenu(
            nama_resto="Mie Ayam & Bakso Solo Barokah",
            kategori_makanan=["Mie Ayam", "Bakso", "Mie"],
            harga_rata_rata=21000,
            jarak_km=1.5,
        ),
        RestoMenu(
            nama_resto="Steak Nikmat Bintang Lima",
            kategori_makanan=["Steak", "Western"],
            harga_rata_rata=120000,
            jarak_km=3.0,
        ),
        RestoMenu(
            nama_resto="Martabak Manis & Asin Nusantara",
            kategori_makanan=["Martabak", "Cemilan"],
            harga_rata_rata=35000,
            jarak_km=1.5,
        ),
        RestoMenu(
            nama_resto="Nasi Bebek Madura Cak Ali",
            kategori_makanan=["Nasi Bebek", "Nasi"],
            harga_rata_rata=30000,
            jarak_km=1.0,
        ),
        RestoMenu(
            nama_resto="Ayam Geprek Sambal Mercon",
            kategori_makanan=["Ayam Geprek", "Nasi", "Fast Food"],
            harga_rata_rata=22000,
            jarak_km=0.5,
        ),
        RestoMenu(
            nama_resto="Sate Madura Asli Cak Amir",
            kategori_makanan=["Sate", "Kambing", "Ayam"],
            harga_rata_rata=32000,
            jarak_km=1.8,
        ),
        RestoMenu(
            nama_resto="Bubur Ayam Spesial Pagi Hari",
            kategori_makanan=["Bubur Ayam", "Sarapan"],
            harga_rata_rata=15000,
            jarak_km=0.9,
        ),
        RestoMenu(
            nama_resto="Mie Gacoan Pedas Mampus",
            kategori_makanan=["Mie", "Fast Food", "Cemilan"],
            harga_rata_rata=18000,
            jarak_km=2.2,
        ),
        RestoMenu(
            nama_resto="Warung Padang Sederhana",
            kategori_makanan=["Nasi Padang", "Nasi", "Rendang"],
            harga_rata_rata=28000,
            jarak_km=1.4,
        ),
        RestoMenu(
            nama_resto="Pizza Italian Corner",
            kategori_makanan=["Pizza", "Western", "Fast Food"],
            harga_rata_rata=85000,
            jarak_km=3.5,
        ),
        RestoMenu(
            nama_resto="Ketoprak & Gado-Gado Betawi",
            kategori_makanan=["Ketoprak", "Gado-Gado", "Sayur"],
            harga_rata_rata=17000,
            jarak_km=1.1,
        ),
        RestoMenu(
            nama_resto="Burger King Express",
            kategori_makanan=["Burger", "Fast Food", "Western"],
            harga_rata_rata=45000,
            jarak_km=2.8,
        ),
        RestoMenu(
            nama_resto="Soto Ayam Lamongan Koya Melimpah",
            kategori_makanan=["Soto", "Nasi", "Kuah"],
            harga_rata_rata=23000,
            jarak_km=1.6,
        ),
        RestoMenu(
            nama_resto="Cafe Kopi Kenangan Senja",
            kategori_makanan=["Cafe", "Kopi", "Cemilan"],
            harga_rata_rata=25000,
            jarak_km=2.0,
        ),
    ]

    ai_engine = AIFoodDeliveryRecommender(dummy_database)

    print("=========================================")
    print("🤖 SISTEM REKOMENDASI AI FOOD DELIVERY")
    print("=========================================")

    user_pref = get_user_input()

    print("\n[AI Menganalisis & Menyaring Restoran secara Ketat...]")

    # Proses Rekomendasi
    hasil_rekomendasi = ai_engine.rekomendasikan(user_pref)

    if hasil_rekomendasi:
        print(
            f"\n✨ AI Menemukan {len(hasil_rekomendasi)} Pilihan yang Sesuai untuk Anda! ✨"
        )
        for i, (resto, skor) in enumerate(hasil_rekomendasi, 1):
            print(f"\n--- Pilihan ke-{i} (Skor Kecocokan: {skor:.1f}) ---")
            print(f"🍽️ Nama Resto       : {resto.nama_resto}")
            print(f"🏷️ Kategori         : {', '.join(resto.kategori_makanan)}")
            print(f"💰 Harga Rata-rata  : Rp {resto.harga_rata_rata:,}")
            print(f"📍 Jarak Resto      : {resto.jarak_km} km")
    else:
        print(
            "\n❌ Maaf, tidak ada resto yang sesuai dengan kategori, budget, dan radius jarak Anda secara bersamaan."
        )