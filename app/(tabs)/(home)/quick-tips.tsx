import VideoCard from "@/components/QuickTipCard";
import SearchBar from "@/components/SearchBar";
import useResourcesStore from "@/src/store/useResourcesStore";
import { ScrollView, View } from "react-native";

export default function QuickTips() {
  const resources = useResourcesStore(state => state.resources);
  const quick_tips = resources?.quick_tips;

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by author or title" />
        {quick_tips?.map((tip, index) => (
          <VideoCard key={index} quickTip={tip} />
        ))}
      </View>
    </ScrollView>
  );
}
