![Screenshot](https://github.com/FevenSeyfu/Multistep-Form/blob/dev/Multi-step-form.gif)

# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).I have used react with Context API to manage state that collects and store multi-step form inputs, I have use tailwindCSS for styling the components and build a layout compatible for different screen sizes. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Links

- Solution URL: [Github Repo Link](https://github.com/FevenSeyfu/Multistep-Form)
- Live Site URL: [Live Link](https://frontendmentor-multi-stepform.netlify.app/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Build Tool
- Context API - State management

### What I learned

While Completing this project how to handle multi-step  forms in react by using Context API.Below is snippet of my reducer function that manages the states of the form.

```
```js
const formReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };
    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "GO_TO_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
};
```

## Author

- Website - [Feven Seyfu](https://fevenseyfu.tech/)
- Frontend Mentor - [@FevenSeyfu](https://www.frontendmentor.io/profile/FevenSeyfu)
- Twitter - [@FevenSeyfu](https://www.twitter.com/FevenSeyfu)
- Linkedin - [Feven Seyfu](https://www.linkedin.com/in/fevenseyfu/)


## Acknowledgments

I would like to thank all who have reviewed my solution and given me feedback and Frontend mentors for providing the assets and design files I have used for the project.
