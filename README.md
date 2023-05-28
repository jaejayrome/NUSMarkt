<h1> NUSMarkt Readme.md </h1> 

<h2> Team </h2> 
| Name | Matriculation No. | Course |
| --- | --- | --- |
| Jerome Goh Zhi Sheng | A0253015U | Information Systems, Y1 |
| Whang Sok Yang | A0258823W | Business Analytics, Y1 |
## Aim

We hope to create a website which allows different communities in NUS to list their merchandise and for students to trade their merchandise since there isn’t a platform within NUS that provides this thus far.


<h2> Motivation </h2> 
Our project scope can be summarized as follows: "Creating a unified platform for NUS students to buy, sell, and trade NUS merchandise conveniently." In a more detailed description, NUSMarkt aims to address the problem of fragmented and inefficient methods of acquiring NUS merchandise. As we walk along the NUS campus, we often see students with attractive NUS merchandise, but there is no specific platform that features all designs of shirts and other items designed by different communities in NUS. This leads to students resorting to platforms like Reddit to inquire about where they could purchase these items. Moreover, there is no platform that allows students to trade merchandise, leading to inefficiencies and missed opportunities.

<h6> Examples of Such Enquiries </h6>
<img width="900" alt="Screenshot 2023-05-29 at 1 00 23 AM" src="https://github.com/jaejayrome/NUSMarkt/assets/80029422/86e6ce66-e062-4e70-b181-2274e75e9457">

## User Stories

1. As a student who is interested in buying NUS merchandise, I want to be able to view all designs of merchandise available and purchase them.
2. As a student who wants to trade merchandise with others, I want to be able to find potential traders through existing listings created by others on the website.
3. As a student-led organisation that designed the merchandise, I want to be able to list my merchandise on the website to reach out to a wider pool of people.

## Features

| Feature | Elaboration | Technical Specification |
| --- | --- | --- |
| Account Sign Up | Users would have to create accounts upon signing up. The data collected from the account creation would be stored inside a JSON format, this would be included in our database. | Make use of Firebase Authentication functionality to provide authentication service for my website. |
| SizeMeUp | It would churn out the recommended sizing for this given merchandise based on the initial measurements provided by the user upon account creation. For any user that is using our platform to list their merchandise, they would have to input the accurate measurements of the merchandise.
| Uploading of Merchandises | This can be done by users either looking to sell merchandise or looking to trade merchandise. Each listing would be stored within a JSON format that would encapsulate the key functionalities, namely: Images, Condition and Description, Price (dependent on whether the listing is looking for someone to buy or someone to trade). | Each listing would be included in our database. |
| Buy Merchandise | Any user can use our website to purchase merchandise and add it into their shopping cart and check out like a normal e-commerce store. Our website would include a shopping cart that would record the potential items that a user would want to purchase and record the total price. Our website would also be responsible for the payment since the user would be able to make one payment from different merchants. Collection of the shirts would be dictated by the merchants in their listing. | We would also include a pre-order option for sellers as well. |
| Trade Merchandise | A user with the intention of trading shirts can do so by listing their shirt on the platform. Furthermore, they would dictate the location and timing for the trade to take place. | Each listing would be a separate HTML page that would include the necessary information for the trade to happen such as the telegram handle and the sizing. |
| Review | Each user would have the functionality to comment on the review forum for every unique merchandise purchased. They would be able to upload pictures of the merchandise that would give better visualization of how it looks. | We would allow users to upload their image in .jpg format and would include the link to iloveimg.com that provides a free image convert to .jpg format. |
| Social Media Integration | To encourage more merchants to be involved in our workshop, we would include the functionality for the merchants to link with their other social media accounts. | This can simply be done by putting the logos representing the major social media outlets in html then linking it with the desired linkage. Merchants would be prompted to provide the links to their bios for this functionality to work. |

<h2> Software Architecture </h2> 
<img width="1001" alt="Screenshot 2023-05-25 at 9 36 29 PM" src="https://github.com/jaejayrome/NUSMarkt/assets/80029422/af8a13d4-f10b-43e0-8ecd-7c4215c66d59">


<h2> Updates to Software Architecture: </h2>

Front-end: React
<br />
External Dependencies: Material-UI Library
<br />
Back-end and DBMS: Cloud Firestore

<h2> NoSQL Firestore Schematics (Subject to further additions) </h2>
<img width = "1001" alt = "Screenshot 2023-05-28 at 7 01 01 PM" src = "https://github.com/jaejayrome/NUSMarkt/assets/80029422/84be9e02-3c24-49b3-8022-8612ccf74070">

<h2> Timeline </h2>  
<h4> Milestone 1: Ideation (29 May 2pm) </h4> 

Task | Description | Handled By| Complete By
--- | --- | --- | ---
Edit README.md | Update the documentation of the README.md file to the latest updates | Jerome Goh | 29 May
HTML Tutorial | Basic Introduction to learn HTML | Jerome Goh | 15 May
CSS Tutorial | Basic Introduction to learn CSS (Inline Styling, Classes, Containers and Positoning) | Jerome Goh | 17 May
Javascript Tutorial | Modern Javascript Tutorial (Array destrucutring, functional programming) |  Jerome Goh | 19 May
Figma Design | Basic Design of the website done using figma | Whang Sok Yang | 19 May
Basic React Tutorial | Components, Hooks and .jsx syntax, REACT-DOM understanding | Jerome Goh | 21 May
React Project Initialisation and Structure | npm start, sorted out the components and downloaded depenendencies | Jerome Goh | 22 May
React Routing 6 Tutorial | Learnt basic routing, nested routing and outlets with useParams Hooks | Jerome Goh | 23 May
Basic Design of the website | worked on the navbar.js and the home.js in accordance to the figma | Jerome Goh | 25 May
Design of the user authentication of the pages (signup.js and register.js) | Components in place to implement firebase authentication | Jerome Goh | 27 May
Firebase Authentication Tutorial | How to set up and configure the firebase authentication with email and password | Jerome Goh | 27 May
Implement firebase authentication | used the necessary hooks and auth instance to correctly implement the authentication | Jerome Goh | 28 May
Software Architecture Design | Drew the schematics of the software architecture diagram | Jerome Goh | 28 May
Material UI Implementation | Learnt to integrate the custom components and the API into the project | Jerome Goh | 28 May


## Tech Stack

- Front-End: ReactJS / HTML / CSS
- Version Control: Git / GitHub
- DBMS: FireBase
- Integration Testing: Postman

## Qualifications

**Jerome Goh Zhi Sheng:** Y1 Information Systems Student
- Took CS1010J (Java)
- Took CS2030 (Java)
- Attended DSTA 2022 Hackathon
- Took a Udemy Course in PostgreSQL and Git

**Whang Sok Yang:** Y1 Business Analytics Student
- Took CS1010S (Python)
- Took CS2030 (Java)
- Took BT2102 (MySQL)



