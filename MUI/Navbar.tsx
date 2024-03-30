"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useUser } from "@/hooks/use-user";

const pages = [
  {
    name: "About us",
    link: "#about-us",
  },
  {
    name: "Speakers",
    link: "#speakers",
  },
  {
    name: "Schedule",
    link: "#schedule",
  },
  {
    name: "Venue",
    link: "#venue",
  },
  {
    name: "Sponsors & Partners",
    link: "#sponsors",
  },
  {
    name: "Organizers & Volunteers",
    link: "#organizers",
  },
  {
    name: "Buy Ticket",
    link: "#buy-ticket",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);
  // const { data: user } = useUser();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = currentScrollPos > prevScrollPos;

      if (currentScrollPos < 200) {
        setShowNavbar(true);
      } else {
        setShowNavbar(!isScrolledDown);
      }
      setPrevScrollPos(currentScrollPos);

      const scrollTop = window.pageYOffset;
      const isScrolling = scrollTop > 0;
      setIsScrolled(isScrolling);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      {pathname.includes("/dashboard") ? null : (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            transition:
              "transform 0.5s ease-in-out, background-color 0.5s ease, color 0.5s ease,padding-y 0.5s ease",
            transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
            backgroundColor:
              isScrolled || !isHomePage ? "#ffffff" : "transparent",
            color: isScrolled || !isHomePage ? "#000000" : "#ffffff",
            py: 1,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                className="items-center gap-8"
              >
                <div className="cursor-pointer transition-opacity duration-500">
                  <Image
                    onClick={() => router.push("/")}
                    height={84}
                    width={120}
                    src={!isScrolled ? "/KCDLogoW.png" : "/KCDLogoB.png"}
                    alt="Navbar Icon"
                  />
                </div>
                <div className="cursor-pointer transition-opacity duration-500">
                  <Image
                    onClick={() => router.push("/")}
                    height={200}
                    width={144}
                    src={
                      !isScrolled
                        ? "/kcd-logo/cncf-logo-300.png"
                        : "/kcd-logo/cncf-logo-black-300.png"
                    }
                    alt="Navbar Icon"
                  />
                </div>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link
                        href={page.link}
                        key={page.link}
                        className={`${
                          !showNavbar || !isScrolled || !isHomePage
                            ? `!text-white `
                            : "text-black "
                        } capitalize text-center transition-all duration-500`}
                      >
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                sx={{ display: { xs: "flex", md: "none" } }}
                className="items-center gap-8 py-2"
              >
                <Image
                  height={84}
                  width={120}
                  src={!isScrolled ? "/KCDLogoW.png" : "/KCDLogoB.png"}
                  alt="Navbar Icon"
                />
                <Image
                  height={70}
                  width={144}
                  src={
                    !isScrolled
                      ? "/kcd-logo/cncf-logo-300.png"
                      : "/kcd-logo/cncf-logo-black-300.png"
                  }
                  alt="Navbar Icon"
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  paddingLeft: 10,
                }}
              >
                {pages.map((page) => (
                  <Link
                    href={page.link}
                    key={page.link}
                    // onClick={handleCloseNavMenu}
                    // sx={{ my: 2, display: "block" }}
                    className={`${
                      !showNavbar || !isScrolled || !isHomePage
                        ? `!text-white  transition-all duration-500`
                        : "text-black  transition-all duration-500"
                    } capitalize my-1 px-3`}
                  >
                    {page.name}
                  </Link>
                ))}
              </Box>

              {/* {user ? (
                <Button
                  className="border-secondary border"
                  variant="outlined"
                  onClick={() => router.push("/dashboard")}
                >
                  <span
                    className={`capitalize ${!showNavbar ? "text-white" : "text-black"} font-medium text-lg`}
                  >
                    Dashboard
                  </span>
                </Button>
              ) : (
                <Box
                  sx={{
                    flexGrow: 0,
                    display: { xs: "none", md: "flex", gap: 6 },
                  }}
                >
                  <Button
                    className="border-secondary border"
                    variant="outlined"
                    onClick={() => router.push("/auth/sign-in")}
                  >
                    <span
                      className={`capitalize ${!showNavbar ? "text-white" : "text-black"} font-medium text-lg`}
                    >
                      Sign In
                    </span>
                  </Button>

                  <Button
                    className="border-secondary border bg-secondary/80 "
                    variant="outlined"
                    onClick={() => router.push("/auth/sign-up")}
                  >
                    <span className="capitalize text-white font-medium text-lg">
                      Sign Up
                    </span>
                  </Button>
                </Box>
              )} */}
            </Toolbar>
          </Container>
        </Box>
      )}
    </>
  );
}
export default Navbar;
