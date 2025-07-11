import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import Text from '@/components/Text';

export const metadata: Metadata = {
  title: 'トップページ - 同志社高校地学部',
};

export default function Home() {
  return (
    <div>
      <Heading title="地学部へようこそ" />
      <Text>地学部では、月に一度の夜間天体観測を行っています。</Text>
      <Text>スマホの方は右上のメニュー(三本線)から各ページを開いてください</Text>
    </div>
  );
}
