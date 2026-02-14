import type { NavItem } from "@/types/landing";

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  return (
    <header className="site-nav-wrap">
      <div className="container-shell">
        <div className="site-nav">
          <a href="#urun" className="site-brand">
            vakitmatik.com.tr
          </a>

          <nav aria-label="Bölüm navigasyonu" className="site-nav-scroll">
            <ul className="site-nav-list">
              {items.map((item) => (
                <li key={item.href}>
                  <a className="site-nav-pill" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
