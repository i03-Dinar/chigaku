import Text from '@/components/Text';
import Alert from '@/components/Alert';
import Space from '@/components/Space';
import Picture from '@/components/Picture';

const Content: React.FC = () => {
  return (
    <div>
      <Alert type="caution">
        レンズを外す際は必ずレンズに手を添えてください。
        <br />
        取り外しても床や椅子には絶対に置かないでください。
      </Alert>

      <Text size="lg">OR40mmの場合</Text>
      <Text>そのまま望遠鏡に付けることができます。</Text>
      <Picture pubId="IMG_3740_u66vsv" caption="OR40mmレンズを実際に装着した様子" />
      <Space />

      <Text size="lg">OR25mm, OR18mm, HM25, その他の場合</Text>
      <Text>
        接続用の部品につなげてから望遠鏡に付けることができます。
        <br />
        この部品は小さなケースに入っています。
      </Text>
      <Picture pubId="IMG_3683_cvr9ye" caption="OR25mmなどのレンズたち" />
    </div>
  );
};

export default Content;
