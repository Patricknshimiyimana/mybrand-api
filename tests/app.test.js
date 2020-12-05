
const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const path = require('path');
const app = require('../index');
const chaiHttp = require('chai-http');
const Article = require('../models/article');

const { it, describe, beforeEach, afterEach } = mocha;
const {expect} = chai;
chai.use(chaiHttp);


describe('testing article', async() => {
    it( 'post article', async() => {
         const res = await request(app).post('/api/articles')
        .field('title', 'test one title')
        .field('summary', 'test one summary')
        .field('body', 'test one body')
        .attach('image', path.resolve(__dirname, './test pic.png'));

        expect(res.status).to.be.equal(201);
    })
})