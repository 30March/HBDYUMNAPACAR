import sys
import time

# Lirik "Self Aware" - Temper City
lyrics_data = [
    ("God, you look so pretty", 1.2),
    ("When you tell me that you love me", 2.0),
    ("I wish that I could lie", 1.5),
    ("But my mind gets in the way", 2.5),
]


def play_lyrics():
    print("\n---  Playing: Temper City - Self Aware  ---\n")
    time.sleep(1)

    for line, delay in lyrics_data:
        # Efek animasi ketik per karakter
        for char in line:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(0.06)  # Kecepatan mengetik per karakter

        print()  # Pindah baris
        time.sleep(delay)  # Jeda sebelum baris berikutnya

    print("\n--- End  ---")


if __name__ == "__main__":
    play_lyrics()