export default function SlugPage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex h-20 flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Slug page</h1>
      <p>Slug: {params.slug}</p>
    </main>
  );
}
