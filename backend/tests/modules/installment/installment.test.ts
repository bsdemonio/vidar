import expect from 'expect';

import request from '../../request-helper';

const testUser = {
  email: 'test-user@gmail.com',
  password: 'test1234',
  firstName: 'test',
  lastName: 'user',
};

describe('installment', () => {
  let loginResponse: any = null;
  let installmentId: string;

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
            date: "2021/01/01"
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
    }).set('Authorization', `Bearer ${loginResponse.data.login.token}`);
  });

  describe('list', () => {
    it('should list the installments from a user between 2 dates', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query installments {
            installments(startDate:"2021/01/01", endDate: "2021/03/10" ) {
              id
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.installments');
          expect(res.body.data.installments).toHaveLength(3);

          installmentId = res.body.data.installments[0].id;
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

  // TODO add test for when the installment is already paid
});
