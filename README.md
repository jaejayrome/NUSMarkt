# Orbital CP2106: NUSMarkt

## Milestone 3

Jerome Goh Zhi Sheng
Whang Sok Yang

## Table of Contents

- Foreword
- Deployment Details
- Motivation & Aim
- Milestone 3 Poster & Video
- Features
  - User Authentication
  - Tutorial
  - Profile
  - Buy
  - Sell
  - Trade
  - Cart
  - Review
- Limitations of NUSMarkt
- Project Management
  - Jira
  - Github
- Diagrams
  - Software Architecture Diagram
  - User Workflow Diagram
  - React Component Tree
- Security Measures
- Testing
  - Unit Testing
  - User Testing
- Feasibility
- Appendix
  - Wireframes on Figma
  - Milestone 2 Poster & Video
  - Milestone 1 Poster & Video
  - Liftoff Poster & Video

## Foreword

To whomever that is reading this,

We are a group of NUS Computing Students that are embarking on this project and are new to software development. We would like to take this opportunity to exude and follow software engineering practices as much as possible and we have spent countless hours tirelessly working on this project. In addition, we would want to capitalize on this opportunity to learn as much as possible since the knowledge gained is invaluable to our future use.

We would also like to take this opportunity to thank our advisor, Chee Heng, for his guidance always and also taking time out of his busy schedule to reply to our queries and to schedule meetings with us.

Regards,
Jerome and Sok Yang

## Proposed Level of Achievement

Apollo 11

For our project, we propose a level of achievement that reflects our ambition to create a comprehensive platform for NUS students to buy, sell, and trade NUS merchandise. Our project, NUSMarkt, is a one-stop website designed to streamline the process of acquiring NUS merchandise, which currently is scattered across various platforms and lacks a centralized hub.

## Tech Stack for Milestone 3: (Visualized Version under Diagrams: Software Architecture)

Frontend: ReactJS
BaaS: Firebase
Backend: Express & Node.js
DBMS: Firestore
Hosting: Firebase Hosting (Frontend), Firebase Cloud Functions (Backend)
Unit Testing: Jest & React Testing Library
UI Libraries: Material UI

## Deployment Details

Hosting Link: [NUSMarkt](https://nusmarkt-41131.web.app/)

Test Account Details:

Email Address: orbitaltesting@gmail.com
Password: orbital2023

Note: In the previous milestone, if you have created any accounts, please make a new one because we have deleted all previous accounts since we have made some changes to the logic of our code that would throw errors should you reuse your old accounts.

We apologize for any inconvenience caused.

Payment Details (Reiterated):

For Testing Purposes, users are to follow and use this credit card to simulate SUCCESSFUL payments.

Card Number: 4242 4242 4242 4242
Expiry Date: As Long as the chosen date is after this current month
CVC: any random 3 numbers of your choice

For Testing Purposes, users are to follow and use this credit card to simulate FAILED / DECLINED payments.

Card Number: 4000 0000 0000 0002
Expiry Date: As Long as the chosen date is after this current month
CVC: any random 3 numbers of your choice

## Motivation & Aim

Our project scope can be summarized as follows: "Creating a unified platform for NUS students to buy, sell, and trade NUS merchandise conveniently." In a more detailed description, NUSMarkt aims to address the problem of fragmented and inefficient methods of acquiring NUS merchandise. As we walk along the NUS campus, we often see students with attractive NUS merchandise, but there is no specific platform that features all designs of shirts and other items designed by different communities in NUS. This leads to students resorting to platforms like Reddit to inquire about where they could purchase these items (Figure 1). Moreover, there is no platform that allows students to trade merchandise, leading to inefficiencies and missed opportunities.
