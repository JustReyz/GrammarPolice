import { AppProvider } from "@/lib/AppContext";
import AppShell from "@/components/AppShell";

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
