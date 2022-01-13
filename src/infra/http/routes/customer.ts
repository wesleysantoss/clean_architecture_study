import Express from 'express';
import { CustomerController } from '../../../controllers/CustomerController';

const router = Express.Router();

router.post('/customer', async (request, response) => {
  try {
    const { name, last_name, rg, cpf, email } = request.body;
    const customer = await CustomerController.create(name, last_name, rg, cpf, email);

    response.json(customer);
  } catch (e: any) {
    response.status(400).send(e?.message);
  }
});

router.get('/customers', async (request, response) => {
  try {
    const customers = await CustomerController.getAll();
    response.json(customers);
  } catch (e: any) {
    response.status(400).send(e?.message);
  }
});

router.delete('/customer/:id', async (request, response) => {
  try {
    const id = request.params.id;
    await CustomerController.delete(id);

    response.status(200).send();
  } catch (e: any) {
    response.status(400).send(e?.message);
  }
});

export default router;