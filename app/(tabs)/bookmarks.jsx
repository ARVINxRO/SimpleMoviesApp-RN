import { getBookmarks } from "@/api/movies";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

const Bookmarks = () => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Bookmarks", bookmarks],
    queryFn: () => getBookmarks(bookmarks),
  });
  console.log(bookmarks);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Movies.</Text>;
  }

  const MovieItem = ({ item }) => {
    return (
      <Link href={`/${item.id}`} asChild>
        <Pressable className="flex-1 w-[48%] overflow-hidden">
          <Image source={{ uri: item.poster }} className="h-80 rounded-xl " />
          <Text className="font-bold">
            {item.title.length < 25
              ? item.title
              : item.title.slice(0, 25) + "..."}
          </Text>
          <View className="flex-row justify-between">
            <Text>
              {item.country.length < 11
                ? item.country
                : item.country.slice(0, 11) + "..."}
            </Text>
            <Text>{item.imdb_rating}</Text>
          </View>
        </Pressable>
      </Link>
    );
  };
  return (
    <View className="flex-1">
      <FlatList
        data={data}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerClassName=" gap-2"
        columnWrapperClassName=" p-2 gap-2 justify-between items-center"
        onEndReached={() => <ActivityIndicator />}
      />
    </View>
  );
};

export default Bookmarks;
