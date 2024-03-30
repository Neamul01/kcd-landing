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
  // const { data: user } = useUser();
  const pathname = usePathname();

  const [backgroundColor, setBackgroundColor] =
    React.useState<string>("transparent");
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // ---------define where the header should transparent
  const isTransparent = () => {
    return backgroundColor === "transparent" &&
      !pathname.includes("/auth") &&
      !pathname.includes("/conditions")
      ? true
      : false;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setBackgroundColor("#ffffff"); // Change to white when scrolled
      } else {
        setBackgroundColor("transparent"); // Back to transparent when at top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {pathname.includes("/dashboard") ? null : (
        <AppBar
          position="static"
          sx={{ color: "#000" }}
          className={`${
            isTransparent()
              ? `bg-transparent shadow-none !text-white`
              : "bg-white"
          } sticky top-0 z-50`}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                className="items-center gap-8"
              >
                <Image
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                  height={84}
                  width={120}
                  src={isTransparent() ? "/KCDLogoW.png" : "/KCDLogoB.png"}
                  alt="Navbar Icon"
                />
                <Image
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                  height={200}
                  width={144}
                  src={
                    isTransparent()
                      ? "/CloudNativeLogoW.png"
                      : "/CloudNativeLogoB.png"
                  }
                  alt="Navbar Icon"
                />
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
                          isTransparent() ? `!text-white` : "text-black"
                        } capitalize text-center`}
                      >
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                sx={{ display: { xs: "flex", md: "none" } }}
                className="items-center gap-8"
              >
                <Image
                  height={84}
                  width={120}
                  src={"/KCDLogoB.png"}
                  alt="Navbar Icon"
                />
                <Image
                  height={70}
                  width={144}
                  src={"/CloudNativeLogoB.png"}
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
                      isTransparent() ? `!text-white` : "text-black"
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
                    className={`capitalize ${isTransparent() ? "text-white" : "text-black"} font-medium text-lg`}
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
                      className={`capitalize ${isTransparent() ? "text-white" : "text-black"} font-medium text-lg`}
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
        </AppBar>
      )}
    </>
  );
}
export default Navbar;
