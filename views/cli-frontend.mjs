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


const Plot = (UserID) => {
  axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`).then(response=>{
    console.log(response.data[0].GardenID);
    const GardenID = response.data[0].GardenID;
    inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Plot',
        'Display All Plots',
        'Display Plot by id',
        'Display Plots by garden id',
        'Update plot data',
        'Delete a specific plot',
        'Enter to activity window',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Plot':
          AddPlot(UserID, GardenID);
          break;
        case 'Display All Plots':
          DisplayAllPlots(UserID, GardenID);
          break;
        case 'Display Plot by id':
          DisplayPlotById(UserID, GardenID);
          break;
        case 'Display Plots by garden id':
          DisplayPlotsByGardenId(UserID, GardenID);
          break;

        case 'Update plot data':
          UpdatePlotData(UserID, GardenID);
          break;

        case 'Delete a specific plot':
          DeleteASpecificPlot(UserID, GardenID);
          break;
          case 'Enter to activity window':
            SelectPlot(UserID);
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


const SelectPlot = (UserID) => {
  axios.get(`http://localhost:3000/GreenThumb/api/v1/plots-list`).then(response => {
    
    inquirer
    .prompt({
      type: 'list',
      name: 'plotID',
      message: 'Select a plot for the activity:',
      choices: response.data.map(plot => plot.PlotID.toString()) // Ensure PlotID is a string for comparison
    })
    .then((answers) => {
      const selectedPlot = response.data.find(plot => plot.PlotID.toString() === answers.plotID); // Correct comparison
      
      if (selectedPlot) {
        console.log(selectedPlot);
        Planting_Activity(UserID, selectedPlot.PlotID);
      } else {
        console.error('Selected plot not found.');
      }
    });
  }).catch(error => {
    console.error('Error fetching plots:', error);
  });
};


const Planting_Activity = (UserID, PlotID) => {
    // axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`).then(response=>{}).catch(error=>{});
    inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Planting Activity',
        'Display All Activities',
        'Display Activity by id',
        'Display Activities by user id',
        'Display Activities by plot id',
        'Update activity data',
        'Delete a specific activity',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Planting Activity':
          AddPlantingActivity(UserID, PlotID);
          break;
        case 'Display All Activities':
          DisplayAllActivities(UserID, PlotID);
          break;
        case 'Display Activity by id':
          DisplayActivityById(UserID, PlotID);
          break;
        case 'Display Activities by user id':
          DisplayActivitiesByUserId(UserID, PlotID);
          break;
          case 'Display Activities by plot id':
            DisplayActivitiesByPlotId(UserID, PlotID);
            break;
        case 'Update activity data':
          UpdateActivityData(UserID, PlotID);
          break;

        case 'Delete a specific activity':
          DeleteASpecificActivity(UserID, PlotID);
          break;
        case 'Go Back':
          mainMenu(UserID);
          break;
        default:
          console.log('Invalid choice');
      }
    });

}

const Exchange = (UserID) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Exchange',
        'Display All Exchanges',
        'Display Exchange by id',
        'Display Exchanges by Offer User Id',
        'Display Exchanges by Requestor User Id',
        'Display Exchanges by status',
        'Update Exchange data',
        'Delete a specific Exchange',
        "Enter to resources window",
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Exchange':
          AddExchange(UserID);
          break;
        case 'Display All Exchanges':
          DisplayAllExchanges(UserID);
          break;
        case 'Display Exchange by id':
          DisplayExchangeById();
          break;
        case 'Display Exchanges by Offer User Id':
          DisplayExchangesByOfferUserId(UserID);
          break;

        case 'Display Exchanges by Requestor User Id':
          DisplayExchangesByRequestorUserId(UserID);
          break;
          case 'Display Exchanges by status':
            DisplayExchangesByStatus(UserID);
            break;
        case 'Update Exchange data':
          UpdateExchangeData(UserID);
          break;
        case 'Delete a specific Exchange':
          DeleteASpecificExchange(UserID);
          break;
          case 'Enter to resources window':
            Resources(UserID);
            break; 
        case 'Go Back':
          mainMenu(UserID);
          break;
        default:
          console.log('Invalid choice');
      }
    });
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


// Activity functions
/* ***************** */

const AddPlantingActivity = (UserID, PlotID) => {
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'PlantDate',
        message: 'Enter Plant Date value:',
        default: "2024-06-24", 
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plant Date value.';
          }
        }
      },
      {
        type: 'input',
        name: 'HarvestDate',
        message: 'Enter Harvest Date value:',
        default: "2024-10-24",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Harvest Date value.';
          }
        }
      },

    ])
    .then(answers => {
      console.log('Enter plot data');
      axios.get("http://localhost:3000/GreenThumb/api/v1/activities-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-activity';
        // Data to be sent in the POST request
        const postData = {
          ActivityID: response1.data.length + 1,
          UserID: UserID,
          PlotID: PlotID,
          PlantDate: answers.PlantDate,
          HarvestDate: answers.HarvestDate

        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success
            console.log({
              ActivityID: response1.data.length + 1,
          UserID: UserID,
          PlotID: PlotID,
          PlantDate: answers.PlantDate,
          HarvestDate: answers.HarvestDate
            });
            /////////////////////
            Planting_Activity(UserID, PlotID);

          }).catch(error => {
            console.error('Error:', error);
            Planting_Activity(UserID, PlotID);

          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          Plot(UserID);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
      Plot(UserID);
    });
}

const DisplayAllActivities = (UserID, PlotID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/activities-list").then(response => {
    console.log(response.data);
    Planting_Activity(UserID, PlotID);
  }).catch(error => {

  })
}

const DisplayActivityById = (UserID, PlotID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ActivityID',
        message: 'Enter your Activity Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Activity Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activity/${answers.ActivityID}`).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID);
  })

}


const DisplayActivitiesByUserId = (UserID, PlotID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'UserID',
        message: 'Enter your User Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your User Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activities-list-by-user/${answers.UserID}`).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID);
  })

}

const DisplayActivitiesByPlotId = (UserID, PlotID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlotID',
        message: 'Enter your Plot Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plot Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activities-list-by-plot/${answers.PlotID}`).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID);
  })

}

const UpdateActivityData = (UserID, PlotID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ActivityID',
        message: 'Enter your Activity Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Activity Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'PlantDate',
        message: 'Enter plant date:',
        default: "2024-11-12",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter plant date.';
          }
        }
      },
      {
        type: 'input',
        name: 'HarvestDate',
        message: 'Enter harvest date:',
        default: "2025-11-12",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter harvest date.';
          }
        }
      },
      
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/activity/${answers.ActivityID}`, {
        PlantDate: answers1.PlantDate,
        HarvestDate: answers1.HarvestDate
      }).then(response => {
        console.log({
          PlantDate: answers1.PlantDate,
          HarvestDate: answers1.HarvestDate
        });

        Planting_Activity(UserID ,PlotID);
      }).catch(error => {
        console.error('Error message:', error);
      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID ,PlotID);

  })
}


const DeleteASpecificActivity = (UserID, PlotID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ActivityID',
        message: 'Enter your Activity Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Activity Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/activity/${answers.ActivityID}`).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get Activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID);

  })
}

/* ***************** */



// Plot functions
/* ***************** */

const AddPlot = (UserID, GardenID) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'PlotSize',
        message: 'Enter your Plot Size:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your plot size.';
          }
        }
      },
      {
        type: 'input',
        name: 'SunLight',
        message: 'Enter Sun Light value:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Sun Light value.';
          }
        }
      },
      {
        type: 'input',
        name: 'SoilType',
        message: 'Enter Soil Type value:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Soil Type value.';
          }
        }
      },
      {
        type: 'input',
        name: 'Available',
        message: 'Enter Available value:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Available value.';
          }
        }
      },

    ])
    .then(answers => {
      console.log('Enter plot data');
      axios.get("http://localhost:3000/GreenThumb/api/v1/plots-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-plot';
        // Data to be sent in the POST request
        const postData = {
          PlotID: response1.data.length + 1,
          GardenID: GardenID,
          PlotSize: answers.PlotSize,
          SunLight: answers.SunLight,
          SoilType: answers.SoilType,
          Available: answers.Available

        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success
            console.log({
              PlotID: response1.data.length + 1,
          GardenID: GardenID,
          PlotSize: answers.PlotSize,
          SunLight: answers.SunLight,
          SoilType: answers.SoilType,
          Available: answers.Available
            });
            /////////////////////
            Plot(UserID);

          }).catch(error => {
            console.error('Error:', error);
            Plot(UserID);
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

const DisplayAllPlots = (UserID, GardenID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/plots-list").then(response => {
    console.log(response.data);
    Plot(UserID);
  }).catch(error => {

  })
}

const DisplayPlotById = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlotID',
        message: 'Enter your Plot Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plot Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plot/${answers.PlotID}`).then(response => {
      console.log(response.data);
      Plot(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID);
  })

}


const DisplayPlotsByGardenId = (UserID, GardenID) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plots-list-by-garden/${answers.GardenID}`).then(response => {
      console.log(response.data);
      Plot(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID);
  })

}

const UpdatePlotData = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlotID',
        message: 'Enter your Plot Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plot Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'PlotSize',
        message: 'Enter Plot Size:',

        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plot Size.';
          }
        }
      },
      {
        type: 'input',
        name: 'SunLight',
        message: 'Enter Sun Light:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Sun Light.';
          }
        }
      },
      {
        type: 'input',
        name: 'SoilType',
        message: 'Enter SoilType:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Soil Type.';
          }
        }
      },
      {
        type: 'input',
        name: 'Available',
        message: 'Enter Available value:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Available value.';
          }
        }
      },
      
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/plot/${answers.PlotID}`, {
        GardenID: GardenID,
          PlotSize: answers1.PlotSize,
          SunLight: answers1.SunLight,
          SoilType: answers1.SoilType,
          Available: answers1.Available
      }).then(response => {
        console.log({
          GardenID: GardenID,
          PlotSize: answers1.PlotSize,
          SunLight: answers1.SunLight,
          SoilType: answers1.SoilType,
          Available: answers1.Available
        });

        Plot(UserID);
      }).catch(error => {
        console.error('Error message:', error);
      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get Plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID);
  })
}

const DeleteASpecificPlot = (UserID, GardenID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlotID',
        message: 'Enter your Plot Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plot Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/plot/${answers.PlotID}`).then(response => {
      console.log(response.data);
      Plot(UserID);
    }).catch(error => {
      console.error('Error message:', error);
    })
  }).catch((error) => {
    console.error('Failed to get Plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID);
  })
}

/* ***************** */



// Exchange functions
/* ***************** */
const AddExchange = (UserID) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'RequestorUserID',
        message: 'Enter requestor user id:',
        
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter requestor user id.';
          }
        }
      },
      {
        type: 'input',
        name: 'Status',
        message: 'Enter exchange status:',
        default:"Offered, Requested or Completed",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter exchange status.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter exchange data');
      console.log(answers)
      axios.get("http://localhost:3000/GreenThumb/api/v1/exchanges-list").then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-exchange';
        console.log(response1.data.length + 1);
        // Data to be sent in the POST request
        const postData = {
          ExchangeID: response1.data.length + 1,
          OfferUserID: UserID,
          RequestorUserID: answers.RequestorUserID,
          Status: answers.Status
        };

        axios.post(url, postData)
          .then(response2 => {
            // Handle success
            console.log(postData);
            Exchange(UserID);

            
            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
            Exchange(UserID);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          Exchange(UserID);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
  // Garden(UserID);
}

const DisplayAllExchanges = (UserID) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/exchanges-list").then(response => {
    console.log(response.data);
    Exchange(UserID);
  }).catch(error => {

  })
}

const DisplayExchangeById = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ExchangeID',
        message: 'Enter your Exchange Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Exchange Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchange/${answers.ExchangeID}`).then(response => {
      console.log(response.data);
      Exchange(UserID);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);
  })

}

const DisplayExchangesByOfferUserId = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'OfferUserID',
        message: 'Enter Offer User Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Offer User Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-offer-user/${answers.OfferUserID}`).then(response => {
      console.log(response.data);
      Exchange(UserID);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);
  })
}

const DisplayExchangesByRequestorUserId = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'RequestorUserID',
        message: 'Enter Requestor User ID:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Requestor User ID.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-requestor-user/${answers.RequestorUserID}`).then(response => {
      console.log(response.data);
      Exchange(UserID);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID);

    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);

  })
}

const DisplayExchangesByStatus= (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'status',
        message: 'Enter exchange status:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter exchange status.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-status/${answers.status}`).then(response => {
      console.log(response.data);
      Exchange(UserID);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID);

    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);

  })
}


const UpdateExchangeData = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ExchangeID',
        message: 'Enter your Exchange Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Exchange Id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'status',
        message: 'Enter exchange status:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter exchange status.';
          }
        }
      },

    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/exchange/${answers.ExchangeID}`, {
        Status: answers1.status
      }).then(response => {
        console.log({
          GardenID: answers.GardenID,
          Status: answers1.status
        });

        Exchange(UserID);
      }).catch(error => {
        console.error('Error message:', error);
        Exchange(UserID);

      })
    }).catch(error => {

    })


  }).catch((error) => {
    console.error('Failed to get exchange via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);

  })
}

const DeleteASpecificExchange = (UserID) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ExchangeID',
        message: 'Enter Exchange Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Exchange Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/exchange/${answers.ExchangeID}`).then(response => {
      console.log(response.data);
      Exchange(UserID);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID);

    })
  }).catch((error) => {
    console.error('Failed to get exchange via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID);

  })
}

/* ***************** */




/////////////////////

//////////////////////////
home();


