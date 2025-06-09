import { Card } from '~/components/Card/Card';
import { Paragraph } from '~/components/Paragraph/Paragraph';
import { Table } from '~/components/Table/Table';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const CardTypography = () => {
  const { spacing } = useAppTheme();

  return (
    <Card>
      <View gap={spacing.$12}>
        <Text title="The Joke Tax Chronicles" variant="h1" />
        <Text
          title="Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money."
          variant="lead"
        />
        <Text title="The King's Plan" variant="h2" />
        <Paragraph>
          <Text title="The king thought long and hard, and finally came up with " />
          <Text textDecorationLine="underline" title="a brilliant plan" />
          <Text title=": he would tax the jokes in the kingdom." />
        </Paragraph>
        <Text
          title={`"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."`}
          variant="blockquote"
        />
        <Text title="The Joke Tax" variant="h3" />
        <Text title="The king's subjects were not amused. They grumbled and complained, but the king was firm:" />
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text selectable title="1st level of puns: 5 gold coins" />
        </View>
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text selectable title="2nd level of jokes: 10 gold coins" />
        </View>
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text selectable title="3rd level of one-liners: 20 gold coins" />
        </View>
        <Text title="As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester." />
        <Text title="Jokester's Revolt" variant="h3" />
        <Text title="Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester." />
        <Text title="And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop." />
        <Text title="The People's Rebellion" variant="h3" />
        <Text title="The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke." />
        <Table
          headers={["King's Treasury", "People's happiness"]}
          rows={[
            ['Empty', 'Overflowing'],
            ['Modest', 'Satisfied'],
            ['Full', 'Ecstatic'],
          ]}
        />
        <Text title="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after." />
        <Text title="The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas." />
      </View>
    </Card>
  );
};
