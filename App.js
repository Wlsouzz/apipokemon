import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const response = await fetch(loadPoke);
    const data = await response.json();
    setLoadPoke(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }

    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokémon Kingdom</Text>
      </View>

      <View style={styles.pokemonList}>
        {allPokemons.map((pokemon, index) => (
          <View key={index} style={styles.pokemonCard}>
            <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>

            <Image
              source={{ uri: pokemon.sprites.other.dream_world.front_default }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />

            <View style={styles.pokemonDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tipo:</Text>
                <Text style={styles.detailValue}>{pokemon.types[0].type.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Altura:</Text>
                <Text style={styles.detailValue}>{pokemon.height * 10} cm</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Peso:</Text>
                <Text style={styles.detailValue}>{pokemon.weight * 0.1} kg</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Button title="Mais Pokémons" onPress={getAllPokemons} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#34C759', // Cor verde para o header
    padding: 20, // Aumentei o padding para 20
    alignItems: 'center',
    justifyContent: 'center', // Adicionei justifyContent para centralizar o título
    height: 80, // Aumentei a altura do header para 80
  },
  title: {
    fontSize: 36, // Aumentei o tamanho do título para 36
    fontWeight: 'bold',
    color: '#fff', // Cor branca para o título
  },
  pokemonList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pokemonCard: {
    width: '40%',
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#34C759', // Cor verde para a sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  pokemonName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pokemonImage: {
    width: '100%',
    height: 60,
    borderRadius: 10,
  },
  pokemonDetails: {
    padding: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
});

export default App;