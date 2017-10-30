const createNewOrderQuery = `
    with pizza as(
        select * from pizza where pizza_id = $1
    )
    insert into pizza_order (toppings, crust, sauce, size)
        select toppings, crust, sauce, size from pizza;
`;
const selectAllPizzasQuery = 'select * from pizza';

module.exports = {
    createNewOrderQuery,
    selectAllPizzasQuery
};
