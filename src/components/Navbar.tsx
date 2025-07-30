"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const openWaitlistPopup = () => {
    window.dispatchEvent(new CustomEvent("open-waitlist"));
  };

  const goToApply = () => {
    router.push("/apply");
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Nav */}
        <NavBody>
          <NavbarLogo />

          <div className="flex items-center gap-4">
            <NavbarButton onClick={goToApply} variant="secondary">
              Apply
            </NavbarButton>
            <NavbarButton variant="primary" onClick={openWaitlistPopup}>
              Join Waitlist
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  goToApply();
                }}
                variant="primary"
                className="w-full"
              >
                Apply
              </NavbarButton>

              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWaitlistPopup();
                }}
                variant="primary"
                className="w-full"
              >
                Join Waitlist
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
