"use client"

// import { Sidebar } from "./_components/sidebar";
import { Sidebar, SidebarBody, SidebarLink } from "../../../components/ui/sidebar";
import React, { useState } from "react";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { logout } from "@/actions/logout";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

interface SidebarCmpProps {
  auth: boolean;
  nameUser?: string | null | undefined;
}

const SidebarCmp: React.FC<SidebarCmpProps> = ({ auth, nameUser }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    logout();
  };

  let links = [
    {
      label: "Inicio",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Login",
      href: "/auth/login",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
  ];

  if(auth){
    links = [
      {
        label: "Inicio",
        href: "/",
        icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Perfil",
        href: "#",
        icon: (
          <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Configuracoes",
        href: "#",
        icon: (
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      }
    ];
  }

  const logoutLabel = {
    label: "Sair",
    href: "/",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  }

  return ( 
    <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
            ))}
            {auth && <span onClick={onClick}><SidebarLink link={logoutLabel} /></span>}
            </div>
        </div>
        {auth && 
          <div>
            <SidebarLink
            link={{
                label: nameUser,
                href: "#",
                icon: (
                <Image
                    src="/"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                />
                ),
            }}
            />
          </div>
        }
        </SidebarBody>
    </Sidebar>
   );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Toffee Code
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
 
export default SidebarCmp;