import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useList, useContent } from "./editable";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import Pictures from "./pages/Pictures";
import About from "./pages/About";
import Letter from "./pages/Letter";
import Contact from "./pages/Contact";
import Logo from "./components/Logo";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ContactDock from "./components/ContactDock";
import PhotoCredits from "./components/PhotoCredits";
import Icon from "./components/Icon";
import { PageViews } from "./site";

export default function App() {
  return (
    <div className="min-h-screen bg-ground text-ink font-body">
      <PageViews />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<Destination />} />
          <Route path="/pictures" element={<Pictures />} />
          <Route path="/about" element={<About />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ContactDock />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header() {
  const links = useList<{ label: string; href: string }>("nav.links");
  const cta = useContent<{ label: string; href: string }>("nav.cta");
  const name = useContent<string>("site.name");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ground">
      <div className="mx-auto flex h-[var(--header-h)] max-w-page items-center justify-between px-[var(--gutter)]">
        <Link to="/" aria-label={name} data-testid="nav-home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {links.map((l, i) => (
            <Link key={l.href} to={l.href} className="text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
              <T k={`nav.links.${i}.label`} />
            </Link>
          ))}
          <Link
            to={cta.href}
            data-testid="nav-contact"
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-ink transition-colors duration-[var(--duration-fast)] hover:bg-ink hover:text-ground"
          >
            <T k="nav.cta.label" />
            <Icon name="next" size={16} />
          </Link>
        </nav>
        <div className="lg:hidden">
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-6 px-[var(--gutter)] py-10 font-display text-3xl">
          {links.map((l, i) => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)}>
              <T k={`nav.links.${i}.label`} />
            </Link>
          ))}
          <Link to={cta.href} onClick={() => setOpen(false)} data-testid="nav-contact-mobile">
            <span className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-ground">
              <T k="nav.cta.label" />
              <Icon name="next" size={18} />
            </span>
          </Link>
        </div>
      </MobileMenu>
    </header>
  );
}

function Footer() {
  const name = useContent<string>("site.name");
  const phone = useContent<string>("contact.phone");
  const email = useContent<string>("contact.email");
  const address = useContent<string>("contact.address");
  const hours = useContent<string>("contact.hours");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-page gap-10 px-[var(--gutter)] py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <T k="footer.line" as="p" className="mt-4 max-w-[34ch] text-sm text-ink-soft" />
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <T k="footer.guide" className="label text-ink-soft" />
          <Link to="/destinations" className="text-ink-soft hover:text-ink">
            <T k="nav.links.0.label" />
          </Link>
          <Link to="/pictures" className="text-ink-soft hover:text-ink">
            <T k="nav.links.1.label" />
          </Link>
          <Link to="/letter" className="text-ink-soft hover:text-ink">
            <T k="footer.letter" />
          </Link>
        </nav>
        <nav className="flex flex-col gap-2 text-sm">
          <T k="footer.about" className="label text-ink-soft" />
          <Link to="/about" className="text-ink-soft hover:text-ink">
            <T k="nav.links.2.label" />
          </Link>
          <Link to="/contact" className="text-ink-soft hover:text-ink">
            <T k="nav.cta.label" />
          </Link>
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <T k="footer.reach" className="label text-ink-soft" />
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2">
            <Icon name="phone" size={16} />
            <span className="figures">{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="inline-flex items-center gap-2">
            <Icon name="mail" size={16} />
            {email}
          </a>
          <span className="inline-flex items-start gap-2 text-ink-soft">
            <Icon name="address" size={16} className="mt-1" />
            {address}
          </span>
          <span className="inline-flex items-center gap-2 text-ink-soft">
            <Icon name="hours" size={16} />
            {hours}
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-page px-[var(--gutter)] pb-10 text-xs text-ink-soft">
        <span>{name}</span>
        <PhotoCredits className="mt-2" />
      </div>
    </footer>
  );
}
