import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { Route } from '~/navigation/Navigation';
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
              <Button title="Game of life" onPress={nav('GameOfLife')} variant="outline" />
              <Button title="Tic tac toe" onPress={nav('GameTicTacToe')} variant="outline" />
              <Button title="Minesweeper" onPress={nav('GameTicTacToe')} variant="outline" />
              <Button title="Snake" onPress={nav('GameTicTacToe')} variant="outline" />
              <Button title="Tetris" onPress={nav('GameTicTacToe')} variant="outline" />
              <Button title="Bejeweled" onPress={nav('GameBejeweled')} variant="outline" />
              <Button title="Flappy bird" onPress={nav('GameFlappyBird')} variant="outline" />
              <Button title="PapiJump" onPress={nav('GamePapiJump')} variant="outline" />
              <Button title="CoinMaster" onPress={nav('GameTicTacToe')} variant="outline" />
              <Button title="TempleRun" onPress={nav('GameTicTacToe')} variant="outline" />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default GamesScreen;
