import { useMemo } from 'react'
import {
  Container,
  Input,
  Label,
  ContainForm,
  ButtonSearch,
  TextButton,
  Search,
} from './styles'
import { useForm } from "react-hook-form";
import useFetch from 'use-http'

const App = () => {
  // lidando com formularios
  const { register, handleSubmit, watch } = useForm();


  const {
    loading, error, data: pokemons
  } = useFetch('https://pokeapi.co/api/v2/pokemon', {}, [])

  const {
    get, error: errorGet, data: pokemon
  } = useFetch('https://pokeapi.co/api/v2/pokemon')


  const onSubmit = async form => {
    console.log({ errorGet, pokemon })
  }

  console.log({ nome: watch('nome') })

  const showPokemons = useMemo(
    () => !watch('nome') && !error
    , [error, watch('nome')])

  const showPokemon = useMemo(
    () => !!watch('nome') && !errorGet && pokemon
    , [error, watch('nome'), pokemon])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Search>
          <Label>Nome</Label>
          <Input ref={register} name='nome' />
          <ButtonSearch type='submit'>
            <TextButton>Pesquisar</TextButton>
          </ButtonSearch>
        </Search>

        {error && 'Error!'}
        {loading && 'Loading...'}
        {showPokemon && (
          <ContainForm>
            <Label>{pokemon.name}</Label>
          </ContainForm>
        )}
        {showPokemons && pokemons?.results?.map(pokemon => (
          <ContainForm>
            <Label>{pokemon.name}</Label>
          </ContainForm>
        ))}

      </Container>
    </form>
  );
}

export default App;