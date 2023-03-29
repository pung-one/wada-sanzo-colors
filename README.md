# COLORS - The Dictionary of Color Combinations

![sample_for_github_readme](https://user-images.githubusercontent.com/86004796/228552658-3c511218-c6ea-4cd6-996a-4dc28f896784.png)
![book_sample](https://user-images.githubusercontent.com/86004796/228552731-e4a9a951-f0c0-4e68-b4d0-2aa2ccd71fcc.png)

## Description

- This website offers an interactive adaptation of the book "A Dictionary of Color Combinations Vol. 1" which is based on Wada Sanzo's famous color collection. The web-application allows users to explore the List of 159 colors and 348 color combinations. The colors can be filtered by their color-group and the combinations can be filtered by the number of colors they contain. 
- On the detail pages of each color or combination the user has access to the **CMYK**, **RGB**, **HEX**, and **LAB** codes (Thanks to [Matt DesLauriers](https://github.com/mattdesl/dictionary-of-colour-combinations)). 
- The Inspiration page offers the possibility to get a random color or random color-combination from the lists as well as access to the color-picker-component, which lets the user input a color with an color-type-input field and returns the most similar color from Wada Sanzo's list (thanks to [chroma.js](https://gka.github.io/chroma.js/) package, which i used for color-comparison). 
- It is also possible to bookmark colors and combinations in a user-profile (sign in with your google or github account). The favored colors or combinations will then be saved in a MongoDB data-base to access them later. If the user does not sign in, the favorites will be stored in the browsers local storage.

## Demo

You can find the hosted page [here](https://capstone-project-omega-two.vercel.app/) (the design is currently optimized for mobile-devices).

## Genesis

This website represents the graduation project of the Frontend-Coding-Bootcamp at [Neue Fische coding school](https://www.neuefische.de/) in Hamburg. I am happy to be able to implement my first own web development project as part of the boot camp.

## Tech Stack

- React
- Next.js
- NextAuth
- MongoDB
- mongoose
- Styled-Components
- Local-Storage-State
- React Testing Library / Jest

## Project Setup

- Clone this repository
- Use `.env.example` to add `MONGODB_URI` for database connection, IDs and secrets for NextAuth providers
- Inside root folder install all dependencies via `$ npm install`
- Run app in development mode via `$ npm run dev`
- Run tests via `$ npm run test`
