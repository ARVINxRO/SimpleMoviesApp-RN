import { getMovieDetails } from "@/api/movies";
import { useBookmarkStore } from "@/store/bookmarkStore";
import Entypo from "@expo/vector-icons/Entypo";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Movie", id],
    queryFn: () => getMovieDetails(id),
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Movie Detail.</Text>;
  }
  return (
    <View className="flex-1 items-center bg-blue-200 px-2">
      <Stack.Screen options={{ title: data.title }} />
      <View className="w-[55%] mt-2">
        <Image source={{ uri: data.poster }} className="h-96 rounded-xl" />
      </View>
      <Text className="text-2xl font-bold">{data.title}</Text>
      <Text className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        explicabo harum rem corrupti culpa quos iure molestias provident
        nesciunt, rerum eius natus sit laudantium velit nobis reiciendis, autem
        aliquid facere.
      </Text>
      <Text className="mt-8">Directed by : {data.director}</Text>
      <Text>{data.year}</Text>
      {bookmarks.includes(data.id) ? (
        <TouchableOpacity
          onPress={() => removeBookmark(data.id)}
          className="mt-4 flex-row gap-2 items-center"
        >
          <Text>Remove from Bookmark</Text>
          <Entypo name="bookmarks" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => addBookmark(data.id)}
          className="mt-4 flex-row gap-2 items-center"
        >
          <Text>Add to Bookmark</Text>
          <Entypo name="bookmarks" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MovieDetails;
