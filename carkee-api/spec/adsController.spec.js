var Request = require('request');
var fs = require('fs');
var validate = require('jsonschema').validate;

var AuthToken = '';

xdescribe('Server', () => {
  var server;
  beforeAll(() => {
    server = require('../app');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });
  afterAll(() => {
    server.close();
  });

    //---------------------------------------------------------------------------------
    //User Login /api/user/login

    describe('User Login', () => {
      var data = {};
      beforeAll(function () {
        // Matcher for checking the Login Response fields
        jasmine.addMatchers({
          validateLoginResponse: function () {
            return {
              compare: function (responseData) {
                var result = {};
                var requriedFields = ['statusCode', 'auth', 'token', 'userId', 'is_vendor'];
                var responseKeys = Object.keys(responseData);
                const requriedFieldsSorted = requriedFields.slice().sort();
                result.pass = responseKeys.length === requriedFieldsSorted.length &&
                  responseKeys
                    .slice()
                    .sort()
                    .every(function (value, index) {
                      return value === requriedFieldsSorted[index];
                    });
                result.message = 'Not getting the correct response Fields!';
                return result;
              },
            };
          },
        });
      });

      beforeAll((done) => {
        var options = {
          method: 'POST',
          url: 'https://carkee-staging.solveware.co/api/user/login',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          formData: {
            email: 'harry99@yopmail.org',
            password: 'Pass!2345',
            account_id: '1',
          },
        };
        Request(options, function (error, response, body) {
          console.log('User login (1)');
          var temp_data = JSON.parse(body);
          AuthToken = temp_data.token;
          data.status = response.statusCode;
          data.body = temp_data;
          done();
        });
      });
      it('Response Status Code', () => {
        expect(data.status).toBe(200);
      });

      it('Check for valid fields', () => {
        expect(data.body).validateLoginResponse();
      });

      it('Check for valid Schema', () => {
        expect(validate(data.body,userLoginSchema).valid).toBe(true);
      });
      
    });
  

});
