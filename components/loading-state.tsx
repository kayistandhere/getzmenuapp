import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Loading Menu</h2>
        <p className="text-muted-foreground">Preparing fresh ingredients...</p>
      </div>
    </div>
  )
}
