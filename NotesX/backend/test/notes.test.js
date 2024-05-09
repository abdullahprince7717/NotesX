const request = require('supertest');
const app = require('../app');

// const mockVerifyToken = jest.fn();

// jest.mock('../middleware/auth', () => ({
//     client: mockVerifyToken, // Use `client` middleware for notes API
// }));

describe('Notes API Routes', () => {
    // beforeEach(() => {
    //     mockVerifyToken.mockReturnValueOnce(true); // Simulate successful token verification
    // });
    it('should get all notes', async () => {
        const pageNo = 1;
        const response = await request(app).get(`/note/?pageNo=${pageNo}`);
        expect(response.status).toBe(200);
    });

    it('should get notes by userId ', async () => {
        const userId = 'user123';
        const response = await request(app).get(`/note/${userId}`);
        expect(response.status).toBe(200);
    });

    it('should create a note', async () => {
        const noteData = {
            userId: "57372c8b-165e-4dd1-a6e3-220df92af4b9",
            noteTitle: "Test Note",
            noteDescription: "Test content",
            noteImage: "https://test.com/image.jpg"
        };
        const response = await request(app)
            .post('/note/')
            .send(noteData);
        expect(response.status).toBe(201);
    });

    it('should update a note', async () => {
        const noteData = {
            noteId: 'note123',
            noteTitle: 'Updated Note',
            noteDescription: 'Updated content',
            noteImage: 'https://test.com/image.jpg',
            userId: 'user123'
        };
        const response = await request(app)
            .put('/note/update')
            .send(noteData);
        expect(response.status).toBe(200);

    });

    it('should delete a note', async () => {
        const noteId = 'note123';
        const response = await request(app).delete(`/note/${noteId}`);
        expect(response.status).toBe(200);
    });


    it('should add a collaborator ', async () => {
        const collaboratorData = {
            ownerId: "57372c8b-165e-4dd1-a6e3-220df92af4b9",
            noteId: "28ee7826-6b70-4d62-a95e-223d27ca7051",
            userId: "a0da4be5-8eff-454c-8be7-8f200c083ec2"
        };
        const response = await request(app)
            .post('/note/addCollaborator')
            .send(collaboratorData);
        expect(response.status).toBe(201);
    });

    it('should remove a collaborator ', async () => {
        const collaboratorData = {
            ownerId: "57372c8b-165e-4dd1-a6e3-220df92af4b9",
            noteId: "28ee7826-6b70-4d62-a95e-223d27ca7051",
            userId: "a0da4be5-8eff-454c-8be7-8f200c083ec2"
        };
        const response = await request(app)
            .post('/note/removeCollaborator')
            .send(collaboratorData);
        expect(response.status).toBe(200);
    });
});