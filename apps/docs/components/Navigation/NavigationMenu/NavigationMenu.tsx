import { useTheme } from 'common/Providers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigationMenuCliList from './NavigationMenuCliList'
import NavigationMenuGuideList from './NavigationMenuGuideList'
import NavigationMenuRefList from './NavigationMenuRefList'

const SideNav = () => {
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const [level, setLevel] = useState('home')

  function handleRouteChange(url: string) {
    switch (url) {
      case `/docs`:
        setLevel('home')
        break
      case url.includes(`/docs/getting-started`) && url:
        setLevel('gettingstarted')
        break
      case url.includes(`/docs/guides/tutorials`) && url:
        setLevel('tutorials')
        break
      case url.includes(`/docs/guides/database`) && url:
        setLevel('database')
        break
      case url.includes(`/docs/guides/auth`) && url:
        setLevel('auth')
        break
      case url.includes(`/docs/guides/storage`) && url:
        setLevel('storage')
        break
      case url.includes(`/docs/guides/realtime`) && url:
        setLevel('realtime')
        break
      case url.includes(`/docs/guides/functions`) && url:
        setLevel('functions')
        break
      case url.includes(`/docs/guides/integrations`) && url:
        setLevel('integrations')
        break
      case url.includes(`/docs/guides/platform`) ||
        (url.includes(`/docs/guides/hosting/platform`) && url):
        setLevel('platform')
        break
      case url.includes(`/docs/reference/javascript`) && url:
        setLevel('reference_javascript')
        break
      case url.includes(`/docs/reference/dart`) && url:
        setLevel('reference_dart')
        break
      case url.includes(`/docs/reference/cli`) && url:
        setLevel('reference_cli')
        break

      default:
        break
    }
  }

  useEffect(() => {
    handleRouteChange(router.basePath + router.asPath)
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const home = [
    [
      {
        label: 'Home',
        icon: '/img/icons/menu/home',
        href: '/',
        level: 'home',
      },
      {
        label: 'Getting started',
        icon: '/img/icons/menu/getting-started',
        href: '/getting-started',
        level: 'gettingstarted',
      },
      {
        label: 'Tutorials',
        icon: '/img/icons/menu/tutorials',
        href: '/guides/tutorials',
        level: 'tutorials',
      },
    ],
    [
      {
        label: 'Database',
        icon: '/img/icons/menu/database',
        href: '/guides/database',
        level: 'database',
      },
      {
        label: 'Auth',
        icon: '/img/icons/menu/auth',
        href: '/guides/auth',
        level: 'auth',
      },
      {
        label: 'Storage',
        icon: '/img/icons/menu/storage',
        href: '/guides/storage',
        level: 'storage',
      },
      {
        label: 'Realtime',
        icon: '/img/icons/menu/realtime',
        href: '/guides/realtime',
        level: 'realtime',
      },
      {
        label: 'Edge Functions',
        icon: '/img/icons/menu/functions',
        href: '/guides/functions',
        level: 'functions',
      },
    ],
    [
      // {
      //   label: 'API Reference',
      //   icon: '/img/icons/menu/reference',
      //   href: '/reference',
      //   level: 'reference',
      // },
      {
        label: 'Platform',
        icon: '/img/icons/menu/platform',
        href: '/guides/hosting/platform',
        level: 'platform',
      },
      {
        label: 'Integrations',
        icon: '/img/icons/menu/integrations',
        href: '/guides/integrations',
        level: 'integrations',
      },
    ],
    [
      {
        label: 'Client Libraries Reference',
      },
      {
        label: 'JavaScript Client',
        icon: '/img/icons/javascript-icon',
        hasLightIcon: false,
        href: '/reference/javascript/start',
        level: 'reference_javascript',
      },
      // {
      //   label: 'Python Client Library',
      //   icon: '/img/icons/python-icon',
      //   hasLightIcon: false,
      //   href: '/reference/javascript/start',
      //   level: 'reference_javascript',
      // },
      {
        label: 'Dart Client Library',
        icon: '/img/icons/dart-icon',
        hasLightIcon: false,
        href: '/reference/dart/start',
        level: 'reference_dart',
      },
      {
        label: 'Tools Reference',
      },
      {
        label: 'Mangement API',
        icon: '/img/icons/api-icon',
        hasLightIcon: false,
        href: '/reference/javascript/start',
        level: 'reference_javascript',
      },
      {
        label: 'CLI',
        icon: '/img/icons/cli-icon',
        hasLightIcon: false,
        href: '/reference/cli/start',
        level: 'reference_javascript',
      },
      {
        label: 'Self hosting server',
        icon: '/img/icons/menu/platform',
        href: '/reference/javascript/start',
        level: 'reference_javascript',
      },
    ],
  ]

  return (
    <div className="flex relative">
      {/* // main menu */}
      <div
        className={[
          '',
          'transition-all duration-150 ease-out',
          level === 'home' ? 'opacity-100 ml-0 delay-150' : 'opacity-0 -ml-8 invisible absolute',
          // level !== 'home' && 'opacity-0 invisible'
        ].join(' ')}
      >
        <ul className="relative w-full flex flex-col gap-5">
          {home.map((section, sectionIndex) => {
            return (
              <>
                {sectionIndex !== 0 && (
                  <div
                    className="h-px w-full bg-green-500"
                    key={`section-${sectionIndex}-border`}
                  ></div>
                )}
                <div className="flex flex-col gap-3" key={`section-${sectionIndex}`}>
                  {section.map((link) => {
                    if (!link.href) {
                      return (
                        <span className="font-mono uppercase text-xs text-scale-900">
                          {link.label}
                        </span>
                      )
                    } else {
                      return (
                        <Link href={link.href} passHref>
                          <a key={link.label}>
                            <li
                              className={[
                                'group flex items-center gap-3',
                                'text-base transition-all duration-150 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                              ].join(' ')}
                            >
                              <Image
                                alt={link.label}
                                src={`${router.basePath}${
                                  Object.hasOwn(link, 'hasLightIcon') && !link.hasLightIcon
                                    ? link.icon
                                    : isDarkMode
                                    ? link.icon
                                    : `${link.icon}-light`
                                }${!link.icon.includes('png') ? '.svg' : ''}`}
                                width={17}
                                height={17}
                                className="opacity-75 w-4 h-4 group-hover:scale-110 group-hover:opacity-100 ease-out transition-all"
                              />
                              {link.label}
                            </li>
                          </a>
                        </Link>
                      )
                    }
                  })}
                </div>
              </>
            )
          })}
        </ul>
      </div>

      <NavigationMenuGuideList id={'gettingstarted'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'tutorials'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'database'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'auth'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'storage'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'realtime'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'functions'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'reference'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'integrations'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'platform'} currentLevel={level} setLevel={setLevel} />

      {/* reference level */}
      <NavigationMenuRefList id={'reference_javascript'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuRefList id={'reference_dart'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuCliList id={'reference_cli'} currentLevel={level} setLevel={setLevel} />
    </div>
  )
}

export default SideNav