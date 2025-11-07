import SearchBar from "@/components/SearchBar";
import { ScrollView, View } from "react-native";

export default function QuickTips() {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20, gap: 18 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, gap: 18 }}>
        <SearchBar placeholder="Search by author or title" />
      </View>
    </ScrollView>
  );
}
