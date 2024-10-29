** Differences in import apostrophes:

- "" is used for importing modules
- '' is used for importing files
- `` is used for importing files with variables

Potential issues: Can cause 401 if not variable is included rightly
-------------------------------------------------

** Structure - and general architecture and dividing the code down in smaller manageable catgories is super-nice and good, and also needed
- Just look at the general Components folder with subfolders, and how everything is divided down right there. And the Routes folder how easy it is
    to understand the child relationship. Super easy how the app starts, and then divides down into several sub-relationships related on those
    simple pieces of code.

-------------------------------------------------

** Dtos arent that bad. Actually.
- Ok i have to admit. Theyre actually quite good and come quite in handy when choosing what data to pass over the endpoint.

-------------------------------------------------

** TailwindCss is nice
- Feel the easiness of it seems nice. Just have to understand it a bit more.

-------------------------------------------------

** Toastify, is super-nice! The thing that makes Popup-AutomaticallyDisappearing-Notification-Windows-WithCountDownBar
- If used correctly in App.tsx and imported, one can use it in many different forms in the application, like "toast.success" etc.
= Supernice and im actually quite in awe.

-------------------------------------------------

** Naming of Project folders: DONT (Repeat Dont!) Name project folders with special characters (#, ++, ..etc) 
- This will cause errors and trouble for the application/VS Code finding the right modules and folders.
- Renaming them to pure [English] characters made the problems disappear and all node_modules etc are found again.
- Also, dont have the Project folder in OneDrive/ This might also cause some syncing issues.

-------------------------------------------------

** All external packages (like npm toastify, spinners etc) installed in this project are located in the
- Frontend/React: package.json, under dependencies. All beautifully listed there.
    
    ** Examples: 
    * Material UI (Big suite of different adds to react)
    * React Icons
    * Toastify
    * Yup

- Backend/.NET: In NUGET (Extension installed via plugin) check installed tab - all listed there

- Extensions installed for this project:
    * Nuget Gallery (search for packages install to C#/.NET)
    * Roslynator (Code analyzers, refactoring, fixes etc)
    * ES7+ React/Redux/React-Native snippets (Pre-written start snippets for React classes - one used here = tsrafce)
    * .NET install tool
    * .NET extension pack

- Added in Program.cs and code:
    * Swagger (opens up automatically and configured when running the server)

-------------------------------------------------

** Search in VS Code (Ctrl+Shift+F) is a very good function to find and alter code your way, if you by chance forgot the name of a class or function
- And yes it is human to forget about one class and where that specific function was when the application starts to grow, and +20 classes and subfolders etc

-------------------------------------------------

** Props is nice (isLoggedIn.. + etc) (And actually quite that easy)
- Yeah, really

-------------------------------------------------

** The ? value in models = Yes, remember that
- When creating or updating the migrations to the database related to the IdentityUser (used in Entity Framework Identity, base), or any other related model,
  remember to have the ? after variable definition (string? MiddleName) to not have to specify that upon registration endpoint etc, it can be NULL

-------------------------------------------------

** CLOSE AND RESTART SERVER
- Very good learndom to have and utilize. Sometimes a crappy error you absolutely cannot resolve, may just be that the server needs a restart, when there is logically, 
  nothing actual else to alter?
  
-------------------------------------------------

** Adding or removing a variable between backend/frontend, all simple actions needed:
- Repository (Like UserProfileRepository)
- Model      (Like AppUser)
- Dto        (Like UserProfile)
    - Migrations last to the database, (dotnet ef migrations add AddFavouritePetToAppUser) and 
    - Database update                  (dotnet ef database update)

Thats actually all thats needed, Simple and neat and cool huh? :)

-------------------------------------------------

**
