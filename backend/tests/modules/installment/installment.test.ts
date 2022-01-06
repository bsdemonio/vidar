import expect from 'expect';

import request from '../../request-helper';

const testUser = {
  email: 'test-user@gmail.com',
  firstName: 'test',
  lastName: 'user',
  password: 'test1234',
};

describe('installment', () => {
  let loginResponse: any = null;
  let installmentId: string;
  let billId: string;

  before(async () => {
    await request({
      query: `
        mutation {
          login(email:"${testUser.email}", password:"${testUser.password}") {
            user {
              id
            }
            token
            tokenExpiration
          }
        }
      `,
    })
      .expect((res: Response) => {
        expect(res.body).toHaveProperty('data.login.user.id');
        expect(res.body).toHaveProperty('data.login.token');
        expect(res.body).toHaveProperty('data.login.tokenExpiration');

        loginResponse = res.body;
      })
      .expect(200);

    await request({
      query: `
        mutation {
          createBill(
            name: "test",
            installments: 4,
            amount: 200,
            recurrenceNumber: 1,
            recurrenceSpan: "M",
            date: "2021/01/01",
            category: "house"
          ) {
            id
            name
            installments {
              number
              dueDate
            }
          }
        }
      `,
    })
      .set('Authorization', `Bearer ${loginResponse.data.login.token}`)
      .expect((res) => {
        expect(res.body).toHaveProperty('data.createBill.id');
        billId = res.body.data.createBill.id;
      });
  });

  describe('list', () => {
    it('should list the installments from a user between 2 dates', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query installmentsByDateRange {
            installmentsByDateRange(startDate:"2021/01/01", endDate: "2021/03/10" ) {
              id
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.installmentsByDateRange');
          expect(res.body.data.installmentsByDateRange).toHaveLength(3);

          installmentId = res.body.data.installmentsByDateRange[0].id;
        });
    });
  });

  describe('list by bill id', () => {
    it('should list the installments from an specific bill', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query installmentsByBillId {
            installmentsByBillId(billId: "${billId}" ) {
              id
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.installmentsByBillId');
          expect(res.body.data.installmentsByBillId).toHaveLength(4);
        });
    });
  });

  describe('pay', () => {
    it('should pay an installment', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          mutation {
            payInstallment(
              id: "${installmentId}"
            ) {
              id
              isPaid
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.payInstallment.id', installmentId);
          expect(res.body).toHaveProperty('data.payInstallment.isPaid', true);
        });
    });
  });

  describe('list by paid status', () => {
    it('should list the installments that are not paid', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query installments {
            installments(paid: false) {
              id
              bill {
                name
                total
              }
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.installments');
          expect(res.body.data.installments).toHaveLength(6);
        });
    });

    it('should list the installments that are already paid', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query installments {
            installments(paid: true) {
              id
              bill {
                name
                total
              }
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.installments');
          expect(res.body.data.installments).toHaveLength(1);
        });
    });
  });
});
