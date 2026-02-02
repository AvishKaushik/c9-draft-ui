import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-c9-blue animate-spin mb-3" />
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  )
}
