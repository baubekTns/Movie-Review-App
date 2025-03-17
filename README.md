# Movie-Review-App

This is a Movie Review Website built with React and Next.js, leveraging the TMDb API for fetching movie data.

## Features

- **Browse Movies**: View a list of movies fetched from the TMDb API.
- **Movie Details Page**: Click on a movie to see more detailed information.
- **Rated Page**: See a list of all the movies and tv shows you have rated.

## Technologies Used

- **React**: For building the user interface.
- **Next.js**: For routing.
- **TMDb API**: To fetch movie data.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/baubekTns/Movie-Review-App.git
   cd Movie-Review-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of the project and add the NEXT_PUBLIC_TMDB_ACCESS_TOKEN variable.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

- **Browse Movies**: On the homepage, you can view a list of top rated movies and tv shows.
- **Movie Details**: Clicking on any movie will take you to its details page, where you can read more about the movie.
