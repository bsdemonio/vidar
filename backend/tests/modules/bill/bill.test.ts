import expect from 'expect';

import request from '../../request-helper';

const testUser = {
  email: 'test-user@gmail.com',
  firstName: 'test',
  lastName: 'user',
  password: 'test1234',
};

describe('bill', () => {
  let loginResponse: any = null;
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
  });

  describe('create', () => {
    it('should create a new bill', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          mutation {
            createBill(
              name: "test",
              installments: 12,
              amount: 200,
              recurrenceNumber: 1,
              recurrenceSpan: "M",
              date: "2021/01/01",
              category: "house",
              placeToPay: "cash"
            ) {
              id
              name
              initialDate
              finalDate
              placeToPay
              installments {
                number
                dueDate
              }
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.createBill.id');
          expect(res.body).toHaveProperty('data.createBill.name', 'test');
          expect(res.body).toHaveProperty('data.createBill.placeToPay', 'cash');
          expect(res.body).toHaveProperty('data.createBill.installments');
          expect(res.body.data.createBill.initialDate).toBe('2021/01/01');
          expect(res.body.data.createBill.finalDate).toBe('2021/12/01');
          expect(res.body.data.createBill.installments).toHaveLength(12);
          expect(res.body.data.createBill.installments[0].dueDate).toBe('2021/01/01');
          expect(res.body.data.createBill.installments[1].dueDate).toBe('2021/02/01');
          expect(res.body.data.createBill.installments[2].dueDate).toBe('2021/03/01');
          expect(res.body.data.createBill.installments[3].dueDate).toBe('2021/04/01');
          expect(res.body.data.createBill.installments[4].dueDate).toBe('2021/05/01');
          expect(res.body.data.createBill.installments[5].dueDate).toBe('2021/06/01');
          expect(res.body.data.createBill.installments[6].dueDate).toBe('2021/07/01');
          expect(res.body.data.createBill.installments[7].dueDate).toBe('2021/08/01');
          expect(res.body.data.createBill.installments[8].dueDate).toBe('2021/09/01');
          expect(res.body.data.createBill.installments[9].dueDate).toBe('2021/10/01');
          expect(res.body.data.createBill.installments[10].dueDate).toBe('2021/11/01');
          expect(res.body.data.createBill.installments[11].dueDate).toBe('2021/12/01');

          billId = res.body.data.createBill.id;
        });
    });

    it('should create a new bill with float amounts', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          mutation {
            createBill(
              name: "test2",
              installments: 3,
              amount: 200.3,
              recurrenceNumber: 1,
              recurrenceSpan: "M",
              date: "2022/01/01",
              category: "house"
            ) {
              id
              name
              total
              installments {
                number
                dueDate
              }
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.createBill.id');
          expect(res.body).toHaveProperty('data.createBill.name', 'test2');
          expect(res.body).toHaveProperty('data.createBill.installments');
          expect(res.body.data.createBill.installments).toHaveLength(3);
        });
    });
  });

  describe('list', () => {
    it('should list the bills from a user', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          query bills {
            bills {
              name
              total
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.bills');
          expect(res.body.data.bills).toHaveLength(2);
        });
    });
  });

  describe('delete', () => {
    it('should delete a bill', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
          mutation {
            deleteBill(
              id: "${billId}"
            ) {
              id
            }
          }
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('data.deleteBill.id', billId);
        });
    });
  });

  describe('create', () => {
    it('should throw an error on create bill due to wrong recurrenceSpan', () => {
      const { token } = loginResponse.data.login;
      return request({
        query: `
        mutation{
          createBill(
            name: "internet",
            amount: 100,
            installments: 100
            recurrenceNumber:10
            recurrenceSpan: "nonValid",
            date: "01-01-2010",
            category: "inner-shit",
            placeToPay: "mercadoLibre"
          )
          {
            id
          }
        }        
        `,
      })
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toBe(true);
        });
    });
  });
});
