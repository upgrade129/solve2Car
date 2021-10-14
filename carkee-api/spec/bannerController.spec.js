var Request = require('request');
var fs = require('fs');
var validate = require('jsonschema').validate;

var Banner_Id = '';

describe('Server', () => {
  var server;
  beforeAll(() => {
    server = require('../app');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });
  beforeAll(function () {
    // Matcher for checking the Login Response fields
    jasmine.addMatchers({
      validateResponse: function () {
        return {
          compare: function (responseData) {
            var result = {};
            var requriedFields = [
              'statusCode',
              'message',
              'reason',
              'data',
              'count',
            ];
            var responseKeys = Object.keys(responseData);
            const requriedFieldsSorted = requriedFields.slice().sort();
            result.pass =
              responseKeys.length === requriedFieldsSorted.length &&
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
  afterAll(() => {
    server.close();
  });

  //---------------------------------------------------------------------------------
  //Get all the Banner data  /api/banner/list

  describe('Get all banner data', () => {
    var data = {};
    beforeAll((done) => {
      var options = {
        method: 'GET',
        url: 'https://carkee-staging.solveware.co/api/banner/list',
      };
      Request(options, function (error, response, body) {
        console.log('Get all banner data (1)');
        var temp_data = JSON.parse(body);
        data.status = response.statusCode;
        data.body = temp_data;
        done();
      });
    });
    it('Response Status Code', () => {
      expect(data.status).toBe(200);
    });

    it('Check for valid fields', () => {
      expect(data.body).validateResponse();
    });

    //---------------------------------------------------------------------------------
    //Create a Banner  /api/banner/create

    describe('create a new Banner', () => {
      var data = {};
      beforeAll((done) => {
        var options = {
          method: 'POST',
          url: 'https://carkee-staging.solveware.co/api/banner/create',
          headers: {},
          formData: {
            image: {
              value: fs.createReadStream(`${__dirname}/assets/test.png`),
              options: {
                filename: 'blackjean.jpeg',
                contentType: null,
              },
            },
            title: 'Pizza',
            content:
              'The COM card is down, back up the cross-platform bus so we can copy the XSS program!',
            link: 'http://sibyl.name',
          },
        };
        Request(options, function (error, response, body) {
          console.log('Create a new banner (2)');
          var temp_data = JSON.parse(body);
          data.status = response.statusCode;
          Banner_Id = temp_data.data.id;
          data.body = temp_data;
          done();
        });
      });
      it('Response Status Code', () => {
        expect(data.status).toBe(200);
      });

      it('Check for valid fields', () => {
        expect(data.body).validateResponse();
      });

      //---------------------------------------------------------------------------------
      //Get Banner details using Banner Id  /api/banner/viewBanner?banner_id=2

      describe('Get Banner using Banner id', () => {
        var data = {};
        beforeAll((done) => {
          var options = {
            method: 'GET',
            url: `https://carkee-staging.solveware.co/api/banner/viewBanner?banner_id=${Banner_Id}`,
          };
          Request(options, function (error, response, body) {
            console.log('Get Banner using Banner id (3)');
            var temp_data = JSON.parse(body);
            data.status = response.statusCode;
            data.body = temp_data;
            done();
          });
        });
        it('Response Status Code', () => {
          expect(data.status).toBe(200);
        });

        it('Check for valid fields', () => {
          expect(data.body).validateResponse();
        });

        //---------------------------------------------------------------------------------
        //Update the banner using banner id /api/banner/list

        describe('Update the banner using Banner Id', () => {
          var data = {};
          beforeAll((done) => {
            var options = {
              method: 'PUT',
              url: 'https://carkee-staging.solveware.co/api/banner/updateBanner',
              formData: {
                banner_id: Banner_Id,
                image: {
                  value: fs.createReadStream(`${__dirname}/assets/test.png`),
                  options: {
                    filename: 'blackjean.jpeg',
                    contentType: null,
                  },
                },
                title: 'xx',
                content: 'xx',
                link: 'xx',
              },
            };
            Request(options, function (error, response, body) {
              console.log('Update the banner using Banner Id (4)');
              var temp_data = JSON.parse(body);
              data.status = response.statusCode;
              data.body = temp_data;
              done();
            });
          });
          it('Response Status Code', () => {
            expect(data.status).toBe(200);
          });

          it('Check for valid fields', () => {
            expect(data.body).validateResponse();
          });

          //---------------------------------------------------------------------------------
          //Delete the banner using banner id /api/banner/list

          describe('Delete the banner using Banner Id', () => {
            var data = {};
            beforeAll((done) => {
              var options = {
                method: 'DELETE',
                url: 'https://carkee-staging.solveware.co/api/banner/removeBanner',
                formData: {
                  banner_id: Banner_Id,
                },
              };
              Request(options, function (error, response, body) {
                console.log('Delete the banner using Banner Id (5)');
                var temp_data = JSON.parse(body);
                data.status = response.statusCode;
                data.body = temp_data;
                done();
              });
            });
            it('Response Status Code', () => {
              expect(data.status).toBe(200);
            });

            it('Check for valid fields', () => {
              expect(data.body).validateResponse();
            });
          });
        });
      });
    });
  });
});
