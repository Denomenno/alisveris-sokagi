# Shopping Street (Flonga 2009) — Orijinal Oyunun Ekonomi Matematiği

Kaynak: `Shopping-Street.swf` (archive.org) → JPEXS FFDec ile decompile edilen ActionScript
(`fai/logic/DataProxy.as`, `Level.as`, `goals/BuyerGoal.as`, `BuyingGoal.as`, `SeatsGoal.as`, `Consts.as`).
Tüm değerler koddan birebir alınmıştır.

## Seviyeler (16 adet)
Başlangıç parası HER seviyede 5.050$ (kodda sabitlenmiş).

| # | Gün | Hedef | | # | Gün | Hedef |
|---|-----|-------|---|---|-----|-------|
| 1 | 5  | 7.600    | | 9  | 22 | 530.000 |
| 2 | 8  | 21.000   | | 10 | 24 | 670.000 |
| 3 | 10 | 42.000   | | 11 | 25 | 750.000 |
| 4 | 12 | 81.000   | | 12 | 26 | 840.000 |
| 5 | 14 | 138.000  | | 13 | 27 | 940.000 |
| 6 | 16 | 190.000  | | 14 | 28 | 1.000.000 |
| 7 | 18 | 285.000  | | 15 | 29 | 1.100.000 |
| 8 | 20 | 390.000  | | 16 | 30 | 1.220.000 |

## Günlük müşteri sayısı
`20 + min(2·(gün−1), 35) + 2·max(gün−5, 0)`
→ 1. gün 20, 5. gün 28, 10. gün 48, 20. gün 85, 30. gün 105.

## Müşteri cüzdanı (gün bazlı!)
`30 × gün` (tavan 1.178$) → 1. gün 30$, 5. gün 150$, 10. gün 300$, 30. gün 900$.
Cüzdan SEVİYEYE değil, seviye içindeki GÜNE bağlı — her seviye "fakir müşterilerle" başlar,
pahalı dükkanlar ancak ilerleyen günlerde karşılığını verir. Doğal zorluk eğrisi budur.

## Dükkanlar
| Dükkan | Kurulum | Satış fiyatı | Koltuk | Servis hızı* |
|---|---|---|---|---|
| Boutique     | 2.500  | 50  | 4  | 1.00 (en hızlı) |
| Pet Shop     | 3.000  | 75  | 5  | 0.80 |
| Toy Store    | 7.000  | 40  | 6  | 0.60 |
| Jewelry      | 15.000 | 70  | 8  | 0.20 |
| Restaurant   | 20.000 | 25  | 10 | 0.10 (en yavaş) |
| Electronics  | 25.000 | 80  | 9  | 0.40 |
| Furniture    | 35.000 | 100 | 8  | 0.30 |
| Supermarket  | 55.000 | 150 | 20 | 0.15 |

*Servis hızı = koltuk ilerleme çarpanı; düşük = müşteri içeride uzun kalır.
Tasarım ekseni: ucuz dükkan az koltuk + hızlı devir; pahalı dükkan çok koltuk + yavaş devir.

## Yükseltme matematiği
- Kurulum: L2'ye çıkmak = 2×taban, L3'e çıkmak = 3×taban (maks dükkan toplam 6×taban eder).
- Satış fiyatı: L2 = 1,5×, L3 = 2× taban.
- Koltuk: L2 = 2×, L3 = 3× taban.
- (Boutique istisnası: L2+ iken servis hızı 0.7'ye sabitlenir.)

## Müşteri davranışı (kritik kurallar)
1. **Tip başına 1 alışveriş:** müşteri her DÜKKAN TİPİNDEN yalnız 1 kez alır
   (`hasBuyings(shopType)`). Alışveriş sayısı limiti YOK — 8 farklı tip varsa 8 kez alabilir.
   Aynı tipten 2. dükkan açmak o müşteriden ekstra satış getirmez → strateji = ÇEŞİTLİLİK.
2. **Sabit fiyat:** ödeme = min(dükkan fiyatı, kalan cüzdan). Rastgelelik YOK — ekonomi deterministik.
3. Koltuk doluysa müşteri "hungry" işareti gösterir ve yoluna devam eder (beklemez).
4. **Parası biten müşteri 1,4× hızlı yürür** (sokaktan hızla çıkar).
5. **Mükemmel gün bonusu:** günün TÜM müşterileri cüzdanını sıfırlayarak çıktıysa +1.000$.
6. Skor = kazanılan paranın 1/5'i.

## Ekstralar
| Ekstra | Fiyat | Etki |
|---|---|---|
| Bench (bank) | 150 | Müşteriyi yavaşlatır/oturtur (3 kişilik) |
| Music Box | 800 | Reklamla müşteri çeker |
| Newspaper Box | 1.000 | Gazete satışı (5$/adet) |
| Bus Stop | 5.000 | Her gün +10 müşteri |

## Bizim oyuna uyarlanabilecek dersler
- (A) "En fazla 2 dükkan" yerine "her tipten 1 kez al" kuralı → çeşitlilik stratejisi.
- (B) Rastgele tutar yerine sabit fiyat + cüzdan tavanı → öngörülebilir, "kusursuz" ekonomi.
- (C) Cüzdanı güne bağlamak (30×gün gibi) → seviye içi doğal zorluk eğrisi.
- (D) Mükemmel gün bonusu → beceri ödülü.
- (E) Meteliksiz müşterinin hızlanması → ucuz ve hoş detay.
- (F) Koltuk sayısı × servis süresi ekseni → dükkan kimlikleri (az+hızlı vs çok+yavaş).
