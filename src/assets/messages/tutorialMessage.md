![Imgur](https://i.imgur.com/E1rrZE7.png?1)

<p align="center">
  <img src="https://i.imgur.com/E1rrZE7.png?1"/>
</p>

# Welcome to TeamCode

## Guidelines

  1. Entry level tutorial
     - What is Temacode
     - How I can use TemCode
     - Interface Projects
     - Project Collaborators
     - User Status
  2. Advanced level Tutorial
     - TeamCode 💗 Git
     - Interface Feed
     - Interface Statistics
     - IDE Settings
     - GitHub Toolbox

## Entry level tutorial
### What is TeamCode?
TeamCode is an onlide coding tool centerd in provide an in-real-time comunication between a team conformed by an Owner, a Writer and Auditors.

TeamCode provides you the tools to upload your projects and share or discuss changes while you are live sharing this modifications with you teammates.

### How I can use TeamCode?
TeamCode only have one requeriment to start using it. You need to login using your GitHub account. This requeriment exists for two main reasons:
  - Bring the maximum seccurity to our users relying in GitHub.
  - Provide an integrated GitHub toolbox to interact with some advanced actions introduced in the "Advanced level tutorial".

### Interface Section
Once you log in into TeamCode, your interface will be loaded. This interface consists in three sections:
  - Projects
  - Feed
  - Statistics

Every section aims to offer you control and traking in your projects. All this while trying to be as minimalist as possible. In this "Entry level tutorial" we will only introduce you the "Projects" section.

Projects section introduce you intro the control of your projects. TeamCode works with Workspace Objects which will store all your changes, file data and user modifications to provide the best possible teamwork experience.

![teamcode_projects](https://i.imgur.com/rhZGe6R.png?1)

<p align="center">
  <img src="https://i.imgur.com/rhZGe6R.png?1"/>
</p>

There are  4 possible interactions. Once you enter to TeamCode with a new account you'll only have one possible interaction. This will be the addition button "+". With this you'll be ble to create your firs TeamCode project.

Once you will have at least one TeamCode project you'll unlock the other 3 interactions. This ones will be:
  - Trash icon: Delete the TeamCode project.
  - Play icon: Load the TeamCode project.
  - Pagination buttons: Swap between the different project pages.

### Project Collaborators
Collaborator Object is used in teamCode as the role to give to all your teamates. This role allow them to visit your projet by sending them the URL. At firsst intance, only Collaborators and project Owner are allowed to see the Project and the project changes. Inside project "Options" dropdown you will find all the management tools.

![project_tools1](https://i.imgur.com/jddkefY.png)
![project_tools1](https://i.imgur.com/d01YcXN.png)

<p align="center">
  <img src="https://i.imgur.com/jddkefY.png"/>
  <img src="https://i.imgur.com/d01YcXN.png"/>
</p>

These images allow you to see the Collaborators interactions which will have the Owner and Collaborators roles. Project Owner are the only one allowed to manage collaborators inside "List collaborators" tab. Project Owner is also the only one allowed to add more Collaborators to the project, using the "Add collaborators" tab. When a Collaborator access to "List collaborators" tab, only view options will be available, without any type of control over the rest of the Collaborators.

### User Status
Inside the project we already know the "Writer" and "Collaborator" roles. Apart of this roles we also have "Writer" and "Auditor". This two roles were previously introduced in [Project Collaborators](###Project-Collaborators) section.

  - **Auditor**: Auditor is a role to avoid Collaborators to modify the project content without permission. While you are in Auditor role you'll still be able to:
    - Request at any moment the Writer role by using the "Ask to write" tab.
    - Write in the project files.
    - Your changes will **NOT** be uploaded or shared with the rest of the team.
    - Any change done in a file previously edited by the project Writer will be **OVEWRITEN**.
    - Once you'll ask and receive the Writer role you local changes will be automatically uploaded to the project.
  - **Writer**: There is only one User allowed to have this role. This role allow you to: 
    - Make changes to the project or upload you local changes done while you were an Auditor.
    - Send the Writer role to any Auditor who requested the role.
    - You can upload files by drag-and-drop them tho the project explorer section.

## Advanced level tutorial
### TeamCode 💗 Git
There is a reason why Auditors can still write even if their changes are not uploaded into the TeamCode project. To inctroduce the aim of this feature we need to introduce first the "Secret Folders/Files".

#### Secret Folders/Files
TeamCode have an extra feature for the most advanced users. Secret Feature allow you to create files and folder which will **NEVER** be uploaded to the server or shared to the rest of the team by only adding a dot "." before the file or folder name.
This feature consists of two aims:
  - Provide the users the tools to avoid uploading extra-large files into the server and collapse their user-disk space. While they will still be able to work with this file locally.
  - Provide the users the tools to recreate a Git Structure.
  
#### How to recreate Git using Secret Feature?
This will consist in a few quick steps:
  1. We need to start from the idea of Writer role is the only person to "Commit" and "Push". The rest of the users are only allowed to work locally.
  2. No matter whats your role, you can create a Git branch by using the Secret Feature. Lets imagine the initial projet structure is something like:

    (master)
       |_ TestComponent
       |        |_ test.component.html
       |        |_ test.component.ts
       |        |_ test.component.css
       |
       |_ README.md
    
    Where "master" is the current project explorer folder. We need to reestructure our projec into a new folder with tha name of the branch. This branch will be public to let all the teamates see the changes in-real-time.

                                      ---Writer View---

    (master)
       |_ master
             |_TestComponent
             |       |_ test.component.html
             |       |_ test.component.ts
             |       |_ test.component.css
             |
             |_ README.md
    
    Now Writer and Auditors are ready to start working on local branches by using the Secret Feature. As an Auditor, lets try to create a "Develop" branch to work with a SCSS version of the TestComponent.

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
    
    Now, how a Writer do a "Commit" or a "Push"? He's doing a commit and push into "master" every time he modifies a file in the master folder. But, how Auditors make commit and push? They need to ask for Writer Role. Once they are the project Writer. They will change the files of master for their own local versions in the ".develop" folder.

    For those that know Git, the system works as we've got some conflicts when we're trying to push our changes and now we have to manually solve the involved files by adding the new version.
             


### Interface Feed
Interface Feed is still in v0.1 but provides you information of the projects you're subscribbed at. This subscription is automatically done once you're added to a project as a new Collaborator. Can be also done once we create a new TeamCode project. It provides information of:
  - Action done
  - Status after the action was done
  - Workspace involved
  - Date of the action
  - Collaborator added

### Interface Statistics
Interface Statistics provides two charts with information about our projects. First chart provides us information about the size (measured in files) of every project. The second Chart provides you information of what is your most used language.

### IDE Settings
A setting file was added into StackBlitz project. You can access it by going to:

    Left Gear Icon "Settings" > Editor Settings > Workspace Settings

At this point a ".vscode" folder with a "settings.json" file will be created in your project explorer.

If you want to change any settings, you only have to uncomment the line (Ctrl + K + U) or delete the "/**/" anotation and then change the value.

### GitHub Toolbox
This Feature is only available to the project Writer. The reason is because this feature grants write permissions over the project. We can access the GitHub toolbox by pressing the GitHub button on bottom-right corner of the TeamCode project view.

![GitHubTools](https://i.imgur.com/itbg1FK.png)
<p align="center">
  <img src="https://i.imgur.com/itbg1FK.png"/>
</p>

The first option allow us to load a Github file by uploading the URL of it. While the second Option allow us to **OVERWRITE** the actual TeamCode project to load a Web-Framework project by providing the combination of:

    "GithubUsername/Repository"

Supported Frameworks:
  - ReactJS
  - Angular2

Incomming Support for:
  - Ionic
  - Vue
  - Custom Webpack configs