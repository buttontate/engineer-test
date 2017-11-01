begin;
  create table pizza (
    pizza_id smallserial primary key,
    name text not null,
    toppings text[],
    crust text not null,
    sauce text not null
  );

  create table pizza_order (
    order_id smallserial primary key,
    pizza_id smallint references pizza (pizza_id) not null,
    size text not null
  );

  insert into pizza (name, toppings, crust, sauce) values
    ('quattro formaggi', '{"mozzarella", "parmesan", "ricotta", "gorgonzola"}', 'regular', 'olive oil'),
    ('pepperoni', '{"pepperoni", "mozzarella", "parmesan"}', 'thin', 'marinara'),
    ('hawaiian', '{"pineapple", "canadian bacon", "mozzarella"}', 'gluten-free', 'marinara'),
    ('chicken alfredo', '{"grilled chicken", "mozzarella", "parmesan", "roasted garlic"}', 'regular', 'alfredo'),
    ('veggie supreme', '{"black olives", "mushrooms", "green peppers", "red onions", "mozzarella"}', 'thin', 'marinara'),
    ('fig and pig', '{"prosciutto", "mozzarella", "parmesan", "arugula"}', 'regular', 'fig jam'),
    ('carnivore', '{"mozzarella", "italian sausage", "pepperoni", "prosciutto", "canadian bacon"}', 'gluten-free', 'marinara');
commit;
