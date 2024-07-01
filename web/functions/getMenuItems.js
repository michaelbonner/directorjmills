export const getMenuItems = ({ isStillsPageEnabled }) => {
  const menuItems = [
    {
      title: "Home",
      href: "/",
      hideOnMobile: false,
    },
    {
      title: "Work",
      href: "/work",
      hideOnMobile: true,
    },
  ];

  if (isStillsPageEnabled) {
    menuItems.push({
      title: "Stills",
      href: "/stills",
      hide: !isStillsPageEnabled,
    });
  }

  menuItems.push({
    title: "Contact",
    href: "/contact",
    hideOnMobile: false,
  });

  return menuItems;
};
