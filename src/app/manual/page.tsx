import Heading from '@/components/Heading';
import type { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
// import Text from '@/components/Text';

export const metadata: Metadata = {
  title: 'マニュアル - 同志社高校地学部',
};

export default async function Manual() {
  const manualPath = path.join(process.cwd(), 'src/app/manual');

  let categories: { slug: string; title: string }[] = [];

  try {
    const entries = await fs.readdir(manualPath, { withFileTypes: true });
    categories = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
        .map(async (entry) => {
          const categorySlug = entry.name;
          const titleFile = path.join(manualPath, categorySlug, 'title.json');

          let categoryTitle = categorySlug;
          try {
            const titleData = JSON.parse(await fs.readFile(titleFile, 'utf-8'));
            if (titleData.title) {
              categoryTitle = titleData.title;
            }
          } catch (error) {
            console.error(`Failed to read title.json in ${categorySlug}`, error);
          }
          return { slug: categorySlug, title: categoryTitle };
        })
    );
  } catch (error) {
    console.error('Failed to read manual directory', error);
  }

  return (
    <div>
      <Heading title="地学部各種マニュアル" />
      <ul className="space-y-2">
        {categories.map(({slug, title}) => (
          <li key={slug}>
            <Link href={`/manual/${slug}`} className="underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
