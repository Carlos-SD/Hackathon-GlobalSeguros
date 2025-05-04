import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const logoSrc = variant === "white" ? "/images/logo-white.png" : "/images/logo.png"

  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  }

  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="GlobalSeguros"
        width={size === "lg" ? 240 : size === "md" ? 180 : 120}
        height={size === "lg" ? 60 : size === "md" ? 40 : 30}
        className={`${sizeClasses[size]} w-auto`}
        priority
      />
    </Link>
  )
}
