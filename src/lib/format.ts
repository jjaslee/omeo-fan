export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatAddress(listing: {
  address: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}): string {
  const street = listing.unit
    ? `${listing.address} ${listing.unit}`
    : listing.address;
  return `${street}, ${listing.city}, ${listing.state} ${listing.zip}`;
}

export function formatStatus(status: string): string {
  const labels: Record<string, string> = {
    active: "For Sale",
    pending: "Pending",
    sold: "Sold",
  };
  return labels[status] ?? status;
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
