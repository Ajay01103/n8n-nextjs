import Image from "next/image"
import Link from "next/link"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          Nodebase
        </Link>
        {children}
      </div>
    </div>
  )
}

export default Layout
