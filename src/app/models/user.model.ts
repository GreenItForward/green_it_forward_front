export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: string,
        public imageUrl: string|null,
        public createdAt: Date,
        public updatedAt: Date|null,
    ) {}
}
