import { titles } from '@/data/titles';

type TitleKey = keyof typeof titles;

export function titleLoader(key: TitleKey): string | undefined {
  if (
    key === '_next' ||
    key === 'static' ||
    key.startsWith('[') ||
    key.startsWith('.') ||
    key.startsWith('$')
  ) {
    return undefined;
  }

  if (!(key in titles)) {
    console.error(
      `lib/titleLoader.ts: キー "${key}" は titles.ts に存在しません`
    );
    return undefined;
  }
  return titles[key as keyof typeof titles];
}
