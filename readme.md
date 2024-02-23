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

