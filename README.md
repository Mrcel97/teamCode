
<p align="center">
  <img src="https://i.imgur.com/E1rrZE7.png?1"/>
</p>

# Welcome to TeamCode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Guidelines

  1. Entry level tutorial
     - What is Teamcode
     - How I can use TemCode
     - Interface Projects
     - Project Collaborators
     - User Status
  2. Advanced level Tutorial
     - TeamCode 💗 Git
     - Interface Feed
     - Interface Statistics
     - IDE Settings
     - Project Chat
     - Projects Privacy
     - GitHub Toolbox
  3. Development information

## Entry level tutorial
### What is TeamCode?
eamCode is an online coding tool centred in provide an in-real-time communication between a team conformed by an Owner, a Writer and Auditors.

TeamCode provides you with the tools to upload your projects and share or discuss changes while you are live sharing these modifications with your teammates.

### How I can use TeamCode?
TeamCode only has one requirement to start using it. You need to log in using your GitHub account. This requirement exists for two main reasons:
  - Bring the maximum security to our users relying on GitHub.
  - Provide an integrated GitHub toolbox to interact with some advanced actions introduced in the "Advanced level tutorial".

### Interface Section
Once you login into TeamCode, your interface will be loaded. This interface consists of three sections:
  - Projects
  - Feed
  - Statistics

Every section aims to offer you control and tracking in your projects. All this while trying to be as minimalist as possible. In this "Entry level tutorial", we will only introduce you to the "Projects" section.

Projects section introduce you into the control of your projects. TeamCode works with Workspace Objects which will store all your changes, file data and user modifications to provide the best possible teamwork experience.

<p align="center">
  <img src="https://i.imgur.com/rhZGe6R.png?1"/>
</p>

There are 4 possible interactions. Once you enter to TeamCode with a new account you'll only have one possible interaction. This will be the addition button "+". With this, you'll be able to create your first TeamCode project.

Once you will have at least one TeamCode project you'll unlock the other 3 interactions. These ones will be:
  - Trash icon: Delete the TeamCode project.
  - Play icon: Load the TeamCode project.
  - Pagination buttons: Swap between the different project pages.

### Project Collaborators
Collaborator Object is used in TeamCode as the role to give to all your teammates. This role allows them to visit your project by sending them the URL. At first instance, only Collaborators and project Owner are allowed to see the Project and the project changes. Inside project "Options" dropdown you will find all the management tools.

<p align="center">
  <img src="https://i.imgur.com/jddkefY.png"/>
  <img src="https://i.imgur.com/d01YcXN.png"/>
</p>

These images allow you to see the Collaborators interactions which will have the Owner and Collaborators roles. Project Owner is the only one allowed to manage collaborators inside "List collaborators" tab. Project Owner is also the only one allowed to add more Collaborators to the project, using the "Add collaborators" tab. When Collaborator access to "List collaborators" tab, only view options will be available, without any type of control over the rest of the Collaborators.

### User Status
Inside the project, we already know the "Writer" and "Collaborator" roles. Apart from these roles we also have "Writer" and "Auditor". These two roles were previously introduced in [Project Collaborators](###Project-Collaborators) section.

  - **Auditor**: Auditor is a role to avoid Collaborators to modify the project content without permission. While you are in Auditor role you'll still be able to:
    - Request at any moment the Writer role by using the "Ask to write" tab.
    - Write in the project files.
    - Your changes will **NOT** be uploaded or shared with the rest of the team.
    - Any change done in a file previously edited by the project Writer will be **OVERWRITTEN**.
    - Once you'll ask and receive the Writer role your local changes will be automatically uploaded to the project.
  - **Writer**: There is only one User allowed to have this role. This role allows you to: 
    - Make changes to the project or upload your local changes done while you were an Auditor.
    - Send the Writer role to any Auditor who requested the role.
    - You can upload files by drag-and-drop them to the project explorer section.

## Advanced level tutorial
### TeamCode 💗 Git
There is a reason why Auditors can still write even if their changes are not uploaded into the TeamCode project. To introduce the aim of this feature we need to introduce first the "Secret Folders/Files".

#### Secret Folders/Files
eamCode has an extra feature for the most advanced users. Secret Feature allows you to create files and folder which will **NEVER** be uploaded to the server or shared to the rest of the team by only adding a dot "." before the file or folder name. 
This feature consists of two aims:
  - Provide the users with the tools to avoid uploading extra-large files into the server and collapse their user-disk space. While they will still be able to work with this file locally.
  - Provide users with the tools to recreate a Git Structure.
  
#### How to recreate Git using Secret Feature?
This will consist of a few quick steps: 

  1. We need to start from the idea of Writer role is the only person to "Commit" and "Push". The rest of the users are only allowed to work locally.
  2. No matter what your role, you can create a Git branch by using the Secret Feature. Let's imagine the initial project structure is something like:


    (master)
      |_ TestComponent
      |        |_ test.component.html
      |        |_ test.component.ts
      |        |_ test.component.css
      |
      |_ README.md

    Where "master" is the current project explorer folder. We need to restructure our project into a new 
    folder with the name of the branch. This branch will be public to let all the teammates see the 
    changes in real-time. 


    ---Writer View---

    (master)
      |_ master
            |_TestComponent
            |       |_ test.component.html
            |       |_ test.component.ts
            |       |_ test.component.css
            |
            |_ README.md

    Now Writer and Auditors are ready to start working on local branches by using the Secret Feature. As 
    an Auditor lets try to create a "Develop" branch to work with an SCSS version of the TestComponent.


    ---Auditor View---

    (master)
      |_ master
      |     |_TestComponent
      |     |       |_ test.component.html
      |     |       |_ test.component.ts
      |     |       |_ test.component.css
      |     |
      |     |_ README.md
      |
      |_.develop
            |_TestComponent
            |       |_ test.component.html
            |       |_ test.component.ts
            |       |_ test.component.scss
            |
            |_ README.md

    Now, how a Writer does a "Commit" or a "Push"? He's doing a commit and push into "master" every time he 
    modifies a file in the master folder. But, how Auditors make commit and push? They need to ask for 
    Writer Role. Once they are the project Writer. They will change the files of master for their own local 
    versions in the ".develop" folder.

    For those that know Git, the system works as we've got some conflicts when we're trying to push our 
    changes and now we have to manually solve the involved files by adding the new version.
             


### Interface Feed
Interface Feed is still in v1.0 but provides you information about the projects you're subscribed at. This subscription is automatically done once you're added to a project as a new Collaborator. Can be also done once we create a new TeamCode project. It provides information about:
  - Action done
  - Status after the action was done
  - Workspace involved
  - Date of the action
  - Collaborator added

### Interface Statistics
Interface Statistics provides two charts with information about our projects. The first chart provides us with information about the size (measured in files) of every project. The second Chart provides you with information about what is your most used language.

### IDE Settings
A setting file was added into StackBlitz project. You can access it by going to:

    Left Gear Icon "Settings" > Editor Settings > Workspace Settings

At this point, a ".vscode" folder with a "settings.json" file will be created in your project explorer.

If you want to change any settings, you only have to uncomment the line (Ctrl + K + U) or delete the "/**/" annotation and then change the value.

### Project Chat
Project Chat is a feature only available for the project Owner and project Collaborators. This chat provides essential communication between teammates while they are working.

You can access the chat by pressing the "Chat-icon" on the bottom-right corner of your IDE screen.

<p align="center">
  <img src="https://i.imgur.com/Z6Da7uS.png"/>
</p>

Once the chat is open you'll be able to see the messages sent by your project collaborators. You will be able to write in the input section. You can also send messages by pressing "Enter" key or pressing "Play button" next to the text input section. Input section let us resize it if we place the cursor at the right-bottom corner of the input box.

<p align="center">
  <img src="https://i.imgur.com/diNshs1.png?1"/>
</p>

Chat also includes a "silent-mode" to don't disturb users while they are coding. This feature will add a green dot over the chat icon as a soft-incoming-messages report.

<p align="center">
  <img src="https://i.imgur.com/08IJ5zo.png"/>
</p>

### Projects Privacy
As an extra feature to increase the collaborations in projects, TeamCode provides options to make your project public or private. Each property will modify the visibility of your project.

  - Public projects:
    - Visible for every user (even non-registered users).
    - Only Workspace Collaborators can "Ask to write" or use the "Project Chat".
    - You can share this type of project providing the project URL to your teammates or providing the project name.
  
  - Private projects:
    - Only visible for Workspace Collaborators.
    - You can share this type of project providing the project URL to your teammates.

You can change the project privacy at any moment going to "Options > Make project -state-". Where -state- will become the new privacy state of the project. Here we provide the two views:

  - Public projects view:
  
    <p align="center">
      <img src="https://i.imgur.com/Qk0a0ha.png"/>
    </p>

  - Private projects view:

    <p align="center">
      <img src="https://i.imgur.com/HG8y4rL.png"/>
    </p>

### GitHub Toolbox
This Feature is only available to the project Writer. The reason is that these feature grants write permissions over the project. We can access the GitHub toolbox by pressing the GitHub button on the bottom-right corner of the TeamCode project view.

<p align="center">
  <img src="https://i.imgur.com/itbg1FK.png"/>
</p>

The first option allows us to load a Github file by uploading the URL of it. While the second Option allows us to **OVERWRITE** the actual TeamCode project to load a Web-Framework project by providing the combination of:

    "GithubUsername/Repository"

Supported Frameworks:
  - ReactJS
  - Angular2

Incomming Support for:
  - Ionic
  - Vue
  - Custom Webpack configs

## Development information

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
