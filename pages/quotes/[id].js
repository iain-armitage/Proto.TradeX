import { useRouter } from 'next/router';

export default function QuotePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Quote ID: {id}</h1>
      <p>This is the detail page for quote #{id}.</p>
    </div>
  );
}
