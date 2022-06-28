import axios from 'axios'
import './index.css'

// endpoint
const axiosRequest = axios.create({ baseURL: 'http://localhost:8080' })

angular
  .module('myApp', ['metawidget'])
  .controller('myController', function ($scope) {
    $scope.metawidgetConfig = {
      inspector: new metawidget.inspector.JsonSchemaInspector({
        properties: {
          member: {
            type: 'object',
            properties: {
              name: { type: 'string', required: true },
              email: { type: 'string', required: true },
              telephone: { type: 'number' },
              address: {
                type: 'object',
                properties: {
                  street: { type: 'string' },
                  city: { type: 'string' },
                  state: {
                    type: 'string',
                    title: 'State',
                    enum: ['NSW', 'QLD', 'TAS', 'WA', 'VIC', 'SA', 'NT', 'ACT'],
                    enumNames: [
                      'NSW',
                      'QLD',
                      'TAS',
                      'WA',
                      'VIC',
                      'SA',
                      'NT',
                      'ACT',
                    ],
                  },
                  postcode: { type: 'number' },
                },
              },
            },
          },
        },
      }),
    }

    // Save Button
    $scope.save = function () {
      if (!$scope.memberDetail) {
        alert('Please enter the data')
        return
      }

      if (!$scope.memberDetail.member.name) {
        alert('Name is required')
        return
      }

      if (!$scope.memberDetail.member.email) {
        alert('Email is required')
        return
      }

      /**
       * validate user's email (example: johndoe123@example.com)
       * @param {string} email
       * @returns {*}
       */
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      }

      if (!validateEmail($scope.memberDetail.member.email)) {
        alert('Invalid email address')
        return
      }

      axiosRequest
        .post('/api/v1', $scope.memberDetail)
        .then((response) => alert(response.data))
        .catch((error) => {
          alert('something went wrong')
          console.log(error)
        })
        .finally(window.location.reload()) // refresh browser to empty inputs text
    }

    // Show Members Button
    $scope.fetchData = function () {
      axiosRequest
        .get('/api/v1')
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }
  })
