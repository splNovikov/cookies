#### **Secondary (or Driven Adapters) Adapters**

Unlike the Driver Adapters, who wrap around a port, **the Driven Adapters implement a Port**, an interface, and are then injected into the Application Core, wherever the port is required (type-hinted).

For example, let’s suppose that we have a naive application which needs to persist data. So we create a persistence interface that meets its needs, with a method to save an array of data and a method to delete a line in a table by its ID. From then on, wherever our application needs to save or delete data we will require in its constructor an object that implements the persistence interface that we defined.

Now we create an adapter specific to MySQL which will implement that interface. It will have the methods to save an array and delete a line in a table, and we will inject it wherever the persistence interface is required.

If at some point we decide to change the database vendor, let’s say to PostgreSQL or MongoDB, we just need to create a new adapter that implements the persistence interface and is specific to PostgreSQL, and inject the new adapter instead of the old one.

