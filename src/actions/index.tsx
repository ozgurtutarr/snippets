'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}
revalidatePath('/snippets/${id}');

// Compare this snippet from snippets/src/components/snippet-new-form.tsx:
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect('/');
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get('title')?.toString();
  const code = formData.get('code')?.toString();

  if (typeof title !== 'string' || title.length < 3) {
    return { message: 'Title must be longer' };
  }
  try {
    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }
    const snippets = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    throw new Error('Failed to save to database.');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }
  revalidatePath('/');

  redirect('/');
}
