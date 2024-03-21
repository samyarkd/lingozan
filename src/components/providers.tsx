"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default Providers;
