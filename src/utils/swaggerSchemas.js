const swaggerSchemas = {
  User: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'user@mail.com' },
      password: { type: 'string', example: '12345678' },
    },
  },
  Note: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', example: 'Нотатка 1' },
      content: { type: 'string', example: 'Опис нотатки' },
      tag: { type: 'string', example: 'work' },
    },
  },
};

export default swaggerSchemas;
