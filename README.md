# To-do list app built with MERN stack

(NB. the backend is on stand-by until a request is done to it, so the website could take some minutes to load the first time)

After authentication, the user can add unlimited lists and items. All texts can be edited, removed or checked as done.

User, lists and items are saved in a Mongo database. Lists and items are always linked to their user (in fact there's only one table, where lists and items are a property of the user).
I opted for this structure because lists exist only for their user, which is the only one who can access them. I also wanted to explore the potential of NoSQL databases with handling one-to-many relationships.

There are 3 React contexts in use: one for authentication, one to store all lists and one with the current list (the list which is shown on screen). I implemented the last two to speed up some operations, like switching between lists and especially editing title and items: without them, each edited character would have sent a request to the backend, too slow to keep track of user's input. An alternative would have been to add an "Edit" button, but it seemed a bad idea UX-wise (and also I wanted to get more practice with React contexts)

Authentication is handled with JWT, which is saved in the user localStorage for faster subsequent accesses until it is explicitly removed with a logout.