### Tech Stack:
- .NET 7.0 (Entity Framework -> Mapping C# into SQL database)
- Swagger & Postman
- React 18 w/ Typescript
- Used MobX for state management
- Fluent validation
- MediatR (Mediator pattern)
- ASPNET Core Identity & JWT Token Authentication with User and SignIn Managers
- SignalR implementation for real-time web functionality
---
### Notes 
---
- Domain is the center of everything, and it doesn't have dependency on anything else. (Meanwhile Application layer has dependency on Domain, and API has dependency on both Application and Domain.)
- Entity framework is an object relational mapper. Provides an abstraction against our database.
- DbContext (DataContext : DbContext) is a combination ofthe unit of work and repository patterns. --> Code first migration
- Virtual DOM is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM.
- One-way Data Binding: ReactJS uses one-way data binding. In one-way data binding one of the following conditions can be followed: 
    - Component to View: Any change in component data would get reflected in the view.
    - View to Component: Any change in View would get reflected in the component’s data.
- In React, **one-way data binding** implies that data changes can flow from the parent component to its children via props, but changes made by the children do not directly affect the parent's state. This approach helps maintain a predictable data flow and simplifies debugging, as it ensures that components only receive data and cannot modify it directly, promoting a more stable application structure.
- IQueryable<T> (needed for pagination, filtering, sorting etc in the API)
    - Query variable stores query commands
        - IQueryable<T> creates an expression tree.
    - Execution is deferred until iteration:
        - ForEach loop
        - ToList(), ToArray(), ToDictionary()
        - Singleton queries (Count, Average, First, Last, Max, Min, Sum)


---
- **Clean Architecture Pattern**: Dependencies are encapsulated. (Database, or the business logic of the app doesn't need to know about how UI handles them.)
    - Should be independent from frameworks, independent from the interface (React, Vue etc.), should be testable, independent from the databases (but not from the Entity framework or ORM.)
    - The Dependency Rule is a key principle of the Clean Architecture. It states that dependencies should always point inwards toward the core business logic. In other words, the inner layers should have no knowledge of the outer layers. This ensures that changes in the external layers (such as the database or UI framework) do not impact the core business rules.
- **CQRS**: Command and Query Responsibility Segregation.
    - Commands and Query must be seperated! Works great with Entity Framework.
- **Mediator**: Mediator pattern is used to reduce communication complexity between multiple objects or classes. This pattern provides a mediator class which normally handles all the communications between different classes and supports easy maintenance of the code by loose coupling. Mediator pattern falls under behavioral pattern category. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.
    - Single Responsibility Principle. You can extract the communications between various components into a single place, making it easier to comprehend and maintain.
    - Open/Closed Principle. You can introduce new mediators without having to change the actual components.
    - Over time a mediator can evolve into a God Object. :(
      
