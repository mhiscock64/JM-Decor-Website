import { imagesForOffice, uploadImage } from "@/lib/admin/actions";

export const metadata = { title: "Images" };

export default async function ImagesPage({ searchParams }: { searchParams: Promise<{ url?: string; error?: string }> }) {
  const params = await searchParams;
  const images = await imagesForOffice();
  return (
    <>
      <h1 className="font-display text-4xl">Images</h1>
      <p className="mt-1 max-w-2xl font-body text-sm text-[oklch(50%_0.02_258)]">Upload a photo, then paste its path into a product. Uploads are stored in the database, so they stay available after a redeploy. Existing catalogue photos in /images stay as they are.</p>
      <form action={uploadImage} className="mt-6 flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
        <input name="file" type="file" accept="image/*" required className="font-body text-sm" />
        <button className="rounded-md bg-[oklch(27%_0.035_258)] px-3 py-2 font-body text-sm text-ivory">Upload</button>
      </form>
      {params.url ? <p className="mt-3 font-body text-sm">Saved as {params.url}</p> : null}
      {params.error ? <p className="mt-3 font-body text-sm text-red-700">{params.error}</p> : null}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image) => (
          <figure key={image.id} className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
            <img src={`/api/media/${image.id}`} alt={image.name || "Uploaded décor"} className="aspect-square w-full rounded object-cover" />
            <figcaption className="mt-2 break-all font-body text-[11px] text-[oklch(50%_0.02_258)]">/api/media/{image.id}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
