"use client"

import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import { usePaths } from '@/hooks/user-nav';


type Props = {
  slug: string
}

const Navbar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return (
    <div>Navbar</div>
  )
}

export default Navbar