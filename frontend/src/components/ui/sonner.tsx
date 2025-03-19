"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "hsl(240 10% 3.9%)", // Dark text for better contrast
          "--normal-border": "var(--border)",
          "--success-bg": "hsl(143 85% 96%)",
          "--success-text": "hsl(140 100% 27%)",
          "--success-border": "hsl(145 92% 91%)",
          "--error-bg": "hsl(358 75% 97%)",
          "--error-text": "hsl(358 75% 37%)",
          "--error-border": "hsl(359 80% 92%)",
          "--info-bg": "hsl(223 100% 96%)",
          "--info-text": "hsl(224 88% 40%)",
          "--info-border": "hsl(221 91% 91%)",
        } as React.CSSProperties
      }
      richColors
      closeButton
      {...props}
    />
  )
}

export { Toaster }
