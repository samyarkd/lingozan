"use client";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const MoreInfoDrawer = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className="text-primary underline mx-auto w-full -mb-2 mt-auto">
          More Explanation
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hello dudes</DialogTitle>
            <DialogDescription>This is a simple test</DialogDescription>
          </DialogHeader>
          <div className="p-4">Dude</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className="text-primary underline mx-auto w-full -mb-2 mt-auto">
        More Explanation
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Hello dudes</DrawerTitle>
          <DrawerDescription>This is a simple test</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Dude</div>
      </DrawerContent>
    </Drawer>
  );
};

export default MoreInfoDrawer;
