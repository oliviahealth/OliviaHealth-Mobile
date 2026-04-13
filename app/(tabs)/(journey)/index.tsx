import React, { useMemo, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

import JourneyIslandModal from "@/components/JourneyIslandModal";
import { MapJourneyButton } from "@/components/MapJourneyButton";
import useResourcesStore from "@/src/store/useResourcesStore";

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

function saturateAndDarken(hex: string): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  s = Math.min(1, s * 2.0);
  l = Math.max(0.3, l * 0.7);

  function hue2rgb(p: number, q: number, t: number) {
    let temp = t;
    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 1 / 2) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const ro = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const go = Math.round(hue2rgb(p, q, h) * 255);
  const bo = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return (
    "#" +
    [ro, go, bo]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function JourneyScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const resources = useResourcesStore((state) => state.resources);
  const icon_map = useResourcesStore(state => state.icon_map);

  const [visibleModalId, setVisibleModalId] = useState<string | null>(null);

  const islands = resources?.islands ?? [];

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