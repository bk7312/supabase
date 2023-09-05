import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Announcement from '~/components/Announcement/Announcement'
import { Button, LW8CountdownBanner, cn } from 'ui'
import Transition from 'lib/Transition'
import ScrollProgress from '~/components/ScrollProgress'

import { useIsLoggedIn, useTheme } from 'common'
import Image from 'next/image'
import * as supabaseLogoWordmarkDark from 'common/assets/images/supabase-logo-wordmark--dark.png'
import * as supabaseLogoWordmarkLight from 'common/assets/images/supabase-logo-wordmark--light.png'
import GitHubButton from './GitHubButton'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'ui/src/components/shadcn/ui/navigation-menu'
import HamburgerButton from './HamburgerMenu'
import Developers from './Developers'
import Product from './Product'

export const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { description?: string }
>(({ className, title, href = '', description, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <a
            ref={ref}
            className={cn(
              'flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-overlay-hover hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            {children ?? (
              <>
                <div className="text-sm font-medium leading-none">{title}</div>
                {description && (
                  <p className="line-clamp-2 text-sm leading-snug text-muted">{description}</p>
                )}
              </>
            )}
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

const Nav = () => {
  const { isDarkMode } = useTheme()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openProduct, setOpenProduct] = useState(false)
  const [openDevelopers, setOpenDevelopers] = useState(false)
  const isLoggedIn = useIsLoggedIn()

  const isHomePage = router.pathname === '/'
  const isLaunchWeekPage = router.pathname.includes('launch-week')
  const showLaunchWeekNavMode =
    (isLaunchWeekPage || isHomePage) && !open && !openProduct && !openDevelopers

  React.useEffect(() => {
    if (open) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      <Announcement link="/launch-week">
        <LW8CountdownBanner />
      </Announcement>
      <div className="sticky top-0 z-40 transform" style={{ transform: 'translate3d(0,0,999px)' }}>
        <div
          className={[
            'absolute inset-0 h-full w-full opacity-80 bg-scale-200',
            !showLaunchWeekNavMode && '!opacity-100 transition-opacity',
            showLaunchWeekNavMode && '!bg-transparent transition-all',
          ].join(' ')}
        />
        <nav
          className={[
            `relative z-40 border-scale-300 border-b backdrop-blur-sm transition-opacity`,
            showLaunchWeekNavMode ? '!opacity-100 !border-[#e0d2f430]' : '',
            isLaunchWeekPage && showLaunchWeekNavMode ? '!border-b-0' : '',
          ].join(' ')}
        >
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <HamburgerButton
              toggleFlyOut={() => setOpen(true)}
              showLaunchWeekNavMode={showLaunchWeekNavMode}
            />
            <div className="flex items-center justify-center flex-1 sm:items-stretch lg:justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/" as="/">
                    <a className="block w-auto h-6">
                      <Image
                        src={isDarkMode ? supabaseLogoWordmarkDark : supabaseLogoWordmarkLight}
                        width={124}
                        height={24}
                        alt="Supabase Logo"
                      />
                    </a>
                  </Link>

                  {isLaunchWeekPage && (
                    <Link href="/launch-week" as="/launch-week">
                      <a className="hidden ml-2 xl:block font-mono text-sm uppercase leading-4">
                        Launch Week
                      </a>
                    </Link>
                  )}
                </div>
                <div className="hidden pl-4 sm:ml-6 sm:space-x-4 lg:flex">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent data-[state=open]:text-brand">
                          Product
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <Product />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent data-[state=open]:text-brand">
                          Developers
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <Developers />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <Link href="/pricing">
                    <a
                      className={[
                        `text-scale-1200 hover:text-brand hover:border-brand dark:text-dark-100 dark:hover:border-dark-100 inline-flex items-center
                        border-b-2 border-transparent p-5 px-1
                        text-sm font-medium`,
                        showLaunchWeekNavMode && '!text-white',
                      ].join(' ')}
                    >
                      Pricing
                    </a>
                  </Link>
                  <Link href="/docs">
                    <a
                      className={[
                        `text-scale-1200 hover:text-brand hover:border-brand dark:text-dark-100 dark:hover:border-dark-100 inline-flex items-center
                        border-b-2 border-transparent p-5 px-1
                        text-sm font-medium`,
                        showLaunchWeekNavMode && '!text-white',
                      ].join(' ')}
                    >
                      Docs
                    </a>
                  </Link>
                  <Link href="/blog">
                    <a
                      className={[
                        `text-scale-1200 hover:text-brand hover:border-brand dark:text-dark-100 dark:hover:border-dark-100 inline-flex items-center
                        border-b-2 border-transparent p-5 px-1
                        text-sm font-medium`,
                        showLaunchWeekNavMode && '!text-white',
                      ].join(' ')}
                    >
                      Blog
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GitHubButton />

                {isLoggedIn ? (
                  <Link href="/dashboard/projects">
                    <a>
                      <Button className="hidden text-white lg:block">Dashboard</Button>
                    </a>
                  </Link>
                ) : (
                  <>
                    <Link href="https://supabase.com/dashboard">
                      <a>
                        <Button type="default" className="hidden lg:block">
                          Sign in
                        </Button>
                      </a>
                    </Link>
                    <Link href="https://supabase.com/dashboard">
                      <a>
                        <Button className="hidden text-white lg:block">Start your project</Button>
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* Mobile Nav Menu */}
          <Transition
            appear={true}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div
              className={[
                'dark:bg-scale-300 fixed -inset-y-0 z-50 h-screen w-screen transform overflow-y-scroll bg-white p-4 md:p-8',
                open && '!bg-scale-300',
              ].join(' ')}
            >
              <div className="absolute items-center justify-between right-4 top-4">
                <div className="-mr-2">
                  <button
                    onClick={() => setOpen(false)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 bg-white rounded-md text-scale-900 focus:ring-brand dark:bg-scale-300 dark:hover:bg-scale-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* </div> */}
              <div className="mt-6 mb-12">
                <div className="pt-2 pb-4 space-y-1">
                  <Link href="https://supabase.com/dashboard">
                    <a className="block pl-3 pr-4 text-base font-medium text-scale-900 dark:text-white">
                      Sign in
                    </a>
                  </Link>
                </div>
                <div className="pt-2 pb-4 space-y-1">
                  <Link href="/docs">
                    <a className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white">
                      Developers
                    </a>
                  </Link>
                  <Link href="/company">
                    <a className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white">
                      Company
                    </a>
                  </Link>
                  <Link href="/pricing">
                    <a className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white">
                      Pricing
                    </a>
                  </Link>
                  <Link href="/docs">
                    <a
                      target="_blank"
                      className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white"
                    >
                      Docs
                    </a>
                  </Link>
                  <Link href="https://github.com/supabase/supabase">
                    <a
                      target="_blank"
                      className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white"
                    >
                      GitHub
                    </a>
                  </Link>
                  <Link href="/blog">
                    <a
                      target="_blank"
                      className="block py-2 pl-3 pr-4 text-base font-medium rounded-md text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white"
                    >
                      Blog
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </nav>

        <ScrollProgress />
      </div>
    </>
  )
}

export default Nav
