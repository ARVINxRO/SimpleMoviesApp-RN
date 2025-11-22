import { getMovies } from "@/api/movies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

export default function Index() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["Movies"],
  //   queryFn: getMovies,
  // });
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["Movies"],
      queryFn: getMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

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
  const movies = data?.pages.flat();
  return (
    <View className="flex-1">
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerClassName=" gap-2"
        columnWrapperClassName=" p-2 gap-2 justify-between items-center"
        onEndReached={() => fetchNextPage()}
      />
      {isFetchingNextPage ? <ActivityIndicator /> : null}
    </View>
  );
}
