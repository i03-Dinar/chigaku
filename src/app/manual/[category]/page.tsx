import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Heading from '@/components/Heading';
import { titleLoader } from '@/lib/titleLoader';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await Promise.resolve(params);
  const categoryPath = path.join(process.cwd(), `src/app/manual/${category}`);

  let categoryTitle = category; // デフォルトはフォルダ名
  let topics: { slug: string; title: string }[] = [];

  // 🔥 カテゴリーの `title.json` を読み込む
  try {
    const titleData = titleLoader(categoryTitle);
    if (titleData) {
      categoryTitle = titleData;
    }
  } catch (error) {
    console.error(`title found for ${category}`, error);
  }

  // 🔥 `category/` 以下のフォルダ (トピック) を取得
  try {
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });

    topics = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
        .map(async (entry) => {
          const topicSlug = entry.name;

          let topicTitle = topicSlug; // デフォルトはフォルダ名

          try {
            const titleData = titleLoader(topicTitle);
            if (titleData) {
              topicTitle = titleData;
            }
          } catch (error) {
            console.error(`title not found for ${category}/${topicSlug}`, error);
          }

          return { slug: topicSlug, title: topicTitle };
        })
    );
  } catch (error) {
    console.error(`Failed to read topics in ${category}`, error);
  }

  return (
    <main className="p-6">
      <Heading title={categoryTitle} />
      <ul className="space-y-2">
        {topics.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/manual/${category}/${slug}`} className="underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
