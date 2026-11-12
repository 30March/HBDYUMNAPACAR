import time
import sys
def karaoke_menari_nari_part2():
    # Format: (Lirik, kecepatan per huruf, jeda antar baris)
    lyrics = [
        ("Dan ku berdoa...", 0.08, 1.0),
        ("Tuhan pertemukan dia dengan yang dia suka", 0.07, 1.2),
        ("Insan yang baik, maka berhenti", 0.08, 1.0),
        ("Kukagumimu...", 0.09, 1.5),
        ("Terima kasihku, Ima ucapkan", 0.08, 1.0),
        ("Karena pernah warnai sejarah", 0.08, 1.2),
        ("Kini ku sudah belajar karenamu", 0.08, 1.2),
        ("Meski sulit kulihat senyummu", 0.08, 1.0),
        ("Bukan karenaku...", 0.09, 1.5),
        ("Tanpa waktu, bukan kuasa kita", 0.08, 1.2),
        ("Andai ku bisa kuputar kembali waktu bersama", 0.07, 1.2),
        ("Ku ingin kembali...", 0.09, 1.0),
        ("Kucium, kucium kembali", 0.08, 1.2),
        ("Betapa bodohnya kita yang muda", 0.08, 1.5),
        ("Maka berhenti...", 0.09, 1.0),
        ("Kukagumimu.", 0.09, 2.0)
    ]

    print("\n==========================================")
    print("   🎵 Raim Laode - Menari-nari (Part 2) 🎵   ")
    print("==========================================\n")
    
    time.sleep(1.5)

    for line, char_speed, line_pause in lyrics:
        for char in line:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(char_speed)
        print()  # Pindah baris
        time.sleep(line_pause)

    print("\n==========================================")

if __name__ == "__main__":
    karaoke_menari_nari_part2()