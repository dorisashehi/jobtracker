# JBtracker (Job Tracker)

About this web app: **Our website helps users track and manage all the jobs they’ve applied to, including application status, company details, role, and more. Users can monitor their progress, update each job’s status, and stay organized during the job search process. Apply, Track, and Land That Job – Smarter Job Application Management!**

Time spent: **1** months

## Required Features

The following **required** functionality is completed:

- [x] **The web app has a Dashboard page**

  - [x] **NOTE: Displays summary counts (Applied, Interviewing, Offer, Rejected)**
  - [x] **NOTE: Displays recent applications.**

- [x] **The web app has an Applications page**

  - [x] **NOTE: Displays all jobs applied to with fields like Company, Role, Status, Date Applied**
  - [x] **NOTE: Search functionality to find jobs by keyword**
  - [x] **NOTE: Popups or forms for adding, editing, and deleting jobs**

- [x] **The web app has a Login page**
- [x] **The web app has a Sign-up page**

## Technologies Used

- React.js (frontend)
- Node.js (backend)
- PostgreeSQL (database)
- PgAdmin (web-based database management tool)

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://github.com/dorisashehi/jobtracker/blob/main/frontend/src/assets/JB-tracker-demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Notes

A complex technical challenge in our project is designing a flexible structure to track job status transitions efficiently and cleanly. In the future, we plan to integrate an AI assistant to help users tailor resumes or provide company-specific prep tips.

## Installation

In Terminal run these commands:

- `git clone https://github.com/dorisashehi/jobtracker.git`
- `cd frontend`
- `npm i && npm run dev`
- Open your browser and visit: `http://localhost:5173/`
- Open a new terminal:
  - `cd .. && cd server`
  - `npm i && npm start`
- Ensure you have PostgreSQL running and a `.env` file in the server folder with your database credentials, for example:
