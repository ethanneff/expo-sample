import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { Route } from '~/navigation/Navigation';

import { useAppTheme } from '~/theme/useAppTheme';

const GamesScreen = () => {
  const { colors } = useAppTheme();
  const navigate = useNavigation();

  const nav = (route: Route) => () => {
    navigate.navigate(route);
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Card>
          <Text title="Games" />
          <Button title="Game of life" onPress={nav('GameOfLife')} variant="secondary" />
          <Button title="Tic tac toe" onPress={nav('GameTicTacToe')} variant="secondary" />
          <Button title="Minesweeper" onPress={nav('GameMinesweeper')} variant="secondary" />
          <Button title="Snake" onPress={nav('GameSnake')} variant="secondary" />
          <Button title="Tetris" onPress={nav('GameTetris')} variant="secondary" />
          <Button title="Bejeweled" onPress={nav('GameBejeweled')} variant="secondary" />
          <Button title="Flappy bird" onPress={nav('GameFlappyBird')} variant="secondary" />
          <Button title="PadiJump" onPress={nav('GamePadiJump')} variant="secondary" />
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default GamesScreen;
