import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import { List, SignOut } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import useAuth from "@/lib/auth";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "pt",
    label: "Português",
  },
  {
    value: "en",
    label: "English",
  },
];

interface HeaderProps {
  isAuthenticated?: boolean;
  nameLink: string;
  pathLink: string;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const { isAuthenticated, toggleAuth, data } = useAuth();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const links = [
    {
      nameLink: "header.links.home",
      pathLink: "/",
    },
    {
      nameLink: "header.links.about",
      pathLink: "/about",
    },
    {
      nameLink: "header.links.feeding",
      pathLink: "/feed",
    },
    {
      nameLink: "header.links.blog",
      pathLink: "/blog",
    },
    {
      nameLink: "header.links.talkUs",
      pathLink: "/contact",
    },
  ];

  function Linker(props: HeaderProps) {
    return (
      <SheetClose asChild className="flex my-10 text-xl text-zinc-100">
        <Link to={props.pathLink}>{props.nameLink}</Link>
      </SheetClose>
    );
  }

  return (
    <header className="z-50 shadow-lg w-full md:text-sm lg:text-base fixed bg-varOrange  text-zinc-50 flex items-center justify-between lg:justify-evenly py-3 px-5 md:p-2">
      <Link to="/">
        <img src={Logo} alt="logo CaliPet" />
      </Link>
      <nav className="hidden gap-5 lg:flex">
        {links.map((el, index) => {
          return (
            <Link
              className="text-zinc-100 hover:text-orange-200"
              key={index}
              to={el.pathLink}
            >
              {t(`${el.nameLink}`)}
            </Link>
          );
        })}
      </nav>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 hover:bg-transparent hover:text-inherit p-2 md:text-sm lg:text-base"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.value == "pt" ? (
                  <img className="w-5" src="/translate/pt.svg" alt="" />
                ) : (
                  <img src="/translate/en.svg" className="w-5" alt="" />
                )}
                {selectedStatus.label}
              </>
            ) : (
              <>
                {i18n.language == "pt" ? (
                  <img className="w-5" src="./translate/pt.svg" alt="" />
                ) : (
                  <img src="./translate/en.svg" className="w-5" alt="" />
                )}
                {i18n.language == "pt" ? "Português" : "English"}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-36" side="bottom" align="center">
          <Command className="bg-transparent">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    className="p-0"
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <button
                      className="flex p-2 gap-2 w-full md:text-sm lg:text-base"
                      onClick={() => changeLanguage(`${status.value}`)}
                    >
                      {status.value == "pt" ? (
                        <img className="w-5" src="/translate/pt.svg" alt="PT" />
                      ) : (
                        <img src="/translate/en.svg" className="w-5" alt="EN" />
                      )}
                      {status.label}
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {isAuthenticated ? (
        <Sheet>
          <SheetTrigger className="hidden lg:block">
            <List size={32} />
          </SheetTrigger>
          <SheetContent className="bg-varOrange text-zinc-100 border-transparent">
            <SheetHeader className="">
              <SheetTitle className="text-3xl font-bungee text-zinc-100">
                Olá, {data.name}!
              </SheetTitle>
            </SheetHeader>

            <Separator className="bg-zinc-100 mt-5" />

            <div className="flex flex-col gap-2 items-center pt-2">
              <p className="font-bold">{data.name + " " + data.lastName}</p>
              <p className="font-bold">{data.email}</p>
            </div>

            <SheetFooter className="flex flex-col sm:flex-col items-center p-5 gap-2">
              <h3 className="text-lg">Sair da conta:</h3>
              <SignOut
                className="hover:scale-105"
                size={32}
                onClick={() => toggleAuth()}
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Link
          className="text-zinc-100 hover:text-orange-200 hidden lg:flex"
          to="/login"
        >
          {t("header.links.login")}
        </Link>
      )}

      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger>
            <List size={32} />
          </SheetTrigger>
          <SheetContent className="bg-varOrange text-zinc-100 border-transparent">
            <SheetHeader className="">
              <SheetTitle className="text-3xl font-bungee text-zinc-100">
                {isAuthenticated ? `Seja Bem Vindo!` : "CaliMenu"}
              </SheetTitle>
            </SheetHeader>

            <Separator className="bg-zinc-100 mt-5" />
            {links.map((el, index) => {
              return (
                <Linker
                  key={index}
                  nameLink={t(`${el.nameLink}`)}
                  pathLink={el.pathLink}
                />
              );
            })}

            {isAuthenticated ? (
              <>
                <div className="flex flex-col gap-2 items-center pt-2 text-2xl">
                  <p className="font-bold">{data.nome}</p>
                  <p className="font-bold">{data.email}</p>
                </div>

                <SheetFooter className="flex flex-col sm:flex-col items-center p-5 gap-2">
                  <h3 className="text-xl">Sair da conta:</h3>
                  <SignOut
                    className="hover:scale-105"
                    size={32}
                    onClick={() => toggleAuth()}
                  />
                </SheetFooter>
              </>
            ) : (
              <Linker nameLink={t("header.links.login")} pathLink="/login" />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
