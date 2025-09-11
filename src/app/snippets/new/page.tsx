import { db } from '@/db';
import { redirect } from 'next/navigation';

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    'use server';
    const title = formData.get('title')?.toString();
    const code = formData.get('code')?.toString();

    if (!title || !code) {
      throw new Error('Title and code are required');
    }

    const snippets = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log('Snippet created:', snippets);

    redirect('/');
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input name="title" className="border rounded p-2 w-full" />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea name="code" className="border rounded p-2 w-full" />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-300 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
