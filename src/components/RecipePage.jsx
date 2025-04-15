import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const RecipePage = ({ route }) => {
  const { recipe_name } = route.params;

  // Static samosa recipe data (replace with API fetch if needed)
  const recipeData = {
    name: recipe_name || 'Punjabi Samosa',
    image: 'https://i.pinimg.com/474x/50/fe/42/50fe423cf7b42c9b23e66977fa4f37a5.jpg',
    ingredients: [
      {
        section: 'For the Dough:',
        items: [
          '2 cups all-purpose flour (maida)',
          '1/4 cup ghee or vegetable oil',
          '1 tsp carom seeds (ajwain)',
          '1/2 tsp salt',
          '1/3 to 1/2 cup water (adjust as needed)',
        ],
      },
      {
        section: 'For the Filling:',
        items: [
          '3 medium potatoes (about 400g), boiled, peeled, and mashed',
          '1/2 cup green peas (fresh or frozen, boiled)',
          '1 tbsp vegetable oil',
          '1 tsp cumin seeds',
          '1 tsp ginger, grated',
          '1-2 green chilies, finely chopped (adjust to taste)',
          '1/2 tsp red chili powder',
          '1 tsp coriander powder',
          '1/2 tsp garam masala',
          '1 tsp amchur (dried mango powder) or 1 tsp lemon juice',
          '1/2 tsp salt (to taste)',
          '2 tbsp fresh coriander leaves, chopped',
        ],
      },
      {
        section: 'For Frying:',
        items: ['Vegetable oil (for deep frying)'],
      },
    ],
    instructions: [
      'Prepare the Dough: In a large bowl, mix flour, carom seeds, and salt. Add ghee or oil and rub into the flour until it resembles coarse breadcrumbs. Gradually add water and knead into a firm, smooth dough (not too soft). Cover with a damp cloth and rest for 30 minutes.',
      'Make the Filling: Heat 1 tbsp oil in a pan over medium heat. Add cumin seeds and let them splutter. Add grated ginger and green chilies, sauté for 30 seconds. Add boiled peas, mashed potatoes, red chili powder, coriander powder, garam masala, amchur, and salt. Mix well, cook for 2-3 minutes, then add chopped coriander leaves. Let the filling cool completely.',
      'Shape the Samosas: Divide the dough into 6 equal balls. Roll each ball into a thin circle (about 6 inches in diameter) and cut it in half to form two semicircles. Fold each semicircle into a cone, sealing the edge with a little water. Fill the cone with 1-2 tbsp of the potato filling, then seal the open edge with water, pressing firmly to close.',
      'Fry the Samosas: Heat oil in a deep pan over medium-low heat (about 325°F/165°C). Fry samosas in batches, turning occasionally, for 8-10 minutes until golden brown and crispy. Drain on paper towels.',
      'Serve: Serve hot with mint chutney, tamarind chutney, or ketchup.',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSec}>
        <Image source={{ uri: recipeData.image }} style={styles.recipeImage} />
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>{recipeData.name}</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipeData.ingredients.map((ingredientGroup, index) => (
            <View key={index}>
              <Text style={styles.subSectionTitle}>{ingredientGroup.section}</Text>
              {ingredientGroup.items.map((item, idx) => (
                <Text key={idx} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Instructions Section */}
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipeData.instructions.map((step, index) => (
            <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
          ))}
        </View>
      </View>

      {/* Footer Text */}
      <View style={styles.footerSection}>
        <View style={styles.textContainer}>
          <Text style={styles.footerText}>Enjoy your Meal</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#A8B5A2', 
  },
  headerSec: {
    alignItems: 'center',
    marginBottom: 15,
  },
  recipeImage: {
    width: '50%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20, 
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    width: '80%',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 22,
    paddingHorizontal:15,
    paddingLeft: 10,
    textAlign:'justify'
  },
  footerSection: {
    marginBottom: 30, // Ensures visibility
  },
  footerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});