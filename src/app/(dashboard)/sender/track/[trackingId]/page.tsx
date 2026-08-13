import { ParcelTracker } from "@/components/dashboard/sender/parcel-tracker";

export default async function TrackParcelPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  return <ParcelTracker trackingId={decodeURIComponent(trackingId)} />;
}
