import { AptusFooter } from "@/components/aptus/AptusFooter";
import { AptusNav } from "@/components/aptus/AptusNav";
import { AptusCartProvider } from "@/components/aptus/AptusCart";

export default function AptusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AptusCartProvider>
      <AptusNav />
      {children}
      <AptusFooter />
    </AptusCartProvider>
  );
}
