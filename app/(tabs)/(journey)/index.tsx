import JourneyIslandModal from "@/components/JourneyIslandModal";
import { MapJourneyButton } from "@/components/MapJourneyButton";
import { Ionicons } from "@expo/vector-icons";
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

export default function JourneyScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  interface Point {
    x: number;
    y: number;
    color: string;
    border: string;
    icon: keyof typeof Ionicons.glyphMap;
    id: string;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  }

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
      color: "#f3e6ff",
      border: "#a259ff",
      icon: "medkit",
      id: "Preconception",
      setModalState: setIsPreconceptionModalVisible,
    },
    {
      x: width * 0.6 + HORIZONTAL_CHANGE,
      y: 90 + VERTICAL_CHANGE,
      color: "#ffe6f0",
      border: "#ff6f91",
      icon: "nutrition",
      id: "Conception",
      setModalState: setIsConceptionModalVisible,
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 260 + VERTICAL_CHANGE,
      color: "#e6f7ff",
      border: "#43b0f1",
      icon: "git-branch",
      id: "1st Trimester",
      setModalState: setIsFirstTrimesterModalVisible,
    },
    {
      x: width * 0.4 + HORIZONTAL_CHANGE,
      y: 460 + VERTICAL_CHANGE,
      color: "#fffbe6",
      border: "#ffd700",
      icon: "flask",
      id: "2nd Trimester",
      setModalState: setIsSecondTrimesterModalVisible,
    },
    {
      x: width * 0.8 + HORIZONTAL_CHANGE,
      y: 610 + VERTICAL_CHANGE,
      color: "#e6fff7",
      border: "#00b894",
      icon: "arrow-down",
      id: "3rd Trimester",
      setModalState: setIsThirdTrimesterModalVisible,
    },
  ];

  const controlPoints = [
    { x: width * 0.45 + HORIZONTAL_CHANGE, y: 30 + VERTICAL_CHANGE }, // Connects 1st and 2nd
    { x: width * 1 + HORIZONTAL_CHANGE, y: 120 + VERTICAL_CHANGE }, // Connects 2nd and 3rd
    { x: width * 0.1 + HORIZONTAL_CHANGE, y: 260 + VERTICAL_CHANGE }, // Connects 3rd and 4th
    { x: width * 0.8 + HORIZONTAL_CHANGE, y: 480 + VERTICAL_CHANGE }, // Connects 4th and 5th
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
                icon={pt.icon}
                id={pt.id}
                setModalState={pt.setModalState}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Journey Island Modals */}
      <JourneyIslandModal
        visible={isPreconceptionModalVisible}
        onClose={() => setIsPreconceptionModalVisible(false)}
        title="Preconception"
        subtitle="The Wish"
        description="Discover how to care for your body, plan ahead, and create the healthiest foundation before the journey begins."
        Icon={PreconceptionIcon}
        onExplore={() => {
          setIsPreconceptionModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Preconception" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isConceptionModalVisible}
        onClose={() => setIsConceptionModalVisible(false)}
        title="Conception"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={ConceptionIcon}
        onExplore={() => {
          setIsConceptionModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Conception" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isFirstTrimesterModalVisible}
        onClose={() => setIsFirstTrimesterModalVisible(false)}
        title="First Trimester"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={FirstTrimesterIcon}
        onExplore={() => {
          setIsFirstTrimesterModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "First Trimester" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isSecondTrimesterModalVisible}
        onClose={() => setIsSecondTrimesterModalVisible(false)}
        title="Second Trimester"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={SecondTrimesterIcon}
        onExplore={() => {
          setIsSecondTrimesterModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Second Trimester" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isThirdTrimesterModalVisible}
        onClose={() => setIsThirdTrimesterModalVisible(false)}
        title="Third Trimester"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={ThirdTrimesterIcon}
        onExplore={() => {
          setIsThirdTrimesterModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Third Trimester" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isLaborAndDeliveryModalVisible}
        onClose={() => setIsLaborAndDeliveryModalVisible(false)}
        title="Labor and Delivery"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={LaborAndDeliveryIcon}
        onExplore={() => {
          setIsLaborAndDeliveryModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Labor and Delivery" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isPostpartumModalVisible}
        onClose={() => setIsPostpartumModalVisible(false)}
        title="Postpartum"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={PostpartumIcon}
        onExplore={() => {
          setIsPostpartumModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Postpartum" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isPrematureBirthModalVisible}
        onClose={() => setIsPrematureBirthModalVisible(false)}
        title="Premature Birth"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={PrematureBirthIcon}
        onExplore={() => {
          setIsPrematureBirthModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Premature Birth" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isNewbornModalVisible}
        onClose={() => setIsNewbornModalVisible(false)}
        title="Newborn"
        subtitle="Your Journey Begins"
        description="Discover how to prepare for a healthy pregnancy, from nutrition tips to lifestyle changes."
        Icon={NewbornIcon}
        onExplore={() => {
          setIsNewbornModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Newborn" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isYearOneModalVisible}
        onClose={() => setIsYearOneModalVisible(false)}
        title="Year One"
        subtitle="First Steps"
        description="Explore the exciting milestones and developments of your child's first year."
        Icon={YearOneIcon}
        onExplore={() => {
          setIsYearOneModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Year One" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isYearTwoModalVisible}
        onClose={() => setIsYearTwoModalVisible(false)}
        title="Year Two"
        subtitle="Growing Up"
        description="Discover the wonders of your child's second year and the new skills they're developing."
        Icon={YearTwoIcon}
        onExplore={() => {
          setIsYearTwoModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Year Two" },
          });
        }}
      />
      <JourneyIslandModal
        visible={isYearThreeModalVisible}
        onClose={() => setIsYearThreeModalVisible(false)}
        title="Year Three"
        subtitle="Learning and Playing"
        description="Dive into the world of learning and play as your child grows in their third year."
        Icon={YearThreeIcon}
        onExplore={() => {
          setIsYearThreeModalVisible(false);
          router.push({
            pathname: "/(tabs)/(journey)/details/[id]",
            params: { id: "Year Three" },
          });
        }}
      />
    </ImageBackground>
  );
}
