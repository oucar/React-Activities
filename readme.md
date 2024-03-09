# App Documentation

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
- Run `npm run build` in the `/client-app` directory
- Run `dotnet run` in the `/API` directory
- You will also need appsettings.json and/or appsettings.Development.json files for the API to run that I removed from the Git repository for security reasons after I am done with the project. [Click here to view the commit](https://github.com/oucar/React-Activities/commit/1d82404754dc642ff494b37b2e3c5e2a4cb3c8a7)
,and use the `appsettings.json` and `appsettings.Development.json` files as templates to create your own. I changed my own API keys and secrets after I was done with the project, so you will need to get your own API keys and secrets for the app to work.
- - NOTE: Make sure your postgres database is running in Docker or locally, and you have the correct connection string in the `appsettings.json` file. If starting from scratch, you can initialize a migration with `dotnet ef migrations add InitialCreate` and then run `dotnet ef database update` to create the database.
---

## Notes

- Domain is the center of everything, with no dependencies. Application layer depends on Domain, and API depends on both Application and Domain layers.
- Entity Framework is an object-relational mapper, providing an abstraction against the database.
- `DbContext` (`DataContext: DbContext`) combines the unit of work and repository patterns. Code-first migration is used.
- **Virtual DOM** is a programming concept where an ideal, or “virtual,” representation of a UI is kept in memory and synced with the “real” DOM.
- **One-way Data Binding** in React ensures a predictable data flow and simplifies debugging.
- **IQueryable<T>** is needed for pagination, filtering, sorting, etc., in the API. It creates an expression tree, and execution is deferred until iteration.

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

