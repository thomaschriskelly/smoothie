import express from 'express';
import { parseRow, db } from './database';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * get list of smoothies
 */
app.get('/api/smoothies', (req, res, next) => {
    const sql = 'SELECT * FROM smoothies';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows.map(parseRow),
        });
    });
});

/**
 * get a specific smoothie by id
 */
app.get('/api/smoothies/:id', (req, res, next) => {
    const sql = 'SELECT * FROM smoothies WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: parseRow(row),
        });
    });
});

function validateSmoothie(name: unknown, ingredients: unknown) {
    const errors = [];
    if (!name) {
        errors.push('No name specified');
    }
    if (!ingredients) {
        errors.push('No ingredients specified');
    }
    try {
        if (Object.entries(ingredients).length === 0) {
            errors.push('No ingredients');
        }
        JSON.stringify(ingredients);
    } catch (error) {
        errors.push(`Ingredients malformed: ${ingredients}`);
    }
    return errors;
}

/**
 * create a new smoothie
 */
app.post('/api/smoothies', (req, res, next) => {
    const { name, ingredients } = req.body;
    const errors = validateSmoothie(name, ingredients);
    if (errors.length) {
        res.status(400).json({ error: errors.join(',') });
        return;
    }
    const data = {
        name,
        ingredients: JSON.stringify(ingredients),
    };
    const sql = 'INSERT INTO smoothies (name, ingredients) VALUES (?,?)';
    const params = [data.name, data.ingredients];
    db.run(sql, params, function (err: Error) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data,
            id: this.lastID,
        });
    });
});

/**
 * edit an existing smoothie
 */
app.post('/api/smoothies/:id', (req, res, next) => {
    const { name, ingredients } = req.body;
    const errors = validateSmoothie(name, ingredients);
    if (errors.length) {
        res.status(400).json({ error: errors.join(',') });
        return;
    }
    const data = {
        id: req.params.id,
        name,
        ingredients: JSON.stringify(ingredients),
    };
    const sql = 'UPDATE smoothies SET name = ?, ingredients = ? WHERE id = ?';
    const params = [data.name, data.ingredients, data.id];
    db.run(sql, params, function (err: Error) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data,
            id: this.lastID,
        });
    });
});

const port = 8080;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
