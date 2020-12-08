
const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const path = require('path');
const app = require('../index');
const chaiHttp = require('chai-http');
const Article = require('../models/article');
const testPosts = {
    'title': 'this is the test title',
    'summary': 'this is the post test summary',
    'body': 'this is the post test body'

};

const { it, describe, beforeEach, afterEach } = mocha;
const {expect} = chai;
chai.use(chaiHttp);

const cookieValue = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2EzOWIzNzNiN2E1MDAxNzYwNDMzZSIsImlhdCI6MTYwNzI4MDUzMywiZXhwIjoxNjEwODgwNTMzfQ.0hYGRpVq4ypub1M1B8S9YWfiP9P6YXxeNlrkemUi2vk';


describe('Should post article', async() => {

    
        beforeEach(async () => {
          
            await Article.deleteMany({});
        });
        afterEach(async () => {
            await Article.deleteMany({});
        });

    it( 'post article', async() => {
         const res = await request(app).post('/api/articles')
        .field('title', 'test one title')
        .field('summary', 'test one summary')
        .field('body', 'test one body')
        .attach('image', path.resolve(__dirname, './test pic.png'));

        expect(res.status).to.be.equal(201);
    })

    it('Should Get all articles from database', async () => {
        
        const res = await request(app).get('/api/articles');
        expect(res.status).to.be.equal(200);
    })

    it('should get single post', async() => {
        const article = await Article.create(testPosts);
        const res = await request(app).get('/api/articles/'+article._id);
        expect(res.status).to.be.equal(200);
    } )

    // IT SHOULD DELETE ARTICLE API 73-77

    it('should get queries', async () => {
        const res = await request(app).get('/api/queries');
        expect(res.status).to.be.equal(200);
    })

    it('should add queries to the db', async () => {
        const res = await request(app).post('/api/queries')
        .field('name', 'partick')
        .field('email', 'partick@gmail.com')
        .field('message', 'Hey make sure this place is great')

        expect(res.status).to.be.equal(201);
    })


    // delete an article
    it('Should delete a post', async () => {
        const article = await Article.create(testPosts);
        await article.save();
    
        const res = await request(app).delete(`/api/articles/${article._id}`).set('Cookie',cookieValue);
        expect(res.status).to.be.equal(200);
      });


      it('should update article')

    //   it('should not get article', async () => {
    //       const res = await request(app).get('/api/articles');

    //       expect(res.status).to.be.equal(500);
    //   })
})

