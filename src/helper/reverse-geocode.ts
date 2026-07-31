const MAPIR_API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY1YjA0NzRiNDcwNzU3Mjc1YWI1OGM2MDJkNzEzMDAzNTM1N2I0MzhjN2I0NzI2YzlmOTM0ZWM1OWI5YTUxOGFhMzk1YTIyNzU1NDYxYzExIn0.eyJhdWQiOiIzOTA3MyIsImp0aSI6IjY1YjA0NzRiNDcwNzU3Mjc1YWI1OGM2MDJkNzEzMDAzNTM1N2I0MzhjN2I0NzI2YzlmOTM0ZWM1OWI5YTUxOGFhMzk1YTIyNzU1NDYxYzExIiwiaWF0IjoxNzc2NTE5NTc3LCJuYmYiOjE3NzY1MTk1NzcsImV4cCI6MTc3OTExMTU3Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OqnxVLlwjC450rJJZZ7g5ff7WZt3_14ERUGMOvdV-2RhDE3ftG6q_XXE1HG2KjpNsvMkTe23TNzwi4PAHHSaq1mo1cvERg47iJdHpjAwqmrD-bbfVRfowx6n1iPFMHCaZ2jKgDyi86rwB8DL5u_2Xf_Tv4BhR_5dy5ywDJHs0DaabmKhlvfukzNzaTznzr8SLrG1kON9vKBL5f6ynxRXDhzeubv4d_vX9Nok8dyUEs9gklAlVjfStwJfbQlq5Sb7jk-RrPj0PZ7o3D8m_W8tBkJMK9qYynAScxkFLJJF98fcgbMrF7yGLAMmb2-5nWdHPsxL9lWdylqHqa3A2kkp0w";

export interface GeocodedAddress {
  city: string;
  street: string;
  plaque: string;
  lat: number;
  lng: number;
}

function pickStreetFromNominatim(addr: Record<string, string>): string {
  const parts = [
    addr.neighbourhood,
    addr.suburb,
    addr.road,
    addr.pedestrian,
    addr.footway,
    addr.residential,
  ].filter(Boolean);
  return parts.join("، ") || addr.display_name || "";
}

async function reverseWithMapir(lat: number, lng: number): Promise<GeocodedAddress | null> {
  const res = await fetch(`https://map.ir/reverse?lat=${lat}&lon=${lng}`, {
    headers: {
      "x-api-key": MAPIR_API_KEY,
      "Mapir-SDK": "reactjs",
    },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const city =
    data.city ||
    data.province ||
    data.county ||
    data.state ||
    "تهران";
  const street =
    data.address_compact ||
    data.address ||
    [data.neighbourhood, data.primary, data.road].filter(Boolean).join("، ");

  return {
    city: String(city).trim(),
    street: String(street).trim(),
    plaque: data.number ? String(data.number) : data.plaque ? String(data.plaque) : "",
    lat,
    lng,
  };
}

async function reverseWithNominatim(lat: number, lng: number): Promise<GeocodedAddress> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "json");
  url.searchParams.set("accept-language", "fa");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "CarmacheckCarInspection/1.0" },
  });
  const data = await res.json();
  const addr = data.address ?? {};

  return {
    city:
      addr.city ||
      addr.town ||
      addr.village ||
      addr.state ||
      addr.province ||
      "تهران",
    street: pickStreetFromNominatim({ ...addr, display_name: data.display_name }),
    plaque: addr.house_number ? String(addr.house_number) : "",
    lat,
    lng,
  };
}

export async function reverseGeocode(lat: number, lng: number): Promise<GeocodedAddress> {
  try {
    const mapir = await reverseWithMapir(lat, lng);
    if (mapir?.street) return mapir;
  } catch {
    /* fallback below */
  }
  return reverseWithNominatim(lat, lng);
}
