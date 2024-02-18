#

Welcome to TuneTrack API

TuneTrack API serves as the backbone for the TuneTrack web application, providing robust backend functionality to support seamless music management. Leveraging a stack of cutting-edge technologies including TypeScript, ExpressJS, NodeJS, MongoDB, Mongoose, Joi, dotenv, and express-rate-limit, TuneTrack API ensures efficient data management and secure operations for users' music libraries.

**Key Features:**

1.  **CRUD Operations**: TuneTrack API enables users to perform CRUD (Create, Read, Update, Delete) operations on their song library, granting full control over song management.
2.  **Efficient Data Validation**: Integrated with Joi, the API ensures that incoming data is validated according to predefined schemas, maintaining data integrity and security.
3.  **Rate Limiting**: Implemented with express-rate-limit, TuneTrack API mitigates potential abuse or attacks by imposing rate limits on incoming requests, enhancing overall system security.
4.  **Environment Configuration**: Utilizing dotenv, the API supports environment-based configuration, allowing for easy setup and deployment across different environments.

**Technologies Used:**

- **TypeScript**: Harnessing the power of static typing for enhanced code quality and developer productivity, ensuring a robust and maintainable codebase.
- **ExpressJS**: Built upon the fast and minimalist web framework for Node.js, ExpressJS provides a solid foundation for building RESTful APIs with ease.
- **NodeJS**: Leveraging the asynchronous, event-driven JavaScript runtime for scalable and high-performance server-side applications.
- **MongoDB**: Employing the flexible and scalable NoSQL database for storing and managing song data, offering seamless integration with Node.js applications.
- **Mongoose**: Facilitating elegant MongoDB object modeling for Node.js, Mongoose simplifies interaction with MongoDB databases, enhancing developer productivity.

**How to run:**

To set up and run the TuneTrack API locally, follow these simple steps:

1.  Ensure you have **NodeJs** installed on your system.
2.  Clone the project from its **GitHub** repository if you haven't already. **(You also need .env file, in the format of .example.env)**
3.  Navigate to the project directory in your terminal.
4.  Run the `npm i` command to install the necessary dependencies.
5.  Run the `npm run start` command to start the API in development mode.
