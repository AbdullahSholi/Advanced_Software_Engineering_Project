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
    .prompt([{
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
    }])
    .then(answers => {
      console.log('Registration successful!');
      console.log('Collected data', answers);

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
        axios.post(url, postData, )
          .then(response => {
            // Handle success
            console.log('Response:', response.data);
            mainMenu(response.data.length + 1, response.data.token);
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
          // console.log('Response:', response.data.user.UserID);
          // console.log('Response:', response.data.token);
          mainMenu(response.data.user.UserID, response.data.token);
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          loginPage();
        });




    })
    .catch((error) => {
      console.error('Login failed:', error);
      loginPage();
    });
};

////////////////////////

const mainMenu = (UserID, token) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Garden',
        'Guide',
        'Exchange',
        'Logout'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Garden':
          Garden(UserID, token);
          break;
        case 'Guide':
          Guide(UserID, token);
          break;
        case 'Exchange':
          Exchange(UserID, token);
          break;
        case 'Logout':
          home();
          break;

        default:{
          console.log('Invalid choice');
          mainMenu(UserID, token);
        }
          
      }
    });
};

const Garden = (UserID, token) => {
  // console.log(token)
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
          AddGarden(UserID, token);
          break;
        case 'Display All Gardens':
          DisplayAllGardens(UserID, token);
          break;
        case 'Display garden by id':
          DisplayGardenById(UserID, token);
          break;
        case 'Display gardens by name':
          DisplayGardensByName(UserID, token);
          break;

        case 'Display gardens by location':
          DisplayGardensByLocations(UserID, token);
          break;

        case 'Update garden data':
          UpdateGardenData(UserID, token);
          break;
        case 'Delete a specific garden':
          DeleteASpecificGarden(UserID, token);
          break;
        case 'Enter to event window':
          Event(UserID, token);
          break;
        case 'Enter to plot window':
          console.log(UserID);
          Plot(UserID, token);
          break;
        case 'Go Back':
          mainMenu(UserID, token);
          break;
        default:{
          console.log('Invalid choice');
          Garden(UserID, token);
        }
          
      }
    });
};


const Guide = (UserID, token) => {

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
          AddGuide(UserID, token);
          break;
        case 'Display All Guides':
          DisplayAllGuides(UserID, token);
          break;
        case 'Display guide by id':
          DisplayGuideById(UserID, token);
          break;
        case 'Display guides by title':
          DisplayGuidesByTitle(UserID, token);
          break;

        case 'Update guide data':
          UpdateGuideData(UserID, token);
          break;

        case 'Delete a specific guide':
          DeleteASpecificGuide(UserID, token);
          break;
        case 'Go Back':
          mainMenu(UserID, token);
          break;
        default:{
          console.log('Invalid choice');
          Guide(UserID, token);
        }
          
      }
    });
}

const Event = (UserID, token) => {
  console.log(UserID);
  axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    console.log(response.data[0].GardenID);
    const GardenID = response.data[0].GardenID;
    if(GardenID == undefined){
      console.log("Garden not found!");
      Garden(UserID, token);
    }
    if(GardenID == undefined){
      console.log("Garden not found!!");
    } else{
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
            AddEvent(UserID, GardenID, token);
            break;
          case 'Display All Events':
            DisplayAllEvents(UserID, GardenID, token);
            break;
          case 'Display Event by id':
            DisplayEventById(UserID, GardenID, token);
            break;
          case 'Display Events by garden id':
            DisplayEventsByGardenId(UserID, GardenID, token);
            break;

          case 'Update event data':
            UpdateEventData(UserID, GardenID, token);
            break;

          case 'Delete a specific event':
            DeleteASpecificEvent(UserID, GardenID, token);
            break;
          case 'Go Back':
            mainMenu(UserID, token);
            break;
          default:
            console.log('Invalid choice');
            Event(UserID, token);
            
        }
      });
    }
      
  }).catch(error => {
    console.log(error);
    Garden(UserID, token);
  })

}


const Plot = (UserID, token) => {
  axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    // console.log(response.data[0].GardenID);
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
            AddPlot(UserID, GardenID, token);
            break;
          case 'Display All Plots':
            DisplayAllPlots(UserID, GardenID, token);
            break;
          case 'Display Plot by id':
            DisplayPlotById(UserID, GardenID, token);
            break;
          case 'Display Plots by garden id':
            DisplayPlotsByGardenId(UserID, GardenID, token);
            break;

          case 'Update plot data':
            UpdatePlotData(UserID, GardenID, token);
            break;

          case 'Delete a specific plot':
            DeleteASpecificPlot(UserID, GardenID, token);
            break;
          case 'Enter to activity window':
            SelectPlot(UserID, token);
            break;
          case 'Go Back':
            mainMenu(UserID, token);
            break;
            default:{
              console.log('Invalid choice');
              Plot(UserID, token);
  
            }
        }
      });
      
  }).catch(error => {
    console.log("Error", error);
    Garden(UserID, token);
  })

}


const SelectPlot = (UserID, token) => {
  axios.get(`http://localhost:3000/GreenThumb/api/v1/plots-list`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {

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
          Planting_Activity(UserID, selectedPlot.PlotID, token);
        } else {
          console.error('Selected plot not found.');
          SelectPlot(UserID, token);
        }
      });
  }).catch(error => {
    console.error('Error fetching plots:', error);
    Plot(UserID, token);

  });
};


const Planting_Activity = (UserID, PlotID, token) => {
  // axios.get(`http://localhost:3000/GreenThumb/api/v1/user-garden-list/${UserID}`, {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// }).then(response=>{}).catch(error=>{});
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
        'Enter to Plant window',
        'Delete a specific activity',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Planting Activity':
          AddPlantingActivity(UserID, PlotID, token);
          break;
        case 'Display All Activities':
          DisplayAllActivities(UserID, PlotID, token);
          break;
        case 'Display Activity by id':
          DisplayActivityById(UserID, PlotID, token);
          break;
        case 'Display Activities by user id':
          DisplayActivitiesByUserId(UserID, PlotID, token);
          break;
        case 'Display Activities by plot id':
          DisplayActivitiesByPlotId(UserID, PlotID, token);
          break;
        case 'Update activity data':
          UpdateActivityData(UserID, PlotID, token);
          break;

        case 'Enter to Plant window':
          EnterToPlantWindow(UserID, PlotID, token);
          break;
        case 'Delete a specific activity':
          DeleteASpecificActivity(UserID, PlotID, token);
          break;
        case 'Go Back':
          mainMenu(UserID, token);
          break;
        default:{
          Planting_Activity(UserID, PlotID, token);
          console.log('Invalid choice');
        }
          
      }
    });

}

const Exchange = (UserID, token) => {
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
          AddExchange(UserID, token);
          break;
        case 'Display All Exchanges':
          DisplayAllExchanges(UserID, token);
          break;
        case 'Display Exchange by id':
          DisplayExchangeById(UserID, token);
          break;
        case 'Display Exchanges by Offer User Id':
          DisplayExchangesByOfferUserId(UserID, token);
          break;

        case 'Display Exchanges by Requestor User Id':
          DisplayExchangesByRequestorUserId(UserID, token);
          break;
        case 'Display Exchanges by status':
          DisplayExchangesByStatus(UserID, token);
          break;
        case 'Update Exchange data':
          UpdateExchangeData(UserID, token);
          break;
        case 'Delete a specific Exchange':
          DeleteASpecificExchange(UserID, token);
          break;
        case 'Enter to resources window':
          Resources(UserID, token);
          break;
        case 'Go Back':
          mainMenu(UserID, token);
          break;
          default:{
            Exchange(UserID, token);
            console.log('Invalid choice');
          }
      }
    });
}

const Resources = (UserID, token) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Resource',
        'Display All Resources',
        'Display Resource by id',
        'Display Resources by type',
        'Update Resource data',
        'Delete a specific Resource',
        "Enter to Partnership window",
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Resource':
          SelectExchange(UserID, token);
          // AddResource(UserID, token);
          break;
        case 'Display All Resources':
          DisplayAllResources(UserID, token);
          break;
        case 'Display Resource by id':
          DisplayResourceById(UserID, token);
          break;
        case 'Display Resources by type':
          DisplayResourcesByType(UserID, token);
          break;

        case 'Update Resource data':
          UpdateResourceData(UserID, token);
          break;
        case 'Delete a specific Resource':
          DeleteASpecificResource(UserID, token);
          break;
        case 'Enter to Partnership window':
          Partnership(UserID, token);
          break;
        case 'Go Back':
          Exchange(UserID, token);
          break;
        default:{
          console.log('Invalid choice');
          Resources(UserID, token);
        }
          
      }
    });
}

const Partnership = (UserID, token) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Partnership',
        'Display All Partnerships',
        'Display Partnership by id',
        'Display Partnerships by name',
        'Update Partnership data',
        'Delete a specific Partnership',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Partnership':
          SelectResource(UserID, token);
          break;
        case 'Display All Partnerships':
          DisplayAllPartnerships(UserID, token);
          break;
        case 'Display Partnership by id':
          DisplayPartnershipById(UserID, token);
          break;
        case 'Display Partnerships by name':
          DisplayPartnershipsByName(UserID, token);
          break;

        case 'Update Partnership data':
          UpdatePartnershipData(UserID, token);
          break;
        case 'Delete a specific Partnership':
          DeleteASpecificPartnership(UserID, token);
          break;
        case 'Go Back':
          Resources(UserID, token);
          break;
        default:
          {
            console.log('Invalid choice');
            Partnership(UserID, token);
          }
          
      }
    });
}



///////////////////////////

// Garden functions
/* ***************** */
const AddGarden = (UserID, token) => {
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/gardens-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
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

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log('Response2');

            axios.get("http://localhost:3000/GreenThumb/api/v1/user-gardens-list", {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then(response3 => {
              axios.post('http://localhost:3000/GreenThumb/api/v1/new-user-garden', {
                UserGardenID: response3.data.length + 1,
                UserID: UserID,
                GardenID: response1.data.length + 1
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response4 => {
                  // Handle success
                  console.log('Response4');
                  Garden(UserID, token);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                  Garden(UserID, token);
                });
            }).catch(error => {
              console.error('Error:', error);
              Garden(UserID, token);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
            Garden(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          Garden(UserID, token);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
      Garden(UserID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllGardens = (UserID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/gardens-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Garden(UserID, token);
  }).catch(error => {
    console.log("Error",error);
    Garden(UserID, token);
  })
}

const DisplayGardenById = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list/${answers.GardenID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Garden(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Garden(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID, token);
  })

}

const DisplayGardensByName = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list-by-name/${answers.GardenName}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Garden(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Garden(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID, token);
  })
}

const DisplayGardensByLocations = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/garden-list-by-location/${answers.GardenLocation}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Garden(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Garden(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID, token);
  })
}

const UpdateGardenData = (UserID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          GardenID: answers.GardenID,
          Name: answers1.name,
          Location: answers1.location,
          Description: answers1.description
        });

        Garden(UserID, token);
      }).catch(error => {
        console.log("Error",error);
    Garden(UserID, token);
      })
    }).catch(error => {
      console.log("Error",error);
    Garden(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID, token);
  })
}

const DeleteASpecificGarden = (UserID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/specific-garden-from-list/${answers.GardenID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Garden(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Garden(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Garden(UserID, token);
  })
}

/* ***************** */

// Guide functions
/* ***************** */

const AddGuide = (UserID, token) => {
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/guide-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
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

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success

            axios.get("http://localhost:3000/GreenThumb/api/v1/comments-list", {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then(response3 => {
              axios.post('http://localhost:3000/GreenThumb/api/v1/add-comment', {
                CommentID: response3.data.length + 1,
                GuideID: response1.data.length + 1,
                Comment: answers.comment
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response4 => {
                  // Handle success
                  Guide(UserID, token);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.log("Error",error);
    Guide(UserID, token);
                });
            }).catch(error => {
              console.log("Error",error);
    Guide(UserID, token);
            })


            /////////////////////

          }).catch(error => {
            console.log("Error",error);
    Guide(UserID, token);
          })



      })
        .catch(error => {
          console.log("Error",error);
    Guide(UserID, token);
        });

    })
    .catch((error) => {
      console.log("Error",error);
    Guide(UserID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllGuides = (UserID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/guide-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Guide(UserID, token);
  }).catch(error => {
    console.log("Error",error);
    Guide(UserID, token);
  })
}

const DisplayGuideById = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/guide/${answers.GuideID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Guide(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Guide(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID, token);
  })

}

const DisplayGuidesByTitle = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/guide-list-by-title/${answers.GuideTitle}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Guide(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Guide(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get guide via title:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID, token);
  })
}

const UpdateGuideData = (UserID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          GuideID: answers.GuideID,
          Title: answers1.title,
          Content: answers1.content,
          Rate: answers1.rate
        });

        Guide(UserID, token);
      }).catch(error => {
        console.log("Error",error);
    Guide(UserID, token);
      })
    }).catch(error => {
      console.log("Error",error);
    Guide(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID, token);
  })
}

const DeleteASpecificGuide = (UserID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/specific-guide-from-list/${answers.GuideID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Guide(UserID, token);
    }).catch(error => {
      console.log("Error",error);
    Guide(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Guide(UserID, token);
  })
}

/* ***************** */


// Event functions
/* ***************** */

const AddEvent = (UserID, GardenID, token) => {
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/events-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-event';
        // Data to be sent in the POST request
        const postData = {
          EventID: response1.data.length + 1,
          GardenID: GardenID,
          Date: answers.date,
          Description: answers.description
        };

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log({
              EventID: response1.data.length + 1,
              GardenID: GardenID,
              Date: answers.date,
              Description: answers.description
            });
            /////////////////////
            Event(UserID, token);

          }).catch(error => {
            console.error('Error:', error);
            Event(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.log("Error",error);
          Event(UserID, token);
        });

    })
    .catch((error) => {
      console.log("Error",error);
          Event(UserID, token);
    });
}

const DisplayAllEvents = (UserID, GardenID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/events-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Event(UserID, token);
  }).catch(error => {

  })
}

const DisplayEventById = (UserID, GardenID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/event/${answers.EventID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Event(UserID, token);
    }).catch(error => {
      console.log("Error",error);
          Event(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID, token);
  })

}


const DisplayEventsByGardenId = (UserID, GardenID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/events-list-by-garden/${answers.GardenID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Event(UserID, token);
    }).catch(error => {
      console.log("Error",error);
          Event(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get guide via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID, token);
  })

}

const UpdateEventData = (UserID, GardenID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          GardenID: GardenID,
          Date: answers1.date,
          Description: answers1.description
        });

        Event(UserID, token);
      }).catch(error => {
        console.log("Error",error);
          Event(UserID, token);
      })
    }).catch(error => {
      console.log("Error",error);
          Event(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get Event via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID, token);
  })
}

const DeleteASpecificEvent = (UserID, GardenID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/event/${answers.EventID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Event(UserID, token);
    }).catch(error => {
      console.log("Error",error);
          Event(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get Event via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Event(UserID, token);
  })
}

/* ***************** */


// Activity functions
/* ***************** */

const AddPlantingActivity = (UserID, PlotID, token) => {
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/activities-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
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

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
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
            Planting_Activity(UserID, PlotID, token);

          }).catch(error => {
            console.error('Error:', error);
            Planting_Activity(UserID, PlotID, token);

          })



      })
        .catch(error => {
          // Handle error
          console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
        });

    })
    .catch((error) => {
      console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
    });
}

const DisplayAllActivities = (UserID, PlotID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/activities-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Planting_Activity(UserID, PlotID, token);
  }).catch(error => {
    Planting_Activity(UserID, PlotID, token);
  })
}

const DisplayActivityById = (UserID, PlotID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activity/${answers.ActivityID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID, token);
    }).catch(error => {
      console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID, token);
  })

}


const DisplayActivitiesByUserId = (UserID, PlotID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activities-list-by-user/${answers.UserID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID, token);
    }).catch(error => {
      console.log("Error",error);
      Planting_Activity(UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID, token);
  })

}

const DisplayActivitiesByPlotId = (UserID, PlotID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/activities-list-by-plot/${answers.PlotID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID, token);
    }).catch(error => {
      console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID, token);
  })

}

const UpdateActivityData = (UserID, PlotID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          PlantDate: answers1.PlantDate,
          HarvestDate: answers1.HarvestDate
        });

        Planting_Activity(UserID, PlotID, token);
      }).catch(error => {
        console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
      })
    }).catch(error => {
      console.log("Error",error);
          Planting_Activity(UserID, PlotID, token);
    })


  }).catch((error) => {
    console.error('Failed to get activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID, token);

  })
}

const EnterToPlantWindow = (UserID, PlotID, token) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Plant',
        'Display All Plants',
        'Display Plant by id',
        'Display Plants by name',
        'Update Plant data',
        'Delete a specific Plant',
        'Go Back'
      ]
    })
    .then((answers) => {
      switch (answers.action) {
        case 'Add Plant':
          SelectActivity(UserID, PlotID, token);
          break;
        case 'Display All Plants':
          DisplayAllPlants(UserID, PlotID, token);
          break;
        case 'Display Plant by id':
          DisplayPlantById(UserID, PlotID, token);
          break;
        case 'Display Plants by name':
          DisplayPlantsByName(UserID, PlotID, token);
          break;

        case 'Update Plant data':
          UpdatePlantData(UserID, PlotID, token);
          break;
        case 'Delete a specific Plant':
          DeleteASpecificPlant(UserID, PlotID, token);
          break;
        case 'Go Back':
          Planting_Activity(UserID, PlotID, token);
          break;
        default:{
          console.log('Invalid choice');
          EnterToPlantWindow (UserID, PlotID, token);
        }
          
      }
    });
}


const DeleteASpecificActivity = (UserID, PlotID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/activity/${answers.ActivityID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Planting_Activity(UserID, PlotID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Planting_Activity(UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get Activity via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Planting_Activity(UserID, PlotID, token);

  })
}

/* ***************** */



// Plot functions
/* ***************** */

const AddPlot = (UserID, GardenID, token) => {
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/plots-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
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

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
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
            Plot(UserID, token);

          }).catch(error => {
            console.error('Error:', error);
            Plot(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
            Plot(UserID, token);
        });

    })
    .catch((error) => {
      console.error('Error:', error);
            Plot(UserID, token);
    });
}

const DisplayAllPlots = (UserID, GardenID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/plots-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Plot(UserID, token);
  }).catch(error => {

  })
}

const DisplayPlotById = (UserID, GardenID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plot/${answers.PlotID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Plot(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
            Plot(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID, token);
  })

}


const DisplayPlotsByGardenId = (UserID, GardenID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plots-list-by-garden/${answers.GardenID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Plot(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
            Plot(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID, token);
  })

}

const UpdatePlotData = (UserID, GardenID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          GardenID: GardenID,
          PlotSize: answers1.PlotSize,
          SunLight: answers1.SunLight,
          SoilType: answers1.SoilType,
          Available: answers1.Available
        });

        Plot(UserID, token);
      }).catch(error => {
        console.error('Error:', error);
            Plot(UserID, token);
      })
    }).catch(error => {
      console.error('Error:', error);
            Plot(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get Plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID, token);
  })
}

const DeleteASpecificPlot = (UserID, GardenID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/plot/${answers.PlotID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Plot(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
            Plot(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get Plot via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Plot(UserID, token);
  })
}

/* ***************** */



// Exchange functions
/* ***************** */
const AddExchange = (UserID, token) => {
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
        default: "Offered, Requested or Completed",
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
      axios.get("http://localhost:3000/GreenThumb/api/v1/exchanges-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
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

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log(postData);
            Exchange(UserID, token);


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
            Exchange(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          Exchange(UserID, token);
        });

    })
    .catch((error) => {
      console.error('Error:', error);
          Exchange(UserID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllExchanges = (UserID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/exchanges-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Exchange(UserID, token);
  }).catch(error => {
    console.error('Error:', error);
          Exchange(UserID, token);
  })
}

const DisplayExchangeById = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchange/${answers.ExchangeID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Exchange(UserID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);
  })

}

const DisplayExchangesByOfferUserId = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-offer-user/${answers.OfferUserID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Exchange(UserID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);
  })
}

const DisplayExchangesByRequestorUserId = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-requestor-user/${answers.RequestorUserID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Exchange(UserID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID, token);

    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);

  })
}

const DisplayExchangesByStatus = (UserID, token) => {
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
    axios.get(`http://localhost:3000/GreenThumb/api/v1/exchanges-list-by-status/${answers.status}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Exchange(UserID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID, token);

    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);

  })
}


const UpdateExchangeData = (UserID, token) => {
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
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          GardenID: answers.GardenID,
          Status: answers1.status
        });

        Exchange(UserID, token);
      }).catch(error => {
        console.error('Error message:', error);
        Exchange(UserID, token);

      })
    }).catch(error => {
      console.error('Error:', error);
          Exchange(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get exchange via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);

  })
}

const DeleteASpecificExchange = (UserID, token) => {
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
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/exchange/${answers.ExchangeID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Exchange(UserID, token);
    }).catch(error => {
      console.error('Error message:', error);
      Exchange(UserID, token);

    })
  }).catch((error) => {
    console.error('Failed to get exchange via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Exchange(UserID, token);

  })
}

/* ***************** */


// Resource functions
/* ***************** */

const SelectExchange = async (UserID, token) => {
  try {
    const response = await axios.get('http://localhost:3000/GreenThumb/api/v1/exchanges-list', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    console.log(response.data);

    const answers = await inquirer.prompt({
      type: 'list',
      name: 'ExchangeID',
      message: 'Select specific exchange :',
      choices: response.data.map(exchange => exchange.ExchangeID.toString())
    });

    const selectedExchange = response.data.find(exchange => exchange.ExchangeID.toString() === answers.ExchangeID);

    if (selectedExchange) {
      console.log(selectedExchange);
      AddResource(UserID, selectedExchange.ExchangeID, token);
    } else {
      console.error('Selected Exchange not found.');
      SelectExchange(UserID, token);
    }
  } catch (error) {
    console.error('Error fetching Exchangess:', error);
    Exchange(UserID, token);
  }
}

const AddResource = (UserID, ExchangeID, token) => {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'type',
        message: 'Enter resource type:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource type.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter resource description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource description.';
          }
        }
      },
      {
        type: 'input',
        name: 'availablequantity',
        message: 'Enter available qunatity:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter available qunatity.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter Resource data');
      console.log(answers)
      axios.get("http://localhost:3000/GreenThumb/api/v1/resources-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-resource';
        console.log(response1.data.length + 1);
        // Data to be sent in the POST request
        const postData = {
          ResourceID: response1.data.length + 1,
          Type: answers.type,
          Description: answers.description,
          AvailableQuantity: answers.availablequantity
        };

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log('Response2');

            axios.get("http://localhost:3000/GreenThumb/api/v1/exchange-resource-list", {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then(response3 => { // arrive here ( also edit garden )
              axios.post('http://localhost:3000/GreenThumb/api/v1/new-exchange-resource', {
                Exchange_Resource_ID: response3.data.length + 1,
                ExchangeID: ExchangeID,
                ResourceID: response1.data.length + 1
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response4 => {
                  // Handle success
                  console.log('Response4');
                  Resources(UserID, token);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                  Resources(UserID, token);
                });
            }).catch(error => {
              console.error('Error:', error);
                  Resources(UserID, token);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
                  Resources(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
                  Resources(UserID, token);
        });

    })
    .catch((error) => {
      console.error('Error:', error);
                  Resources(UserID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllResources = (UserID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/resources-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Resources(UserID, token);
  }).catch(error => {
    console.error('Error:', error);
                  Resources(UserID, token);
  })
}

const DisplayResourceById = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ResourceID',
        message: 'Enter your Resource Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Resource Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/resource/${answers.ResourceID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Resources(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Resources(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get garden via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Resources(UserID, token);

  })

}

const DisplayResourcesByType = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'type',
        message: 'Enter resource type:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource type.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/resources-list-by-type/${answers.type}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Resources(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Resources(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get resource via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Resources(UserID, token);

  })
}


const UpdateResourceData = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ResourceID',
        message: 'Enter resource id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource id.';
          }
        }
      },
    ]
  ).then(answers => {
    console.log("Enter data to update")

    inquirer.prompt([
      {
        type: 'input',
        name: 'type',
        message: 'Enter resource type:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource type.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter resource description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource description.';
          }
        }
      },
      {
        type: 'input',
        name: 'availablequantity',
        message: 'Enter available quantity:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter available quantity.';
          }
        }
      },
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/resource/${answers.ResourceID}`, {
        Type: answers1.type,
        AvailableQuantity: answers1.availablequantity,
        Description: answers1.description
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          ResourceID: answers.ResourceID,
          Type: answers1.type,
          AvailableQuantity: answers1.availablequantity,
          Description: answers1.description
        });

        Resources(UserID, token);
      }).catch(error => {
        console.error('Error:', error);
                  Resources(UserID, token);
      })
    }).catch(error => {
      console.error('Error:', error);
                  Resources(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get resource via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Resources(UserID, token);

  })
}

const DeleteASpecificResource = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'ResourceID',
        message: 'Enter your resource Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter resource Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/resource/${answers.ResourceID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Resources(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Resources(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get resource via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Resources(UserID, token);

  })
}

/* ***************** */


// Resource functions
/* ***************** */

const SelectResource = async (UserID, token) => {
  try {
    const response = await axios.get('http://localhost:3000/GreenThumb/api/v1/resources-list', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    console.log(response.data);

    const answers = await inquirer.prompt({
      type: 'list',
      name: 'ResourceID',
      message: 'Select specific resource :',
      choices: response.data.map(resource => resource.ResourceID.toString())
    });

    const selectedResource = response.data.find(resource => resource.ResourceID.toString() === answers.ResourceID);

    if (selectedResource) {
      console.log(selectedResource);
      addPartnership(UserID, selectedResource.ResourceID, token);
    } else {
      console.error('Selected Resource not found.');
    SelectResource(UserID, token);

    }
  } catch (error) {
    console.error('Error fetching resources:', error);
    console.error('Error:', error);
    SelectResource(UserID, token);
  }
}

const addPartnership = (UserID, ResourceID, token) => {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'Name',
        message: 'Enter partner name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter partner name.';
          }
        }
      },
      {
        type: 'input',
        name: 'type',
        message: 'Enter partnership type:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter partnership type.';
          }
        }
      },
      {
        type: 'input',
        name: 'contactinfo',
        message: 'Enter contact info:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter contact info.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter Partnership data');
      console.log(answers)
      axios.get("http://localhost:3000/GreenThumb/api/v1/partnerships-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-partnership';
        console.log(response1.data.length + 1);
        // Data to be sent in the POST request
        const postData = {
          PartnershipID: response1.data.length + 1,
          Type: answers.type,
          Name: answers.Name,
          ContactInfo: answers.contactinfo
        };

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log('Response2');

            axios.get("http://localhost:3000/GreenThumb/api/v1/resource-partnership-list", {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then(response3 => { // arrive here ( also edit garden )
              axios.post('http://localhost:3000/GreenThumb/api/v1/new-resource-partnership', {
                Resource_Partnership_ID: response3.data.length + 1,
                PartnershipID: response1.data.length + 1,
                ResourceID: ResourceID
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response4 => {
                  // Handle success
                  console.log('Response4');
                  Partnership(UserID, token);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                  Partnership(UserID, token);
                });
            }).catch(error => {
              console.error('Error:', error);
                  Partnership(UserID, token);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
                  Partnership(UserID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
                  Partnership(UserID, token);
        });

    })
    .catch((error) => {
      console.error('Error:', error);
                  Partnership(UserID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllPartnerships = (UserID, token) => {
  axios.get("http://localhost:3000/GreenThumb/api/v1/partnerships-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    Partnership(UserID, token);
  }).catch(error => {
    console.error('Error:', error);
                  Partnership(UserID, token);
  })
}

const DisplayPartnershipById = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PartnershipID',
        message: 'Enter your Partnership Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Partnership Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/partnership/${answers.PartnershipID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Partnership(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Partnership(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get partnership via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Partnership(UserID, token);

  })

}

const DisplayPartnershipsByName = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'name',
        message: 'Enter partnership name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter partnership name.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/partnerships-list-by-name/${answers.name}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Partnership(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Partnership(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get partnership via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Partnership(UserID, token);

  })
}


const UpdatePartnershipData = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PartnershipID',
        message: 'Enter Partnership id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Partnership id.';
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
        message: 'Enter Partnership name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Partnership name.';
          }
        }
      },
      {
        type: 'input',
        name: 'type',
        message: 'Enter Partnership type:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Partnership type.';
          }
        }
      },
      {
        type: 'input',
        name: 'contactinfo',
        message: 'Enter Partnership contact info :',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Partnership contact info.';
          }
        }
      },
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/partnership/${answers.PartnershipID}`, {
        Type: answers1.type,
        ContactInfo: answers1.contactinfo,
        Name: answers1.name
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          PartnershipID: answers.PartnershipID,
          Type: answers1.type,
          ContactInfo: answers1.contactinfo,
          Name: answers1.name
        });

        Partnership(UserID, token);
      }).catch(error => {
        console.error('Error:', error);
                  Partnership(UserID, token);
      })
    }).catch(error => {
      console.error('Error:', error);
                  Partnership(UserID, token);
    })


  }).catch((error) => {
    console.error('Failed to get resource via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Partnership(UserID, token);

  })
}

const DeleteASpecificPartnership = (UserID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PartnershipID',
        message: 'Enter your Partnership Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Partnership Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/partnership/${answers.PartnershipID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      Partnership(UserID, token);
    }).catch(error => {
      console.error('Error:', error);
                  Partnership(UserID, token);
    })
  }).catch((error) => {
    console.error('Failed to get Partnership via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    Partnership(UserID, token);

  })
}

/* ***************** */




// Resource functions
/* ***************** */

const SelectActivity = async (UserID, PlotID, token) => {
  try {
    const response = await axios.get('http://localhost:3000/GreenThumb/api/v1/activities-list', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    console.log(response.data);

    const answers = await inquirer.prompt({
      type: 'list',
      name: 'ActivityID',
      message: 'Select specific activity :',
      choices: response.data.map(activity => activity.ActivityID.toString())
    });

    const selectedActivity = response.data.find(activity => activity.ActivityID.toString() === answers.ActivityID);

    if (selectedActivity) {
      console.log(selectedActivity);
      addPlant(UserID, selectedActivity.ActivityID, token);
    } else {
      console.error('Selected Activity not found.');
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    SelectActivity(UserID, PlotID, token);
  }
}

const addPlant = (UserID, ActivityID, token) => {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'Name',
        message: 'Enter plant name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter plant name.';
          }
        }
      },
      {
        type: 'input',
        name: 'GrowingSeason',
        message: 'Enter Growing Season:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Growing Season.';
          }
        }
      },
      {
        type: 'input',
        name: 'Description',
        message: 'Enter Plant Description:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plant Description.';
          }
        }
      },
    ])
    .then(answers => {
      console.log('Enter Plant data');
      console.log(answers)
      axios.get("http://localhost:3000/GreenThumb/api/v1/plants-list", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response1 => {
        // Define the URL to which you want to send the POST request
        const url = 'http://localhost:3000/GreenThumb/api/v1/new-plant';
        console.log(response1.data.length + 1);
        // Data to be sent in the POST request
        const postData = {
          PlantID: response1.data.length + 1,
          GrowingSeason: answers.GrowingSeason,
          Name: answers.Name,
          Description: answers.Description
        };

        axios.post(url, postData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response2 => {
            // Handle success
            console.log('Response2');

            axios.get("http://localhost:3000/GreenThumb/api/v1/plantingactivity-plant-list", {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then(response3 => { // arrive here ( also edit garden )
              axios.post('http://localhost:3000/GreenThumb/api/v1/new-plantingactivity-plant', {
                PlantingActivity_Plant_ID: response3.data.length + 1,
                PlantID: response1.data.length + 1,
                ActivityID: ActivityID
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response4 => {
                  // Handle success
                  console.log('Response4');
                  EnterToPlantWindow (UserID, PlotID, token);
                  // mainMenu(response.data.user.UserID);


                })
                .catch(error => {
                  // Handle error
                  console.error('Error:', error);
                  EnterToPlantWindow (UserID, PlotID, token);
                });
            }).catch(error => {
              console.error('Error:', error);
              EnterToPlantWindow (UserID, PlotID, token);
            })


            /////////////////////

          }).catch(error => {
            console.error('Error:', error);
            EnterToPlantWindow (UserID, PlotID, token);
          })



      })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          EnterToPlantWindow (UserID, PlotID, token);
        });

    })
    .catch((error) => {
      console.error('Login failed:', error);
      EnterToPlantWindow (UserID, PlotID, token);
    });
  // Garden(UserID, token);
}

const DisplayAllPlants = (UserID, PlotID, token) => {
  console.log("************");
  console.log(token);
  axios.get("http://localhost:3000/GreenThumb/api/v1/plants-list", {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    console.log(response.data);
    EnterToPlantWindow (UserID, PlotID, token);
  }).catch(error => {
    console.error('Error:', error);
    EnterToPlantWindow (UserID, PlotID, token);
  })
}



const DisplayPlantById = (UserID, PlotID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlantID',
        message: 'Enter your Plant Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Plant Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plant/${answers.PlantID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      EnterToPlantWindow (UserID, PlotID, token);
    }).catch(error => {
      console.error('Error:', error);
      EnterToPlantWindow (UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plant via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    EnterToPlantWindow (UserID, PlotID, token);

  })

}

const DisplayPlantsByName = (UserID, PlotID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'name',
        message: 'Enter plant name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter plant name.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.get(`http://localhost:3000/GreenThumb/api/v1/plants-list-by-name/${answers.name}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      EnterToPlantWindow (UserID, PlotID, token);
    }).catch(error => {
      console.error('Error:', error);
      EnterToPlantWindow (UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get plant via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    EnterToPlantWindow (UserID, PlotID, token);

  })
}


const UpdatePlantData = (UserID, PlotID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlantID',
        message: 'Enter Plant id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plant id.';
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
        message: 'Enter Plant name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plant name.';
          }
        }
      },
      {
        type: 'input',
        name: 'growingseason',
        message: 'Enter Growing Season:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Growing Season.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter Plant description :',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plant description.';
          }
        }
      },
    ]).then(answers1 => {
      axios.patch(`http://localhost:3000/GreenThumb/api/v1/plant/${answers.PlantID}`, {
        Name: answers1.name,
        Description: answers1.description,
        GrowingSeason: answers1.growingseason
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log({
          PlantID: answers.PlantID,
          Name: answers1.name,
          Description: answers1.description,
          GrowingSeason: answers1.growingseason
        });

        EnterToPlantWindow (UserID, PlotID, token);
      }).catch(error => {
        console.error('Error:', error);
        EnterToPlantWindow (UserID, PlotID, token);
      })
    }).catch(error => {
      console.error('Error:', error);
      EnterToPlantWindow (UserID, PlotID, token);
    })


  }).catch((error) => {
    console.error('Failed to get plant via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    EnterToPlantWindow (UserID, PlotID, token);

  })
}

const DeleteASpecificPlant = (UserID, PlotID, token) => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'PlantID',
        message: 'Enter your Plant Id:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plant Id.';
          }
        }
      },
    ]
  ).then(answers => {
    axios.delete(`http://localhost:3000/GreenThumb/api/v1/plant/${answers.PlantID}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
      console.log(response.data);
      EnterToPlantWindow (UserID, PlotID, token);
    }).catch(error => {
      console.error('Error:', error);
      EnterToPlantWindow (UserID, PlotID, token);
    })
  }).catch((error) => {
    console.error('Failed to get Plant via id:', error);
    // Optionally, you can return to the main menu even in case of an error
    EnterToPlantWindow (UserID, PlotID, token);

  })
}

/* ***************** */

/////////////////////

//////////////////////////
home();


