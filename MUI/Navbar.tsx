"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";

const pages = ["Products", "Pricing", "Blog"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [backgroundColor, setBackgroundColor] =
    React.useState<string>("transparent");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    <AppBar
      position="static"
      sx={{ color: "#000" }}
      className={`${
        backgroundColor === "transparent"
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    className={`${
                      backgroundColor === "transparent"
                        ? `!text-white`
                        : "text-black"
                    }`}
                  >
                    {page}
                  </Typography>
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
                className={`${
                  backgroundColor === "transparent"
                    ? `!text-white`
                    : "text-black"
                }`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IoLogoWhatsapp size={35} color="blue" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
