import Heading from '@/components/Heading';
import { titleLoader } from '@/lib/titleLoader';

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    category: string;
    topic: string;
  }>;
}) {
  const { category, topic } = await params;

  let categoryTitle = category;
  let topicTitle = topic;
  let ContentComponent: React.ComponentType | null = null;

  try {
    const titleData = titleLoader(categoryTitle);
    if (titleData) {
      categoryTitle = titleData;
    }
  } catch (error) {
    console.error(
      `app/manual/[category]/[topic]/page.tsx: title not found for category: ${category}`,
      error
    );
  }

  try {
    const titleData = titleLoader(topicTitle);
    if (titleData) {
      topicTitle = titleData;
    }
  } catch (error) {
    console.error(
      `app/manual/[category]/[topic]/page.tsx: title not found for topic: ${topic}`,
      error
    );
  }

  try {
    const contentModule = await import(
      `@/app/manual/${category}/${topic}/page.tsx`
    );
    ContentComponent = contentModule.default;
  } catch (error) {
    console.error(
      `app/manual/[category]/[topic]/page.tsx: page.tsx not found for topic: ${topic}`,
      error
    );
  }

  return (
    <div>
      <Heading title={`${topicTitle}`} />
      {ContentComponent ? (
        <ContentComponent />
      ) : (
        <p>指定されたファイルが見つかりませんでした</p>
      )}
    </div>
  );
}
