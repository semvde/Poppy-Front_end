# :hibiscus: Poppy (Front-end)

Grow out of your musical bubble!

:globe_with_meridians: Check out the live version: http://145.24.237.244/

<details>
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#information_source-about-this-project">About this project</a></li>
        <li><a href="#sparkles-functionality">Functionality</a></li>
        <li>
            <a href="#rocket-getting-started">Getting started</a>
            <ol>
                <li><a href="#requirements">Requirements</a></li>
                <li><a href="#installation">Installation</a></li>
            </ol>
        </li>
        <li>
            <a href="#hammer_and_wrench-how-does-it-work">How does it work?</a>
            <ol>
                <li><a href="#technologies">Technologies</a></li>
                <li><a href="#entity-relationship-diagram">Entity Relationship Diagram</a></li>
                <li><a href="#usage">Usage</a></li>
            </ol>
        </li>
        <li><a href="#scroll-license">License</a></li>
    </ol>
</details>

[![AngryPapayah](https://img.shields.io/badge/-AngryPapayah-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AngryPapayah)
[![eline-vanstraten](https://img.shields.io/badge/-eline--vanstraten-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/eline-vanstraten)
[![semvde](https://img.shields.io/badge/-semvde-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/semvde)

## :information_source: About this project

Poppy is the music recommendation app that finally takes you out of your bubble! Explore new music by getting
recommendations based on your preferences, connect with friends and discover their musical taste, and more!

This project was created for the third Tailored Learning Environment (Year 2) at Rotterdam University of Applied
Sciences. The goal of the project was to create an ethical AI recommender system while working in two seperate teams: a
front-end team and a back-end team.

> [!IMPORTANT]  
> This repository only contains the front-end of this project!
> The back-end reposity can be found [here](https://github.com/Shav0nne/sonarpoppy).

## :sparkles: Functionality

### Recommendations

- Get recommendations based on your music preference
- Like or dislike the recommendations you get to furhter improve your algorithm

### Customisable

- Change your algoritm to your liking by choosing how much recommendations are related to your preferences
- Block genres and artists to not get those recommended

### Friends

- Find friends on the platform and view their algorithm through your eyes
- Grow your preferences with your friends preferences

## :rocket: Getting started

Below are the instructions on how to get the project running on your local machine!

### Requirements

- Node.js & NPM

### Installation

1. Clone the repository

```sh
git clone https://github.com/semvde/Poppy-Front_end.git poppy-front_end
cd poppy-front_end
```

2. Setup dependencies and front-end assets

- Copy and paste the following contents into a .env file (inside the express folder):

```dotenv
VITE_BASE_URL=http://localhost:5173
VITE_API_URL=http://145.24.237.95:8000/api/v1
VITE_API_KEY=Instruction on how to get an API key are in the back-end repo
```

```sh
npm install
npm run build
```

3. Setup local test server

```sh
npm run dev
```

- View the website by going to http://localhost:5173

## :hammer_and_wrench: How does it work?

Below you can find the documentation of Poppy (Front-end)!

### Technologies

Poppy (Front-end) uses the following technologies:

- [![React][React.com]][React-url]
- [![Tailwind CSS][TailwindCSS.com]][TailwindCSS-url]
- [![JavaScript][JavaScript.com]][JavaScript-url]

### Entity Relationship Diagram

For information about the back-end, check out the [back-end repository](https://github.com/Shav0nne/sonarpoppy) of
Poppy.

### Usage

This project is a Vite + React front-end for Poppy. The app is structured around routes, layouts, shared components, and
a small service layer for API communication.

#### Project structure (important files)

- `src/main.jsx` initializes the React app.
- `src/App.jsx` defines the main route structure and page flow.
- `src/layouts/` contains layout wrappers:
    - `WebsiteLayout.jsx` for public pages
    - `AppLayout.jsx` for authenticated app pages
    - `AdminLayout.jsx` for admin pages
- `src/pages/website/` contains public pages (landing, login, register).
- `src/pages/app/` contains authenticated pages (home, explore, profile, settings, etc.).
- `src/pages/app/admin/` contains admin-only pages.
- `src/components/` contains reusable UI components (cards, buttons, toggles, sliders, form fields, etc.).
- `src/components/ProtectedRoute.jsx` handles route protection for authenticated sections.
- `src/Contexts.jsx` manages shared client-side state via React Context.
- `src/services/Fetch.js` centralizes API requests and should remain the single source for fetch logic.

## :scroll: License

The source code in this repository is licensed under the MIT License.


[React.com]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black

[React-url]: https://reactjs.org

[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white

[TailwindCSS-url]: https://tailwindcss.com

[JavaScript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
