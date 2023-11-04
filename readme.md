### Tech Stack:
- .NET 7.0 (Entity Framework -> Mapping C# into SQL database)
- Swagger & Postman
- React 18 w/ Typescript

---
### Notes 
- Domain is the center of everything, and it doesn't have dependency on anything else. (Meanwhile Application layer has dependency on Domain, and API has dependency on both Application and Domain.)
- Entity framework is an object relational mapper. Provides an abstraction against our database.
- DbContext (DataContext : DbContext) is a combination ofthe unit of work and repository patterns. --> Code first migration
- Virtual DOM is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM.
- One-way Data Binding: ReactJS uses one-way data binding. In one-way data binding one of the following conditions can be followed: 
    - Component to View: Any change in component data would get reflected in the view.
    - View to Component: Any change in View would get reflected in the component’s data.
- In React, **one-way data binding** implies that data changes can flow from the parent component to its children via props, but changes made by the children do not directly affect the parent's state. This approach helps maintain a predictable data flow and simplifies debugging, as it ensures that components only receive data and cannot modify it directly, promoting a more stable application structure.
