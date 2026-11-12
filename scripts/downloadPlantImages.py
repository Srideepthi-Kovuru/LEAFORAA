import json
import os
import time
import urllib.parse
import urllib.request

plants = [
    ("snake-plant", "Dracaena trifasciata"),
    ("money-plant", "Epipremnum aureum"),
    ("peace-lily", "Spathiphyllum wallisii"),
    ("zz-plant", "Zamioculcas zamiifolia"),
    ("rubber-plant", "Ficus elastica"),
    ("areca-palm", "Dypsis lutescens"),
    ("aloe-vera", "Aloe vera plant"),
    ("jade-plant", "Crassula ovata"),
    ("echeveria", "Echeveria"),
    ("hibiscus", "Hibiscus rosa-sinensis"),
    ("jasmine", "Jasminum sambac"),
    ("rose", "Rosa hybrid garden rose flower"),
    ("bougainvillea", "Bougainvillea glabra flower"),
    ("neem", "Azadirachta indica neem tree"),
    ("tulsi", "Ocimum tenuiflorum holy basil"),
    ("lavender", "Lavandula angustifolia purple flowers"),
    ("chrysanthemum", "Chrysanthemum morifolium flower"),
    ("marigold", "Tagetes erecta orange flower"),
    ("lemon", "Citrus limon"),
    ("guava", "Psidium guajava"),
    ("chilli", "Capsicum annuum"),
    ("tomato", "Solanum lycopersicum"),
    ("mint", "Mentha plant"),
    ("boston-fern", "Nephrolepis exaltata"),
    ("spider-plant", "Chlorophytum comosum"),
    ("pothos-marble-queen", "Epipremnum aureum Marble Queen"),
    ("philodendron-heartleaf", "Philodendron hederaceum"),
]

os.makedirs("public/images/plants", exist_ok=True)
attr_file = "public/images/plants/ATTRIBUTION.json"

try:
    with open(attr_file, encoding="utf-8") as f:
        attributions = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    attributions = []

known = {item["plantId"] for item in attributions}

for plant_id, botanical_name in plants:
    target = f"public/images/plants/{plant_id}.jpg"

    if os.path.exists(target) and os.path.getsize(target) > 10000:
        print(f"SKIP: {plant_id} (photo already exists)")
        continue

    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {botanical_name}",
        "gsrnamespace": 6,
        "gsrlimit": 10,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "iiurlwidth": 900,
        "format": "json",
    }

    api = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(
        api, headers={"User-Agent": "LeaforaPlantCatalog/1.0"}
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read())

        pages = data.get("query", {}).get("pages", {})
        candidates = sorted(
            pages.values(),
            key=lambda p: (
                botanical_name.lower() not in p.get("title", "").lower(),
                len(p.get("title", ""))
            )
        )

        success = False
        for page in candidates:
            info = page.get("imageinfo", [{}])[0]
            image_url = info.get("thumburl") or info.get("url")
            if not image_url:
                continue

            try:
                req = urllib.request.Request(
                    image_url, headers={"User-Agent": "LeaforaPlantCatalog/1.0"}
                )
                with urllib.request.urlopen(req, timeout=40) as response:
                    content_type = response.headers.get("Content-Type", "")
                    image_bytes = response.read()

                if not content_type.startswith("image/") or len(image_bytes) < 5000:
                    continue

                with open(target, "wb") as f:
                    f.write(image_bytes)

                meta = info.get("extmetadata", {})
                if plant_id not in known:
                    attributions.append({
                        "plantId": plant_id,
                        "botanicalName": botanical_name,
                        "commonsFile": page.get("title", ""),
                        "sourceUrl": info.get("descriptionurl", ""),
                        "artist": meta.get("Artist", {}).get("value", ""),
                        "license": meta.get("LicenseShortName", {}).get("value", ""),
                        "credit": meta.get("Credit", {}).get("value", ""),
                    })
                    known.add(plant_id)

                print(f"DOWNLOADED: {plant_id} -> {page.get('title')}")
                success = True
                break
            except Exception:
                continue

        if not success:
            print(f"NOT FOUND: {plant_id}")

    except Exception as error:
        print(f"ERROR: {plant_id}: {error}")

    time.sleep(0.5)

with open(attr_file, "w", encoding="utf-8") as f:
    json.dump(attributions, f, indent=2, ensure_ascii=False)

print("\nDownload process completed.")
