### Tech Stack:
- .NET 7.0 (Entity Framework -> Mapping C# into SQL database)
- Swagger & Postman
- React 18 w/ Typescript

---
### Notes 
- Domain is the center of everything, and it doesn't have dependency on anything else. (Meanwhile Application layer has dependency on Domain, and API has dependency on both Application and Domain.)
- Entity framework is an object relational mapper. Provides an abstraction against our database.
- DbContext (DataContext : DbContext) is a combination ofthe unit of work and repository patterns. --> Code first migration