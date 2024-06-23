import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');

  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return NextResponse.json(
      {
        revalidated: false,
        message: 'Invalid Token',
        time: Date(),
      },
      { status: 401 },
    );
  }

  // main page
  revalidatePath('/');
  // post list page
  revalidatePath('/posts/page/[pageNum]', 'page');
  // post detail page
  revalidatePath('/posts/[slug]', 'page');

  return NextResponse.json({
    revalidated: true,
    message: 'Success Posts Revalidate',
    time: Date(),
  });
}
