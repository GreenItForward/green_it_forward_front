export class Project {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public imageUrl: string,
      public amountRaised: number,
      public totalAmount: number,
      public startDate: Date,
      public endDate: Date,
      public createdBy: string,
    ) {}
  }