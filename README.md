# Map Search Application

This project is an Angular application that provides a search interface for surf maps. The application is hosted on GitHub Pages and allows users to easily search for maps and mappers.

## Overview

The application:

- Loads map data from a JSON file.
- Offers an intuitive search interface.
- Is built using Angular 17/18.
- Can be deployed on GitHub Pages for easy access.

## Features

- **Real-time Search:** Filter maps as you type.
- **User-friendly Interface:** Simple and responsive design.
- **Detailed Data:** Displays information such as map name, tier, max velocity, and mapper.

## Prerequisites

- Node.js and npm installed.
- Angular CLI installed globally:

  ```bash
  npm install -g @angular/cli@latest
  ```

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Add the Data:**

   - Place the `maps.json` file with the data in the `src/assets/` folder.

4. **Run the Application:**

   ```bash
   ng serve
   ```

   Access the application at `http://localhost:4200`.

## Building and Deployment

1. **Build for Production:**

   ```bash
   ng build --base-href "https://your-username.github.io/your-repository/"
   ```

2. **Deploy to GitHub Pages:**

   Install the deployment tool:

   ```bash
   npm install -g angular-cli-ghpages
   ```

   Deploy the application:

   ```bash
   npx angular-cli-ghpages --dir=dist/your-project
   ```

   Replace `your-project` with the name of your output directory.

## Data Usage

The data used in this application is based on the database available at:

- [SurfTimer-API - mappernames.sql](https://github.com/surftimer/SurfTimer-API/blob/py-fastapi-integration/scripts/mysql-files/mappernames.sql)

We thank the SurfTimer-API team for providing this data.

## Contributions

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to thank everyone who contributed to the development of this application and the SurfTimer-API team for providing the database.
