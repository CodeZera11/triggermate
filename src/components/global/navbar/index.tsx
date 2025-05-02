"use client"

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import { usePaths } from '@/hooks/user-nav';
import { HelpCircle, Menu } from 'lucide-react';
import Items from '../sidebar/items';
import { Separator } from '@/components/ui/separator';
import ClerkAuthState from '../clerk-auth-state';
import SubscriptionPlan from '../subscription-plan';
import UpgradeCard from '../sidebar/upgrade';
import LogoSmall from '@/components/svgs/logo-small';
import CreateAutomation from '../create-automation';

type Props = {
  slug: string
}

const Navbar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return currentPage && <div className='flex flex-col'>
    <div className='flex gap-x-3 lg:gap-x-5 justify-end'>
      <span className='lg:hidden flex items-center flex-1 gap-x-2'>
        <Sheet>
          <SheetTrigger className='lg:hidden'>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl'>
              <div className='flex gap-x-2 items-center p-5 justify-center'>
                <LogoSmall />
              </div>
              <div className='flex flex-col py-3'>
                <Items page={page} slug={slug} />
              </div>
              <div className='px-16'>
                <Separator orientation='horizontal' className='bg-[#2f2f36]' />
              </div>
              <div className='px-3 flex flex-col gap-y-5'>
                <div className='flex gap-x-2'>
                  <ClerkAuthState />
                  <p className='text-[#9B9CA0]'>
                    Profile
                  </p>
                </div>
                <div className='flex gap-x-3'>
                  <HelpCircle />
                  <p className='text-[#9B9CA0]'>
                    Help
                  </p>
                </div>
              </div>
              <SubscriptionPlan type='FREE'>
                <div className='flex-1 flex flex-col justify-end'>
                  <UpgradeCard />
                </div>
              </SubscriptionPlan>
            </div>
          </SheetContent>
        </Sheet>
      </span>
      <CreateAutomation />
    </div>
  </div>
}

export default Navbar