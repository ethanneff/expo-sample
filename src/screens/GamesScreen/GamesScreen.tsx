import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { type Route } from '~/navigation/types';
import { useAppTheme } from '~/theme/useAppTheme';

const GamesScreen = () => {
  const { spacing } = useAppTheme();
  const navigate = useNavigation();

  const nav = (route: Route) => () => {
    navigate.navigate(route);
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View gap={spacing.$4} padding={spacing.$12}>
          <Card>
            <Text title="Games" variant="h1" />
            <View gap={spacing.$4}>
              <Button onPress={nav('GameOfLife')} title="Game of life" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="Tic tac toe" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="Minesweeper" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="Snake" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="Tetris" variant="outline" />
              <Button onPress={nav('GameBejeweled')} title="Bejeweled" variant="outline" />
              <Button onPress={nav('GameFlappyBird')} title="Flappy bird" variant="outline" />
              <Button onPress={nav('GamePapiJump')} title="PapiJump" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="CoinMaster" variant="outline" />
              <Button onPress={nav('GameTicTacToe')} title="TempleRun" variant="outline" />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default GamesScreen;
