#### **Application Services Layer**

The Application Services and/or Command Handlers contain the logic to unfold **a use case, a business process**. Typically, their role is to:

1. use a repository to find one or several entities;
2. tell those entities to do some domain logic;
3.  and use the repository to persist the entities again, effectively saving the data changes.

The Command Handlers can be used in two different ways:

1. They can contain the actual logic to perform the use case;
2. They can be used as mere wiring pieces in our architecture, receiving a Command and simply triggering logic that exists in an Application Service.

Which approach to use depends on the context, for example:

* Do we already have the Application Services in place and are now adding a Command Bus?
* Does the Command Bus allow specifying any class/method as a handler, or do they need to extend or implement existing classes or interfaces?

This layer also contains the triggering of **Application Events**, which represent some outcome of a use case. These events trigger logic that is a side effect of a use case, like sending emails, notifying a 3rd party API, sending a push notification, or even starting another use case that belongs to a different component of the application.