import type { NavItem } from "@/types/landing";

type FooterSectionProps = {
  items: NavItem[];
};

export function FooterSection({ items }: FooterSectionProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer-wrap">
      <div className="container-shell">
        <div className="site-footer">
          <div className="site-footer-head">
            <p>© {year} Vakitmatik. Tüm hakları saklıdır.</p>
            <p>vakitmatik.com.tr tek sayfa lansman deneyimi</p>
          </div>

          <nav aria-label="Alt menü">
            <ul className="site-footer-links">
              {items.map((item) => (
                <li key={`footer-${item.href}`}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
