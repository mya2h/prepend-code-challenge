# Prepend Code Challenge
## Notice
there is no url available for pokemons image that's why i use a random image
##  Description
The application is built using nextjs. it has both pagination and search features. it was possible to use lazy loading for the pagination since the api make u able to do that, however there is no stated server side functionality for the searching part and i wanted to apply both features. so i rather followed the below step:
1. by using the defalut endpoint for pokemon i can able to get the count for all available pokemons, using getCount() method which is located in api/Actions/pokemon.ts 
2. using the returned count value from the step1 i got all pokemons available by using  getAllPokemons() method which is located in api/Actions/pokemon.ts file
3. i save all pokemons in the state then do the pagination and searching on the client side which you can get it in pages/pokemon/index.tsx

## Things could be done better
1 pagination with different sizing
2 rather than doing searching and pagination functionality on the client it was better to do it on server side

## Cloning and Running the Application in local

Clone the project into local environment 

```bash
git clone https://github.com/mya2h/prepend-code-challenge.git
```

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm run dev
```


The Application Runs on **localhost:3000**

## Folder Structure

1. **pages** Component: pokeman and pokemandetail components 

2. **api** : api calls 

3. **styles** Css files

## Resources

**material ui**: Refer to https://ant.design/ to understand the concepts of antd design framework 
