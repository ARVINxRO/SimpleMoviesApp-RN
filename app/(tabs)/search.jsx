import { searchMovie } from "@/api/movies";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Search = () => {
  const [input, setInput] = useState("");
  //const [query, setQuery] = useState("");

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["Search", query],
  //   queryFn: () => searchMovie(query),
  //   enabled: false,
  // });
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: searchMovie,
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
  const handlePress = () => {
    if (!input.trim()) {
      console.log("Error", "Please enter a search term");
      return;
    }
    mutate(input.trim());
    Keyboard.dismiss();
    // setQuery(input.trim());
    // refetch();
  };
  return (
    <View className=" flex-1">
      <TextInput
        className="mx-2 bg-slate-300  justify-center items-center rounded-xl mt-4 p-4 text-xl
         "
        placeholder="Search For a Movie..."
        maxLength={35}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity
        onPress={() => handlePress()}
        className="mx-2 bg-slate-400  justify-center items-center rounded-2xl mt-1 p-2"
      >
        <Text className="font-bold text-2xl">Search</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerClassName=" gap-2"
        columnWrapperClassName=" p-2 gap-2 justify-between items-center"
      />
    </View>
  );
};

export default Search;
