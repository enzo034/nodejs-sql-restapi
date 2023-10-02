import { Router } from 'express'
import { getEmployees, createEmployees, updateEmployees, deleteEmployees,getEmployee, getEmployeeBetween, getEmployeeByLetter } from '../controllers/employees.controllers.js'

const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/byname/:letter', getEmployeeByLetter);

router.get('/employees/:idf/:ids', getEmployeeBetween);

router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployees);

router.delete('/employees/:id', deleteEmployees);


export default router;