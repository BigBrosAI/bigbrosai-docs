import type { Metadata } from "next";
import { EndpointPage } from "@/components/docs/EndpointPage";
import { ENDPOINTS } from "@/lib/docs-data";

export const metadata: Metadata = { title: "Update Contact" };

export default function Page() {
  return <EndpointPage endpoint={ENDPOINTS["send-message"]} />;
}
