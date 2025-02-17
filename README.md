<div align="center"> <img src="ninjas_code_logo.jpg" alt="NinjasCode Logo" width="80" height="80"> <h1>Ninjas Code Task</h1> </div>

This repository is my submission for the Full Stack Developer challenge at Ninjas Code. It demonstrates my implementation of scalable and responsive web designs, focusing on food delivery functionality.

## Project Overview 🚀
The application allows users to browse nearby resturant & view their information. It utilizes Google Maps & OpenStreet Map API for location services,Apollo Client for managing GraphQL data of resturants,tested on Cyprus(e2e with Unit Testing) & Deployed on Vercel.

## Features 🤖
- Location Fetching Features
- Browse nearby restaurants & countries using Google Maps
- View restaurant details and menus
- Responsive design for mobile and desktop

## Thought Process For Understanding The Task & Coding It 💭

-Started with understanding all the necassary requirements of the task assigned

-Wrote those requirements on paper for more clarity

-Understood the flow of task mechanism by exploring and playing around with real deployed website provided in the task

-Reviewed the codebase of Enatega Multivendor Web Original Repo for further understanding & clarity on provided task.

-Intialized my task repo with NextJs 15 ( App Router ) & setup all the necassary libs ReactPrime,Apollo-Client & Cypress

-Divided the task into small parts of website ( Header,Body,Footer ) and intialized folder structure for project with proper coding naming & convention practises with

-Used NextJs App Router for project files & Navigation

-Utilized Context for State Management due to smaller scope of the task

-Utilized OpenStreet Map for static map coordinates due to its non api key requirement & utilized Google Maps with its Api Key for implementing maps along with exploring map options as per use case

-Add .env.local file for api key security & envoriment (local & production) implementation.

-Using Graphql functionality to pass data to the client side using the api endpoint url

-Used Apollo Client for quering resturant data inside resturant cards

-Defining types/interfaces to ensure type safety on client side upon arrival of data using Graphql

-Ensure Responsiveness across all devices layout (mobile,tablet & web)

-Optimized the performance by handling all the edge cases and implementation loading state handling along with error handling 

-Using Chrome Dev Tool to ensure both responsiveness & performance with low LCP,CLS & INP indexes value ensuring high performance 

-Ensuring in App performance using react.Memo,useCallback hooks

-Utilizing SSR for optimization in NextJs

-At last wrote test cases - e2e for unit testing of the functionality (3 test cases passed ✅/ 2 test cases failed ❌ ) - Cause of failure due to api endpoint url not sending complete data & missing attributed inside resturant cards

-This was the approach i took inorder to complete the task assigned.


## Getting Started 🙌

### Prerequisites
- Node.js (version 14 or later)
- npm or yarn

### Environment Variables 
You can find an example of the required environment variables in the `.env.example` file. Make sure to create your own `.env` file based on this example.

### Installation 💻
1. Clone the repository:
   ```bash
   git clone https://github.com/fahadyaseen001/ninja-code-task.git
   cd ninja-code-task
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 🌐

## Video Demo 📹
You can find the demo videos in the project-demo folder:
- [Project Demo Video](./project-demo/project.mp4) - Main project features and functionality
- [Test Cases Demo Video](./project-demo/test-cases-demo.mp4) - Demonstration of test cases

## Deployed Link 🔗
You can access the live application at [Deployed Link](ninja-code-task.vercel.app).

## Thank You 💌
Thank you for taking the time to review this project. I've put significant effort into creating a scalable and user-friendly application that meets all the requirements. I look forward to discussing the implementation details and hearing your valuable feedback.

Feel free to reach out if you have any questions or need clarification about any aspect of the project.
