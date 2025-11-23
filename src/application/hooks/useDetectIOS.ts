"use client";

import { useEffect } from "react";

export function useDetectIOS() {
  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isIOS) {
      document.documentElement.classList.add("is-ios");
    } else {
      document.documentElement.classList.remove("is-ios");
    }
  }, []);
}
