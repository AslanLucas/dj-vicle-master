'use client'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Leistungen', id: 'services' },
    { label: 'Über mich', id: 'story' },
    { label: 'Kontakt', id: 'contact' },
    { label: 'Galerie', id: 'gallery' },
    { label: 'Blog', href: '/blog' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.getElementById("site-header")
            if (header) {
                document.documentElement.style.setProperty(
                    "--header-height",
                    `${header.offsetHeight}px`
                )
            }
        }

        updateHeaderHeight()
        window.addEventListener("resize", updateHeaderHeight)
        return () => window.removeEventListener("resize", updateHeaderHeight)
    }, [])

    useEffect(() => {
        const sections = navItems
            .filter((item): item is { label: string; id: string; href?: string } => Boolean(item.id))
            .map((item) => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[]

        const handleScroll = () => {
            const scrollPos = window.scrollY + 100
            let current: string | null = null

            for (const section of sections) {
                if (scrollPos >= section.offsetTop) {
                    current = section.id
                }
            }

            if (current && current !== activeId) {
                setActiveId(current)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [activeId])

    const handleNavigation = (id?: string, href?: string) => {

        if (href) {
            router.push(href);
            return;
        }

        if (!id) return;

        // ✅ Galerie führt auf eigene Seite
        if (id === "gallery") {
            router.push("/gallery");
            return;
        }

        const isHome = pathname === '/' || pathname === ''
        const section = document.getElementById(id)

        if (isHome && section) {
            section.scrollIntoView({ behavior: 'smooth' })
        } else {
            router.push(`/#${id}`)
        }
    }


    return (
        <header
            id="site-header"
            className="bg-[#2A2A2A] fixed top-0 left-0 w-full z-50 shadow-md"
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8"
                aria-label="Global"
            >
                <Link href="/" className="-m-1.5 p-1.5">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-22 sm:h-24 lg:h-26 w-auto"
                    />
                </Link>

                <PopoverGroup className="hidden lg:flex lg:items-center lg:gap-x-8">
                    {navItems.map(({ label, id, href }) => {
                        const isActive = id ? activeId === id : false
                        const itemKey = id ?? href ?? label
                        return (
                            <button
                                key={itemKey}
                                onClick={() => handleNavigation(id, href)}
                                className={`relative text-base font-semibold uppercase text-white pb-0.5 transition-all duration-300
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
                                    hover:after:w-full hover:after:bg-white after:transition-all after:duration-300 
                                    ${isActive ? 'after:w-full after:bg-white' : ''}`}
                            >
                                {label}
                            </button>
                        )
                    })}

                    <Link
                        href="/booking"
                        className="ml-6 bg-white text-black text-sm font-semibold uppercase px-4 py-2 rounded-lg transition-transform heartbeat"
                    >
                        <span>Anfrage senden</span>
                    </Link>

                </PopoverGroup>

                <div className="flex items-center lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-[60] w-[75%] sm:max-w-sm overflow-y-auto bg-[#2A2A2A] px-6 py-8 ring-1 ring-white/10"
                >
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <img src="/logo.png" alt="Logo" className="h-24 w-auto" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2 rounded-md p-2 text-white"
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 space-y-4">
                        {navItems.map(({ label, id, href }) => {
                            const itemKey = id ?? href ?? label

                            return (
                            <button
                                key={itemKey}
                                onClick={() => {
                                    handleNavigation(id, href)
                                    setMobileMenuOpen(false)
                                }}
                                className="block w-full text-left px-3 py-2 text-base font-semibold uppercase text-white hover:bg-white hover:text-black rounded-md"
                            >
                                {label}
                            </button>
                        )})}

                        <Link
                            href="/booking"
                            className="block w-full text-center px-3 py-2 mt-6 text-base font-semibold uppercase text-black bg-white rounded-md heartbeat"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span>Anfrage senden</span>
                        </Link>

                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
