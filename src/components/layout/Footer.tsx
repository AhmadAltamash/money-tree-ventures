import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { footerLinkGroups } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socialLinkStyles =
  "flex size-11 items-center justify-center rounded-lg border border-border transition duration-300 ease-base hover:bg-foreground/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function Footer() {
  return (
    <footer className="bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="body-6 mt-4 max-w-96 text-muted">{siteConfig.description}</p>
            <ul className="mt-6 flex gap-3">
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram par follow karein"
                  className={socialLinkStyles}
                >
                  <InstagramLogo aria-hidden="true" size={20} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook par follow karein"
                  className={socialLinkStyles}
                >
                  <FacebookLogo aria-hidden="true" size={20} />
                </a>
              </li>
            </ul>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="title-4">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="body-6 inline-block rounded-lg py-1 text-muted transition duration-300 ease-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="caption-2 mt-12 max-w-170 text-muted">
          Yahan ke kits seekhne ke liye banaye gaye hain. Kamai aapki mehnat, samay aur halaat par nirbhar karti hai,
          isliye hum kisi bhi income ya result ki guarantee nahi dete.
        </p>

        <p aria-hidden="true" className="heading-2 mt-12 select-none overflow-hidden text-foreground/10">
          {siteConfig.name}
        </p>

        <p className="caption-2 mt-6 text-muted">
          © {siteConfig.launchYear} {siteConfig.name}. Sabhi adhikar surakshit.
        </p>
      </Container>
    </footer>
  );
}
