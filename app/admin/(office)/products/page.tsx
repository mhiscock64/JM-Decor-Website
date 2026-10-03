import { bulkProducts, listCategories, listProducts, saveProduct } from "@/lib/admin/actions";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const [rows, categories] = await Promise.all([listProducts(), listCategories()]);
  const grouped = new Map<string, typeof rows>();
  for (const row of rows) {
    const list = grouped.get(row.slug) ?? [];
    list.push(row);
    grouped.set(row.slug, list);
  }
  return (
    <>
      <h1 className="font-display text-4xl">Products</h1>
      <form action={saveProduct} className="mt-6 grid gap-3 rounded-2xl bg-cream/60 p-4 md:grid-cols-4">
        <input name="name_en" placeholder="Name" required className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px]" />
        <input name="name_fr" placeholder="Nom" className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px]" />
        <select name="category_id" className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px]">
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name_en}</option>)}
        </select>
        <input name="price" type="number" step="0.01" placeholder="Price" required className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px]" />
        <select name="type" className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px]">
          <option value="rental">Rental</option>
          <option value="purchase">Purchase</option>
        </select>
        <input name="image" placeholder="/images/..." className="rounded-lg border border-ink/10 px-3 py-2 font-body text-[13px] md:col-span-2" />
        <label className="flex items-center gap-2 font-body text-[13px]"><input type="checkbox" name="published" defaultChecked /> Published</label>
        <button className="rounded-full bg-ink px-4 py-2 font-body text-[13px] text-ivory">Add product</button>
      </form>
      <form action={bulkProducts} className="mt-8">
        <div className="mb-3 flex flex-wrap items-end gap-2 font-body text-[12px]">
          <select name="category_id" className="rounded-lg border border-ink/10 px-2 py-1.5">
            <option value="">Category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name_en}</option>)}
          </select>
          <select name="published" className="rounded-lg border border-ink/10 px-2 py-1.5">
            <option value="">Published</option>
            <option value="yes">Publish</option>
            <option value="no">Unpublish</option>
          </select>
          <input name="percent" type="number" placeholder="% price" className="w-24 rounded-lg border border-ink/10 px-2 py-1.5" />
          <input name="set_price" type="number" step="0.01" placeholder="Set price" className="w-28 rounded-lg border border-ink/10 px-2 py-1.5" />
          <button name="action" value="edit" className="rounded-full bg-ink px-3 py-1.5 text-ivory">Apply</button>
          <button name="action" value="archive" className="rounded-full px-3 py-1.5 ring-1 ring-ink/15">Archive</button>
          <button name="action" value="restore" className="rounded-full px-3 py-1.5 ring-1 ring-ink/15">Restore</button>
          <button name="action" value="delete" className="rounded-full px-3 py-1.5 text-red-700 ring-1 ring-red-200">Delete</button>
        </div>
        <table className="w-full font-body text-[13px]">
          <thead className="text-left text-ink/50">
            <tr><th></th><th>Product</th><th>Category</th><th>Price</th><th>Status</th></tr>
          </thead>
          <tbody>
            {[...grouped.entries()].map(([slug, items]) => (
              <tr key={slug} className="border-t border-ink/10">
                <td className="py-2"><input type="checkbox" name="slug" value={slug} /></td>
                <td>{items[0].name_en}</td>
                <td>{items[0].category_id}</td>
                <td>{items.map((item) => item.price ? `$${item.price} ${item.type}` : "").join(" · ")}</td>
                <td>{items[0].archived ? "Archived" : items[0].published ? "Live" : "Hidden"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
}
