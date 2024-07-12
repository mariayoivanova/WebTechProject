# Berlin Fashion Blog /WebTechProject/ - README
Sara, Maria


## Overview

Welcome to the **Berlin Fashion Blog**! This web application is a platform where users can explore fashion articles, view seasonal outfit galleries, share style tips, and stay connected through our subscription form and contact page. Built with **Node.js** and **MongoDB**, this blog provides an engaging and interactive experience for fashion enthusiasts.

## Features

- **Articles**: Browse and read articles about the latest fashion trends and updates.
- **Search**: Search key words of the articles or of the aricles titles
- **Photo Galleries**:
  - **Spring/Summer**: Explore the latest outfits for the spring and summer seasons.
  - **Fall/Winter**: Discover trendy outfits for the fall and winter seasons.
- **Photo Management**: Users can add, edit, and delete photos in the galleries.
- **Style Tips**: Share, edit, and delete comments with fashion advice and tips.
- **Subscription Form**: Subscribe to our newsletter for updates and exclusive content.
- **Contact Page**: Get in touch with the blog's team for inquiries or feedback.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Templating Engine**: EJS

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mariayoivanova/WebTechProject.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd WebTechProject
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGODB_URI= mongodb+srv://saratahmasebi1998:19981998sara@cluster0.y0yr5vd.mongodb.net/
    
    PORT=5001
    ```
5. **Start the application**:
    ```bash
    node app.js
    ```

## Usage

- **Home Page**: View the latest fashion articles.
- **Galleries**: 
  - Navigate to the **Spring/Summer** or **Fall/Winter** galleries to view photos.
  - Users can **add**, **edit**, or **delete** photos.
- **Style Tips**: 
  - View and share style tips.
  - Users can **add**, **edit**, or **delete** comments.
- **Subscription Form**: Enter your email to subscribe to our newsletter.
- **Contact Page**: Fill out the form to send a message to the team.

## Project Structure

```plaintext
WebTechProject/

├── public/            # Static files (CSS, JS, images)
├── server/            # routes, controllers, models, MongoDB
├── uploads/           # some images
├── views/             # EJS templates
├── .env               # Environment variables
├── app.js             # Main application file
├── package-lock.json  # Dependency version consistency and security
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation


## Contributing

We welcome contributions to improve the **Berlin Fashion Blog**. To contribute, follow these steps:

1. **Fork** the repository.
2. **Create** a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make** your changes.
4. **Commit** your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push** to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open** a pull request.

Thank you for visiting the Berlin Fashion Blog! Enjoy exploring the latest in fashion.