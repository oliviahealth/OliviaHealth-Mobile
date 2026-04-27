import React, { useMemo, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

import JourneyIslandModal from "@/components/JourneyIslandModal";
import { MapJourneyButton } from "@/components/MapJourneyButton";
import useResourcesStore, { fetchResources } from "@/src/store/useResourcesStore";

import { saturateAndDarken } from "@/app/utils/utils";

const backgroundImage = require("../../../assets/images/journey-background.png");

type IconComponent = React.ComponentType<{ width?: number; height?: number }>;

export interface IPoint {
  x: number;
  y: number;
  color: string;
  border: string;
  icon: IconComponent;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  modalVisible: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const VERTICAL_CHANGE = 0;
const DEFAULT_COLOR = "#E4E4FF";
const VERTICAL_SPACING = 170;


export default function JourneyScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const resources = useResourcesStore((state) => state.resources);
  const icon_map = useResourcesStore(state => state.icon_map);

  const [visibleModalId, setVisibleModalId] = useState<string | null>(null);

  const islands = resources?.islands.sort((a, b) => (a.data?.order ?? 0) - (b.data?.order ?? 0)) ?? [];

  const points: IPoint[] = useMemo(() => {
    return islands.map((island, index) => {
      const iconKey = island.data?.icon?.trim().toLowerCase();
      const Icon = icon_map[iconKey ?? ""] ?? icon_map["sparkle"];

      const xFactor = index % 2 === 0 ? 0.28 : 0.72;
      const y = index * VERTICAL_SPACING;
      const fill = island.data?.color ?? DEFAULT_COLOR;

      return {
        x: width * xFactor,
        y: y + VERTICAL_CHANGE,
        color: fill,
        border: saturateAndDarken(fill),
        icon: Icon,
        id: island.id,
        title: island.name,
        subtitle: island.data?.secondary_name ?? "",
        description: island.data?.description ?? "",
        modalVisible: visibleModalId === island.id,
        setModalState: (value) => {
          setVisibleModalId(value ? island.id : null);
        },
      };
    });
  }, [islands, visibleModalId, width]);

  const controlPoints = useMemo(() => {
    return points.slice(0, -1).map((point, index) => {
      const swingFactors = [0.92, 0.08, 0.88, 0.12, 0.95, 0.05, 0.90, 0.10];
      const swing = swingFactors[index % swingFactors.length];

      const verticalOffsets = [0.45, 0.55, 0.42, 0.58, 0.48, 0.52, 0.44, 0.56];
      const verticalRatio = verticalOffsets[index % verticalOffsets.length];

      return {
        x: width * swing,
        y: point.y + VERTICAL_SPACING * verticalRatio + VERTICAL_CHANGE,
      };
    });
  }, [points, width]);

  const progressValues = useMemo(
    () => points.map(() => Math.random() * 100),
    [points.length],
  );

  function getPathString(
    pts: IPoint[],
    ctrls: { x: number; y: number }[],
  ): string {
    if (pts.length === 0) return "";

    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < ctrls.length; i++) {
      path += ` Q ${ctrls[i].x} ${ctrls[i].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }

    return path;
  }

  const pathString = getPathString(points, controlPoints);
  const containerHeight =
    points.length > 0 ? points[points.length - 1].y + 100 : 400;

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      await fetchResources();
    } finally {
      setRefreshing(false);
    }
  }, [fetchResources, refreshing]);

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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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

          <View
            style={{
              position: "relative",
              width,
              height: containerHeight,
              marginTop: 40,
            }}
          >
            {points.length > 0 && (
              <>
                <Svg
                  height={containerHeight}
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
                </Svg>

                {points.map((pt, idx) => (
                  <MapJourneyButton
                    key={pt.id}
                    x={pt.x}
                    y={pt.y}
                    progress={progressValues[idx]}
                    borderColor={pt.border}
                    fillColor={pt.color}
                    Icon={pt.icon}
                    id={pt.title}
                    setModalState={pt.setModalState}
                  />
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {points.map((pt) => (
        <JourneyIslandModal
          key={pt.id}
          pt={{
            ...pt,
            id: pt.title,
            subtitle: pt.subtitle,
            description: pt.description,
          }}
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