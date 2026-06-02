import Script from "next/script";
import { PersyncProvider } from "../../components/persync-provider";
import { PersyncShell } from "../../components/persync-shell";

export default function WorkspaceLayout({ children }) {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <PersyncProvider>
        <PersyncShell>{children}</PersyncShell>
      </PersyncProvider>
    </>
  );
}
