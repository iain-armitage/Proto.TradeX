import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <div className="text-2xl font-bold">TradeX</div>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/contacts">Contacts</Link>
          <Link href="/quotes">Quotes</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/invoices">Invoices</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/reports">Reports</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white text-black">{children}</main>
    </div>
  );
}
