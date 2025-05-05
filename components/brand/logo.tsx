import { Shield } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-7",
    md: "h-10",
    lg: "h-14",
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary rounded-full p-2">
        <Shield className={`text-primary-foreground ${sizeClasses[size]}`} />
      </div>
      <div className="font-bold">
        <div className="text-primary leading-none">Segurito</div>
        <div className="text-muted-foreground text-sm leading-none">Bacanito</div>
      </div>
    </div>
  )
}
