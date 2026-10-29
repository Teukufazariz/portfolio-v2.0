import Sheet from "@/components/Sheet";

// The sheet lives in the layout so it stays open while paging between projects.
export default function SheetLayout({ children }: { children: React.ReactNode }) {
  return <Sheet>{children}</Sheet>;
}
