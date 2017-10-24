begin;
  create table pizza (
    name varchar(25) not null,
    toppings jsonb not null,
    crust varchar(15) not null,
    sauce varchar(15) not null,
    size integer not null,
    price decimal not null
  );

  insert into pizza values
    ('quattro formaggi', '{"toppings": ["mozzarella", "parmesan", "ricotta", "gorgonzola"]}', 'regular', 'olive oil', 14, 18.99),
    ('pepperoni', '{"toppings": ["pepperoni", "mozzarella", "parmesan"]}', 'thin', 'marinara', 12, 16.99),
    ('hawaiian', '{"toppings": ["pineapple", "canadian bacon", "mozzarella"]}', 'gluten-free', 'marinara', 10, 12.99),
    ('chicken alfredo', '{"toppings": ["grilled chicken", "mozzarella", "parmesan", "roasted garlic"]}', 'regular', 'alfredo', 14, 20.99),
    ('veggie supreme', '{"toppings": ["black olives", "mushrooms", "green peppers", "red onions", "mozzarella"]}', 'thin', 'marinara', 10, 10.99),
    ('fig and pig', '{"toppings": ["prosciutto", "mozzarella", "parmesan", "arugula"]}', 'regular', 'fig jam', 12, 18.99),
    ('carnivore', '{"toppings": ["mozzarella", "italian sausage", "pepperoni", "prosciutto", "canadian bacon"]}', 'gluten-free', 'marinara', 14, 22.99);
commit;