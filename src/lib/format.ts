export function formatPrice(price: number, isSample?: boolean): string {
  if (isSample || price === 0) return "Available upon request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSampleListingTitle(listing: {
  address?: string;
  city: string;
  property_type?: string;
  is_sample?: boolean;
}): string {
  if (listing.address && listing.address !== "Sample Listing") {
    return listing.address;
  }
  const typeLabel =
    listing.property_type === "Condo"
      ? "Condo"
      : listing.property_type === "Single Family"
        ? "Home"
        : "Property";
  return `${listing.city} ${typeLabel} Listing Preview`;
}

export function formatAddress(listing: {
  address: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  is_sample?: boolean;
  property_type?: string;
}): string {
  if (listing.is_sample) {
    return formatSampleListingTitle(listing);
  }
  const street = listing.unit
    ? `${listing.address} ${listing.unit}`
    : listing.address;
  const zipPart = listing.zip ? ` ${listing.zip}` : "";
  return `${street}, ${listing.city}, ${listing.state}${zipPart}`;
}

export function formatStatus(status: string, isSample?: boolean): string {
  if (isSample) {
    return status === "sold"
      ? "Sample sold-property layout"
      : "Sample listing layout";
  }
  const labels: Record<string, string> = {
    active: "For Sale",
    pending: "Pending",
    sold: "Sold",
  };
  return labels[status] ?? status;
}

export function formatSampleSubLabel(isSample: boolean, status: string): string | null {
  if (!isSample) return null;
  return status === "sold"
    ? "Closed transaction details pending client approval"
    : "Listing details pending client approval";
}

export function formatSoldDate(date?: string): string | null {
  if (!date) return null;
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export function hasSampleListings(
  listings: { is_sample?: boolean }[],
): boolean {
  return listings.some((l) => l.is_sample);
}
