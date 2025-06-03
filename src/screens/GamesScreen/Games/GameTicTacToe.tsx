import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Player = 'X' | 'O' | null;
type Board = Player[];

const GameTicTacToe = () => {
  const { colors, spacing } = useAppTheme();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "It's a draw!"
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index: number) => (
    <Pressable key={index} onPress={() => handleClick(index)}>
      <View
        width={80}
        height={80}
        borderWidth={1}
        borderColor={colors.border}
        justifyContent="center"
        alignItems="center">
        <Text
          title={board[index] || ''}
          size="2xl"
          weight="bold"
          color={board[index] === 'X' ? 'primary' : 'destructive'}
        />
      </View>
    </Pressable>
  );

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Card>
          <View gap={spacing.$8} alignItems="center">
            <Text title="Tic Tac Toe" size="2xl" weight="bold" />
            <Text title={status} size="lg" color={winner ? 'primary' : 'foreground'} />
            <View
              flexDirection="row"
              flexWrap="wrap"
              width={240}
              height={240}
              borderWidth={1}
              borderColor={colors.border}>
              {Array(9)
                .fill(null)
                .map((_, index) => renderSquare(index))}
            </View>
            <Button title="Reset Game" onPress={resetGame} variant="secondary" />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default GameTicTacToe;
