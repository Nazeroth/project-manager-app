import { BoardValidationRule, UserAuthValidationRule } from '~/common/enums/enums';
import { AppLocalizationMap } from '~/common/types/types';

export const ENMessagesMap: AppLocalizationMap = {
  header: {
    nav: {
      createBoard: 'Create board',
      editUser: 'Edit user',
      signOut: 'Sign out',
    },
  },
  modals: {
    confirmation: {
      title: 'Are you sure?',
      buttons: {
        confirm: 'Yes',
        reject: 'No',
      },
    },
  },
  main: {
    title: 'Hello',
    boardCreatingForm: {
      title: 'Board creating form',
      inputs: {
        title: 'title',
      },
      buttons: {
        createBoard: 'Create board',
      },
    },
  },
  auth: {
    titles: {
      singIn: 'Sign In',
      singUp: 'Sign Up',
    },
    inputs: {
      name: 'name',
      login: 'login',
      password: 'password',
    },
    buttons: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
  },
  profile: {
    title: 'User Settings',
    userData: {
      currentId: 'Current Id:',
      currentName: 'name:',
      currentLogin: 'login:',
    },
    buttons: {
      deleteUser: 'Delete User',
    },
    editForm: {
      title: 'Edit user',
      buttons: {
        editUser: 'Edit',
      },
    },
  },
  welcome: {
    buttons: {
      mainPage: 'Main Page',
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
    title: 'Welcome',
    aboutProject: `
    This application is designed to help facilitate collaboration in teams. 
    Here you can plan and distribute tasks, control the progress of work and experiment.
    From this page you can go to the registration screen or, 
    if you are already our user, go directly to the workspace.
    `,
    aboutCourse: `
    This application was created during the school's React Rolling Scopes course. 
    The course is intended for new students who have knowledge and practical 
    experience in using the following technologies and tools:
    
    JavaScript
    typescript
    Git, GitHub (clone, add, commit, push, pull, merge, rebase, work with Pull Request)
    npm, webpack
    CSS3 / HTML5
    Chrome DevTools Figma
    Understanding the concept of REST API
    `,
    teamMembers: {
      item0: {
        name: 'Evgeny',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      item1: {
        name: 'Nickolas',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      item2: {
        name: 'Alexei',
        aboutMe: 'About me: Mock',
        contribution: 'Contribution: Mock',
      },
    },
  },
  validationMessages: {
    board: {
      titleRequired: 'title is required',
      titleMinLength: `Title must be at least ${BoardValidationRule.TITLE_MIN_LENGTH} characters`,
      titleMaxLength: `Title must be max ${BoardValidationRule.TITLE_MAX_LENGTH} characters`,
    },
    user: {
      nameRequired: 'name is required',
      nameMinLength: `Name must be at least ${UserAuthValidationRule.NAME_MIN_LENGTH} characters`,
      nameMaxLength: `Name must be max ${UserAuthValidationRule.NAME_MAX_LENGTH} characters`,
      loginRequired: 'login is required',
      loginMinLength: `Login must be at least ${UserAuthValidationRule.LOGIN_MIN_LENGTH} characters`,
      loginMaxLength: `Login must be max ${UserAuthValidationRule.LOGIN_MAX_LENGTH} characters`,
      passwordRequired: 'password is required',
      passwordMinLength: `Name must be at least ${UserAuthValidationRule.NAME_MIN_LENGTH} characters`,
      passwordMaxLength: `Name must be max ${UserAuthValidationRule.NAME_MAX_LENGTH} characters`,
    },
  },
};
