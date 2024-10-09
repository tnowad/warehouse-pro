import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={"block md:hidden"}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <div>user</div>
        </div>
      </nav>
    </header>
  );
}
