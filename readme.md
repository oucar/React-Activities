# React Activities APP Documentation

## Tech Stack:
- **.NET 7.0** (Entity Framework -> Mapping C# into SQL database)
- **Postgres** for the production database
- **React 18** with Typescript
- Used **MobX** for state management
- **Fluent Validation**
- **MediatR** (Mediator pattern)
- **ASP.NET Core Identity & JWT** Token Authentication with User and SignIn Managers
- **SignalR** implementation for real-time web functionality

## How to Run
- Ensure that Docker is installed and configured on your system as the .NET application is configured to run on a Docker container. The Postgres database is also configured to run on a Docker container. Additionally, please note that the application stores images in Cloudinary. Ensure you have the required Cloudinary credentials configured in your environment.

- Run `npm run build` in the `/client-app` directory
- Run `dotnet run` in the `/API` directory
- You will also need appsettings.json and/or appsettings.Development.json files for the API to run that I removed from the Git repository for security reasons after I completed the project. [Click here to view the commit](https://github.com/oucar/React-Activities/commit/1d82404754dc642ff494b37b2e3c5e2a4cb3c8a7)
,and use the `appsettings.json` and `appsettings.Development.json` files as templates to create your own. I changed my own API keys and secrets after I was done with the project, so you will need to get your own API keys and secrets for the app to work.
- NOTE: Make sure your postgres database is running in Docker or locally, and you have the correct connection string in the `appsettings.json` file. If starting from scratch, you can initialize a migration with `dotnet ef migrations add InitialCreate` and then run `dotnet ef database update` to create the database.
---

- **Clean Architecture Pattern**:
  - Dependencies are encapsulated. The app's core is independent of frameworks, UI interfaces (React, Vue, etc.), and databases (except Entity Framework or ORM).
  - The Dependency Rule ensures that dependencies point inward toward core business logic, preventing external layer changes from impacting core business rules.

- **CQRS (Command and Query Responsibility Segregation)**:
  - Commands and Queries are separated, working well with Entity Framework.

- **Mediator Pattern**:
  - Reduces communication complexity between multiple objects or classes.
  - Single Responsibility Principle and Open/Closed Principle are adhered to.
  - Mediator can evolve into a God Object over time, so caution is needed.

---

## Technical Overview

The Activity App is designed to facilitate the hosting and participation in various activities while enabling real-time communication among participants through activity rooms, all seamlessly integrated within a modern web application framework. Here's a breakdown of its key features and functionalities:

### Activity Hosting and Participation
- Users can create and host various types of activities, such as sports events, workshops, social gatherings, etc.
- Participants can browse through available activities and join those of interest to them.
- The application provides a user-friendly interface for managing hosted activities, including editing details, setting participant limits, and managing RSVPs.

### Real-time Communication with SignalR
- Leveraging SignalR, the app offers real-time communication capabilities, allowing participants to engage in live discussions within activity-specific chat rooms.
- Participants can exchange messages, share updates, and coordinate logistics without the need for manual page refreshes, fostering a dynamic and interactive user experience.

### Secure Authentication and Authorization
- The app incorporates ASP.NET Core Identity and JWT Token Authentication to ensure secure user authentication and authorization.
- Users can create accounts, sign in securely, and access features based on their roles and permissions.
- Authentication mechanisms are implemented to safeguard user data and prevent unauthorized access to sensitive functionalities.

### Clean Architecture and Scalability
- Built on a foundation of Clean Architecture, the app maintains a modular and decoupled structure, promoting code maintainability and scalability.
- The separation of concerns ensures that core business logic remains independent of external dependencies, facilitating easier integration of new features and technologies in the future.

### Command and Query Responsibility Segregation (CQRS)
- The application architecture follows the CQRS principle, segregating commands (actions that change state) from queries (actions that retrieve data).
- This separation enhances scalability and performance by allowing optimizations tailored to specific use cases, such as efficient data retrieval for read operations and transactional integrity for write operations.

### Mediator Pattern for Communication
- The Mediator pattern is employed to manage communication between various components of the application, reducing complexity and promoting code maintainability.
- By encapsulating communication logic within a central mediator, the application adheres to the principles of Single Responsibility and Open/Closed, ensuring flexibility and extensibility.

### Enhanced User Experience with React and MobX
- The front-end of the application is built using React 18 with TypeScript, offering a modern and responsive user interface.
- MobX is utilized for state management, providing a straightforward and efficient way to manage application state and data flow.
- Virtual DOM and one-way data binding in React ensure a smooth and predictable user experience, minimizing UI rendering overhead and enhancing performance.

### Data Persistence with Entity Framework and Postgres
- Entity Framework serves as the object-relational mapper for interacting with the Postgres database.
- Code-first migration enables seamless database schema management, allowing for version-controlled updates and migrations.
- IQueryable<T> facilitates advanced data querying capabilities, such as pagination, filtering, and sorting, ensuring efficient data retrieval and manipulation within the API.

### Notes

- Domain is the center of everything, with no dependencies. Application layer depends on Domain, and API depends on both Application and Domain layers.
- Entity Framework is an object-relational mapper, providing an abstraction against the database.
- `DbContext` (`DataContext: DbContext`) combines the unit of work and repository patterns. Code-first migration is used.
- **Virtual DOM** is a programming concept where an ideal, or “virtual,” representation of a UI is kept in memory and synced with the “real” DOM.
- **One-way Data Binding** in React ensures a predictable data flow and simplifies debugging.
- **IQueryable<T>** is needed for pagination, filtering, sorting, etc., in the API. It creates an expression tree, and execution is deferred until iteration.


### Conclusion
The React Activities App combines cutting-edge technologies and architectural patterns to deliver a robust, scalable, and user-friendly platform for hosting and participating in activities while fostering real-time communication among participants. With its clean architecture, secure authentication, and modern UI, the app sets a high standard for activity management applications, providing users with a seamless and enjoyable experience.
