import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id=?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: "Employee not found"
        })

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const getEmployeeBetween = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id BETWEEN ? AND ?', [req.params.idf, req.params.ids]);

        if(rows.length <= 0) return res.status(404).json({
            message: "Employee/s not found"
        })

        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}


export const getEmployeeByLetter = async (req, res) => {
    
    try {
        console.log(req.params.letter)
        const [rows] = await pool.query('SELECT * FROM employee WHERE name LIKE CONCAT(?, "%")', [req.params.letter]);
        if(rows.length <= 0) return res.status(404).json({
            message: "Employee/s not found"
        })
        res.send(rows);
      } catch (errorType1) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
      }
      
}

export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES(?, ?)',
            [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id=?', [req.params.id]);

        console.log(result);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Employee not found"
        })

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
};

export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
            [name, salary, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: "Employee not found"
        })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        console.log(rows);
        res.json({
            message: "Received",
            newEmployee: rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

