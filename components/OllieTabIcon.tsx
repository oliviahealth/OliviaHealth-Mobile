import { Image, View } from "react-native";

interface OllieTabIconProps {
  focused: boolean;
}

const ICON_SIZE = 28;
const ICON_SOURCE = require("@/assets/images/ollie_avatar.png");

export default function OllieTabIcon({ focused }: OllieTabIconProps) {
  return (
    <View
      style={{
        width: ICON_SIZE + 10,
        height: ICON_SIZE + 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,

        // Glow only when selected
        shadowColor: "#B642D3",
        shadowOpacity: focused ? 0.8 : 0,
        shadowRadius: focused ? 4 : 0,
        shadowOffset: { width: 0, height: 0 },
        // Android glow
        elevation: focused ? 8 : 0,
      }}
    >
      <Image
        source={ICON_SOURCE}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      />
    </View>
  );
}
