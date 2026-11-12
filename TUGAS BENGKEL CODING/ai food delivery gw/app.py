from dataclasses import dataclass
from typing import List
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@dataclass
class UserPreference:
    jam_lapar: int
    max_harga: int
    riwayat_favorit: List[str]
    lokasi_radius_km: float

@dataclass
class RestoMenu:
    id: int
    nama_resto: str
    kategori_makanan: List[str]
    harga_rata_rata: int
    jarak_km: float
    lat: float
    lng: float

class AIFoodDeliveryRecommender:
    def __init__(self, database_resto: List[RestoMenu]):
        self.database_resto = database_resto

    def _hitung_skor(self, resto: RestoMenu, pref: UserPreference) -> float:
        skor = 0.0
        selisih_harga = pref.max_harga - resto.harga_rata_rata
        if selisih_harga >= 0:
            skor += 40 + (selisih_harga / pref.max_harga) * 10

        if resto.jarak_km <= pref.lokasi_radius_km:
            skor += 30 * (1 - (resto.jarak_km / pref.lokasi_radius_km))

        if 11 <= pref.jam_lapar <= 14 and any(k in ["Nasi", "Fast Food", "Bakso", "Mie Ayam", "Mie"] for k in resto.kategori_makanan):
            skor += 15
        elif 18 <= pref.jam_lapar <= 21 and any(k in ["Sate", "Martabak", "Cafe", "Nasi Goreng", "Steak", "Seafood"] for k in resto.kategori_makanan):
            skor += 15

        return skor

    def rekomendasikan(self, pref: UserPreference) -> List[tuple]:
        list_rekomendasi = []
        for resto in self.database_resto:
            if resto.harga_rata_rata > pref.max_harga or resto.jarak_km > pref.lokasi_radius_km:
                continue

            if pref.riwayat_favorit:
                cocok_favorit = False
                for fav in pref.riwayat_favorit:
                    for kategori in resto.kategori_makanan:
                        if fav.strip().lower() in kategori.lower() or kategori.lower() in fav.strip().lower():
                            cocok_favorit = True
                            break
                    if cocok_favorit:
                        break
                if not cocok_favorit:
                    continue

            skor = self._hitung_skor(resto, pref)
            list_rekomendasi.append((resto, skor))

        list_rekomendasi.sort(key=lambda x: x[1], reverse=True)
        return list_rekomendasi

# Database Resto Dummy dengan Koordinat Peta (Contoh area pusat kota)
dummy_database = [
    RestoMenu(1, "Nasi Goreng Mantap Pak Haji", ["Nasi Goreng", "Nasi"], 25000, 1.2, -6.200000, 106.816666),
    RestoMenu(2, "Sushi Kenangan Senja", ["Sushi", "Jepang", "Seafood"], 65000, 2.5, -6.210000, 106.822222),
    RestoMenu(3, "Bakso & Mie Ayam Semar", ["Bakso", "Mie Ayam"], 20000, 0.8, -6.195000, 106.810000),
    RestoMenu(4, "Mie Ayam Bangka Asli", ["Mie Ayam", "Mie"], 19000, 1.0, -6.205000, 106.825000),
    RestoMenu(5, "Steak Nikmat Bintang Lima", ["Steak", "Western"], 120000, 3.0, -6.220000, 106.830000),
    RestoMenu(6, "Martabak Manis & Asin Nusantara", ["Martabak", "Cemilan"], 35000, 1.5, -6.190000, 106.815000),
    RestoMenu(7, "Ayam Geprek Sambal Mercon", ["Ayam Geprek", "Nasi", "Fast Food"], 22000, 0.5, -6.198000, 106.812000),
    RestoMenu(8, "Sate Madura Asli Cak Amir", ["Sate", "Kambing", "Ayam"], 32000, 1.8, -6.215000, 106.805000),
    RestoMenu(9, "Mie Gacoan Pedas Mampus", ["Mie", "Fast Food", "Cemilan"], 18000, 2.2, -6.185000, 106.835000),
    RestoMenu(10, "Burger King Express", ["Burger", "Fast Food", "Western"], 45000, 2.8, -6.225000, 106.818000),
]

ai_engine = AIFoodDeliveryRecommender(dummy_database)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/rekomendasi", methods=["POST"])
def api_rekomendasi():
    data = request.json
    try:
        jam = int(data.get("jam_lapar", 12))
        budget = int(data.get("max_harga", 50000))
        radius = float(data.get("lokasi_radius_km", 5.0))
        raw_fav = data.get("riwayat_favorit", "Nasi, Fast Food")
        riwayat_favorit = [item.strip() for item in raw_fav.split(",") if item]

        user_pref = UserPreference(
            jam_lapar=jam,
            max_harga=budget,
            riwayat_favorit=riwayat_favorit,
            lokasi_radius_km=radius
        )

        hasil = ai_engine.rekomendasikan(user_pref)
        
        response_data = []
        for resto, skor in hasil:
            response_data.append({
                "id": resto.id,
                "nama_resto": resto.nama_resto,
                "kategori_makanan": resto.kategori_makanan,
                "harga_rata_rata": resto.harga_rata_rata,
                "jarak_km": resto.jarak_km,
                "skor": round(skor, 1),
                "lat": resto.lat,
                "lng": resto.lng
            })

        return jsonify({"status": "success", "data": response_data})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)