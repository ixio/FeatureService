'use strict';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                id: 1,
                email: 'admin@test.ode',
                password: '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'
            }]);
        });
};
