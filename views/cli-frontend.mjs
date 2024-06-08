// register.js
import inquirer from "inquirer";
import axios from "axios";

// Home page with ( Login page, Register page and Logout )
const home = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'Welcome! What would you like to do?',
      choices: [
        'Login',
        'Register',
        'Exit'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Login':
          loginPage();
          break;
        case 'Register':
          registerPage();
          break;
        case 'Exit':
          console.log('Exiting the application...');
          process.exit();
          break;
        default:
          console.log('Invalid choice, please try again.');
          home(); // Redisplay the main menu if an invalid choice is somehow selected
      }
    });
};

// Register page function
const registerPage = () => {
  console.log('Welcome to the registration page!');
  inquirer
    .prompt({
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
      validate: function (value) {
        const pass = value.match(/^\w+$/);
        if (pass) {
          return true;
        }
        return 'Please enter a valid username (alphanumeric characters only).';
      }
    },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: function (value) {
          // Regular expression for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          // Test the value against the regex
          if (emailRegex.test(value)) {
            return true;
          }
          return 'Please enter a valid email address.';
        }

      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
        validate: function (value) {
          if (value.length < 8) {
            return 'Password must be at least 8 characters long.';
          }
          return true;
        }
      },
      {
        type: 'password',
        name: 'confirmPassword',
        message: 'Confirm your password:',
        mask: '*',
        validate: function (value, answers) {
          if (value !== answers.password) {
            return 'Passwords do not match.';
          }
          return true;
        }
      },
      {
        type: 'role',
        name: 'role',
        message: 'Enter your role:',
        validate: function (value, answers) {
          if (value == "") {
            return 'Field is empty!';
          }
          return true;
        }
      })
    .then(answers => {
      console.log('Registration successful!');
      console.log('Username:', answers.username);

      axios.get("http://localhost:3000/GreenThumb/api/v1/users-list").then(response => {
        console.log('Response:', response.data);
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/register';

        // Data to be sent in the POST request
        const postData = {
          UserID: response.data.length + 1,
          Username: answers.username,
          Email: answers.email,
          Password: answers.password,
          Role: answers.role
        };
        axios.post(url, postData)
          .then(response => {
            // Handle success
            // console.log('Response:', response.data);
            mainMenu(response.data.length + 1);
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
      }).catch(error => {
        // Handle error
        console.error('Error:', error);
      });



    })
    .catch(error => {
      console.error('Registration failed:', error);
    });

}

// Login page function
const loginPage = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your email address.';
          }
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ])
    .then(answers => {
      console.log('Login successful!');
      console.log(answers)

      // Define the URL to which you want to send the POST request
      const url = 'http://localhost:3000/GreenThumb/api/v1/login';

      // Data to be sent in the POST request
      const postData = {
        email: answers.email,
        password: answers.password,
      };
      axios.post(url, postData)
        .then(response => {
          // Handle success
          console.log('Response:', response.data.user.UserID);
          mainMenu(response.data.user.UserID);
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });




    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
};

////////////////////////

const mainMenu = (UserID) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Garden',
        'Guide',
        'Event',
        'Planting Activity',
        'Exchange'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Garden':
          Garden(UserID);
          break;
        case 'Guide':
          Guide(UserID);
          break;
          case 'Event':
            Event(UserID);
            break;  
        case 'Planting Activity':
          Planting_Activity(UserID);
          break;
        case 'Exchange':
          Exchange(UserID);
          break;

        default:
          console.log('Invalid choice');
      }
    });
};

const Garden = (UserID) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Garden',
        'Display All Gardens',
        'Display garden by id',
        'Display gardens by name',
        'Display gardens by location',
        'Update garden data',
        'Delete a specific garden',
        "Enter to event window",
        "Enter to plot window",
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Garden':
          AddGarden(UserID);
          break;
        case 'Display All Gardens':
          DisplayAllGardens(UserID);
          break;
        case 'Display garden by id':
          DisplayGardenById();
          break;
        case 'Display gardens by name':
          DisplayGardensByName(UserID);
          break;

        case 'Display gardens by location':
          DisplayGardensByLocations(UserID);
          break;

        case 'Update garden data':
          UpdateGardenData(UserID);
          break;
        case 'Delete a specific garden':
          DeleteASpecificGarden(UserID);
          break;
          case 'Enter to event window':
            Event(UserID);
            break;
            case 'Enter to plot window':
              Plot(UserID);
              break;    
        case 'Go Back':
          mainMenu(UserID);
          break;
        default:
          console.log('Invalid choice');
      }
    });
};


const Guide = (UserID) => {
  
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Guide',
        'Display All Guides',
        'Display guide by id',
        'Display guides by title',
        'Update guide data',
        'Delete a specific guide',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Guide':
          AddGuide(UserID);
          break;
        case 'Display All Guides':
          DisplayAllGuides(UserID);
          break;
        case 'Display guide by id':
          DisplayGuideById();
          break;
        case 'Display guides by title':
          DisplayGuidesByTitle(UserID);
          break;

        case 'Update guide data':
          UpdateGuideData(UserID);
          break;

        case 'Delete a specific guide':
          DeleteASpecificGuide(UserID);
          break;
        case 'Go Back':
          mainMenu(UserID);
          break;
        default:
          console.log('Invalid choice');
      }
    });
}

const Event = (UserID) => {
  axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`).then(response=>{
    console.log(response.data[0].GardenID);
    const GardenID = response.data[0].GardenID;
    inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Event',
        'Display All Events',
        'Display Event by id',
        'Display Events by garden id',
        'Update event data',
        'Delete a specific event',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Event':
          AddEvent(UserID, GardenID);
          break;
        case 'Display All Events':
          DisplayAllEvents(UserID, GardenID);
          break;
        case 'Display Event by id':
          DisplayEventById(UserID, GardenID);
          break;
        case 'Display Events by garden id':
          DisplayEventsByGardenId(UserID, GardenID);
          break;

        case 'Update event data':
          UpdateEventData(UserID, GardenID);
          break;

        case 'Delete a specific event':
          DeleteASpecificEvent(UserID, GardenID);
          break;
        case 'Go Back':
          mainMenu(UserID);
          break;
        default:
          console.log('Invalid choice');
      }
    });
  }).catch(error=>{

  })
  
}

const Planting_Activity = (UserID) => {
  console.log("Planting_Activity");
  mainMenu(UserID);
}

const Exchange = (UserID) => {
  console.log("Exchange");
  mainMenu(UserID);
}

///////////////////////////

// Garden functions
/* ***************** */
const AddGarden = (UserID) => {
  console.log("AddGarden");
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your garden name.';
          }
        }
      },
      {
        type: 'input',
        name: 'location',
        message: 'Enter garden location:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your location.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter garden description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter garden description.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter garden data');
      console.log(answers)
      axios.get("http://localhost:3000/GreenThumb/api/v1/gardens-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-garden';
        console.log(response1.data.length + 1);
        // Data to be sent in the POST request
        const postData = {
          GardenID: response1.data.length + 1,
          Name: answers.name,
          Location: answers.location,
          Description: answers.description
        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success
            console.log('Response2');

            axios.get("http://localhost:3000/GreenThumb/api/v1/gardens-list").then(response3 => {
              axios.post('http://localhost:3000/GreenThumb/api/v1/new-user-garden', {
                UserGardenID: response3.data.length + 1,
                UserID: UserID,
                GardenID: response1.data.length + 1
              })
                .then(response4 => {
                  // Handle success
                  console.log('Response4');
                  Garden(UserID);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                });
            }).catch(error => {
              console.error('Error:', error);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
  // Garden(UserID);
}

const DisplayAllGardens = (UserID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/gardens-list").then(response => {
    console.log(response.data);
    Garden(UserID);
  }).catch(error => {

  })
}

const DisplayGardenById = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenID',
        message: 'Enter your garden Garden Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list/${answers.GardenID}`).then(response => {
      console.log(response.data);
      Garden(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID);
  })

}

const DisplayGardensByName = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenName',
        message: 'Enter your garden Garden Name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Name.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list-by-name/${answers.GardenName}`).then(response => {
      console.log(response.data);
      Garden(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID);
  })
}

const DisplayGardensByLocations = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenLocation',
        message: 'Enter your garden Garden Location:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Location.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list-by-location/${answers.GardenLocation}`).then(response => {
      console.log(response.data);
      Garden(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID);
  })
}

const UpdateGardenData = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenID',
        message: 'Enter your garden Garden Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your garden name.';
          }
        }
      },
      {
        type: 'input',
        name: 'location',
        message: 'Enter garden location:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your location.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter garden description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter garden description.';
          }
        }
      },
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/garden/${answers.GardenID}`, {
        Name: answers1.name,
        Location: answers1.location,
        Description: answers1.description
      }).then(response => {
        console.log({
          GardenID: answers.GardenID,
          Name: answers1.name,
          Location: answers1.location,
          Description: answers1.description
        });

        Garden(UserID);
      }).catch(error => {
        console.error('Error message:', error);
      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID);
  })
}

const DeleteASpecificGarden = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenID',
        message: 'Enter your garden Garden Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/specific-garden-from-list/${answers.GardenID}`).then(response => {
      console.log(response.data);
      Garden(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID);
  })
}

/* ***************** */

// Guide functions
/* ***************** */

const AddGuide = (UserID) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter your guide title:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your guide title.';
          }
        }
      },
      {
        type: 'input',
        name: 'content',
        message: 'Enter guide content:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your guide content.';
          }
        }
      },
      {
        type: 'input',
        name: 'rate',
        message: 'Rate this guide:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter rate.';
          }
        }
      },
      {
        type: 'input',
        name: 'comment',
        message: 'Type your comment:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your comment.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter guide data');
      axios.get("http://localhost:3000/GreenThumb/api/v1/guide-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-guide';
        // Data to be sent in the POST request
        const postData = {
          GuideID: response1.data.length + 1,
          AuthorUserID: UserID,
          Title: answers.title,
          Content: answers.content,
          Rate: answers.rate
        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success

            axios.get("http://localhost:3000/GreenThumb/api/v1/comments-list").then(response3 => {
              axios.post('http://localhost:3000/GreenThumb/api/v1/add-comment', {
                CommentID: response3.data.length + 1,
                GuideID: response1.data.length + 1,
                Comment: answers.comment
              })
                .then(response4 => {
                  // Handle success
                  Guide(UserID);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                });
            }).catch(error => {
              console.error('Error:', error);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
  // Garden(UserID);
}

const DisplayAllGuides = (UserID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/guide-list").then(response => {
    console.log(response.data);
    Guide(UserID);
  }).catch(error => {

  })
}

const DisplayGuideById = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GuideID',
        message: 'Enter your Guide Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Guide Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/guide/${answers.GuideID}`).then(response => {
      console.log(response.data);
      Guide(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID);
  })

}

const DisplayGuidesByTitle = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GuideTitle',
        message: 'Enter your guide title:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Guide Title.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/guide-list-by-title/${answers.GuideTitle}`).then(response => {
      console.log(response.data);
      Guide(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get guide via title:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID);
  })
}

const UpdateGuideData = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GuideID',
        message: 'Enter your Guide Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Guide Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter your guide title:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your guide title.';
          }
        }
      },
      {
        type: 'input',
        name: 'content',
        message: 'Enter guide content:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter guide content.';
          }
        }
      },
      {
        type: 'input',
        name: 'rate',
        message: 'Enter rate:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter rate.';
          }
        }
      },
      
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/guide/${answers.GuideID}`, {
        Title: answers1.title,
        Content: answers1.content,
        Rate: answers1.rate
      }).then(response => {
        console.log({
          GuideID: answers.GuideID,
          Title: answers1.title,
          Content: answers1.content,
          Rate: answers1.rate
        });

        Guide(UserID);
      }).catch(error => {
        console.error('Error message:', error);
      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID);
  })
}

const DeleteASpecificGuide = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GuideID',
        message: 'Enter your Guide Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Guide Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/specific-guide-from-list/${answers.GuideID}`).then(response => {
      console.log(response.data);
      Guide(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID);
  })
}

/* ***************** */


// Event functions
/* ***************** */

const AddEvent = (UserID, GardenID) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'date',
        message: 'Enter your event date:',
        default: '2024-02-05',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your event date.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter event description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your event description.';
          }
        }
      },

    ])
    .then(answers => {
      console.log('Enter guide data');
      axios.get("http://localhost:3000/GreenThumb/api/v1/events-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-event';
        // Data to be sent in the POST request
        const postData = {
          EventID: response1.data.length + 1,
          GardenID: GardenID,
          Date: answers.date,
          Description: answers.description
        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success
            console.log({
              EventID: response1.data.length + 1,
              GardenID: GardenID,
              Date: answers.date,
              Description: answers.description
            });
            /////////////////////
            Event(UserID);

          }).catch(error => {
            console.error('Error:', error);
            Event(UserID);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          Garden(UserID);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
      Garden(UserID);
    });
}

const DisplayAllEvents = (UserID, GardenID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/events-list").then(response => {
    console.log(response.data);
    Event(UserID);
  }).catch(error => {

  })
}

const DisplayEventById = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'EventID',
        message: 'Enter your Event Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Event Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/event/${answers.EventID}`).then(response => {
      console.log(response.data);
      Event(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID);
  })

}


const DisplayEventsByGardenId = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'GardenID',
        message: 'Enter your Garden Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Garden Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/events-list-by-garden/${answers.GardenID}`).then(response => {
      console.log(response.data);
      Event(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID);
  })

}

const UpdateEventData = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'EventID',
        message: 'Enter your Event Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Event Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'date',
        message: 'Enter even date:',
        default: "2024-11-12",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter event date.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter event description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter event description.';
          }
        }
      },
      
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/event/${answers.EventID}`, {
        GardenID: GardenID,
        Date: answers1.date,
        Description: answers1.description
      }).then(response => {
        console.log({
          GardenID: GardenID,
        Date: answers1.date,
        Description: answers1.description
        });

        Event(UserID);
      }).catch(error => {
        console.error('Error message:', error);
      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get Event via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID);
  })
}

const DeleteASpecificEvent = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'EventID',
        message: 'Enter your Event Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Event Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/event/${answers.EventID}`).then(response => {
      console.log(response.data);
      Event(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get Event via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID);
  })
}

/* ***************** */

/////////////////////

//////////////////////////
home();


