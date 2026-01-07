function LoadingOverlay({ show }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            w-14 h-14
            border-4 border-green-500/30
            border-t-green-500
            rounded-full
            animate-spin
          "
        />
        <p className="text-white text-sm tracking-wide">
          Memproses login...
        </p>
      </div>
    </div>
  )
}

export default LoadingOverlay
