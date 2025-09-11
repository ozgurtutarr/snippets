'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}
// Compare this snippet from snippets/src/components/snippet-new-form.tsx:
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect('/');
}
