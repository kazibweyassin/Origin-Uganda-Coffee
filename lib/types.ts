export type CoffeeLot = {
  id: string; slug: string; name: string; code: string; coffeeType: string; variety: string;
  origin: string; region: string; altitude: string; grade: string; screenSize: string;
  process: string; cropYear: string; moisture: string; defects: string; cupScore?: string;
  cupProfile: string[]; availableQuantity: string; moq: string; packaging: string[];
  certifications: string[]; traceability: string; fobPrice: string; status: "AVAILABLE" | "LIMITED" | "FORWARD_CONTRACT";
  officialRegion: string; eudrReadiness: "READY" | "IN_PROGRESS" | "NOT_REQUIRED";
  documents: string[]; image: string; featured?: boolean;
};
