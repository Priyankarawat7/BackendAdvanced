const request=require('supertest')
const app=require('../App')

describe('GET',()=>{
    it('should return 200 ok',async()=>{
        const res=await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message:"hello world!"})
    })
    
})                               