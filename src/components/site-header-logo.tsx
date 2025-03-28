import Link from "next/link"

export function SiteHeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center">
        <div className="flex h-8">
          <span className="text-labrys-green font-bold text-2xl tracking-tighter">L</span>
          <span className="text-labrys-green font-bold text-2xl tracking-tighter">A</span>
          <span className="text-labrys-green font-bold text-2xl tracking-tighter">B</span>
          <span className="text-labrys-green font-bold text-2xl tracking-tighter">R</span>
          <span className="text-labrys-yellow font-bold text-2xl tracking-tighter">Y</span>
          <span className="text-labrys-yellow font-bold text-2xl tracking-tighter">S</span>
        </div>
        <span className="ml-2 text-xl font-semibold gradient-text">Skillz Synk</span>
      </div>
    </Link>
  )
}

