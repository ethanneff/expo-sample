import * as Haptics from 'expo-haptics';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, type ListRenderItemInfo } from 'react-native';
import { Icon } from '~/components/Icon/Icon';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Lesson = {
  id: string;
  lessonInUnit: number;
  name: string;
  sectionId: string;
  title: string;
  type: LessonType;
  unitId: string;
};

type LessonType = 'chest' | 'exercise' | 'mini-challenge' | 'normal' | 'review';

type Unit = {
  id: string;
  lessons: Lesson[];
  name: string;
};

const numberSections = 10;
const unitsPerSection = 25;
const numberLessonsInUnit = 10;

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

  const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
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

  for (let index = 0; index < numberSections; index += 1) {
    allUnits.push({
      id: `u${index}`,
      lessons: [],
      name: getRandomTitle(),
    });
  }

  return allUnits;
};

const generateLessonData = (): Lesson[] => {
  const allLessons: Lesson[] = [];

  for (let index = 0; index < numberSections; index += 1) {
    for (let index_ = 0; index_ < unitsPerSection; index_ += 1) {
      for (let k = 0; k < numberLessonsInUnit; k += 1) {
        const lessonNumberInUnit = k + 1;
        let type: LessonType = 'normal';

        if (lessonNumberInUnit === numberLessonsInUnit) {
          type = 'review';
        } else if (lessonNumberInUnit === numberLessonsInUnit - 1) {
          type = 'mini-challenge';
        } else if (lessonNumberInUnit % 4 === 0) {
          type = 'chest';
        }

        allLessons.push({
          id: `s${index}u${index_}l${k}`,
          lessonInUnit: lessonNumberInUnit, // bad practice
          name: `Lesson ${lessonNumberInUnit}`,
          sectionId: `s${index}`,
          title: getRandomTitle(),
          type,
          unitId: `u${index_}`,
        });
      }
    }
  }
  return allLessons;
};

const getIconForLessonType = (type: LessonType) => {
  switch (type) {
    case 'chest': {
      return 'cube-outline';
    }
    case 'exercise': {
      return 'barbell-outline';
    }
    case 'mini-challenge': {
      return 'flame-outline';
    }
    case 'normal': {
      return 'star-outline';
    }
    case 'review': {
      return 'trophy-outline';
    }
    default: {
      return 'star-outline';
    }
  }
};

const getIdFromId = (id: string): number => {
  return Number.parseInt(id.replaceAll(/\D/gu, ''), 10);
};

const { width } = Dimensions.get('window');
const keyExtractor = (item: Lesson) => item.id;

const DetailsScreen = () => {
  const { colors, spacing } = useAppTheme();
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
    ({ viewableItems }: { viewableItems: { isViewable: boolean; item: Lesson }[] }) => {
      if (viewableItems.length > 0) {
        const firstVisibleItem = viewableItems[0].item;
        if (firstVisibleItem) {
          if (firstVisibleItem.sectionId !== currentSection) {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const renderLesson = useCallback(
    ({ item }: ListRenderItemInfo<Lesson>) => {
      return (
        <View marginRight={getMarginForLesson(item.lessonInUnit, numberLessonsInUnit, width / 3)}>
          <View
            alignItems="center"
            alignSelf="center"
            backgroundColor={colors.primary}
            borderRadius={100}
            height={width / 4}
            justifyContent="center"
            padding={10}
            width={width / 4}>
            <Icon
              color={colors.background}
              name={getIconForLessonType(item.type)}
              size={width / 8}
            />
          </View>
        </View>
      );
    },
    [colors.background, colors.primary]
  );

  return (
    <Screen>
      <View
        backgroundColor={colors.popover}
        borderColor={colors.border}
        borderWidth={1}
        padding={spacing.$16}>
        <Text title={`Section ${getIdFromId(currentSection)}, Unit ${getIdFromId(currentUnit)}`} />
        <Text title={unitData[getIdFromId(currentUnit)].name} />
      </View>
      <FlatList
        contentContainerStyle={{
          gap: spacing.$16,
          paddingHorizontal: spacing.$16,
          paddingVertical: spacing.$8,
        }}
        data={lessonData}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={renderLesson}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig.current}
      />
    </Screen>
  );
};

export default DetailsScreen;
