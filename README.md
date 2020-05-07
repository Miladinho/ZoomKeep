# Remote Video Chat Content Uploader

## Overview
This software is specifically being designed for a turoing company that needs to preserve the recording of their tutors' video sessions with their clients. The company uses Zoom but needs to be able to accept other kinds of vendors' content as well, such as Google Hangouts.

The company wants to be flexible with where they host their data, currently they prefer AWS S3 storage but they want to be able to switch hosting servies if the need arises.

## System Requirements

Need a way for a manager/admin to add tutors to the system, would be nice if when a new tutor is added an email is generated and sent with their login credentials.

Need a way for tutors to login to a backend that allows them to upload content from a video chat, primarily Zoom, such as mp4 and other files that come with the recording

No ones should have the ability to create a user account when visiting the login page. User creation is only available to admin/manager roles.

Tutor needs to select from a list of names of his or her current clients, the client whose session is being uploaded.
- Date of the original file is used to track when the session occured
- File contents are name as a combination of the tutors first and last name, and the clients first and last name and possibly the subject for which that client is getting tutored in.
- Tutor should have some sort of way to know if their content was uploaded succesfully

Only admin/managers can delete or edit uploaded content. They should have a means to do this AND a way to easily view all the conetent and search for content uploaded by a specific tutor and or for a specific client or for a specific subject area possibly.
