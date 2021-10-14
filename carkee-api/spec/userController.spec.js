var Request = require('request');
var fs = require('fs');
var validate = require('jsonschema').validate;

var AuthToken = '';

const userLoginSchema = {
  "$id": "UserLoginSchema",
  "type": "object",
  "title": "The root schema",
  "description": "The root schema comprises the entire JSON document.",
  "default": {},
  "examples": [
      {
          "statusCode": 200,
          "auth": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQzLCJhY2NvdW50X2lkIjoxLCJpc192ZW5kb3IiOmZhbHNlLCJpYXQiOjE2MjYzMTkyMzR9.jz514Tu_us_fKrsZedkPnCpGfpATge_rKLztnWUACHk",
          "userId": 143,
          "is_vendor": false
      }
  ],
  "required": [
      "statusCode",
      "auth",
      "token",
      "userId",
      "is_vendor"
  ],
  "properties": {
      "statusCode": {
          "$id": "#/properties/statusCode",
          "type": "integer",
          "title": "The statusCode schema",
          "description": "Response Status code",
          "default": 0,
          "examples": [
              200
          ]
      },
      "auth": {
          "$id": "#/properties/auth",
          "type": "boolean",
          "title": "The auth schema",
          "description": "Getting the user status authenticated or not",
          "default": false,
          "examples": [
              true
          ]
      },
      "token": {
          "$id": "#/properties/token",
          "type": "string",
          "title": "The token schema",
          "description": "JWT token",
          "default": "",
          "examples": [
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQzLCJhY2NvdW50X2lkIjoxLCJpc192ZW5kb3IiOmZhbHNlLCJpYXQiOjE2MjYzMTkyMzR9.jz514Tu_us_fKrsZedkPnCpGfpATge_rKLztnWUACHk"
          ]
      },
      "userId": {
          "$id": "#/properties/userId",
          "type": "integer",
          "title": "The userId schema",
          "description": "User id",
          "default": 0,
          "examples": [
              143
          ]
      },
      "is_vendor": {
          "$id": "#/properties/is_vendor",
          "type": "boolean",
          "title": "The is_vendor schema",
          "description": "Is the user is vendor or not",
          "default": false,
          "examples": [
              false
          ]
      }
  }
}

describe('Server', () => {
  var server;
  beforeAll(() => {
    server = require('../app');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });
  afterAll(() => {
    server.close();
  });
  xdescribe('Test request', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(
        ' https://carkee-staging.solveware.co/api',
        (error, response, body) => {
          data.status = response.statusCode;
          done();
        },
      );
    });
    it('Message check', () => {
      expect(data.status).toBe(200);
    });
  });
  //-----------------------------------------------------------------------------------------
  //User Register /api/user/register

  describe('User Register', () => {
    var data = {};
    beforeAll((done) => {
      Request.post(
        {
          headers: {},
          url: ' https://carkee-staging.solveware.co/api/user/register',
          formData: {
            email: 'prem@gmail.com',
            password: 'Pass!234',
            password_confirm: 'Pass!234',
            account_id: 1,
            fullname: 'test demo',
            mobile_code: +65,
            mobile: 882874300,
          },
        },
        function (error, response, body) {
          data.status = response.statusCode;
          console.log('User Register (1)', body);
          done();
        },
      );
    });

    beforeAll(function () {
      // Matcher for checking the Login Response fields
      jasmine.addMatchers({
        validateLoginResponse: function () {
          return {
            compare: function (responseData) {
              var result = {};
              var requriedFields = [
                'statusCode',
                'auth',
                'token',
                'userId',
                'is_vendor',
              ];
              var responseKeys = Object.keys(responseData);
              //result.pass = requriedFields.every((i) => responseKeys.includes(i));
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

      jasmine.addMatchers({
        validateUserUpdateResponse: function () {
          return {
            compare: function (responseData) {
              var result = {};
              var requriedFields = ['statusCode', 'message', 'data'];
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

      jasmine.addMatchers({
        validateUserInfoResponse: function () {
          return {
            compare: function (responseData) {
              var result = {};
              var requriedFields = ['statusCode', 'reason', 'message', 'data', 'count'];
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

      jasmine.addMatchers({
        validateUserUpdatePasswordResponse: function () {
          return {
            compare: function (responseData) {
              var result = {};
              var requriedFields = ['statusCode', 'message'];
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
    xit('Response Status Code', () => {
      expect(data.status).toBe(400);
    });

    //---------------------------------------------------------------------------------
    //User Login /api/user/login

    describe('User Login', () => {
      var data = {};
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
          console.log('User login (2)');
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

      //-----------------------------------------------------------------------------------
      //User Profile update -step 1  /api/user/update-profile

      describe('Profile Update - step 1', () => {
        var data = {};
        beforeAll((done) => {
          console.log('Auth Token -- ', AuthToken);
          var options = {
            method: 'PUT',
            url: 'https://carkee-staging.solveware.co/api/user/update-profile',
            headers: {
              Authorization: `Bearer ${AuthToken}`,
            },
            formData: {
              step: '1',
              fullname: 'Harry voot',
              mobile_code: '+61',
              mobile: '983728472',
              gender: 'M',
              birthday: '2010-01-01',
              add_1: 'sdf',
              add_2: 'asdf',
              country: 'asdf',
              postal_code: '1',
              nric: '3234',
              img_profile: {
                value: fs.createReadStream(`${__dirname}/assets/test.png`),
                options: {
                  filename: 'test.png',
                  contentType: null,
                },
              },
              profession: 'Software Engineer',
              company: 'Solveware',
              unit_no: '3',
              annual_salary: '36366363',
            },
          };
          Request(options, function (error, response, body) {
            console.log('User update profile 1 (3)');
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            done();
          });
        });
        it('Response Status Code', () => {
          expect(data.status).toBe(200);
        });

        it('Check for the valid fields', () => {
          expect(data.body).validateUserUpdateResponse();
        });

        //---------------------------------------------------------------
        //User update profile -2 /api/user/update-profile

        describe('Profile Update - step 2', () => {
          var data = {};
          beforeAll((done) => {
            var options = {
              method: 'PUT',
              url: 'https://carkee-staging.solveware.co/api/user/update-profile',
              headers: {
                Authorization: `Bearer ${AuthToken}`,
              },
              formData: {
                step: '2',
                chasis_number: 'ETW5E78',
                plate_no: '3434',
                car_model: 'KLPD234',
                are_you_owner: 'true',
                registration_code: 'OP007',
              },
            };
            Request(options, function (error, response, body) {
              console.log('User update profile 2 (4)');
              data.status = response.statusCode;
              data.body = JSON.parse(body);
              done();
            });
          });
          it('Response Status Code', () => {
            expect(data.status).toBe(200);
          });

          it('Check for the valid fields', () => {
            expect(data.body).validateUserUpdateResponse();
          });

          //---------------------------------------------------------------
          //User update profile -3 /api/user/update-profile

          describe('Profile Update - step 3', () => {
            var data = {};
            beforeAll((done) => {
              var options = {
                method: 'PUT',
                url: 'https://carkee-staging.solveware.co/api/user/update-profile',
                headers: {
                  Authorization: `Bearer ${AuthToken}`,
                },
                formData: {
                  step: '3',
                  contact_person: 'Jarry',
                  emergency_code: 'KKB435T',
                  relationship: 'TESTING',
                  telephone_number: '96885885',
                  telephone_code: '+1',
                },
              };
              Request(options, function (error, response, body) {
                console.log('User update profile 3 (5)');
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
              });
            });
            it('Response Status Code', () => {
              expect(data.status).toBe(200);
            });

            it('Check for the valid fields', () => {
              expect(data.body).validateUserUpdateResponse();
            });

            //---------------------------------------------------------------
            //User update profile -4 /api/user/update-profile

            describe('Profile Update - step 4', () => {
              var data = {};
              beforeAll((done) => {
                var options = {
                  method: 'PUT',
                  url: 'https://carkee-staging.solveware.co/api/user/update-profile',
                  headers: {
                    Authorization: `Bearer ${AuthToken}`,
                  },
                  formData: {
                    step: '4',
                    transfer_number: 'TRS764293T873U',
                    transfer_banking_nickname: 'JT-34653',
                    transfer_date: '2020-09-21',
                    transfer_amount: '100',
                    transfer_screenshot: {
                      value: fs.createReadStream(`${__dirname}/assets/test.png`),
                      options: {
                        filename: 'test.png',
                        contentType: null,
                      },
                    },
                  },
                };
                Request(options, function (error, response, body) {
                  console.log('User update profile 4 (6)');
                  data.status = response.statusCode;
                  data.body = JSON.parse(body);
                  done();
                });
              });
              it('Response Status Code', () => {
                expect(data.status).toBe(200);
              });

              it('Check for the valid fields', () => {
                expect(data.body).validateUserUpdateResponse();
              });

              //---------------------------------------------------------------
              //Get Member Info /api/user/info

              describe('User Member info', () => {
                var data = {};
                beforeAll((done) => {
                  var options = {
                    method: 'GET',
                    url: 'https://carkee-staging.solveware.co/api/user/info',
                    headers: {
                      Authorization: `Bearer ${AuthToken}`,
                    },
                  };
                  Request(options, function (error, response, body) {
                    console.log('UserMember info (7)');
                    data.status = response.statusCode;
                    data.body = JSON.parse(body);
                    done();
                  });
                });
                it('Response Status Code', () => {
                  expect(data.status).toBe(200);
                });

                it('Check for the valid fields', () => {
                  expect(data.body).validateUserInfoResponse();
                });

                //---------------------------------------------------------------
                //Get All Member Info api/user/getAllUsers

                describe('All User Member info', () => {
                  var data = {};
                  beforeAll((done) => {
                    var options = {
                      method: 'GET',
                      url: 'https://carkee-staging.solveware.co/api/user/getAllUsers?page=0&pagesize=10',
                      headers: {
                        Authorization: `Bearer ${AuthToken}`,
                      },
                    };
                    Request(options, function (error, response, body) {
                      console.log('All UserMember info (8)');
                      data.status = response.statusCode;
                      data.body = JSON.parse(body);
                      done();
                    });
                  });
                  it('Response Status Code', () => {
                    expect(data.status).toBe(200);
                  });

                  it('Check for the valid fields', () => {
                    expect(data.body).validateUserInfoResponse();
                  });

                  //---------------------------------------------------------------
                  //Update User Mobile number /api/user/update-mobile

                  describe('Update User mobile number', () => {
                    var data = {};
                    beforeAll((done) => {
                      var options = {
                        method: 'PATCH',
                        url: 'https://carkee-staging.solveware.co/api/user/update-mobile',
                        headers: {
                          Authorization: `Bearer ${AuthToken}`,
                        },
                        formData: {
                          mobile_code: '+65',
                          mobile: '121212',
                        },
                      };
                      Request(options, function (error, response, body) {
                        console.log('Update user mobile number (9)');
                        data.status = response.statusCode;
                        data.body = JSON.parse(body);
                        done();
                      });
                    });
                    it('Response Status Code', () => {
                      expect(data.status).toBe(200);
                    });

                    it('Check for the valid fields', () => {
                      expect(data.body).validateUserUpdateResponse();
                    });

                    //---------------------------------------------------------------
                    //Update User Password /api/user/update-password

                    describe('Update User mobile number', () => {
                      var data = {};
                      beforeAll((done) => {
                        var options = {
                          method: 'PATCH',
                          url: 'https://carkee-staging.solveware.co/api/user/update-password',
                          headers: {
                            Authorization: `Bearer ${AuthToken}`,
                          },
                          formData: {
                            password_current: 'Pass!2345',
                            password_new: 'Pass!2345',
                            password_confirm: 'Pass!2345',
                          },
                        };
                        Request(options, function (error, response, body) {
                          console.log('Update user password (10)');
                          data.status = response.statusCode;
                          data.body = JSON.parse(body);
                          done();
                        });
                      });
                      it('Response Status Code', () => {
                        expect(data.status).toBe(200);
                      });

                      it('Check for the valid fields', () => {
                        expect(data.body).validateUserUpdatePasswordResponse();
                      });

                    });

                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
