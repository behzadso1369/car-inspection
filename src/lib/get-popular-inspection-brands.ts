import { serverApi } from "@/helper/server-fetcher";
import {
  pickPopularBrands,
  POPULAR_CAR_BRANDS,
  POPULAR_MOTORCYCLE_BRANDS,
} from "@/lib/popular-brands";

export async function getPopularInspectionBrands() {
  const [carData, motorcycleData] = await Promise.all([
    serverApi.get("Site/SearchWithAllData?terms=", 3600),
    serverApi.get("Site/SearchMotorcycleWithAllData?Terms=", 3600),
  ]);

  const carBrands = (carData?.Results ?? []).filter(
    (item: { IsCarBrand?: number }) => item.IsCarBrand == 1,
  );
  const motorcycleBrands = (motorcycleData?.Results ?? []).filter(
    (item: { IsMotorcycleBrand?: number }) => item.IsMotorcycleBrand == 1,
  );

  return {
    cars: pickPopularBrands(carBrands, POPULAR_CAR_BRANDS),
    motorcycles: pickPopularBrands(motorcycleBrands, POPULAR_MOTORCYCLE_BRANDS),
  };
}
