"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";

import { NoSsr } from "@/components/core/no-ssr";
import Image from "next/image";

const HEIGHT = 60;
const WIDTH = 60;

type Color = "dark" | "light";

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({
  color = "dark",
  emblem,
  height = HEIGHT,
  width = WIDTH,
}: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url =
      color === "light"
        ? "/assets/logo-emblem.svg"
        : "/assets/logo-emblem--dark.svg";
  } else {
    url = color === "light" ? "/assets/logo.svg" : "/assets/logo--dark.svg";
  }

  return (
    // <Box alt="logo" component="img" height={height} src={url} width={width} />
    // <Image
    //   className="cursor-pointer"
    //   height={84}
    //   width={120}
    //   src={color === "dark" ? "/KCDLogoW.png" : "/KCDLogoB.png"}
    //   alt="Navbar Icon"
    // />
    <Box
      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
      className="items-center gap-8"
    >
      <Image
        className="cursor-pointer"
        height={84}
        width={100}
        src={color === "dark" ? "/KCDLogoW.png" : "/KCDLogoB.png"}
        alt="Navbar Icon"
      />
      <Image
        className="cursor-pointer"
        height={70}
        width={124}
        src={
          color === "dark" ? "/CloudNativeLogoW.png" : "/CloudNativeLogoB.png"
        }
        alt="Navbar Icon"
      />
    </Box>
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = "light",
  colorLight = "dark",
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? colorDark : colorLight;

  return (
    <NoSsr
      fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}
    >
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
