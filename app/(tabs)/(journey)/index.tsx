import JourneyIslandModal from "@/components/JourneyIslandModal";
import { MapJourneyButton } from "@/components/MapJourneyButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import ConceptionIcon from "../../../assets/images/journey_icons/conception.svg";
import FirstTrimesterIcon from "../../../assets/images/journey_icons/first_trimester.svg";
import LaborAndDeliveryIcon from "../../../assets/images/journey_icons/labor_and_delivery.svg";
import NewbornIcon from "../../../assets/images/journey_icons/newborn.svg";
import PostpartumIcon from "../../../assets/images/journey_icons/postpartum.svg";
import PreconceptionIcon from "../../../assets/images/journey_icons/preconception.svg";
import PrematureBirthIcon from "../../../assets/images/journey_icons/premature_birth.svg";
import SecondTrimesterIcon from "../../../assets/images/journey_icons/second_trimester.svg";
import ThirdTrimesterIcon from "../../../assets/images/journey_icons/third_trimester.svg";
import YearOneIcon from "../../../assets/images/journey_icons/year1.svg";
import YearTwoIcon from "../../../assets/images/journey_icons/year2.svg";
import YearThreeIcon from "../../../assets/images/journey_icons/year3.svg";

const backgroundImage = require("../../../assets/images/journey-background.png");

export interface Point {
  x: number;
  y: number;
  color: string; // fill
  border: string; // tint
  icon: React.ComponentType<{ width?: number; height?: number }>;
  id: string; // title
  subtitle: string;
  description: string;
  modalVisible: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JourneyScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  // Used to easily adjust the entire path's position
  const HORIZONTAL_CHANGE = -30;
  const VERTICAL_CHANGE = 0;

  // Modal states
  const [isPreconceptionModalVisible, setIsPreconceptionModalVisible] =
    useState(false);
  const [isConceptionModalVisible, setIsConceptionModalVisible] =
    useState(false);
  const [isFirstTrimesterModalVisible, setIsFirstTrimesterModalVisible] =
    useState(false);
  const [isSecondTrimesterModalVisible, setIsSecondTrimesterModalVisible] =
    useState(false);
  const [isThirdTrimesterModalVisible, setIsThirdTrimesterModalVisible] =
    useState(false);
  const [isLaborAndDeliveryModalVisible, setIsLaborAndDeliveryModalVisible] =
    useState(false);
  const [isPostpartumModalVisible, setIsPostpartumModalVisible] =
    useState(false);
  const [isPrematureBirthModalVisible, setIsPrematureBirthModalVisible] =
    useState(false);
  const [isNewbornModalVisible, setIsNewbornModalVisible] = useState(false);
  const [isYearOneModalVisible, setIsYearOneModalVisible] = useState(false);
  const [isYearTwoModalVisible, setIsYearTwoModalVisible] = useState(false);
  const [isYearThreeModalVisible, setIsYearThreeModalVisible] = useState(false);

  const points: Point[] = [
    {
      x: width * 0.28 + HORIZONTAL_CHANGE,
      y: 0 + VERTICAL_CHANGE,
      color: "#C7E3FF",
      border: "#66B2FF",
      icon: PreconceptionIcon,
      id: "Preconception",
      subtitle: "The Wish",
      description:
        "Discover how to care for your body, plan ahead, and create the healthiest foundation before the journey begins.",
      modalVisible: isPreconceptionModalVisible,
      setModalState: setIsPreconceptionModalVisible,
    },
    {
      x: width * 0.6 + HORIZONTAL_CHANGE,
      y: 90 + VERTICAL_CHANGE,
      color: "#E1FFD3",
      border: "#009C3C",
      icon: ConceptionIcon,
      id: "Conception",
      subtitle: "The Spark",
      description:
        "Explore the beauty of conception, what to expect, and how to best navigate these exciting times.",
      modalVisible: isConceptionModalVisible,
      setModalState: setIsConceptionModalVisible,
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 260 + VERTICAL_CHANGE,
      color: "#E4E4FF",
      border: "#5A5CFF",
      icon: FirstTrimesterIcon,
      id: "First Trimester",
      subtitle: "New Beginnings",
      description:
        "Enter the earliest chapter of pregnancy, where tiny changes mean big things—learn what's happening, what to expect, and how to support yourself along the way.",
      modalVisible: isFirstTrimesterModalVisible,
      setModalState: setIsFirstTrimesterModalVisible,
    },
    {
      x: width * 0.4 + HORIZONTAL_CHANGE,
      y: 460 + VERTICAL_CHANGE,
      color: "#FFFDE4",
      border: "#FFB050",
      icon: SecondTrimesterIcon,
      id: "Second Trimester",
      subtitle: "The Bloom",
      description:
        "Explore the stage where energy returns and baby grows quickly—discover milestones, body changes, and ways to enjoy this exciting middle chapter.",
      modalVisible: isSecondTrimesterModalVisible,
      setModalState: setIsSecondTrimesterModalVisible,
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 610 + VERTICAL_CHANGE,
      color: "#FFDADA",
      border: "#FF7373",
      icon: ThirdTrimesterIcon,
      id: "Third Trimester",
      subtitle: "The Home Stretch",
      description:
        "Explore the stage where energy returns and baby grows quickly—discover milestones, body changes, and ways to enjoy this exciting middle chapter.",
      modalVisible: isThirdTrimesterModalVisible,
      setModalState: setIsThirdTrimesterModalVisible,
    },
    {
      x: width * 0.35 + HORIZONTAL_CHANGE,
      y: 780 + VERTICAL_CHANGE,
      color: "#FFE8D6",
      border: "#FF6B35",
      icon: LaborAndDeliveryIcon,
      id: "Labor & Delivery",
      subtitle: "The Arrival",
      description:
        "Explore the stage where energy returns and baby grows quickly—discover milestones, body changes, and ways to enjoy this exciting middle chapter.",
      modalVisible: isLaborAndDeliveryModalVisible,
      setModalState: setIsLaborAndDeliveryModalVisible,
    },
    {
      x: width * 0.75 + HORIZONTAL_CHANGE,
      y: 960 + VERTICAL_CHANGE,
      color: "#FFD6FE",
      border: "#FF5AFA",
      icon: PostpartumIcon,
      id: "Postpartum",
      subtitle: "The Nest",
      description:
        "Navigate the tender weeks after birth—learn how to heal, adjust, and care for yourself while bonding with your new baby.",
      modalVisible: isPostpartumModalVisible,
      setModalState: setIsPostpartumModalVisible,
    },
    {
      x: width * 0.3 + HORIZONTAL_CHANGE,
      y: 1130 + VERTICAL_CHANGE,
      color: "#C7E3FF",
      border: "#66B2FF",
      icon: PrematureBirthIcon,
      id: "Premature Birth",
      subtitle: "The Early Arrival",
      description:
        "Step into a journey that begins sooner than expected—learn how to navigate premature birth, understand your baby's needs, and find strength and support through every small victory.",
      modalVisible: isPrematureBirthModalVisible,
      setModalState: setIsPrematureBirthModalVisible,
    },
    {
      x: width * 0.72 + HORIZONTAL_CHANGE,
      y: 1300 + VERTICAL_CHANGE,
      color: "#C7E3FF",
      border: "#66B2FF",
      icon: NewbornIcon,
      id: "Newborn",
      subtitle: "The First Hello",
      description:
        "Discover the basics of caring for your newborn—from feeding and sleep to soothing and bonding during these precious first weeks.",
      modalVisible: isNewbornModalVisible,
      setModalState: setIsNewbornModalVisible,
    },
    {
      x: width * 0.25 + HORIZONTAL_CHANGE,
      y: 1470 + VERTICAL_CHANGE,
      color: "#E1FFD3",
      border: "#009C3C",
      icon: YearOneIcon,
      id: "Year 1",
      subtitle: "The First Steps",
      description:
        "Follow your baby through a year of incredible growth—first smiles, first steps, and the milestones that shape their earliest discoveries.",
      modalVisible: isYearOneModalVisible,
      setModalState: setIsYearOneModalVisible,
    },
    {
      x: width * 0.7 + HORIZONTAL_CHANGE,
      y: 1640 + VERTICAL_CHANGE,
      color: "#E4E4FF",
      border: "#5A5CFF",
      icon: YearTwoIcon,
      id: "Year 2",
      subtitle: "The Little Explorer",
      description:
        "Dive into toddlerhood, where curiosity takes the lead—learn how to support learning, independence, and big emotions.",
      modalVisible: isYearTwoModalVisible,
      setModalState: setIsYearTwoModalVisible,
    },
    {
      x: width * 0.28 + HORIZONTAL_CHANGE,
      y: 1810 + VERTICAL_CHANGE,
      color: "#FFFDE4",
      border: "#FFB050",
      icon: YearThreeIcon,
      id: "Year 3",
      subtitle: "The Brave Adventurer",
      description:
        "Step into a world of stories, creativity, and growing independence as your child begins to explore life through play.",
      modalVisible: isYearThreeModalVisible,
      setModalState: setIsYearThreeModalVisible,
    },
  ];

  const controlPoints = [
    { x: width * 0.45 + HORIZONTAL_CHANGE, y: 30 + VERTICAL_CHANGE }, // 1→2
    { x: width * 1.0 + HORIZONTAL_CHANGE, y: 120 + VERTICAL_CHANGE }, // 2→3
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 260 + VERTICAL_CHANGE }, // 3→4
    { x: width * 0.8 + HORIZONTAL_CHANGE, y: 480 + VERTICAL_CHANGE }, // 4→5
    { x: width * 0.15 + HORIZONTAL_CHANGE, y: 670 + VERTICAL_CHANGE }, // 5→6
    { x: width * 0.85 + HORIZONTAL_CHANGE, y: 850 + VERTICAL_CHANGE }, // 6→7
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 1020 + VERTICAL_CHANGE }, // 7→8
    { x: width * 0.9 + HORIZONTAL_CHANGE, y: 1190 + VERTICAL_CHANGE }, // 8→9
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 1370 + VERTICAL_CHANGE }, // 9→10
    { x: width * 0.85 + HORIZONTAL_CHANGE, y: 1530 + VERTICAL_CHANGE }, // 10→11
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 1700 + VERTICAL_CHANGE }, // 11→12
  ];

  function getPathString(pts: Point[], ctrls: { x: number; y: number }[]) {
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < ctrls.length; i++) {
      path += ` Q ${ctrls[i].x} ${ctrls[i].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }
    return path;
  }

  const pathString = getPathString(points, controlPoints);

  return (
    <ImageBackground
      source={backgroundImage}
      style={StyleSheet.absoluteFill}
      imageStyle={{ resizeMode: "cover" }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 18,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ paddingTop: 20, paddingBottom: 40 }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "500", color: "#A781B1" }}
              >
                OliviaHealth
              </Text>
              <Text
                style={{ fontSize: 35, color: "#73577A", fontWeight: "bold" }}
              >
                Journey
              </Text>
            </View>
          </View>

          {/* Journey Path and Buttons */}
          <View
            style={{
              position: "relative",
              width: width,
              height: points[points.length - 1].y + 100,
              marginTop: 40,
            }}
          >
            <Svg
              height={points[points.length - 1].y + 100}
              width={width}
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <Path
                d={pathString}
                stroke="#a259ff"
                strokeWidth={12}
                fill="none"
                opacity={0.09}
                strokeLinecap="round"
              />
              {/* For debugging: Control Points */}
              {/* {controlPoints.map((ctrl, idx) => (
                <Circle key={idx} cx={ctrl.x} cy={ctrl.y} r={5} fill="red" />
              ))} */}
            </Svg>
            {points.map((pt, idx) => (
              <MapJourneyButton
                key={idx}
                x={pt.x}
                y={pt.y}
                progress={Math.random() * 100} // Random progress for demo
                borderColor={pt.border}
                fillColor={pt.color}
                Icon={pt.icon}
                id={pt.id}
                setModalState={pt.setModalState}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Journey Island Modals */}
      {points.map((pt, idx) => (
        <JourneyIslandModal
          key={idx}
          pt={pt}
          Icon={pt.icon}
          onExplore={() => {
            pt.setModalState(false);
            router.push(`/(tabs)/(journey)/details/${pt.id}`);
          }}
        />
      ))}
    </ImageBackground>
  );
}
