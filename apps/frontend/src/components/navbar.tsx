import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "wouter";

type Navigation = {
  name: string;
  href: string;
  current: boolean;
}[];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const [location, navigate] = useLocation();

  const navigation: Navigation = [
    { name: "Cadastro", href: "/", current: location === "/" },
    { name: "Admin", href: "/admin", current: location === "/admin" },
  ];

  return (
    <Disclosure as="nav" className="bg-c1">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-inset">
              <span className="-inset-0.5 absolute" />
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <UserPlusIcon className="h-8 w-auto text-c5" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <button
                    className={classNames(
                      item.current ? "bg-c4 text-c1" : "text-c4 hover:bg-c2 hover:text-c5",
                      "cursor-pointer rounded-md px-3 py-2 font-medium text-sm",
                    )}
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    type="button"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              as="button"
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block w-full cursor-pointer rounded-md px-3 py-2 font-medium text-base",
              )}
              key={item.name}
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
