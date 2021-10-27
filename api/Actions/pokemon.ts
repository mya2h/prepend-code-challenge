import axios from 'axios'

const getCount = async () => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const res1 = await axios.get("https://pokeapi.co/api/v2/pokemon", config)
    const count = res1.data.count
    return count
}
export const getAllPokemons = async () => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    let count = await getCount()
    let pokemons
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + count, config)
    pokemons = res.data
    return pokemons
}
export const getPokemonDetail = async (id: any) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id, config)
    return res.data
}