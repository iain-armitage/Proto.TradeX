import Link from 'next/link';

const quotes = [
  { id: 'Q-001', client: 'ACME Constructions' },
  { id: 'Q-002', client: 'BuildPro Services' }
];

export default function QuotesListPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">All Quotes</h1>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id} className="text-blue-600 hover:underline">
            <Link href={`/quotes/${quote.id}`}>
              View {quote.id} - {quote.client}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
