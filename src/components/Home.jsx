import { StyleSheet, Text, View, TextInput, Image, Pressable, FlatList } from 'react-native';
import React from 'react';

const categories = [
  { id: 1, name: 'Breakfast', image: 'https://i.pinimg.com/736x/2e/5e/09/2e5e0947788d245a54a5577d445d622d.jpg' },
  { id: 2, name: 'Lunch', image: 'https://i.pinimg.com/736x/b5/bc/dd/b5bcdd1056dc3136a53e75a71a807b33.jpg' },
  { id: 3, name: 'Dinner', image: 'https://i.pinimg.com/474x/2b/64/e1/2b64e15ac11687bb3074b9f7abc87edd.jpg' },
  { id: 4, name: 'Snacks', image: 'https://i.pinimg.com/474x/1b/da/ca/1bdaca54b40441bc8a1bccc733e3ca43.jpg' },
  { id: 5, name: 'Desserts', image: 'https://i.pinimg.com/736x/00/3f/0f/003f0f0351967a7cb6212a8d9bfaf889.jpg' },
  { id: 6, name: 'Soups', image: 'https://i.pinimg.com/474x/79/85/1b/79851b39afb791a120f940594374a0d2.jpg' },
  { id: 7, name: 'Salads', image: 'https://i.pinimg.com/474x/26/8b/64/268b64d5dd625aead47953fe6c240de0.jpg' },
  { id: 8, name: 'Beverages', image: 'https://i.pinimg.com/474x/50/fe/42/50fe423cf7b42c9b23e66977fa4f37a5.jpg' },
  { id: 10, name: 'Chinese', image: 'https://i.pinimg.com/474x/e0/dd/c0/e0ddc0615de172b35cc1d5b838772c4e.jpg' },
];

const Home = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [isVeg, setIsVeg] = React.useState(true); // State for veg/non-veg toggle

  return (
    <View style={{ backgroundColor: 'rgb(238, 237, 237)', flex: 1, margin: 10 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, margin: 10, color: 'rgb(93, 98, 90)' }}>Hi Rishabh!</Text>
        <View
          style={{
            width: 40,
            alignContent: 'center',
            height: 40,
            borderRadius: 50,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text style={{ fontSize: 25 }}>👤</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 20, paddingHorizontal: 4, paddingRight: 5 }}>🔍</Text>
          <TextInput
            placeholder="Enter your fav recipe"
            style={styles.searctext}
            value={text}
            onChangeText={(searchText) => setText(searchText)}
          />
        </View>
        <Pressable
          style={[styles.toggleButton, isVeg ? styles.vegButton : styles.nonVegButton]}
          onPress={() => setIsVeg(!isVeg)}
        >
          <Text style={styles.toggleText}>{isVeg ? 'Veg' : 'Non-Veg'}</Text>
        </Pressable>
      </View>

      <View style={styles.Categories}>
        <Text style={styles.heading}>Categories</Text>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: 100 }}
          renderItem={({ item }) => (
            <View>
              <Pressable style={styles.category} onPress={() => setCategory(item.name)}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
                {category === item.name ? <View style={styles.underline}></View> : null}
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={styles.heading}>Your Recipes are here....</Text>
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.recipeBox}>
            <Pressable
              onPress={() => {
                navigation.navigate('RecipePage', { recipe_name: item.name });
              }}
            >
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{item.name}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  searctext: {
    color: 'rgb(93, 98, 90)',
    fontSize: 15,
    flex: 1,
  },
  toggleButton: {
    width: 90,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegButton: {
    backgroundColor: '#4CAF50', // Green for veg
  },
  nonVegButton: {
    backgroundColor: '#F44336', // Red for non-veg
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  Categories: {
    gap: 10,
  },
  category: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  underline: {
    width: 60,
    height: 3,
    backgroundColor: 'rgb(93, 98, 90)',
    borderRadius: 5,
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'rgb(93, 98, 90)',
    fontWeight: '400',
  },
  recipeBox: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
  },
  recipeImage: {
    width: 150,
    height: 180,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  recipeName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
  },
});