export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/lab', label: 'Lab' },
  { href: '/notes', label: 'Notes' },
] as const;

export function getNavigationItem(pathname: string) {
  const path = pathname.toLowerCase();

  return navigation.find(
    ({ href }) => path === href || (href !== '/' && path === `${href}/`),
  );
}
