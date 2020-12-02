
export function validateSmoothie(name: unknown, ingredients: unknown) {
    const errors = [];
    if (!name) {
        errors.push('No name specified');
    }
    if (!ingredients) {
        errors.push('No ingredients specified');
    }
    try {
        if(ingredients && typeof ingredients !== 'object'){
            errors.push('Ingredients not an object')
        }
        if (ingredients && Object.entries(ingredients).length === 0) {
            errors.push('No ingredients');
        }
        JSON.stringify(ingredients);
    } catch (error) {
        errors.push('Ingredients malformed');
    }
    return errors;
}