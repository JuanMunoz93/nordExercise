const { getCode, getName } = require('country-list');
const { postcodeValidator } = require('postcode-validator');

let apiResponse;

describe('Insigth API tests', () => {

    before(() => {
        const endpoint=`${Cypress.env('apiBaseUrl')}/v1/helpers/ips/insights`;
        cy.request({
            url:endpoint,
            method:'GET'
        }).then(response => {
            apiResponse=response
            cy.log(`endpoint used: ${endpoint} \n response: ${apiResponse}`)
        });
    });

    it('Verify response status ', () => {
        assert.equal(apiResponse.status,200,'The status code is not the expected');
    });

    it('Verify response body is not null', () => {
        assert.isNotNull(apiResponse.body,'the response body is null')
    });

    it('Verify response body has a valid json structure', () => {
        let isJson;
        try {
            JSON.parse(str);
        } catch (e) {
            isJson=false;
        }
        isJson=true;
        assert.isNotNull(apiResponse);
    });

    it('Verify json response has the expected attributes', () => {
        expect(apiResponse.body).property('ip').exist;
        expect(apiResponse.body).property('country').exist;
        expect(apiResponse.body).property('country_code').exist;
        expect(apiResponse.body).property('city').exist;
        expect(apiResponse.body).property('isp').exist;
        expect(apiResponse.body).property('isp_asn').exist;
        expect(apiResponse.body).property('protected').exist;
        expect(apiResponse.body).property('longitude').exist;
        expect(apiResponse.body).property('latitude').exist;
        expect(apiResponse.body).property('state_code').exist;
        expect(apiResponse.body).property('zip_code').exist;
    });

    it('Verify json response attributes have the expected data type', () => {
        assert.isString(apiResponse.body['ip']);
        assert.isString(apiResponse.body['country']);
        assert.isString(apiResponse.body['country_code']);
        assert.isString(apiResponse.body['city']);
        assert.isString(apiResponse.body['isp']);
        assert.isNumber(apiResponse.body['isp_asn']);
        assert.isBoolean(apiResponse.body['protected']);
        assert.isNumber(apiResponse.body['longitude']);
        assert.isNumber(apiResponse.body['latitude']);
        assert.isString(apiResponse.body['state_code']);
        assert.isString(apiResponse.body['zip_code']);
    });

    it('Verify ip has the ip v4 structure', () => {
        expect(apiResponse.body['ip']).to.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/)
    });

    it('Verify country code and name exists', () => {
        const countryName=getName(apiResponse.body['country_code']);
        const countryCode=getCode(apiResponse.body['country']);

       assert.isDefined(countryName,`the country_code '${apiResponse.body['country_code']}' was not found in the ISO 3166-1-alpha-2 list of standardized country codes`);
       assert.isDefined(countryCode,`the country name '${apiResponse.body['country']}' was not found in the ISO 3166-1-alpha-2 list of standardized country names`);
    });

    it('Verify relation between country code and country name', () => {
        const countryName=getName(apiResponse.body['country_code']);
        assert.equal(apiResponse.body['country'], countryName,`the country_code '${apiResponse.body['country_code']}' belongs to ${countryName} and not to ${apiResponse.body['country']}`);
    });

    it('Verify if coordinates are valid', () => {
        expect(apiResponse.body['longitude']).to.match(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)
        expect(apiResponse.body['latitude']).to.match(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)        
    });

    it('Verify zipcode is valid for the received country', () => {
        const postalCodeExistsInCountry = postcodeValidator(apiResponse.body['zip_code'], apiResponse.body['country_code']);
        assert.isTrue(postalCodeExistsInCountry, 'The received zip code doesnt belongs to the received country')
    });

 });