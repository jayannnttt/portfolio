export function smoothScrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('/#')) {
    e.preventDefault();
    const id = href.slice(2);
    smoothScrollTo(id);
  }
}
