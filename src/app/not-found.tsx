export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-muted-foreground">
        Page not found?
      </p>

      <a
        href="/assets"
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        Back to assets 
      </a>
    </div>
  );
}
