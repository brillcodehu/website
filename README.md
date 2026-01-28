# BrillCode Landing Page

Professzionális, konverziófókuszú landing oldal a BrillCode szolgáltatáshoz.

## Technológiák

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3.4**
- **Framer Motion** (animációk)
- **TypeScript**

## Futtatás

### 1. Függőségek telepítése

```bash
npm install
```

### 2. Fejlesztői szerver indítása

```bash
npm run dev
```

A weboldal elérhető lesz: [http://localhost:3000](http://localhost:3000)

### 3. Produkciós build

```bash
npm run build
npm start
```

## Testreszabás

### Szövegek módosítása

A szövegek az egyes komponensekben találhatók:

| Tartalom | Fájl |
|----------|------|
| Hero szekció | `components/Hero.tsx` |
| Probléma szekció | `components/Problem.tsx` |
| Megoldás szekció | `components/Solution.tsx` |
| Demó szekció | `components/Demo.tsx` |
| Árazás | `components/Pricing.tsx` |
| Vélemények | `components/Testimonials.tsx` |
| Összehasonlítás | `components/Comparison.tsx` |
| Garancia | `components/RiskReversal.tsx` |
| GYIK | `components/FAQ.tsx` |
| Megrendelő űrlap | `components/OrderForm.tsx` |
| Footer | `components/Footer.tsx` |

### Ár módosítása

Az ár több helyen szerepel:
- `components/Hero.tsx` - Hero szekcióban
- `components/Pricing.tsx` - Árazás kártyán
- `components/OrderForm.tsx` - Megrendelő gombban
- `components/StickyHeader.tsx` - Ragadós fejlécben
- `components/MobileBottomCTA.tsx` - Mobil alsó CTA-ban

Keress rá a `9 400` vagy `9400` kifejezésre és cseréld ki.

### Színek módosítása

A színpaletta a `tailwind.config.ts` fájlban található:

```typescript
colors: {
  cream: { ... },    // Háttér (off-white)
  petrol: { ... },   // Elsődleges szín (mély kék)
  teal: { ... },     // Másodlagos szín (zöld)
  lime: { ... },     // CTA szín (sárga-zöld)
}
```

### Űrlap backend bekötése

Az `components/OrderForm.tsx` fájlban a `handleSubmit` függvényben cseréld ki a szimulált küldést a valódi API hívásra:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Ide jön a valódi API hívás
  const response = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  // ...
};
```

### SEO és metaadatok

A metaadatok az `app/layout.tsx` fájlban találhatók:
- `metadata` objektum - title, description, OpenGraph, Twitter
- `jsonLd` objektum - Schema.org strukturált adatok

### Google Analytics

Állítsd be a `NEXT_PUBLIC_GA_ID` környezeti változót:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Fájlstruktúra

```
brillcode/
├── app/
│   ├── globals.css      # Globális stílusok
│   ├── layout.tsx       # Layout + SEO
│   └── page.tsx         # Főoldal
├── components/
│   ├── Hero.tsx         # Hero szekció
│   ├── Problem.tsx      # Probléma szekció
│   ├── Solution.tsx     # Megoldás szekció
│   ├── Demo.tsx         # Vizuális demó
│   ├── Pricing.tsx      # Árazás
│   ├── Testimonials.tsx # Vélemények
│   ├── Comparison.tsx   # Összehasonlító táblázat
│   ├── RiskReversal.tsx # Garancia szekció
│   ├── FAQ.tsx          # Gyakori kérdések
│   ├── OrderForm.tsx    # Megrendelő űrlap
│   ├── StickyHeader.tsx # Ragadós fejléc
│   ├── MobileBottomCTA.tsx # Mobil CTA
│   └── Footer.tsx       # Lábléc
├── lib/
│   └── countdown.ts     # Visszaszámláló logika
├── tailwind.config.ts   # Tailwind konfiguráció
├── package.json
└── README.md
```

## Deploy

### Vercel (ajánlott)

1. Push-old a kódot GitHubra
2. Importáld a projektet a [Vercel](https://vercel.com)-en
3. A build automatikusan megtörténik

### Más hosting

```bash
npm run build
```

A `.next` mappa tartalmát töltsd fel a szervereddel, és futtasd:

```bash
npm start
```

Vagy statikus exporthoz:

```bash
npm run build
npx next export
```

Az `out` mappa tartalma bármilyen statikus hostingra feltölthető.

## Licenc

© 2024 BrillCode. Minden jog fenntartva.
