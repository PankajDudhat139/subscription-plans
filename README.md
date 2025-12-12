# Product & Coupon Data Reference

This document describes the structure and configuration of the `products.json` file used in the project.  
It defines available products, associated images, class-based card colors, plan details, and valid coupon codes.

---

## 📦 File Location
`public/data/products.json`

---

## 🖼️ Product Images

| Product        | Image Name         | Path                           | Status |
|----------------|-------------------|----------------------------------|---------|
| **Jio Hotstar** | `jio-hotstar.jpg` | `/images/jio-hotstar.jpg` | ✅ Working |
| **Netflix** | `netflix.png` | `/images/netflix.png` | ✅ Working |
| **Prime Video** | `prime.jpg` | `/images/prime.png` | ✅ Working |
| **Zee5** | `zee5.png` | `/images/zee5.png` | ⚙️ Placeholder |
| **Sony Liv** | `sony-liv.png` | `/images/sony-liv.png` | ⚙️ Placeholder |
| **Spotify** | `spotify.jpg` | `/images/spotify.png` | ⚙️ Placeholder |
| **Crunchyroll** | `crunchy-roll.png` | `/images/crunchy-roll.png` | ⚙️ Placeholder |
| **ALT Balaji** | `altt-balaji.png` | `/images/altt-balaji.png` | ⚙️ Placeholder |
| **Ullu** | `ullu.png` | `/images/ullu.png` | ⚙️ Placeholder |
| **FanCode** | `fan-code.png` | `/images/fan-code.png` | ⚙️ Placeholder |
| **Discovery Plus** | `discovery-plus.png` | `/images/discovery-plus.png` | ⚙️ Placeholder |
| **Aha** | `aha.png` | `/images/aha.jpg` | ⚙️ Placeholder |
| **YouTube Premium** | `youtube-premium.jpg` | `/images/youtube-premium.png` | ⚙️ Placeholder |
| **FapHouse** | `fap-house.png` | `/images/fap-house.png` | ⚙️ Placeholder |

> Only the above image names are active and used in this configuration.  
> All other `.card.*` CSS classes are available for future extension.

---

## 🎨 Card Class and Accent Color Mapping

| Class Name | Example Product | Accent Color | Transparent Color |
|-------------|----------------|---------------|-------------------|
| `.netflix` | Netflix | `#d1050f` | `rgba(209, 5, 15, 0.25)` |
| `.prime-video` | Prime Video | `#0677ff` | `rgba(6, 119, 255, 0.25)` |
| `.jio-hotstar` | Jio Hotstar | `#903de2` | `rgba(144, 61, 226, 0.25)` |
| `.zee5` | Zee5 | `#fdb704` | `rgba(253, 183, 4, 0.25)` |
| `.sony-liv` | SonyLiv | `#b030ef` | `rgba(176, 48, 239, 0.25)` |
| `.spotify` | Spotify | `#21d760` | `rgba(33, 215, 96, 0.25)` |
| `.crunchy-roll` | Crunchyroll | `#ff5e00` | `rgba(255, 94, 0, 0.25)` |
| `.altt-balaji` | ALTBalaji | `#ff0468` | `rgba(255, 4, 104, 0.25)` |
| `.ullu` | Ullu | `#f6b818` | `rgba(246, 184, 24, 0.25)` |
| `.fan-code` | FanCode | `#ff5000` | `rgba(255, 80, 0, 0.25)` |
| `.discovery-plus` | Discovery+ | `#22cce6` | `rgba(34, 204, 230, 0.25)` |
| `.aha` | Aha | `#ff5000` | `rgba(255, 80, 0, 0.25)` |
| `.youtube-premium` | YouTube Premium | `#fe0000` | `rgba(254, 0, 0, 0.25)` |
| `.fap-house` | FapHouse | `#f0b801` | `rgba(240, 184, 1, 0.25)` |

> These variables are used by Tailwind/CSS to theme product cards dynamically.  
> If a `.card.<class>` is missing, default colors will be applied.

---

## 🧩 Product Structure Example

Each product in the JSON follows this format:

```json
{
  "id": "1",
  "title": "Jio Hotstar",
  "image": "./images/jio-hotstar.jpg",
  "class": "jio-hotstar",
  "categories": {
    "mobile": {
      "description": [
        "✔ 2-screen/Sharing Account",
        "🔐 Stable Login / No Logout issues",
        "✔ Customer Support: 9:00 AM To 11:30 PM"
      ],
      "options": [
        { "label": "1-Month Premium 4K", "price": 60 },
        { "label": "6-Month Premium 4K", "price": 299 }
      ]
    },
    "tv": {
      "description": [
        "✔ 2-screen/Sharing Account",
        "🔐 Stable Login / No Logout issues",
        "✔ Customer Support: 9:00 AM To 11:30 PM"
      ],
      "options": [
        { "label": "1-Month Premium 4K", "price": 69 },
        { "label": "6-Month Premium 4K", "price": 349 }
      ]
    }
  }
}
