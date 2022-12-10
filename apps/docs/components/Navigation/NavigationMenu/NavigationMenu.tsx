import { useTheme } from 'common/Providers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, memo } from 'react'
import NavigationMenuCliList from './NavigationMenuCliList'
import NavigationMenuGuideList from './NavigationMenuGuideList'
import NavigationMenuRefList from './NavigationMenuRefList'
import { NavigationMenuContextProvider } from './NavigationMenu.Context'

// @ts-expect-error
import jsSpecNEW from '~/../../spec/supabase_js_v2_temp_new_shape.yml' assert { type: 'yml' }
// @ts-expect-error
import dartSpecNEW from '~/../../spec/supabase_dart_v1_temp_new_shape.yml' assert { type: 'yml' }
import apiSpecRaw from '~/../../spec/transforms/api_v0_openapi_deparsed.json' assert { type: 'json' }

import libCommonSections from '~/../../spec/common-client-libs-sections.json'
import cliCommonSections from '~/../../spec/common-cli-sections.json'
import apiCommonSections from '~/../../spec/common-api-sections.json'

// Filter libCommonSections for just the relevant sections in the current library
function filterByLib(sections, lib) {
  // Filter parent sections first
  const libSections = sections.filter((section) => section.libs.includes(lib))

  // Map over the parents and filter for items that include the current lib
  return libSections.map((section) => {
    const items = section.items ? section.items.filter((item) => item.libs.includes(lib)) : []
    return {
      ...section,
      items,
    }
  })
}

// import { gen_v3 } from '~/lib/refGenerator/helpers'

export type RefIdOptions =
  | 'reference_javascript'
  | 'reference_dart'
  | 'reference_cli'
  | 'reference_api'
  | 'reference_self_hosting_server'

export type RefKeyOptions = 'javascript' | 'dart' | 'cli' | 'api' | 'self-hosting-server'

const SideNav = () => {
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const [level, setLevel] = useState('home')

  //console.log('router', router.asPath)

  let version = ''
  if (router.asPath.includes('v1')) {
    version = '_v1'
  }

  if (router.asPath.includes('v0')) {
    version = '_v0'
  }
  //console.log({ version })
  //console.log(`dart${version ?? version}`)

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
      case url.includes(`/docs/guides/functions`) && url:
        setLevel('functions')
        break
      case url.includes(`/docs/guides/realtime`) && url:
        setLevel('realtime')
        break
      case url.includes(`/docs/guides/storage`) && url:
        setLevel('storage')
        break
      case url.includes(`/docs/guides/platform`) ||
        (url.includes(`/docs/guides/hosting/platform`) && url):
        setLevel('platform')
        break
      case url.includes(`/docs/guides/resources`) && url:
        setLevel('resources')
        break
      case url.includes(`/docs/guides/integrations`) && url:
        setLevel('integrations')
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
      case url.includes(`/docs/reference/api`) && url:
        setLevel('reference_api')
        break
      case url.includes(`/docs/reference/self-hosting-server`) && url:
        setLevel('reference_self_hosting_server')
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
        label: 'Getting Started',
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
        label: 'Edge Functions',
        icon: '/img/icons/menu/functions',
        href: '/guides/functions',
        level: 'functions',
      },
      {
        label: 'Realtime',
        icon: '/img/icons/menu/realtime',
        href: '/guides/realtime',
        level: 'realtime',
      },
      {
        label: 'Storage',
        icon: '/img/icons/menu/storage',
        href: '/guides/storage',
        level: 'storage',
      },
    ],
    [
      {
        label: 'Platform',
        icon: '/img/icons/menu/platform',
        href: '/guides/hosting/platform',
        level: 'platform',
      },
      {
        label: 'Resources',
        icon: '/img/icons/menu/platform',
        href: '/guides/resources',
        level: 'resources',
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
        label: 'Client Library Reference',
      },
      {
        label: 'JavaScript',
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
        label: 'Flutter',
        icon: '/img/icons/dart-icon',
        hasLightIcon: false,
        href: '/reference/dart/start',
        level: 'reference_dart',
      },
      {
        label: 'Tools Reference',
      },
      {
        label: 'Management API',
        icon: '/img/icons/api-icon',
        hasLightIcon: false,
        href: '/reference/api/start',
        level: 'reference_javascript',
      },
      {
        label: 'Supabase CLI',
        icon: '/img/icons/cli-icon',
        hasLightIcon: false,
        href: '/reference/cli/start',
        level: 'reference_javascript',
      },
      {
        label: 'Self-Hosting Server',
        icon: '/img/icons/menu/platform',
        href: '/reference/self-hosting-server/start',
        level: 'reference_self_hosting_server',
      },
    ],
  ]

  // generate Open API specs

  // @ts-ignore
  // const apiSpec = gen_v3(apiSpecRaw, 'wat', { apiUrl: 'apiv0' })

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
        <ul className="relative w-full flex flex-col gap-4">
          {home.map((section, sectionIndex) => {
            return (
              <>
                {sectionIndex !== 0 && (
                  <div
                    className="h-px w-full bg-blackA-300 dark:bg-whiteA-300"
                    key={`section-${sectionIndex}-border`}
                  ></div>
                )}
                <div key={`section-${sectionIndex}`}>
                  <div className="flex flex-col gap-3">
                    {section.map((link) => {
                      if (!link.href) {
                        return (
                          <span
                            key={link.label}
                            className="font-mono uppercase text-xs text-scale-900"
                          >
                            {link.label}
                          </span>
                        )
                      } else {
                        return (
                          <Link href={link.href} passHref key={link.label}>
                            <a>
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
      <NavigationMenuGuideList id={'functions'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'realtime'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'storage'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'platform'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'resources'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'integrations'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'reference'} currentLevel={level} setLevel={setLevel} />
      {/* reference level */}

      <NavigationMenuRefList
        key={'reference-js-menu'}
        id={'reference_javascript'}
        currentLevel={level}
        commonSections={filterByLib(libCommonSections, `js${version ?? version}`)}
        lib="javascript"
      />

      <NavigationMenuRefList
        key={'reference-dart-menu'}
        id={'reference_dart'}
        currentLevel={level}
        commonSections={filterByLib(libCommonSections, `dart${version ?? version}`)}
        lib="dart"
      />
      <NavigationMenuRefList
        key={'reference-cli-menu'}
        id={'reference_cli'}
        currentLevel={level}
        commonSections={cliCommonSections}
        lib="cli"
      />
      <NavigationMenuRefList
        key={'reference-api-menu'}
        id={'reference_api'}
        currentLevel={level}
        commonSections={apiCommonSections}
        lib="api"
      />
      <NavigationMenuRefList
        key={'reference-self-hosting-server-menu'}
        id={'reference_self_hosting_server'}
        currentLevel={level}
        commonSections={apiCommonSections}
        lib="self-hosting-server"
      />
    </div>
  )
}

export default memo(SideNav)