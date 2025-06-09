import { useCallback, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Board = Player[];
type Player = 'O' | 'X' | null;

const GameTicTacToe = () => {
  const { colors, spacing } = useAppTheme();
  const [board, setBoard] = useState<Board>(Array.from({ length: 9 }).fill(null) as Board);
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = useCallback(
    (index: number) => () => {
      if (board[index] || calculateWinner(board)) return;

      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);
    },
    [board, isXNext]
  );

  const resetGame = useCallback(() => {
    setBoard(Array.from({ length: 9 }).fill(null) as Board);
    setIsXNext(true);
  }, []);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : // eslint-disable-next-line sonarjs/no-nested-conditional
      isDraw
      ? "It's a draw!"
      : // eslint-disable-next-line sonarjs/no-nested-conditional
        `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index: number) => (
    <Pressable key={index} onPress={handleClick(index)}>
      <View
        alignItems="center"
        borderColor={colors.border}
        borderWidth={1}
        height={80}
        justifyContent="center"
        width={80}>
        <Text
          color={board[index] === 'X' ? 'primary' : 'destructive'}
          title={board[index] ?? ''}
          variant="h3"
        />
      </View>
    </Pressable>
  );

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Card>
          <View alignItems="center" gap={spacing.$8}>
            <Text title="Tic Tac Toe" variant="h1" />
            <Text color={winner ? 'primary' : 'foreground'} title={status} variant="large" />
            <View
              borderColor={colors.border}
              borderWidth={1}
              flexDirection="row"
              flexWrap="wrap"
              height={240}
              width={240}>
              {Array.from({ length: 9 })
                .fill(null)
                .map((_, index) => renderSquare(index))}
            </View>
            <Button onPress={resetGame} title="Reset Game" variant="secondary" />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default GameTicTacToe;
