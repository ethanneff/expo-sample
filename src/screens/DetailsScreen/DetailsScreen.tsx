import { FontAwesome6 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';

type Section = {
  id: string;
  name: string;
  units: Unit[];
};

type Unit = {
  id: string;
  name: string;
  lessons: Lesson[];
};

type LessonType = 'normal' | 'chest' | 'exercise' | 'review' | 'mini-challenge';

type Lesson = {
  id: string;
  name: string;
  sectionId: string;
  unitId: string;
  lessonInUnit: number;
  type: LessonType;
  title: string;
};

const numSections = 10;
const unitsPerSection = 25;
const numLessonsInUnit = 10;

const getRandomTitle = () => {
  const subjects = [
    'The cat',
    'A robot',
    'My friend',
    'An alien',
    'The teacher',
    'A squirrel',
    'The president',
    'An artist',
    'The dragon',
    'A time traveler',
    'The chef',
    'A ninja',
    'The dog',
    'An astronaut',
    'The pirate',
  ];

  const verbs = [
    'eats',
    'writes',
    'jumps on',
    'watches',
    'builds',
    'paints',
    'destroys',
    'launches',
    'invents',
    'hugs',
    'studies',
    'throws',
    'finds',
    'drives',
    'repairs',
  ];

  const objects = [
    'a sandwich',
    'the moon',
    'a car',
    'a computer',
    'a book',
    'a pizza',
    'the spaceship',
    'a mysterious box',
    'a rainbow',
    'the internet',
    'a giant donut',
    'a telescope',
    'an ancient scroll',
    'a magic wand',
    'a treasure chest',
  ];

  const getRandomElement = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const generateRandomSentence = () => {
    const subject = getRandomElement(subjects);
    const verb = getRandomElement(verbs);
    const object = getRandomElement(objects);
    return `${subject} ${verb} ${object}`;
  };

  return generateRandomSentence();
};

const generateUnitData = (): Unit[] => {
  const allUnits: Unit[] = [];

  for (let i = 0; i < numSections; i++) {
    allUnits.push({
      id: `u${i}`,
      name: getRandomTitle(),
      lessons: [],
    });
  }

  return allUnits;
};

const generateLessonData = (): Lesson[] => {
  const allLessons: Lesson[] = [];

  for (let i = 0; i < numSections; i++) {
    for (let j = 0; j < unitsPerSection; j++) {
      for (let k = 0; k < numLessonsInUnit; k++) {
        const lessonNumberInUnit = k + 1;
        let type: LessonType = 'normal';

        if (lessonNumberInUnit === numLessonsInUnit) {
          type = 'review';
        } else if (lessonNumberInUnit === numLessonsInUnit - 1) {
          type = 'mini-challenge';
        } else {
          if (lessonNumberInUnit % 4 === 0) {
            type = 'chest';
          }
        }

        allLessons.push({
          id: `s${i}u${j}l${k}`,
          name: `Lesson ${lessonNumberInUnit}`,
          sectionId: `s${i}`,
          unitId: `u${j}`,
          lessonInUnit: lessonNumberInUnit, // bad practice
          type,
          title: getRandomTitle(),
        });
      }
    }
  }
  return allLessons;
};

const getIconForLessonType = (type: LessonType) => {
  switch (type) {
    case 'normal':
      return 'star';
    case 'exercise':
      return 'dumbbell';
    case 'chest':
      return 'explosion';
    case 'review':
      return 'trophy';
    case 'mini-challenge':
      return 'fire';
  }
};

const getIdFromId = (id: string): number => {
  return parseInt(id.replace(/[^0-9]/g, ''));
};

const width = Dimensions.get('window').width;

const DetailsScreen = () => {
  const lessonData = generateLessonData();
  const unitData = generateUnitData();
  const [currentSection, setCurrentSection] = useState('s1');
  const [currentUnit, setCurrentUnit] = useState('u1');

  // Ref for the viewability config to avoid redefining it on every render
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 1,
    waitForInteraction: true,
  });

  // Ref for the callback to ensure it has the latest state setters
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: { item: Lesson; isViewable: boolean }[] }) => {
      if (viewableItems.length > 0) {
        const firstVisibleItem = viewableItems[0].item;
        if (firstVisibleItem) {
          if (firstVisibleItem.sectionId !== currentSection) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentSection(firstVisibleItem.sectionId);
          }
          if (firstVisibleItem.unitId !== currentUnit) {
            setCurrentUnit(firstVisibleItem.unitId);
          }
        }
      }
    }
  );

  const getMarginForLesson = (index: number, totalIndex: number, maximumMargin: number): number => {
    const quarterCycle = totalIndex / 4;
    const angle = (index / quarterCycle) * (Math.PI / 2);
    const value = Math.round(Math.sin(angle) * 2) / 2;
    return value * maximumMargin;
  };

  const renderLesson = ({ item }: { item: Lesson }) => {
    return (
      <View marginRight={getMarginForLesson(item.lessonInUnit, numLessonsInUnit, width / 3)}>
        <View
          backgroundColor={'green'}
          borderRadius={100}
          padding={10}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'center'}
          width={width / 4}
          height={width / 4}>
          <FontAwesome6 name={getIconForLessonType(item.type)} size={width / 8} color="black" />
        </View>
      </View>
    );
  };

  return (
    <Screen>
      {/* Sticky Header */}
      <View padding={16} backgroundColor={'#e0e0e0'}>
        <Text title={`Section ${getIdFromId(currentSection)}, Unit ${getIdFromId(currentUnit)}`} />
        <Text title={`${unitData[getIdFromId(currentUnit)].name}`} />
      </View>

      {/* Level List */}
      <View style={styles.listContainer}>
        <FlatList
          data={lessonData}
          renderItem={renderLesson}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig.current}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  listContainer: {
    // flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
});

export default DetailsScreen;
